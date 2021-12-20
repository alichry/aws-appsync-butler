import Reader from "../reader/Reader";
import { ResolverType,
    PipelineResolverInfo,
    UnitResolverInfo
} from '../reader/types';
import { ParserOptions,
    ParsedVtlRequest,
    ParsedVtlFile,
    ParsedResolverInfo,
    ParsedFunctionInfo,
    ParsedUnitResolverInfo,
    ParsedPipelineResolverInfo
} from "./types";
import { VtlFileType } from "./types";
import { InvalidDirectiveError,
    UndefinedVariableError,
    PipelineValidationError
} from "./errors";

export default class Parser extends Reader {
    private readonly variables: Map<string, string> = new Map();
    private static readonly butlerReferenceRegExp = /^##[\s]*@butler\.(.*)$/gim;
    private static readonly butlerDirectiveRegExp = /^dataSource\(('|")([a-zA-Z][a-zA-Z0-9]*)\1\)[\s]*$/i;
    private static readonly variableNameRegExp = /^[a-zA-Z]+(_[a-zA-Z]+)*$/;
    private static readonly variableRegExp = /{{[\s]*([a-zA-Z]+(_[a-zA-Z]+)*)[\s]*}}/g;

    constructor(optionsOrRoot: ParserOptions | string = {}) {
        super(optionsOrRoot);
        if (typeof optionsOrRoot === "string") {
            return;
        }
        const { variables = {} } = optionsOrRoot;
        Object.keys(variables).forEach(key => this.setVariable(key, variables[key] as string));
    }

    public setVariable(key: string, value: string): this {
        if (! Parser.variableNameRegExp.test(key)) {
            throw new Error(`Invalid variable key! Got '${key}'`);
        }
        this.variables.set(key, value);
        return this;
    }

    public getVariable(key: string): string | undefined {
        return this.variables.get(key);
    }

    public parseResolver(
        typeName: string,
        fieldName: string
    ): ParsedResolverInfo {
        const resolver = this.readResolver(typeName, fieldName);
        if (resolver.resolverType === ResolverType.Unit) {
            return this.parseUnitResolverInfo(resolver);
        }
        return this.parsePipelineResolverInfo(resolver);
    }

    public parseFunction(functionName: string): ParsedFunctionInfo {
        const func = this.readFunction(functionName);
        const { data: parsedRequest, dataSource } = this.parseFile(
            func.requestMappingTemplate.path,
            func.requestMappingTemplate.data,
            VtlFileType.Request
        );
        const { data: parsedResponse } = this.parseFile(
            func.responseMappingTemplate.path,
            func.responseMappingTemplate.data,
            VtlFileType.Response
        );
        return {
            ...func,
            requestMappingTemplate: {
                path: func.requestMappingTemplate.path,
                data: parsedRequest
            },
            responseMappingTemplate: {
                path: func.responseMappingTemplate.path,
                data: parsedResponse
            },
            dataSource
        };
    }

    private parseUnitResolverInfo(
        resolver: UnitResolverInfo
    ): ParsedUnitResolverInfo {
        const { data: parsedRequest, dataSource } = this.parseFile(
            resolver.requestMappingTemplate.path,
            resolver.requestMappingTemplate.data,
            VtlFileType.Request
        );
        const { data: parsedResponse } = this.parseFile(
            resolver.responseMappingTemplate.path,
            resolver.responseMappingTemplate.data,
            VtlFileType.Response
        );
        return {
            ...resolver,
            requestMappingTemplate: {
                path: resolver.requestMappingTemplate.path,
                data: parsedRequest
            },
            responseMappingTemplate: {
                path: resolver.responseMappingTemplate.path,
                data: parsedResponse
            },
            dataSource
        };
    }

    private parsePipelineResolverInfo(
        resolver: PipelineResolverInfo
    ): ParsedPipelineResolverInfo {
        resolver.pipelineDefinition.data = resolver.pipelineDefinition.data.trim();
        if (! resolver.pipelineDefinition.data) {
            throw new PipelineValidationError(
                "Pipeline sequence definition must not be empty.",
                resolver.pipelineDefinition.path
            );
        }
        return {
            ...resolver,
            beforeMappingTemplate: resolver.beforeMappingTemplate ? {
                path: resolver.beforeMappingTemplate.path,
                data: this.parseFile(
                    resolver.beforeMappingTemplate.path,
                    resolver.beforeMappingTemplate.data,
                    VtlFileType.Before
                ).data
            } : undefined,
            afterMappingTemplate: resolver.afterMappingTemplate ? {
                path: resolver.afterMappingTemplate.path,
                data: this.parseFile(
                    resolver.afterMappingTemplate.path,
                    resolver.afterMappingTemplate.data,
                    VtlFileType.After
                ).data
            } : undefined,
            functionSequence: resolver.pipelineDefinition.data.split("\n")
        };
    }

    private parseFile(path: string, data: string, type: VtlFileType.Request): ParsedVtlRequest;
    private parseFile(path: string, data: string, type: VtlFileType.Response): ParsedVtlFile;
    private parseFile(path: string, data: string, type: VtlFileType.Before): ParsedVtlFile;
    private parseFile(path: string, data: string, type: VtlFileType.After): ParsedVtlFile;
    private parseFile(path: string, data: string, type: VtlFileType): ParsedVtlFile | ParsedVtlRequest {
        let dataSource: string | undefined;
        data = data.replace(Parser.butlerReferenceRegExp, (line, directive: string) => {
            if (type !== VtlFileType.Request) {
                throw new InvalidDirectiveError(
                    `A butler directive was encountered in a ${type}. ` +
                    'Butler directives can only be specified in ' +
                    'Request Mapping Templates.',
                    path,
                    line
                );
            }
            const matches = directive.match(Parser.butlerDirectiveRegExp);
            if (! matches || ! matches[2]) {
                throw new InvalidDirectiveError(
                    'An invalid butler directive was encountered.',
                    path,
                    line
                );
            }
            if (dataSource) {
                throw new InvalidDirectiveError(
                    '##@butler.dataSource directive was encountered more than once!',
                    path,
                    line
                );
            }
            dataSource = matches[2];
            return `## AppSync Butler: bound data source is ${dataSource}`;
        });
        data = data.replace(Parser.variableRegExp, (matched, varName: string) => {
            const value = this.getVariable(varName);
            if (typeof value === "undefined") {
                throw new UndefinedVariableError(
                    `Undefined variable '${varName}' was encountered. ` +
                    "Make sure to populate the variables prior reading VTLs",
                    path
                );
            }
            return value;
        });
        return { data, dataSource };
    }
}
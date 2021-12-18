import { join } from "path";
import { readFileSync, readdirSync } from "fs";
import {
    validateResolverDirectory,
    validateFunctionDirectory
} from './utils';
import type {
    VtlReaderOptions,
    ResolverInfo,
    FunctionInfo
} from "./types";
import { ResolverType } from "./types";
import { PipelineValidationError, UndefinedVariableError } from './errors';

export default class VtlReader {
    private readonly structure;
    private readonly variables: Map<string, string> = new Map();
    private static readonly variableNameRegExp = /^[a-zA-Z]+(_[a-zA-Z]+)*$/;
    private static readonly variableRegExp = /{{[\s]*([a-zA-Z]+(_[a-zA-Z]+)*)[\s]*}}/g;

    constructor(optionsOrRoot: VtlReaderOptions | string = {}) {
        if (typeof optionsOrRoot === "string") {
            optionsOrRoot = { structure: { root: optionsOrRoot }};
        }
        const { structure, variables = {} } = optionsOrRoot;
        this.structure = {
            root: structure?.root || "vtl",
            resolvers: structure?.resolvers || "resolvers",
            functions: structure?.functions || "functions",
            unitStructure: {
                request: structure?.unitStructure?.request || "request.vtl",
                response: structure?.unitStructure?.response || "response.vtl"
            },
            pipelineStructure: {
                before: structure?.pipelineStructure?.before || "before.vtl",
                pipeline: structure?.pipelineStructure?.pipeline || "pipeline.seq",
                after: structure?.pipelineStructure?.after || "after.vtl"
            },
            functionStructure: {
                request: structure?.functionStructure?.request || "request.vtl",
                response: structure?.functionStructure?.response || "response.vtl",
                description: structure?.functionStructure?.description || "description.txt"
            }
        };
        Object.keys(variables).forEach(key => this.setVariable(key, variables[key] as string));
    }

    public setVariable(key: string, value: string): this {
        if (! VtlReader.variableNameRegExp.test(key)) {
            throw new Error(`Invalid variable key! Got '${key}'`);
        }
        this.variables.set(key, value);
        return this;
    }

    public getVariable(key: string): string | undefined {
        return this.variables.get(key);
    }

    public readFunctions(): string[] {
        const functionsPath = this.path(this.structure.functions);
        return this.readSubdirsSync(functionsPath);
    }

    public readTypes(): string[] {
        const resolversPath = this.path(this.structure.resolvers);
        return this.readSubdirsSync(resolversPath);
    }

    public readFields(typeName: string): string[] {
        const typePath = this.path(this.structure.resolvers, typeName);
        return this.readSubdirsSync(typePath);
    }

    public getResolverPath(typeName: string, fieldName: string): string {
        return this.path(this.structure.resolvers, typeName, fieldName);
    }

    public getFunctionPath(functionName: string): string {
        return this.path(this.structure.functions, functionName);
    }

    public readResolver(
        typeName: string,
        fieldName: string
    ): ResolverInfo {
        const resolverPath = this.getResolverPath(typeName, fieldName);
        const { request, response } = this.structure.unitStructure;
        const { before, pipeline, after } = this.structure.pipelineStructure;

        const resolverFiles = validateResolverDirectory(
            resolverPath,
            [
                { name: request, required: true },
                { name: response, required: true }
            ],
            [
                { name: before, required: false },
                { name: pipeline, required: true },
                { name: after, required: false }
            ]
        );
        if (resolverFiles.indexOf(request) !== -1) {
            return {
                typeName,
                fieldName,
                resolverType: ResolverType.Unit,
                requestMappingTemplate: this.parseFile(join(resolverPath, request)),
                responseMappingTemplate: this.parseFile(join(resolverPath, response))
            };
        }
        const hasBefore = resolverFiles.indexOf(before) !== -1;
        const hasAfter = resolverFiles.indexOf(after) !== -1;
        const pipelinePath = join(resolverPath, pipeline);
        const pipelineDefinition = readFileSync(pipelinePath, "ascii").trim();
        if (! pipelineDefinition) {
            throw new PipelineValidationError(
                "Pipeline sequence definition must not be empty.",
                pipelinePath
            );
        }
        return {
            typeName,
            fieldName,
            resolverType:  ResolverType.Pipeline,
            beforeMappingTemplate: hasBefore ? this.parseFile(join(resolverPath, before)) : undefined,
            afterMappingTemplate: hasAfter ? this.parseFile(join(resolverPath, after)) : undefined,
            pipelineDefinition,
            functionSequence: pipelineDefinition.split("\n")
        }
    }

    public readFunction(functionName: string): FunctionInfo {
        const functionPath = this.getFunctionPath(functionName);
        const { request, response, description } = this.structure.functionStructure;

        const functionFiles =  validateFunctionDirectory(
            functionPath,
            [
                { name: request, required: true },
                { name: response, required: true},
                { name: description, required: false }
            ]
        );
        const hasDescription = functionFiles.indexOf(description) !== -1;
        const requestMappingTemplate = this.parseFile(join(functionPath, request));
        const responseMappingTemplate = this.parseFile(join(functionPath, response));
        return {
            name: functionName,
            description: hasDescription ? readFileSync(join(functionPath, description), "ascii") : undefined,
            requestMappingTemplate,
            responseMappingTemplate
        }
    }

    private path(...args: string[]): string {
        return join(this.structure.root, ...args);
    }

    private readSubdirsSync(dir: string): string[] {
        return readdirSync(dir, { withFileTypes: true })
            .filter(e => e.isDirectory())
            .map(e => e.name);
    }

    private parseFile(path: string): string {
        const data = readFileSync(path, "ascii");
        return data.replace(VtlReader.variableRegExp, (matched, varName: string) => {
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
    }
}
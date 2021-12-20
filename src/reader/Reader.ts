import { join } from "path";
import { readFileSync, readdirSync } from "fs";
import {
    validateResolverDirectory,
    validateFunctionDirectory
} from './utils';
import type {
    ReaderOptions,
    ResolverInfo,
    FunctionInfo,
    FileInfo
} from "./types";
import { ResolverType } from "./types";

export default class Reader {
    protected readonly structure;

    constructor(optionsOrRoot: ReaderOptions | string = {}) {
        if (typeof optionsOrRoot === "string") {
            optionsOrRoot = { structure: { root: optionsOrRoot }};
        }
        const { structure } = optionsOrRoot;
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
                requestMappingTemplate: this.formulateFileInfo(join(resolverPath, request)),
                responseMappingTemplate: this.formulateFileInfo(join(resolverPath, response))
            };
        }
        const beforeMappingTemplatePath = resolverFiles.indexOf(before) !== -1 ?
            join(resolverPath, before) : undefined;
        const afterMappingTemplatePath = resolverFiles.indexOf(after) !== -1 ?
            join(resolverPath, after) : undefined;
        const pipelineDefinitionPath = join(resolverPath, pipeline);
        return {
            typeName,
            fieldName,
            resolverType:  ResolverType.Pipeline,
            beforeMappingTemplate: this.formulateFileInfo(beforeMappingTemplatePath),
            afterMappingTemplate: this.formulateFileInfo(afterMappingTemplatePath),
            pipelineDefinition: this.formulateFileInfo(pipelineDefinitionPath)
        }
    }

    public readFunction(functionName: string): FunctionInfo {
        const functionPath = this.getFunctionPath(functionName);
        const { request, response, description } = this.structure.functionStructure;

        const functionFiles =  validateFunctionDirectory(
            functionPath,
            [
                { name: request, required: true },
                { name: response, required: true },
                { name: description, required: false }
            ]
        );
        const descriptionPath = functionFiles.indexOf(description) !== -1 ?
            join(functionPath, description) : undefined;
        const requestPath = join(functionPath, request);
        const responsePath = join(functionPath, response);
        return {
            name: functionName,
            description: this.formulateFileInfo(descriptionPath),
            requestMappingTemplate: this.formulateFileInfo(requestPath),
            responseMappingTemplate: this.formulateFileInfo(responsePath)
        }
    }

    protected path(...args: string[]): string {
        return join(this.structure.root, ...args);
    }

    protected readSubdirsSync(dir: string): string[] {
        return readdirSync(dir, { withFileTypes: true })
            .filter(e => e.isDirectory())
            .map(e => e.name);
    }

    protected getResolverPath(typeName: string, fieldName: string): string {
        return this.path(this.structure.resolvers, typeName, fieldName);
    }

    protected getFunctionPath(functionName: string): string {
        return this.path(this.structure.functions, functionName);
    }

    private formulateFileInfo(path: undefined): undefined;
    private formulateFileInfo(path: string): FileInfo;
    private formulateFileInfo(path?: string): FileInfo | undefined;
    private formulateFileInfo(path?: string): FileInfo | undefined {
        if (! path) {
            return;
        }
        return {
            path,
            data: readFileSync(path, 'ascii')
        };
    }
}
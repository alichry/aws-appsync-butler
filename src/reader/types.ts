export interface DirectoryFileDefinition {
    name: string;
    required: boolean;
}

export enum ResolverType {
    Unit = "Unit",
    Pipeline = "Pipeline"
}

export enum ResolverDirectoryFlags {
    Empty = 0,
    HasUnitResolverFiles = 1,
    HasPipelineResolverFiles = 2,
    HasUnitAndPipelineResolverFiles = 3
}

export interface BaseResolverInfo {
    typeName: string;
    fieldName: string;
    resolverType: ResolverType
}

export interface FileInfo {
    path: string;
    data: string;
}

export interface UnitResolverInfo extends BaseResolverInfo {
    resolverType: ResolverType.Unit;
    requestMappingTemplate: FileInfo;
    responseMappingTemplate: FileInfo;
}

export interface PipelineResolverInfo extends BaseResolverInfo {
    resolverType: ResolverType.Pipeline;
    beforeMappingTemplate?: FileInfo;
    pipelineDefinition: FileInfo;
    afterMappingTemplate?: FileInfo;
}

export type ResolverInfo = UnitResolverInfo | PipelineResolverInfo;

export interface FunctionInfo {
    name: string;
    description?: FileInfo;
    requestMappingTemplate: FileInfo;
    responseMappingTemplate: FileInfo;
}

interface UnitDirectoryStructure {
    request?: string;
    response?: string;
}

interface PipelineDirectoryStructure {
    before?: string;
    pipeline?: string;
    after?: string;
}

interface FunctionDirectoryStructure extends UnitDirectoryStructure {
    description?: string;
}

export interface DirectoryStructure {
    root?: string;
    resolvers?: string;
    functions?: string;
    unitStructure?: UnitDirectoryStructure;
    pipelineStructure?: PipelineDirectoryStructure;
    functionStructure?: FunctionDirectoryStructure;
}

export interface ReaderOptions {
    structure?: DirectoryStructure;
}

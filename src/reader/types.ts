/**
 * @internal
 */
export interface DirectoryFileDefinition {
    name: string;
    required: boolean;
}

/**
 * @internal
 */
export enum ResolverDirectoryFlags {
    Empty = 0,
    HasUnitResolverFiles = 1,
    HasPipelineResolverFiles = 2,
    HasUnitAndPipelineResolverFiles = 3
}

export enum ResolverType {
    Unit = "Unit",
    Pipeline = "Pipeline"
}

export interface BaseResolverInfo {
    typeName: string;
    fieldName: string;
    resolverType: ResolverType
}

export interface FileInfo {
    /**
     * Path to file
     */
    path: string;
    /**
     * File content
     */
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

export interface UnitDirectoryStructure {
    /**
     * File name of the request mapping template.
     */
    request?: string;
    /**
     * File name of the response mapping template.
     */
    response?: string;
}

export interface PipelineDirectoryStructure {
    /**
     * File name of the before mapping template.
     */
    before?: string;
    /**
     * File name of the pipeline definition file.
     */
    pipeline?: string;
    /**
     * File name of the after mapping template.
     */
    after?: string;
}

interface FunctionDirectoryStructure extends UnitDirectoryStructure {
    description?: string;
}

export interface DirectoryStructure {
    /**
     * Path to the VTL root directory
     */
    root?: string;
    /**
     * Directory name of the resolvers directory.
     */
    resolvers?: string;
    /**
     * Directory name of the functions directory.
     */
    functions?: string;
    /**
     * Unit resolver directory structure.
     */
    unitStructure?: UnitDirectoryStructure;
    /**
     * Pipeline resolver directory structure.
     */
    pipelineStructure?: PipelineDirectoryStructure;
    /**
     * Function directory structure.
     */
    functionStructure?: FunctionDirectoryStructure;
}

export interface ReaderOptions {
    structure?: DirectoryStructure;
}

import type { GraphqlApi, BaseDataSource } from '@aws-cdk/aws-appsync';
import type { AppSyncApi as SstAppSyncApi } from '@serverless-stack/resources';

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

export interface UnitResolverInfo extends BaseResolverInfo {
    resolverType: ResolverType.Unit;
    requestMappingTemplate: string;
    responseMappingTemplate: string;
}

export interface PipelineResolverInfo extends BaseResolverInfo {
    resolverType: ResolverType.Pipeline;
    beforeMappingTemplate?: string;
    pipelineDefinition: string;
    functionSequence: string[];
    afterMappingTemplate?: string;
}

export type ResolverInfo = UnitResolverInfo | PipelineResolverInfo;

export interface FunctionInfo {
    name: string;
    description?: string;
    requestMappingTemplate: string;
    responseMappingTemplate: string;
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

export interface VtlDirectoryStructure {
    root?: string;
    resolvers?: string;
    functions?: string;
    unitStructure?: UnitDirectoryStructure;
    pipelineStructure?: PipelineDirectoryStructure;
    functionStructure?: FunctionDirectoryStructure;
}

export interface VtlReaderOptions {
    structure?: VtlDirectoryStructure;
    variables?: Record<string, string>;
}

export interface BaseVtlLoaderOptions extends VtlReaderOptions {
    api: GraphqlApi | SstAppSyncApi;
    defaultFunctionDataSource: BaseDataSource | string;
    defaultUnitResolverDataSource: BaseDataSource | string;
}

export interface SstVtlLoaderOptions extends BaseVtlLoaderOptions {
    api: SstAppSyncApi;
    defaultFunctionDataSource: string;
    defaultUnitResolverDataSource: string;
}

export interface CdkVtlLoaderOptions extends BaseVtlLoaderOptions {
    api: GraphqlApi;
    defaultFunctionDataSource: BaseDataSource;
    defaultUnitResolverDataSource: BaseDataSource;
}

export interface ResolverTree {
    [typeName: string]: Record<string, ResolverInfo>;
    Query: Record<string, ResolverInfo>;
    Mutation: Record<string, ResolverInfo>;
}
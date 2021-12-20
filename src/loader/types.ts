import type { GraphqlApi, BaseDataSource } from '@aws-cdk/aws-appsync';
import type { AppSyncApi as SstAppSyncApi } from '@serverless-stack/resources';
import { ReaderOptions } from "../reader/types";

export interface BaseLoaderOptions extends ReaderOptions {
    api: GraphqlApi | SstAppSyncApi;
    defaultFunctionDataSource: BaseDataSource | string;
    defaultUnitResolverDataSource: BaseDataSource | string;
    dataSources?: Record<string, BaseDataSource>;
}

export interface SstLoaderOptions extends BaseLoaderOptions {
    api: SstAppSyncApi;
    defaultFunctionDataSource: string;
    defaultUnitResolverDataSource: string;
    dataSources?: undefined;
}

export interface CdkLoaderOptions extends BaseLoaderOptions {
    api: GraphqlApi;
    defaultFunctionDataSource: BaseDataSource;
    defaultUnitResolverDataSource: BaseDataSource;
}
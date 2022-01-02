import type { GraphqlApi, BaseDataSource } from '@aws-cdk/aws-appsync';
import type { AppSyncApi as SstAppSyncApi } from '@serverless-stack/resources';
import { ParserOptions } from '../parser/types';

export type DataSource = BaseDataSource | string;

export interface SstLoaderOptions extends ParserOptions {
    api: SstAppSyncApi;
    defaultFunctionDataSource?: string;
    defaultUnitResolverDataSource?: string;
    dataSources?: never;
}

export interface CdkLoaderOptions extends ParserOptions {
    api: GraphqlApi;
    defaultFunctionDataSource?: BaseDataSource | 'none';
    defaultUnitResolverDataSource?: BaseDataSource | 'none';
    dataSources?: Record<string, BaseDataSource>;
}

export type LoaderOptions = SstLoaderOptions | CdkLoaderOptions;
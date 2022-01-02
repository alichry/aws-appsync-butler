import Loader from "./Loader";
import type { CdkLoaderOptions } from "./types";

/**
 * Load resolvers into an AppSync GraphQL API construct.
 * 
 * ```ts
 * import { CdkLoader } from 'aws-appsync-butler';
 * import { GraphqlApi } from '@aws-cdk/aws-appsync';
 * import { Table } from '@aws-cdk/aws-dynamodb';
 * 
 * const graphqlApi = new GraphqlApi(...);
 * const table = new Table(...);
 * 
 * const loader = new CdkLoader(appStack, {
 *   api: graphqlApi,
 *   defaultUnitResolverDataSource: table,
 *   defaultFunctionDataSource: 'none',
 *   variables: {
 *     tableName: table.tableName
 *   }
 * });
 * loader.load();
 * ```
 */
export default class CdkLoader extends Loader<CdkLoaderOptions> { }
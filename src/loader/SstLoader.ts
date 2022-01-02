import Loader from "./Loader";
import type { SstLoaderOptions } from "./types";
import { ResolverType } from '../reader/types';
import { ParsedResolverInfo } from "../parser/types";

/**
 * Load resolvers into an SST AppSyncAPI construct.
 * 
 * ```ts
 * import { SstLoader } from 'aws-appsync-butler';
 * import { Table, AppSyncApi } from '@serverless-stack/resources';
 * 
 * const table = new Table(...);
 * 
 * const api = new AppSyncApi(myStack, "api", {
 *   dataSources: { myTable: { table } }
 * });
 * 
 * const loader = new SstLoader(myStack, {
 *   api,
 *   defaultUnitResolverDataSource: 'myTable',
 *   defaultFunctionDataSource: 'none',
 *   variables: {
 *     tableName: table.dynamodbTable.tableName
 *   }
 * })
 * ```
 */
export default class SstLoader extends Loader<SstLoaderOptions> {

    /**
     * @link http://github.com/serverless-stack/serverless-stack/issues/1115
     * @param resolver 
     */
    protected addResolver(resolver: ParsedResolverInfo): void {
        let dataSource: string | undefined = "";
        if (resolver.resolverType === ResolverType.Unit) {
            dataSource = this.getUnitResolverDataSource(resolver);
            if (dataSource === 'none') {
                super.addResolver(resolver);
                return;
            }
        }
        const resolverProps = this.getResolverProps(resolver);
        this.api.addResolvers(this.scope, {
            [`${resolver.typeName} ${resolver.fieldName}`]: {
                dataSource,
                resolverProps
            }
        });
    }
}
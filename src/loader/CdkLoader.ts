import AbstractLoader from "./AbstractLoader";
import { Resolver } from '@aws-cdk/aws-appsync';
import type { CdkLoaderOptions } from "./types";
import { ResolverType } from "../reader/types";

export default class CdkLoader extends AbstractLoader<CdkLoaderOptions> {

    protected loadResolvers() {
        Object.values(this.builder.resolvers).forEach(fields => {
            Object.values(fields).forEach(resolver => {
                const resolverProps = {
                    typeName: resolver.typeName,
                    fieldName: resolver.fieldName,
                    ...this.getResolverProps(resolver)
                }
                if (resolver.resolverType === ResolverType.Unit) {
                    const dataSourrce = resolver.dataSource ?
                        this.getDataSource(resolver.dataSource) :
                        this.defaultUnitResolverDs;
                    dataSourrce.createResolver(resolverProps)
                    return;
                }
                new Resolver(
                    this.scope,
                    `appsync:pipeline:${resolver.typeName}:${resolver.fieldName}`, 
                    {
                        api: this.api,
                        ...resolverProps
                    }
                );
            })
        });
    }
}
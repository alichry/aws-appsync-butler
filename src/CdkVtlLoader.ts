import AbstractVtlLoader from "./AbstractVtlLoader";
import { Resolver } from '@aws-cdk/aws-appsync';
import type { CdkVtlLoaderOptions } from "./types";
import { ResolverType } from "./types";

export default class CdkVtlLoader extends AbstractVtlLoader<CdkVtlLoaderOptions> {

    protected loadResolvers() {
        Object.values(this.builder.resolvers).forEach(fields => {
            Object.values(fields).forEach(resolver => {
                const resolverProps = {
                    typeName: resolver.typeName,
                    fieldName: resolver.fieldName,
                    ...this.getResolverProps(resolver)
                }
                if (resolver.resolverType === ResolverType.Unit) {
                    this.defaultUnitResolverDs.createResolver(resolverProps)
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
import AbstractVtlLoader from "./AbstractVtlLoader";
import { SstVtlLoaderOptions, ResolverType } from "./types";

export default class SstVtlLoader extends AbstractVtlLoader<SstVtlLoaderOptions> {

    protected loadResolvers() {
        Object.values(this.builder.resolvers).forEach(fields => {
            Object.values(fields).forEach(resolver => {
                const resolverProps = this.getResolverProps(resolver);
                this.api.addResolvers(this.scope, {
                    [`${resolver.typeName} ${resolver.fieldName}`]: {
                        dataSource: resolver.resolverType === ResolverType.Unit ? 
                            this.defaultUnitResolverDs : "",
                        resolverProps
                    }
                });
            })
        });
    }
}
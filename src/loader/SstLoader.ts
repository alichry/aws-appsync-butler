import AbstractLoader from "./AbstractLoader";
import type { SstLoaderOptions } from "./types";
import { ResolverType } from '../reader/types';

export default class SstLoader extends AbstractLoader<SstLoaderOptions> {

    protected loadResolvers() {
        Object.values(this.builder.resolvers).forEach(fields => {
            Object.values(fields).forEach(resolver => {
                const resolverProps = this.getResolverProps(resolver);
                this.api.addResolvers(this.scope, {
                    [`${resolver.typeName} ${resolver.fieldName}`]: {
                        dataSource: resolver.resolverType === ResolverType.Unit ? 
                            (resolver.dataSource ? resolver.dataSource : this.defaultUnitResolverDs) : 
                            "",
                        resolverProps
                    }
                });
            })
        });
    }
}
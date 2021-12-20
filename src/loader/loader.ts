import { CdkLoader, SstLoader } from "..";
import type { BaseLoaderOptions,
    CdkLoaderOptions,
    SstLoaderOptions
} from "./types";
import { GraphqlApi } from '@aws-cdk/aws-appsync';
import AbstractLoader from "./AbstractLoader";

const loadVtlResolvers = (
    scope: AbstractLoader<BaseLoaderOptions>["scope"],
    options: CdkLoaderOptions | SstLoaderOptions
): CdkLoader | SstLoader => {
    let loader: CdkLoader | SstLoader;
    if (options.api instanceof GraphqlApi) {
        loader = new CdkLoader(scope, options as CdkLoaderOptions);
    } else {
        loader = new SstLoader(scope, options as SstLoaderOptions);
    }
    loader.load();
    return loader;
}

export default loadVtlResolvers;
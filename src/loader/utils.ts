import CdkLoader from "./CdkLoader";
import SstLoader from "./SstLoader";
import type { CdkLoaderOptions, SstLoaderOptions } from "./types";
import { GraphqlApi } from '@aws-cdk/aws-appsync';
import type { Construct } from "@aws-cdk/core";

/**
 * Instantialize a CDK Loader instance
 * @param scope CDK Stack
 * @param options CDK Loader options
 */
function createLoader(
    scope: Construct,
    options: CdkLoaderOptions
): CdkLoader;
/**
 * Instantialize an SST Loader instance
 * @param scope SST Stack
 * @param options SST Loader options
 */
function createLoader(
    scope: Construct,
    options: SstLoaderOptions
): SstLoader;
/**
 * Instantialize a CDK or SST Loader instance
 * @param scope Stack
 * @param options CDK or SST Loader options
 */
function createLoader(
    scope: Construct,
    options: CdkLoaderOptions | SstLoaderOptions
): CdkLoader | SstLoader;
function createLoader(
    scope: Construct,
    options: CdkLoaderOptions | SstLoaderOptions
): CdkLoader | SstLoader {
    let loader: CdkLoader | SstLoader;
    if (options.api instanceof GraphqlApi) {
        loader = new CdkLoader(scope, options as CdkLoaderOptions);
    } else {
        loader = new SstLoader(scope, options as SstLoaderOptions);
    }
    return loader;
}

export { createLoader };
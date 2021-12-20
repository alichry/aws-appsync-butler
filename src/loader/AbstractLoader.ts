import Builder from "../builder/Builder";
import { 
    GraphqlApi,
    BaseDataSource,
    MappingTemplate,
    AppsyncFunction
} from '@aws-cdk/aws-appsync';
import { 
    AppSyncApi as SstAppSyncApi,
    AppSyncApiCdkResolverProps
} from '@serverless-stack/resources';
import type { Construct } from "@aws-cdk/core";
import type { BaseLoaderOptions } from "./types";
import { ResolverType } from "../reader/types";
import { ParsedResolverInfo } from '../parser/types';
import { DataSourceNotFoundError, DataSourceTypeMismatchError, FunctionNotFoundError } from "./errors";

export default abstract class AbstractLoader<Options extends BaseLoaderOptions> {
    private loaded = false;
    protected readonly api: Options["api"];
    protected readonly defaultFunctionDs: Options["defaultFunctionDataSource"];
    protected readonly defaultUnitResolverDs: Options["defaultUnitResolverDataSource"];
    protected readonly scope: Construct;
    protected readonly dataSources?: Options["dataSources"];
    public readonly builder: Builder;
    public readonly functions: Record<string, AppsyncFunction> = {};

    constructor(scope: Construct, options: Options) {
        this.api = options.api;
        this.defaultFunctionDs = options.defaultFunctionDataSource;
        this.defaultUnitResolverDs = options.defaultUnitResolverDataSource;
        this.dataSources = options.dataSources;
        this.builder = new Builder(options);
        this.builder.build();
        this.scope = scope;
    }

    public load() {
        if (this.loaded) {
            return;
        }
        this.loadFunctions();
        this.loadResolvers();
        this.loaded = true;
    }

    protected abstract loadResolvers(): void;

    protected loadFunctions() {
        Object.values(this.builder.functions).forEach(
            ({ name, description, requestMappingTemplate, responseMappingTemplate, dataSource }) => {
                const appSyncFunc = new AppsyncFunction(
                    this.scope,
                    `appsync:func:${name}`,
                    {
                        api: this.getGraphqlApi(),
                        dataSource: dataSource ? this.getDataSource(dataSource) : this.getDefaultFunctionDataSource(),
                        name,
                        description: description?.data,
                        requestMappingTemplate: MappingTemplate.fromString(requestMappingTemplate.data),
                        responseMappingTemplate: MappingTemplate.fromString(responseMappingTemplate.data)
                    }
                );
                this.functions[name] = appSyncFunc;
            }
        );
    }

    private getGraphqlApi(): GraphqlApi {
        if (this.api instanceof SstAppSyncApi) {
            return this.api.graphqlApi;
        }
        return this.api;
    }

    protected getResolverProps(
        resolver: ParsedResolverInfo
    ): AppSyncApiCdkResolverProps {
        if (resolver.resolverType === ResolverType.Unit) {
            return {
                requestMappingTemplate: MappingTemplate.fromString(resolver.requestMappingTemplate.data),
                responseMappingTemplate: MappingTemplate.fromString(resolver.responseMappingTemplate.data)
            };
        }
        const before = this.getMappingTemplate(resolver.beforeMappingTemplate?.data);
        const appsyncFunctions = resolver.functionSequence.map(
            name => this.getAppSyncFunction(name)
        );
        const after = this.getMappingTemplate(resolver.afterMappingTemplate?.data);
        return {
            pipelineConfig: appsyncFunctions,
            requestMappingTemplate: before,
            responseMappingTemplate: after
        };
    }

    private getDefaultFunctionDataSource(): BaseDataSource {
        if (this.defaultFunctionDs instanceof BaseDataSource) {
            return this.defaultFunctionDs;
        }
        if (!(this.api instanceof SstAppSyncApi)) {
            throw new DataSourceTypeMismatchError(
                `Passed default function data source is a string ('${this.defaultFunctionDs}'). Please pass an instance of 'BaseDataSource' when using CDK`,
                this.defaultFunctionDs
            );
        }
        const ds = this.api.getDataSource(this.defaultFunctionDs);
        if (! ds) {
            throw new DataSourceNotFoundError(
                `Passed default function data source was not found ('${this.defaultFunctionDs}). Please make sure the data source exists before loading.`,
                this.defaultFunctionDs
            );
        }
        return ds;
    }

    protected getAppSyncFunction(name: string): AppsyncFunction {
        const res = this.functions[name];
        if (! res) {
            throw new FunctionNotFoundError(`Unable to find AppSync function '${name}'`, name);
        }
        return res;
    }

    protected getMappingTemplate(data: string | undefined): MappingTemplate | undefined {
        if (! data) {
            return;
        }
        return MappingTemplate.fromString(data);
    }

    protected getDataSource(key: string): BaseDataSource {
        if (this.api instanceof SstAppSyncApi) {
            const res = this.api.getDataSource(key);
            if (! res) {
                throw new DataSourceNotFoundError(
                    `Data source '${key}' was not found! Make sure data sources are added to the passed SST AppSync API.`,
                    key
                );
            }
            return res;
        }
        const res = this.dataSources && this.dataSources[key];
        if (! res) {
            throw new DataSourceNotFoundError(
                `Data source '${key}' was not found! Make sure to pass a key-value object of dataSources during instantialization.`,
                key
            );
        }
        return res;
    }
}
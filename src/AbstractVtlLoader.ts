import VtlBuilder from "./VtlBuilder";
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
import type { BaseVtlLoaderOptions, ResolverInfo } from "./types";
import { ResolverType } from "./types";

export default abstract class AbstractVtlLoader<Options extends BaseVtlLoaderOptions> {
    protected readonly api: Options["api"];
    protected readonly defaultFunctionDs: Options["defaultFunctionDataSource"];
    protected readonly defaultUnitResolverDs: Options["defaultUnitResolverDataSource"];
    protected readonly scope: Construct;
    public readonly builder: VtlBuilder;
    public readonly functions: Record<string, AppsyncFunction> = {};

    constructor(scope: Construct, options: Options) {
        this.api = options.api;
        this.defaultFunctionDs = options.defaultFunctionDataSource;
        this.defaultUnitResolverDs = options.defaultUnitResolverDataSource;
        this.builder = new VtlBuilder(options);
        this.builder.build();
        this.scope = scope;
    }

    public load() {
        this.loadFunctions();
        this.loadResolvers();
    }

    protected abstract loadResolvers(): void;

    protected loadFunctions() {
        Object.values(this.builder.functions).forEach(
            ({ name, description, requestMappingTemplate, responseMappingTemplate }) => {
                const appSyncFunc = new AppsyncFunction(
                    this.scope,
                    `appsync:func:${name}`,
                    {
                        api: this.getGraphqlApi(),
                        dataSource: this.getDefaultFunctionDataSource(),
                        name,
                        description: description,
                        requestMappingTemplate: MappingTemplate.fromString(requestMappingTemplate),
                        responseMappingTemplate: MappingTemplate.fromString(responseMappingTemplate)
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

    private getDefaultFunctionDataSource(): BaseDataSource {
        if (this.defaultFunctionDs instanceof BaseDataSource) {
            return this.defaultFunctionDs;
        }
        if (!(this.api instanceof SstAppSyncApi)) {
            throw new Error(
                `Passed default function data source is a string ('${this.defaultFunctionDs}'). Please pass an instance of 'BaseDataSource' when using CDK`
            );
        }
        const ds = this.api.getDataSource(this.defaultFunctionDs);
        if (! ds) {
            throw new Error(`Passed default function data source was not found ('${this.defaultFunctionDs}). Please make sure the data source exists before loading.`);
        }
        return ds;
    }

    protected getResolverProps(
        resolver: ResolverInfo
    ): AppSyncApiCdkResolverProps {
        if (resolver.resolverType === ResolverType.Unit) {
            return {
                requestMappingTemplate: MappingTemplate.fromString(resolver.requestMappingTemplate),
                responseMappingTemplate: MappingTemplate.fromString(resolver.responseMappingTemplate)
            };
        }
        const before = this.getMappingTemplate(resolver.beforeMappingTemplate);
        const appsyncFunctions = resolver.functionSequence.map(
            name => this.getAppSyncFunction(name)
        );
        const after = this.getMappingTemplate(resolver.afterMappingTemplate);
        return {
            pipelineConfig: appsyncFunctions,
            requestMappingTemplate: before,
            responseMappingTemplate: after
        };
    }

    protected getAppSyncFunction(name: string): AppsyncFunction {
        const res = this.functions[name];
        if (! res) {
            throw new Error(`Unable to find AppSync function '${name}'`);
        }
        return res;
    }

    protected getMappingTemplate(data: string | undefined): MappingTemplate | undefined {
        if (! data) {
            return;
        }
        return MappingTemplate.fromString(data);
    }
}
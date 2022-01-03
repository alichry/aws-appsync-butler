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
import type { LoaderOptions, DataSource, SstLoaderOptions } from "./types";
import { ResolverType } from "../reader/types";
import { ParsedFunctionInfo, ParsedResolverInfo, ParsedUnitResolverInfo } from '../parser/types';
import { DataSourceNotFoundError, FunctionNotFoundError } from "./errors";

export default abstract class Loader<Options extends LoaderOptions> {
    
    /**
     * The underlying builder instance that is responsible for building the resolver
     * tree and function dictionary.
     */
    public readonly builder: Builder;

    /**
     * The created Appsync Functions. Only populated after loading.
     */
    public readonly functions: Record<string, AppsyncFunction> = {};

    /**
     * The passed scope. Used when creating Appsync Functions
     */
    protected readonly scope: Construct;

    /**
     * The passed API instance.
     */
    protected readonly api: Options["api"];

    /**
     * The passed default function data source.
     */
    protected readonly defaultFunctionDs: Options["defaultFunctionDataSource"];

    /**
     * The passed default unit resolver data source.
     */
    protected readonly defaultUnitResolverDs: Options['defaultUnitResolverDataSource'];

    /**
     * Data source dictionary
     */
    protected readonly dataSources: Options["dataSources"];

    /**
     * None data source object. Created and reused when necessary.
     */
    protected noneDs?: BaseDataSource;

    private loaded = false;

    /**
     * 
     * @param scope A CDK construct. Usually, it is the stack instance.
     * @param options Loading, parsing, or reading directives.
     */
    constructor(scope: Construct, options: Options) {
        this.api = options.api;
        this.defaultFunctionDs = options.defaultFunctionDataSource;
        this.defaultUnitResolverDs = options.defaultUnitResolverDataSource;
        this.dataSources = options.dataSources;
        this.builder = new Builder(options);
        this.scope = scope;
    }

    /**
     * Load on-disk resolvers and functions into AppSync.
     */
    public load(): void {
        if (this.loaded) {
            return;
        }
        this.builder.build();
        this.loadFunctions();
        this.loadResolvers();
        this.loaded = true;
    }

    protected loadResolvers(): void {
        Object.values(this.builder.resolvers).forEach(fields => {
            Object.values(fields).forEach(resolver => this.addResolver(resolver))
        });
    }

    protected loadFunctions() {
        Object.values(this.builder.functions)
            .forEach((func) => this.addFunction(func));
    }

    protected addResolver(resolver: ParsedResolverInfo): void {
        let dataSource: BaseDataSource | undefined;
        if (resolver.resolverType === ResolverType.Unit) {
            dataSource = this.resolveBaseDataSource(this.getUnitResolverDataSource(resolver));
        }
        this.getGraphqlApi().createResolver({
            typeName: resolver.typeName,
            fieldName: resolver.fieldName,
            dataSource,
            ...this.getResolverProps(resolver)
        });
    }

    protected addFunction(func: ParsedFunctionInfo): void {
        this.functions[func.name] = new AppsyncFunction(
            this.scope,
            `appsync-func-${func.name}`,
            {
                api: this.getGraphqlApi(),
                dataSource: this.resolveBaseDataSource(this.getFunctionDataSource(func)),
                name: func.name,
                description: func.description?.data,
                requestMappingTemplate: MappingTemplate.fromString(func.requestMappingTemplate.data),
                responseMappingTemplate: MappingTemplate.fromString(func.responseMappingTemplate.data)
            }
        );
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

    protected getUnitResolverDataSource(this: Loader<SstLoaderOptions>, resolver: ParsedUnitResolverInfo): string;
    protected getUnitResolverDataSource(resolver: ParsedUnitResolverInfo): DataSource;
    protected getUnitResolverDataSource(resolver: ParsedUnitResolverInfo): DataSource {
        if (resolver.dataSource) {
            return resolver.dataSource;
        }
        if (! this.defaultUnitResolverDs) {
            throw new DataSourceNotFoundError(
                'No default unit resolver data source was provided. This occurs when ' +
                'a unit resolver does not have an explicitly associated data source. ' +
                'Check your resolvers for any missing data source association, or ' +
                'provide a default unit resolver data source. ' +
                `Check the request mapping template of the ${resolver.typeName}.${resolver.fieldName} resolver ` +
                `(path: ${resolver.requestMappingTemplate.path})`,
                '@unit-resolver-default-ds'
            );
        }
        return this.defaultUnitResolverDs;
    }

    protected getFunctionDataSource(this: Loader<SstLoaderOptions>, func: ParsedFunctionInfo): string;
    protected getFunctionDataSource(func: ParsedFunctionInfo): DataSource;
    protected getFunctionDataSource(func: ParsedFunctionInfo): DataSource {
        if (func.dataSource) {
            return func.dataSource;
        }
        if (! this.defaultFunctionDs) {
            throw new DataSourceNotFoundError(
                'No default function data source was provided. This occurs when ' +
                'a function does not have an explicitly associated data source. ' +
                'Check your functions for any missing data source association, or ' +
                'provide a default function data source.' + 
                `Check the request mapping template of the ${func.name} function ` +
                `(path: ${func.requestMappingTemplate.path})`,
                '@function-default-ds'
            );
        }
        return this.defaultFunctionDs;
    }

    protected getAppSyncFunction(name: string): AppsyncFunction {
        const res = this.functions[name];
        if (! res) {
            throw new FunctionNotFoundError(`Unable to find AppSync function '${name}'`, name);
        }
        return res;
    }

    protected getMappingTemplate(data: string): MappingTemplate;
    protected getMappingTemplate(data: undefined): undefined;
    protected getMappingTemplate(data: string | undefined): MappingTemplate | undefined;
    protected getMappingTemplate(data: string | undefined): MappingTemplate | undefined {
        if (! data) {
            return;
        }
        return MappingTemplate.fromString(data);
    }

    protected resolveBaseDataSource(ds: DataSource): BaseDataSource {
        if (ds instanceof BaseDataSource) {
            return ds;
        }
        if (ds === 'none') {
            return this.getNoneDs();
        }
        if (this.api instanceof SstAppSyncApi) {
            const res = this.api.getDataSource(ds);
            if (! res) {
                throw new DataSourceNotFoundError(
                    `Data source '${ds}' was not found! Make sure data sources are added to the passed SST AppSync API.`,
                    ds
                );
            }
            return res;
        }
        const res = this.dataSources && this.dataSources[ds];
        if (! res) {
            throw new DataSourceNotFoundError(
                `Data source '${ds}' was not found! Make sure to pass a key-value object of dataSources during instantialization.`,
                ds
            );
        }
        return res;
    }

    protected getNoneDs(): BaseDataSource {
        if (this.noneDs) {
            return this.noneDs;
        }
        this.noneDs = this.getGraphqlApi().addNoneDataSource('none');
        return this.noneDs;
    }

    private getGraphqlApi(): GraphqlApi {
        if (this.api instanceof SstAppSyncApi) {
            return this.api.graphqlApi;
        }
        return this.api;
    }
}
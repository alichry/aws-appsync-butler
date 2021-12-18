import { expect } from 'chai';
import { Template, Match } from '@aws-cdk/assertions';
import { CfnDataSource, GraphqlApi } from '@aws-cdk/aws-appsync';
import { PipelineResolverInfo, UnitResolverInfo, VtlReaderOptions } from '../src/types';
import { loadCdk, loadSst } from './utilts';
import { AppSyncApi as SstAppSyncApi } from '@serverless-stack/resources';
import { ValidationError } from '../src/errors';

const message = "Ciao";
const options: VtlReaderOptions[] = [
    {
        structure: { root: "test/cases/valid/default" },
        variables: { message }
    },
    {
        structure: {
            root: "test/cases/valid/custom",
            resolvers: "vtl-resolvers",
            functions: "vtl-functions",
            unitStructure: {
                request: "request-mt.vtl",
                response: "response-mt.vtl"
            },
            pipelineStructure: {
                pipeline: "pipeline-def.seq",
                before: "before-mt.vtl",
                after: "after-mt.vtl"
            },
            functionStructure: {
                request: "request-mt.vtl",
                response: "response-mt.vtl",
                description: "description"
            }
        },
        variables: { message }
    }
];
const invalidRootOptions: VtlReaderOptions[] = [
    {
        structure: { root: "test/cases/invalid/default" },
        variables: { message }
    },
    {
        structure: {
            root: "test/cases/invalid/custom",
            resolvers: "vtl-resolvers",
            functions: "vtl-functions",
            unitStructure: {
                request: "request-mt.vtl",
                response: "response-mt.vtl"
            },
            pipelineStructure: {
                pipeline: "pipeline-def.seq",
                before: "before-mt.vtl",
                after: "after-mt.vtl"
            },
            functionStructure: {
                request: "request-mt.vtl",
                response: "response-mt.vtl",
                description: "description"
            }
        },
        variables: { message }
    }
];

const pipelineBefore = `Pipeline resolver before mapping template\n${message}`;
const pipelineAfter = `Pipeline resolver after mapping template\n${message}`;
const unitRequest = `Unit resolver request mapping template\n${message}`;
const unitResponse = `Unit resolver response mapping template\n${message}`;
const helloWorldDescription = 'HelloWorld implementation';
const helloWorldRequest = '#return("Hello World")';
const helloWorldResponse = '{}';
const goodbyeWorldDescription = 'GoodbyeWorld implementation';
const goodbyeWorldRequest = '#return("Goodbye World")';
const goodbyeWorldResponse = '{}';

describe('Test VTL loading into SST and CDK using default and custom structures', function () {
    (["CDK", "SST"] as const).forEach(ias => {
        invalidRootOptions.forEach((opts, i) => {
            it(`Should throw an error when loading into ${ias} using an invalid structure (${i}0`, function () {
                expect(() => ias === "SST" ? loadSst(opts) : loadCdk(opts))
                    .to.throw(ValidationError);
            });
        });
        
        options.forEach((opts, i) => {
            it(`Should build resolvers when using ${ias} (${i})`, function () {
                const { loader } = ias === "SST" ? loadSst(opts) : loadCdk(opts);
                const pipelineResolver = loader.builder.resolvers.Variable?.pipeline as PipelineResolverInfo;
                const unitResolver = loader.builder.resolvers.Variable?.unit as UnitResolverInfo;

                expect(pipelineResolver).to.exist;
                expect(unitResolver).to.exist;
                expect(pipelineResolver.beforeMappingTemplate).to.equal(pipelineBefore);
                expect(pipelineResolver.afterMappingTemplate).to.equal(pipelineAfter);
                expect(unitResolver.requestMappingTemplate).to.equal(unitRequest);
                expect(unitResolver.responseMappingTemplate).to.equal(unitResponse);
            });

            it(`Should load resolvers into ${ias} (${i})`, function () {
                const { dummyStack, api, loader } = ias === "SST" ? loadSst(opts) : loadCdk(opts);
                let graphqlApi: GraphqlApi;
                if (api instanceof SstAppSyncApi) {
                    graphqlApi = api.graphqlApi;
                    expect(api.getResolver("Variable pipeline")).to.exist;
                    expect(api.getResolver("Variable unit")).to.exist;
                } else {
                    graphqlApi = api;
                }
                const template = Template.fromStack(dummyStack);
                template.resourceCountIs('AWS::AppSync::Resolver', 2);
                template.hasResourceProperties('AWS::AppSync::Resolver', {
                    ApiId: dummyStack.resolve(graphqlApi.apiId),
                    TypeName: 'Variable',
                    FieldName: 'pipeline',
                    Kind: 'PIPELINE',
                    DataSourceName: Match.absent(),
                    RequestMappingTemplate: pipelineBefore,
                    ResponseMappingTemplate: pipelineAfter,
                    PipelineConfig: {
                        Functions: [
                            dummyStack.resolve(loader.functions.HelloWorld!.functionId),
                            dummyStack.resolve(loader.functions.GoodbyeWorld!.functionId),
                        ]
                    }
                });
                template.hasResourceProperties('AWS::AppSync::Resolver', {
                    ApiId: dummyStack.resolve(graphqlApi.apiId),
                    TypeName: 'Variable',
                    FieldName: 'unit',
                    Kind: 'UNIT',
                    DataSourceName: "myTable",
                    RequestMappingTemplate: unitRequest,
                    ResponseMappingTemplate: unitResponse
                });
            });

            it(`Should load functions into ${ias} (${i})`, function () {
                const { dummyStack, api, loader, dynamoDbTable } = ias === "SST" ? loadSst(opts) : loadCdk(opts);
                const graphqlApi = api instanceof SstAppSyncApi ? api.graphqlApi : api;
                const template = Template.fromStack(dummyStack);
                const hwFn = loader.functions.HelloWorld!;
                const bwFn = loader.functions.GoodbyeWorld!;
                const hw = loader.builder.functions.HelloWorld!;
                const bw = loader.builder.functions.GoodbyeWorld!;
                expect(hwFn).to.exist;
                expect(bwFn).to.exist;
                expect(hw).to.exist;
                expect(bw).to.exist;
                expect(hw.name).to.equal('HelloWorld');
                expect(bw.name).to.equal('GoodbyeWorld');
                expect(
                    dummyStack.resolve((hwFn.dataSource.ds.dynamoDbConfig as CfnDataSource.DynamoDBConfigProperty).tableName)
                ).to.eql(dummyStack.resolve(dynamoDbTable.tableName));
                expect(
                    (hwFn.dataSource.ds.dynamoDbConfig as CfnDataSource.DynamoDBConfigProperty).awsRegion
                ).to.equal(dummyStack.region);
                template.resourceCountIs('AWS::AppSync::FunctionConfiguration', 2);
                template.hasResourceProperties('AWS::AppSync::FunctionConfiguration', {
                    ApiId: dummyStack.resolve(graphqlApi.apiId),
                    Name: 'HelloWorld',
                    Description: helloWorldDescription,
                    DataSourceName: "myTable",
                    RequestMappingTemplate: helloWorldRequest,
                    ResponseMappingTemplate: helloWorldResponse
                });
                template.hasResourceProperties('AWS::AppSync::FunctionConfiguration', {
                    ApiId: dummyStack.resolve(graphqlApi.apiId),
                    Name: 'GoodbyeWorld',
                    Description: goodbyeWorldDescription,
                    DataSourceName: "myTable",
                    RequestMappingTemplate: goodbyeWorldRequest,
                    ResponseMappingTemplate: goodbyeWorldResponse
                });
            });
        });
    });
});
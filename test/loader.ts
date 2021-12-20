import { expect } from 'chai';
import { Template, Match } from '@aws-cdk/assertions';
import { CfnDataSource, GraphqlApi } from '@aws-cdk/aws-appsync';
import { ParsedPipelineResolverInfo, ParsedUnitResolverInfo, ParserOptions } from '../src/parser/types';
import { loadCdk, loadSst } from './utilts';
import { AppSyncApi as SstAppSyncApi } from '@serverless-stack/resources';
import ValidationError from '../src/ValidationError';
import { invalidCustomStructure, invalidDefaultRoot, validCustomStructure, validDefaultRoot } from './constants';
import _ from 'lodash';

const message = "Ciao";
const validCases = [
    {
        type: "default",
        options: {
            structure: { root: validDefaultRoot },
            variables: { message }
        }
    },
    {
        type: "custom",
        options: {
            structure:  _.cloneDeep(validCustomStructure),
            variables: { message }
        }
    }
] as const;
const invalidCases = [
    {
        type: "default",
        options: {
            structure: { root: invalidDefaultRoot },
            variables: { message }
        }
    },
    {
        type: "custom",
        options: {
            structure:  _.cloneDeep(invalidCustomStructure),
            variables: { message }
        }
    }
] as const;

const pipelineBefore = `Pipeline resolver before mapping template\n${message}`;
const pipelineAfter = `Pipeline resolver after mapping template\n${message}`;
const unitRequest = `## Hello\n## AppSync Butler: bound data source is test\nUnit resolver request mapping template\n${message}`;
const unitResponse = `Unit resolver response mapping template\n${message}`;
const unitDefaultRequest = `## Hello\nUnit resolver request mapping template\n${message}`;
const unitDefaultResponse = `Unit resolver response mapping template\n${message}`;
const helloWorldDescription = 'HelloWorld implementation';
const helloWorldRequest = '#return("Hello World")';
const helloWorldResponse = '{}';
const goodbyeWorldDescription = 'GoodbyeWorld implementation';
const goodbyeWorldRequest = '#return("Goodbye World")';
const goodbyeWorldResponse = '{}';
const directivesDescription = 'Directive test';
const directivesRequest = `## Hey there\n## AppSync Butler: bound data source is test\n\nRequest is ${message}`;
const directivesResponse = `Response is ${message}`;

describe('Test VTL loading into SST and CDK using default and custom structures', function () {
    (["CDK", "SST"] as const).forEach(ias => {
        invalidCases.forEach(({ options, type }, i) => {
            it(`Should throw an error when loading into ${ias} using an invalid structure (${type})`, function () {
                expect(() => ias === "SST" ? loadSst(options) : loadCdk(options))
                    .to.throw(ValidationError);
            });
        });
        
        validCases.forEach(({ options, type }, i) => {
            it(`Should build resolvers when using ${ias} (${type})`, function () {
                const { loader } = ias === "SST" ? loadSst(options) : loadCdk(options);
                const pipelineResolver = loader.builder.resolvers.Variable?.pipeline as ParsedPipelineResolverInfo;
                const unitResolver = loader.builder.resolvers.Variable?.unit as ParsedUnitResolverInfo;

                expect(pipelineResolver).to.exist;
                expect(unitResolver).to.exist;
                expect(pipelineResolver.beforeMappingTemplate!.data).to.equal(pipelineBefore);
                expect(pipelineResolver.afterMappingTemplate!.data).to.equal(pipelineAfter);
                expect(unitResolver.requestMappingTemplate.data).to.equal(unitRequest);
                expect(unitResolver.responseMappingTemplate.data).to.equal(unitResponse);
            });

            it(`Should load resolvers into ${ias} (${type})`, function () {
                const { dummyStack, api, loader } = ias === "SST" ? loadSst(options) : loadCdk(options);
                let graphqlApi: GraphqlApi;
                if (api instanceof SstAppSyncApi) {
                    graphqlApi = api.graphqlApi;
                    expect(api.getResolver("Variable pipeline")).to.exist;
                    expect(api.getResolver("Variable unit")).to.exist;
                } else {
                    graphqlApi = api;
                }
                const template = Template.fromStack(dummyStack);
                template.resourceCountIs('AWS::AppSync::Resolver', 3);
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
                    DataSourceName: "test",
                    RequestMappingTemplate: unitRequest,
                    ResponseMappingTemplate: unitResponse
                });
                template.hasResourceProperties('AWS::AppSync::Resolver', {
                    ApiId: dummyStack.resolve(graphqlApi.apiId),
                    TypeName: 'Variable',
                    FieldName: 'unitDefault',
                    Kind: 'UNIT',
                    DataSourceName: "myTable",
                    RequestMappingTemplate: unitDefaultRequest,
                    ResponseMappingTemplate: unitDefaultResponse
                });
            });

            it(`Should load functions into ${ias} (${type})`, function () {
                const { dummyStack, api, loader, dynamoDbTable, secondaryDynamoDbTable } = ias === "SST" ? loadSst(options) : loadCdk(options);
                const graphqlApi = api instanceof SstAppSyncApi ? api.graphqlApi : api;
                const template = Template.fromStack(dummyStack);
                const hwFn = loader.functions.HelloWorld!;
                const hw = loader.builder.functions.HelloWorld!;
                expect(hwFn).to.exist;
                expect(hw).to.exist;
                expect(hw.name).to.equal('HelloWorld');
                const bw = loader.builder.functions.GoodbyeWorld!;
                const bwFn = loader.functions.GoodbyeWorld!;
                expect(bwFn).to.exist;
                expect(bw).to.exist;
                expect(bw.name).to.equal('GoodbyeWorld');

                const dircFn = loader.functions.Directives!;
                const dirc = loader.builder.functions.Directives!;
                expect(dircFn).to.exist;
                expect(dirc).to.exist;
                expect(dirc.name).to.equal('Directives');
                
                expect(
                    dummyStack.resolve((hwFn.dataSource.ds.dynamoDbConfig as CfnDataSource.DynamoDBConfigProperty).tableName)
                ).to.eql(dummyStack.resolve(dynamoDbTable.tableName));
                expect(
                    dummyStack.resolve((dircFn.dataSource.ds.dynamoDbConfig as CfnDataSource.DynamoDBConfigProperty).tableName)
                ).to.eql(dummyStack.resolve(secondaryDynamoDbTable.tableName));
                expect(
                    (hwFn.dataSource.ds.dynamoDbConfig as CfnDataSource.DynamoDBConfigProperty).awsRegion
                ).to.equal(dummyStack.region);
                template.resourceCountIs('AWS::AppSync::FunctionConfiguration', 3);
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
                template.hasResourceProperties('AWS::AppSync::FunctionConfiguration', {
                    ApiId: dummyStack.resolve(graphqlApi.apiId),
                    Name: 'Directives',
                    Description: directivesDescription,
                    DataSourceName: "test",
                    RequestMappingTemplate: directivesRequest,
                    ResponseMappingTemplate: directivesResponse
                });
            });
        });
    });
});
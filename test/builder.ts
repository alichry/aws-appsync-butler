import { FunctionInfo, PipelineResolverInfo, ResolverType, UnitResolverInfo } from '../src/types';
import VtlBuilder from '../src/VtlBuilder';
import { expect } from 'chai';

describe('Test VTL builder with default and custom structure', function () {
    const message = "Ciao";
    const builders = [
        new VtlBuilder({
            structure: { root: "test/cases/valid/default" },
            variables: { message }
        }),
        new VtlBuilder({
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
        })
    ];

    builders.forEach((builder, i) => {
        it(`Should build the tree correctly (${i})`, function () {
            builder.build();

            expect(builder.resolvers.Variable).to.exist;
            const pipelineResolver = builder.resolvers.Variable?.pipeline as PipelineResolverInfo;
            const unitResolver = builder.resolvers.Variable?.unit as UnitResolverInfo;
            expect(pipelineResolver).to.exist;
            expect(unitResolver).to.exist;
            expect(unitResolver.resolverType).to.equal(ResolverType.Unit);
            expect(pipelineResolver.resolverType).to.equal(ResolverType.Pipeline);
            expect(pipelineResolver.typeName).to.equal("Variable");
            expect(unitResolver.typeName).to.equal("Variable");
            expect(pipelineResolver.fieldName).to.equal("pipeline");
            expect(unitResolver.fieldName).to.equal("unit");
            expect(pipelineResolver.beforeMappingTemplate).to.match(
                new RegExp(`Pipeline resolver before mapping template\n${message}`)
            );
            expect(pipelineResolver.afterMappingTemplate).to.match(
                new RegExp(`Pipeline resolver after mapping template\n${message}`)
            );
            expect(pipelineResolver.pipelineDefinition).to.equal("HelloWorld\nGoodbyeWorld");
            expect(pipelineResolver.functionSequence).to.eql(["HelloWorld", "GoodbyeWorld"]);
            expect(unitResolver.requestMappingTemplate).to.match(
                new RegExp(`Unit resolver request mapping template\n${message}`)
            );
            expect(unitResolver.responseMappingTemplate).to.match(
                new RegExp(`Unit resolver response mapping template\n${message}`)
            );
            const HelloWorld = builder.functions.HelloWorld as FunctionInfo;
            const GoodbyeWorld = builder.functions.GoodbyeWorld as FunctionInfo;
            expect(HelloWorld).to.exist;
            expect(GoodbyeWorld).to.exist;
            expect(HelloWorld.name).to.equal("HelloWorld");
            expect(GoodbyeWorld.name).to.equal("GoodbyeWorld");
            expect(HelloWorld.description).to.equal("HelloWorld implementation");
            expect(GoodbyeWorld.description).to.equal("GoodbyeWorld implementation");
            expect(HelloWorld.requestMappingTemplate).to.equal('#return("Hello World")');
            expect(GoodbyeWorld.requestMappingTemplate).to.equal('#return("Goodbye World")');
            expect(HelloWorld.responseMappingTemplate).to.equal('{}');
            expect(GoodbyeWorld.responseMappingTemplate).to.equal('{}');
        });
    });
});
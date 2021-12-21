import { expect } from 'chai';
import _ from 'lodash';
import { ResolverType } from '../src/reader/types';
import { ParsedPipelineResolverInfo, ParsedUnitResolverInfo, ParsedFunctionInfo } from '../src/parser/types';
import Builder from '../src/builder/Builder';
import { validDefaultStructure, validCustomStructure, validDefaultRoot } from './constants';

describe('Test VTL builder with default and custom structure', function () {
    const message = "Ciao";
    const builders = [
        {
            builder: new Builder({ structure: { root: validDefaultRoot }, variables: { message } }),
            type: "default",
            structure: validDefaultStructure
        },
        {
            builder: new Builder({ structure: _.cloneDeep(validCustomStructure), variables: { message } }),
            type: "custom",
            structure: validCustomStructure
        }
    ] as const;

    builders.forEach(({ builder, type, structure }) => {
        it(`Should build the tree correctly (${type})`, function () {
            builder.build();

            expect(builder.resolvers.Variable).to.exist;
            const pipelineResolver = builder.resolvers.Variable?.pipeline as ParsedPipelineResolverInfo;
            
            expect(pipelineResolver).to.exist;
            expect(pipelineResolver.resolverType).to.equal(ResolverType.Pipeline);
            expect(pipelineResolver.typeName).to.equal("Variable");
            expect(pipelineResolver.fieldName).to.equal("pipeline");
            expect(pipelineResolver.beforeMappingTemplate).to.eql({
                path: `${structure.root}/${structure.resolvers}/Variable/pipeline/${structure.pipelineStructure.before}`,
                data: `Pipeline resolver before mapping template\n${message}`
            });
            expect(pipelineResolver.afterMappingTemplate).to.eql({
                path: `${structure.root}/${structure.resolvers}/Variable/pipeline/${structure.pipelineStructure.after}`,
                data: `Pipeline resolver after mapping template\n${message}`
            });
            expect(pipelineResolver.pipelineDefinition).to.eql({
                path: `${structure.root}/${structure.resolvers}/Variable/pipeline/${structure.pipelineStructure.pipeline}`,
                data: "HelloWorld\nGoodbyeWorld"
            });
            expect(pipelineResolver.functionSequence).to.eql(["HelloWorld", "GoodbyeWorld"]);

            const unitResolver = builder.resolvers.Variable?.unit as ParsedUnitResolverInfo;
            expect(unitResolver).to.exist;
            expect(unitResolver.resolverType).to.equal(ResolverType.Unit);
            expect(unitResolver.typeName).to.equal("Variable");
            expect(unitResolver.fieldName).to.equal("unit");
            expect(unitResolver.requestMappingTemplate).to.eql({
                path: `${structure.root}/${structure.resolvers}/Variable/unit/${structure.unitStructure.request}`,
                data: `## Hello\n## AppSync Butler: bound data source is test\nUnit resolver request mapping template\n${message}`
            });
            expect(unitResolver.responseMappingTemplate).to.eql({
                path: `${structure.root}/${structure.resolvers}/Variable/unit/${structure.unitStructure.response}`,
                data: `Unit resolver response mapping template\n${message}`
            });

            const helloWorld = builder.functions.HelloWorld as ParsedFunctionInfo;
            expect(helloWorld).to.exist;
            
            expect(helloWorld.name).to.equal("HelloWorld");
            expect(helloWorld.description).to.eql({
                path: `${structure.root}/${structure.functions}/HelloWorld/${structure.functionStructure.description}`,
                data: "HelloWorld implementation"
            });
            expect(helloWorld.requestMappingTemplate).to.eql({
                path: `${structure.root}/${structure.functions}/HelloWorld/${structure.functionStructure.request}`,
                data: '#return("Hello World")'
            });
            expect(helloWorld.responseMappingTemplate).to.eql({
                path: `${structure.root}/${structure.functions}/HelloWorld/${structure.functionStructure.response}`,
                data: '{}'
            });

            const goodbyeWorld = builder.functions.GoodbyeWorld as ParsedFunctionInfo;
            expect(goodbyeWorld).to.exist;
            expect(goodbyeWorld.name).to.equal("GoodbyeWorld");
            expect(goodbyeWorld.description).to.eql({
                path: `${structure.root}/${structure.functions}/GoodbyeWorld/${structure.functionStructure.description}`,
                data: "GoodbyeWorld implementation"
            });
            expect(goodbyeWorld.requestMappingTemplate).to.eql({
                path: `${structure.root}/${structure.functions}/GoodbyeWorld/${structure.functionStructure.request}`,
                data: '#return("Goodbye World")'
            });
            expect(goodbyeWorld.responseMappingTemplate).to.eql({
                path: `${structure.root}/${structure.functions}/GoodbyeWorld/${structure.functionStructure.response}`,
                data: '{}'
            });

            const directives = builder.functions.Directives as ParsedFunctionInfo;
            expect(directives).to.exist;
            expect(directives.name).to.equal('Directives');
            expect(directives.description).to.eql({
                path: `${structure.root}/${structure.functions}/Directives/${structure.functionStructure.description}`,
                data: 'Directive test'
            });
            expect(directives.requestMappingTemplate).to.eql({
                path: `${structure.root}/${structure.functions}/Directives/${structure.functionStructure.request}`,
                data: `## Hey there\n## AppSync Butler: bound data source is test\n\nRequest is ${message}`
            });
            expect(directives.responseMappingTemplate).to.eql({
                path: `${structure.root}/${structure.functions}/Directives/${structure.functionStructure.response}`,
                data: `Response is ${message}`
            });
        });
    });
});
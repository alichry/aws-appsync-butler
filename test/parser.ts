import { expect } from 'chai';
import _ from 'lodash';
import Parser from '../src/parser/Parser';
import { ParsedPipelineResolverInfo, ParsedUnitResolverInfo } from '../src/parser/types';
import { InvalidDirectiveError, PipelineValidationError, UndefinedVariableError } from '../src/parser/errors';
import { ResolverType } from '../src/reader/types';
import { invalidCustomStructure, validDefaultStructure, validCustomStructure, invalidDefaultRoot, validDefaultRoot } from './constants';

describe('Test parser validations with default and custom structures', function () {
    const parsers = [
        {
            parser: new Parser(invalidDefaultRoot),
            type: "default",
            structure: validDefaultStructure
        },
        {
            parser: new Parser({ structure: _.cloneDeep(invalidCustomStructure) }),
            type: "custom",
            structure: invalidCustomStructure
        }
    ] as const;
    
    parsers.forEach(({ parser, type }) => {
        it(`Should throw an error when an undefined variable is used (${type})`, function () {
            expect(() => parser.parseFunction('UndefinedVariable'))
                .to.throw(UndefinedVariableError, /Undefined variable 'undefinedVaraible' was encountered/i);
        });

        it(`Should throw an error when the pipeline definition sequence is empty (${type})`, function () {
            expect(() => parser.parseResolver('Empty', 'pipelinedef'))
                .to.throw(PipelineValidationError, /Pipeline sequence definition must not be empty/i);
        });

        it(`Should throw an error when a @butler directive is used in a response mapping template (${type}) of a unit resolver`, function () {
            expect(() => parser.parseResolver('InvalidDirective', 'response'))
                .to.throw(InvalidDirectiveError, /butler directive was encountered in a Response Mapping Template. Butler directives can only be specified in Request Mapping Templates/i);
        });

        it(`Should throw an error when a @butler directive is used in a before mapping template (${type})`, function () {
            expect(() => parser.parseResolver('InvalidDirective', 'before'))
                .to.throw(InvalidDirectiveError, /butler directive was encountered in a Before Mapping Template. Butler directives can only be specified in Request Mapping Templates/i);
        });

        it(`Should throw an error when a @butler directive is used in a after mapping template (${type})`, function () {
            expect(() => parser.parseResolver('InvalidDirective', 'after'))
                .to.throw(InvalidDirectiveError, /butler directive was encountered in a After Mapping Template. Butler directives can only be specified in Request Mapping Templates/i);
        });

        it(`Should throw an error when a @butler directive is used in a response mapping template of a function (${type})`, function () {
            expect(() => parser.parseFunction('DataSourceDirectiveInResponse'))
                .to.throw(InvalidDirectiveError, /butler directive was encountered in a Response Mapping Template. Butler directives can only be specified in Request Mapping Templates/i);
        });

        it(`Should throw an error when @butler.dataSource is encountered more than once in a request mapping template of a unit resolver (${type})`, function () {
            expect(() => parser.parseResolver('InvalidDirective', 'twice'))
                .to.throw(InvalidDirectiveError, /@butler.dataSource directive was encountered more than once/);
        });

        it(`Should throw an error when @butler.dataSource is encountered more than once in a request mapping template of a function (${type})`, function () {
            expect(() => parser.parseFunction('DataSourceDirectiveTwice'))
                .to.throw(InvalidDirectiveError, /@butler.dataSource directive was encountered more than once/);
        });

        it(`Should throw an error when an unrecognized @butler directive is encountered in a request mapping template of a unit resolver (${type})`, function () {
            expect(() => parser.parseResolver('InvalidDirective', 'undefined'))
                .to.throw(InvalidDirectiveError, /An invalid butler directive was encountered/);
        });
    });
});

describe('Test VTL file parsing with default and custom structures', function () {
    const message = 'Hello World!';
    const parsers = [
        {
            parser: new Parser({ structure: { root: validDefaultRoot }, variables: { message } }),
            type: "default",
            structure: validDefaultStructure
        },
        {
            parser: new Parser({ structure: _.cloneDeep(validCustomStructure), variables: { message } }),
            type: "custom",
            structure: validCustomStructure
        }
    ] as const;

    parsers.forEach(({ parser, type, structure }) => {
        it(`Should parse unit resolver files (${type})`, function () {
            const unitResolver = parser.parseResolver("Variable", "unit") as ParsedUnitResolverInfo;
            expect(unitResolver.resolverType).equals(ResolverType.Unit);
            expect(unitResolver.requestMappingTemplate).to.eql({
                path: `${structure.root}/${structure.resolvers}/Variable/unit/${structure.unitStructure.request}`,
                data: `## Hello\n## AppSync Butler: bound data source is test\nUnit resolver request mapping template\n${message}`
            });
            expect(unitResolver.responseMappingTemplate).to.eql({
                path: `${structure.root}/${structure.resolvers}/Variable/unit/${structure.unitStructure.response}`,
                data: `Unit resolver response mapping template\n${message}`
            });
            expect(unitResolver.dataSource).to.equal("test");

            const noDsUnitResolver = parser.parseResolver('Variable', 'unitDefault') as ParsedUnitResolverInfo;
            expect(noDsUnitResolver.resolverType).equals(ResolverType.Unit);
            expect(noDsUnitResolver.requestMappingTemplate).to.eql({
                path: `${structure.root}/${structure.resolvers}/Variable/unitDefault/${structure.unitStructure.request}`,
                data: `## Hello\nUnit resolver request mapping template\n${message}`
            });
            expect(noDsUnitResolver.responseMappingTemplate).to.eql({
                path: `${structure.root}/${structure.resolvers}/Variable/unitDefault/${structure.unitStructure.response}`,
                data: `Unit resolver response mapping template\n${message}`
            });
            expect(noDsUnitResolver.dataSource).to.not.exist;
        });

        it(`Should parse pipeline resolver files (${type})`, function () {
            const resolver = parser.parseResolver("Variable", "pipeline") as ParsedPipelineResolverInfo;
            expect(resolver.resolverType).equals(ResolverType.Pipeline);
            expect(resolver.beforeMappingTemplate).to.eql({
                path: `${structure.root}/${structure.resolvers}/Variable/pipeline/${structure.pipelineStructure.before}`,
                data: `Pipeline resolver before mapping template\n${message}`
            });
            expect(resolver.afterMappingTemplate).to.eql({
                path: `${structure.root}/${structure.resolvers}/Variable/pipeline/${structure.pipelineStructure.after}`,
                data: `Pipeline resolver after mapping template\n${message}`
            });
            expect(resolver.pipelineDefinition).to.eql({
                path: `${structure.root}/${structure.resolvers}/Variable/pipeline/${structure.pipelineStructure.pipeline}`,
                data: "HelloWorld\nGoodbyeWorld"
            });
            expect(resolver.functionSequence)
                .to.eql(["HelloWorld", "GoodbyeWorld"]);
        });

        it(`Should parse function files (${type})`, function () {
            const func = parser.parseFunction('Directives');
            expect(func.name).equals('Directives');
            expect(func.description).to.eql({
                path: `${structure.root}/${structure.functions}/Directives/${structure.functionStructure.description}`,
                data: 'Directive test'
            });
            expect(func.requestMappingTemplate).to.eql({
                path: `${structure.root}/${structure.functions}/Directives/${structure.functionStructure.request}`,
                data: `## Hey there\n## AppSync Butler: bound data source is test\n\nRequest is ${message}`
            });
            expect(func.responseMappingTemplate).to.eql({
                path: `${structure.root}/${structure.functions}/Directives/${structure.functionStructure.response}`,
                data: `Response is ${message}`
            });
        });
    });
});

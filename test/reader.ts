import { expect } from 'chai';
import _ from 'lodash';
import Reader from '../src/reader/Reader.js';
import { DirectoryValidationError } from '../src/reader/errors.js';
import { PipelineResolverInfo, ResolverType, UnitResolverInfo } from '../src/reader/types.js';
import { invalidCustomStructure, validDefaultStructure, validCustomStructure, invalidDefaultRoot, validDefaultRoot } from './constants.js';

describe('Test VTL directory validation with default and custom structures', function () {
    const readers = [
        {
            reader: new Reader(invalidDefaultRoot),
            type: "default"
        },
        {
            reader: new Reader({ structure: _.cloneDeep(invalidCustomStructure) }),
            type: "custom"
        }
    ] as const;

    readers.forEach(({ reader, type }) => {
        it(`Should throw an errror for overlapping file types (required file, ${type})`, function () {
            expect(() => reader.readResolver('Overlap', 'pipeline'))
                .to.throw(DirectoryValidationError, /overlapping file types/);
        });

        it(`Should throw an errror for overlapping file types (optional file, ${type})`, function () {
            expect(() => reader.readResolver('Overlap', 'before'))
                .to.throw(DirectoryValidationError, /overlapping file types/);
        });

        it(`Should throw an error for empty resolver directories (${type})`, function () {
            expect(() => reader.readResolver('Empty', 'empty'))
                .to.throw(DirectoryValidationError, /No significant files were found/i);
        });

        it(`Should throw an error for missing unit resolver's request mapping template (${type})`, function () {
            expect(() => reader.readResolver('Missing', 'request'))
                .to.throw(DirectoryValidationError, /The unit resolver directory is invalid.*request.* is required/i);
        });

        it(`Should throw an error for missing unit resolver's response mapping template (${type})`, function () {
            expect(() => reader.readResolver('Missing', 'response'))
                .to.throw(DirectoryValidationError, /The unit resolver directory is invalid.*response.* is required/i);
        });

        it(`Should throw an error for missing pipeline resolver's pipeline sequence (${type})`, function () {
            expect(() => reader.readResolver('Missing', 'pipeline'))
                .to.throw(DirectoryValidationError, /The pipeline resolver directory is invalid.*pipeline.* is required/i);
        });

        it(`Should throw an error for missing function request file (${type})`, function () {
            expect(() => reader.readFunction('MissingRequest'))
                .to.throw(DirectoryValidationError, /The function directory is invalid.*request.*is required/i);
        });

        it(`Should throw an error for missing function response file (${type})`, function () {
            expect(() => reader.readFunction('MissingResponse'))
                .to.throw(DirectoryValidationError, /The function directory is invalid.*response.*is required/i);
        });
    });
});

describe('Test VTL file reading with default and custom structures', function () {
    const readers = [
        {
            reader: new Reader(validDefaultRoot),
            type: "default",
            structure: validDefaultStructure
        },
        {
            reader: new Reader({ structure: _.cloneDeep(validCustomStructure) }),
            type: "custom",
            structure: validCustomStructure
        }
    ] as const;

    readers.forEach(({ reader, type, structure }) => {
        it(`Should read unit resolver files (${type})`, function () {
            const resolver = reader.readResolver("Variable", "unit") as UnitResolverInfo;
            expect(resolver.resolverType).equals(ResolverType.Unit);
            expect(resolver.requestMappingTemplate).to.eql({
                path: `${structure.root}/${structure.resolvers}/Variable/unit/${structure.unitStructure.request}`,
                data: `## Hello\n##@butler.dataSource('test')\nUnit resolver request mapping template\n{{ message }}`
            });
            expect(resolver.responseMappingTemplate).to.eql({
                path: `${structure.root}/${structure.resolvers}/Variable/unit/${structure.unitStructure.response}`,
                data: `Unit resolver response mapping template\n{{ message }}`
            });
        });

        it(`Should read pipeline resolver files (${type})`, function () {
            const resolver = reader.readResolver("Variable", "pipeline") as PipelineResolverInfo;
            expect(resolver.resolverType).equals(ResolverType.Pipeline);
            expect(resolver.beforeMappingTemplate).to.eql({
                path: `${structure.root}/${structure.resolvers}/Variable/pipeline/${structure.pipelineStructure.before}`,
                data: 'Pipeline resolver before mapping template\n{{ message }}'
            });
            expect(resolver.afterMappingTemplate).to.eql({
                path: `${structure.root}/${structure.resolvers}/Variable/pipeline/${structure.pipelineStructure.after}`,
                data: 'Pipeline resolver after mapping template\n{{ message }}'
            });
            expect(resolver.pipelineDefinition).to.eql({
                path: `${structure.root}/${structure.resolvers}/Variable/pipeline/${structure.pipelineStructure.pipeline}`,
                data: "HelloWorld\nGoodbyeWorld"
            });
        });

        it(`Should read function files (${type})`, function () {
            const func = reader.readFunction('Directives');
            expect(func.name).equals('Directives');
            expect(func.description).to.eql({
                path: `${structure.root}/${structure.functions}/Directives/${structure.functionStructure.description}`,
                data: 'Directive test'
            });
            expect(func.requestMappingTemplate).to.eql({
                path: `${structure.root}/${structure.functions}/Directives/${structure.functionStructure.request}`,
                data: "## Hey there\n##@butler.dataSource('test')\n\nRequest is {{ message }}"
            });
            expect(func.responseMappingTemplate).to.eql({
                path: `${structure.root}/${structure.functions}/Directives/${structure.functionStructure.response}`,
                data: "Response is {{ message }}"
            });
        });
    });
});
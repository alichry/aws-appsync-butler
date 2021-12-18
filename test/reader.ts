import VtlReader from '../src/VtlReader';
import { expect } from 'chai';
import { DirectoryValidationError, PipelineValidationError, UndefinedVariableError } from '../src/errors';
import { PipelineResolverInfo, ResolverType, UnitResolverInfo } from '../src/types';

describe('Test VTL directory validation with default and custom structures', function () {
    const readers = [
        new VtlReader("test/cases/invalid/default"),
        new VtlReader({
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
            }
        })
    ];

    readers.forEach((reader, i) => {
        it(`Should throw an errror for overlapping file types (required file, ${i})`, function () {
            expect(() => reader.readResolver('Overlap', 'pipeline'))
                .to.throw(DirectoryValidationError, /overlapping file types/);
        });

        it(`Should throw an errror for overlapping file types (optional file, ${i})`, function () {
            expect(() => reader.readResolver('Overlap', 'before'))
                .to.throw(DirectoryValidationError, /overlapping file types/);
        });

        it(`Should throw an error for empty resolver directories (${i})`, function () {
            expect(() => reader.readResolver('Empty', 'empty'))
                .to.throw(DirectoryValidationError, /No significant files were found/i);
        });

        it(`Should throw an error for missing unit resolver's request mapping template (${i})`, function () {
            expect(() => reader.readResolver('Missing', 'request'))
                .to.throw(DirectoryValidationError, /The unit resolver directory is invalid.*request.* is required/i);
        });

        it(`Should throw an error for missing unit resolver's response mapping template (${i})`, function () {
            expect(() => reader.readResolver('Missing', 'response'))
                .to.throw(DirectoryValidationError, /The unit resolver directory is invalid.*response.* is required/i);
        });

        it(`Should throw an error for missing pipeline resolver's pipeline sequence (${i})`, function () {
            expect(() => reader.readResolver('Missing', 'pipeline'))
                .to.throw(DirectoryValidationError, /The pipeline resolver directory is invalid.*pipeline.* is required/i);
        });

        it(`Should throw an error for missing function request file (${i})`, function () {
            expect(() => reader.readFunction('MissingRequest'))
                .to.throw(DirectoryValidationError, /The function directory is invalid.*request.*is required/i);
        });

        it(`Should throw an error for missing function response file (${i})`, function () {
            expect(() => reader.readFunction('MissingResponse'))
                .to.throw(DirectoryValidationError, /The function directory is invalid.*response.*is required/i);
        });

        it(`Should throw an error when an undefined variable is used (${i})`, function () {
            expect(() => reader.readFunction('UndefinedVariable'))
                .to.throw(UndefinedVariableError, /Undefined variable 'undefinedVaraible' was encountered/i);
        });

        it(`Should throw an error when the pipeline definition sequence is empty (${i})`, function () {
            expect(() => reader.readResolver('Empty', 'pipelinedef'))
                .to.throw(PipelineValidationError, /Pipeline sequence definition must not be empty/i);
        });
    });
});

describe('Test VTL file reading and parsing with default and custom structures', function () {
    const message = 'Hello World!';
    const readers = [
        new VtlReader({
            structure: { root: "test/cases/valid/default" },
            variables: { message }
        }),
        new VtlReader({
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
                    response: "response-mt.vtl"
                }
            },
            variables: { message }
        })
    ];

    readers.forEach((reader, i) => {
        it(`Should parse unit resolver files (${i})`, function () {
            const resolver = reader.readResolver("Variable", "unit");
            expect(resolver.resolverType).equals(ResolverType.Unit);
            expect((<UnitResolverInfo>resolver).requestMappingTemplate).matches(
                new RegExp(`Unit resolver request mapping template\n${message}`)
            );
            expect((<UnitResolverInfo>resolver).responseMappingTemplate).matches(
                new RegExp(`Unit resolver response mapping template\n${message}`)
            );
        });

        it(`Should parse pipeline resolver files (${i})`, function () {
            const resolver = reader.readResolver("Variable", "pipeline");
            expect(resolver.resolverType).equals(ResolverType.Pipeline);
            expect((<PipelineResolverInfo>resolver).beforeMappingTemplate).matches(
                new RegExp(`Pipeline resolver before mapping template\n${message}`)
            );
            expect((<PipelineResolverInfo>resolver).afterMappingTemplate).matches(
                new RegExp(`Pipeline resolver after mapping template\n${message}`)
            );
            expect((<PipelineResolverInfo>resolver).pipelineDefinition)
                .to.equal("HelloWorld\nGoodbyeWorld");
            expect((<PipelineResolverInfo>resolver).functionSequence)
                .to.eql(["HelloWorld", "GoodbyeWorld"]);
        });
    });
});
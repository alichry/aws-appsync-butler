---
id: "index"
title: "aws-appsync-butler"
slug: "/api/"
sidebar_label: "Exports"
sidebar_position: 0.5
custom_edit_url: null
---

## Service Classes

- [Builder](classes/Builder)
- [CdkLoader](classes/CdkLoader)
- [SstLoader](classes/SstLoader)
- [Parser](classes/Parser)
- [Reader](classes/Reader)

## Error Classes

- [ValidationError](classes/ValidationError)
- [DataSourceTypeMismatchError](classes/DataSourceTypeMismatchError)
- [DataSourceNotFoundError](classes/DataSourceNotFoundError)
- [FunctionNotFoundError](classes/FunctionNotFoundError)
- [PipelineValidationError](classes/PipelineValidationError)
- [UndefinedVariableError](classes/UndefinedVariableError)
- [InvalidDirectiveError](classes/InvalidDirectiveError)
- [DirectoryValidationError](classes/DirectoryValidationError)

## Interfaces

- [ResolverTree](interfaces/ResolverTree)
- [SstLoaderOptions](interfaces/SstLoaderOptions)
- [CdkLoaderOptions](interfaces/CdkLoaderOptions)
- [ParsedVtlFile](interfaces/ParsedVtlFile)
- [ParsedVtlRequest](interfaces/ParsedVtlRequest)
- [ParsedUnitResolverInfo](interfaces/ParsedUnitResolverInfo)
- [ParsedPipelineResolverInfo](interfaces/ParsedPipelineResolverInfo)
- [ParsedFunctionInfo](interfaces/ParsedFunctionInfo)
- [ParserOptions](interfaces/ParserOptions)
- [FileInfo](interfaces/FileInfo)
- [UnitResolverInfo](interfaces/UnitResolverInfo)
- [PipelineResolverInfo](interfaces/PipelineResolverInfo)
- [FunctionInfo](interfaces/FunctionInfo)
- [UnitDirectoryStructure](interfaces/UnitDirectoryStructure)
- [PipelineDirectoryStructure](interfaces/PipelineDirectoryStructure)
- [DirectoryStructure](interfaces/DirectoryStructure)
- [ReaderOptions](interfaces/ReaderOptions)

## Enumerations

- [ResolverType](enums/ResolverType)

## Type aliases

### DataSource

Ƭ **DataSource**: `BaseDataSource` \| `string`

___

### LoaderOptions

Ƭ **LoaderOptions**: [`SstLoaderOptions`](interfaces/SstLoaderOptions) \| [`CdkLoaderOptions`](interfaces/CdkLoaderOptions)

___

### ParsedResolverInfo

Ƭ **ParsedResolverInfo**: [`ParsedUnitResolverInfo`](interfaces/ParsedUnitResolverInfo) \| [`ParsedPipelineResolverInfo`](interfaces/ParsedPipelineResolverInfo)

___

### ResolverInfo

Ƭ **ResolverInfo**: [`UnitResolverInfo`](interfaces/UnitResolverInfo) \| [`PipelineResolverInfo`](interfaces/PipelineResolverInfo)

## Functions

### createLoader

▸ **createLoader**(`scope`, `options`): [`CdkLoader`](classes/CdkLoader)

Instantialize a CDK Loader instance

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `scope` | `Construct` | CDK Stack |
| `options` | [`CdkLoaderOptions`](interfaces/CdkLoaderOptions) | CDK Loader options |

#### Returns

[`CdkLoader`](classes/CdkLoader)

▸ **createLoader**(`scope`, `options`): [`SstLoader`](classes/SstLoader)

Instantialize an SST Loader instance

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `scope` | `Construct` | SST Stack |
| `options` | [`SstLoaderOptions`](interfaces/SstLoaderOptions) | SST Loader options |

#### Returns

[`SstLoader`](classes/SstLoader)

▸ **createLoader**(`scope`, `options`): [`CdkLoader`](classes/CdkLoader) \| [`SstLoader`](classes/SstLoader)

Instantialize a CDK or SST Loader instance

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `scope` | `Construct` | Stack |
| `options` | [`SstLoaderOptions`](interfaces/SstLoaderOptions) \| [`CdkLoaderOptions`](interfaces/CdkLoaderOptions) | CDK or SST Loader options |

#### Returns

[`CdkLoader`](classes/CdkLoader) \| [`SstLoader`](classes/SstLoader)

___

### getGraphqlFiles

▸ `Const` **getGraphqlFiles**(`directory`): `string`[]

Returns a list of *.graphql file paths in the specified directory

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `directory` | `string` | path to the directory containing .graphql files |

#### Returns

`string`[]

An array of *.graphql file paths in the form of ${directory}/*.graphql

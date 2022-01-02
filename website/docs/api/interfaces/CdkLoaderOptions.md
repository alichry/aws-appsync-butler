---
id: "CdkLoaderOptions"
title: "Interface: CdkLoaderOptions"
sidebar_label: "CdkLoaderOptions"
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- [`ParserOptions`](ParserOptions)

  ↳ **`CdkLoaderOptions`**

## Properties

### api

• **api**: `GraphqlApi`

___

### defaultFunctionDataSource

• `Optional` **defaultFunctionDataSource**: `BaseDataSource` \| ``"none"``

___

### defaultUnitResolverDataSource

• `Optional` **defaultUnitResolverDataSource**: `BaseDataSource` \| ``"none"``

___

### dataSources

• `Optional` **dataSources**: `Record`<`string`, `BaseDataSource`\>

___

### variables

• `Optional` **variables**: `Record`<`string`, `string`\>

Variables to replace in VTL files. See
[Parser#setvariable](/docs/api/classes/Parser#setvariable) for sample usage

#### Inherited from

[ParserOptions](ParserOptions).[variables](ParserOptions#variables)

___

### structure

• `Optional` **structure**: [`DirectoryStructure`](DirectoryStructure)

#### Inherited from

[ParserOptions](ParserOptions).[structure](ParserOptions#structure)

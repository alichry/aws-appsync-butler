---
id: "SstLoaderOptions"
title: "Interface: SstLoaderOptions"
sidebar_label: "SstLoaderOptions"
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- [`ParserOptions`](ParserOptions)

  ↳ **`SstLoaderOptions`**

## Properties

### api

• **api**: `AppSyncApi`

___

### defaultFunctionDataSource

• `Optional` **defaultFunctionDataSource**: `string`

___

### defaultUnitResolverDataSource

• `Optional` **defaultUnitResolverDataSource**: `string`

___

### dataSources

• `Optional` **dataSources**: `undefined`

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

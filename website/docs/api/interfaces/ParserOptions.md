---
id: "ParserOptions"
title: "Interface: ParserOptions"
sidebar_label: "ParserOptions"
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- [`ReaderOptions`](ReaderOptions)

  ↳ **`ParserOptions`**

  ↳↳ [`SstLoaderOptions`](SstLoaderOptions)

  ↳↳ [`CdkLoaderOptions`](CdkLoaderOptions)

## Properties

### variables

• `Optional` **variables**: `Record`<`string`, `string`\>

Variables to replace in VTL files. See
[Parser#setvariable](/docs/api/classes/Parser#setvariable) for sample usage

___

### structure

• `Optional` **structure**: [`DirectoryStructure`](DirectoryStructure)

#### Inherited from

[ReaderOptions](ReaderOptions).[structure](ReaderOptions#structure)

---
id: "Builder"
title: "Class: Builder"
sidebar_label: "Builder"
sidebar_position: 0
custom_edit_url: null
---

Build a resolver tree from a VTL directory.

```ts
import { Builder } from 'aws-appsync-butler';
const builder = new Builder();
builder.build();
const { getPost } = builder.resolvers.Query;
const { getUserById } = builder.functions;
```

## Constructors

### constructor

• **new Builder**(`optionsOrRoot?`)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `optionsOrRoot?` | `string` \| [`ParserOptions`](../interfaces/ParserOptions) | Path to VTL directory or parsing instructions |

## Properties

### parser

• `Readonly` **parser**: [`Parser`](Parser)

The underlying parser instance that is responsible for parsing
resolvers and functions.

___

### resolvers

• `Readonly` **resolvers**: [`ResolverTree`](../interfaces/ResolverTree)

The resolver tree object, only populated after calling `build()`

___

### functions

• `Readonly` **functions**: `Record`<`string`, [`ParsedFunctionInfo`](../interfaces/ParsedFunctionInfo)\>

The function dictionary object, only populated after calling `build()`
Keys are function names and values are parsed function information.

## Methods

### build

▸ **build**(): `void`

Traverse all the stored resolvers and functions to
build the resolver tree and function dictionary.

#### Returns

`void`

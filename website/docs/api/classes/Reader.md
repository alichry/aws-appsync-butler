---
id: "Reader"
title: "Class: Reader"
sidebar_label: "Reader"
sidebar_position: 0
custom_edit_url: null
---

Resolver and function reader.

```ts
import { Reader } from 'aws-appsync-butler';
const reader = new Reader();
reader.readTypes(); // ['Query', 'Mutation', 'Post']
reader.readFields('Query'); // ['getPost', 'getAuthor']
const resolver = reader.readResolver('Query', 'getPost');

reader.readFunctions(); // ['getPostById', 'getAuthorByPostId']
const func = reader.readFunction('getPostById');
```

## Hierarchy

- **`Reader`**

  ↳ [`Parser`](Parser)

## Constructors

### constructor

• **new Reader**(`optionsOrRoot?`)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `optionsOrRoot` | `string` \| [`ReaderOptions`](../interfaces/ReaderOptions) | Path to VTL directory or reading directives |

## Methods

### readFunctions

▸ **readFunctions**(): `string`[]

Reads the on-disk function directory names. Essentially, the
first-level subdirectories of `functions` are read.
```tree
vtl
├── functions
│   └── GetPostById
│       ├── request.vtl
│       └── response.vtl
└── resolvers
```
```ts
reader.readFunctions(); // ['GetPostById']
```

#### Returns

`string`[]

A list of function names

___

### readTypes

▸ **readTypes**(): `string`[]

Reads the on-disk GraphQL type names. Essentially, the
first-level subdirectories of `resolvers` are read.
```tree
vtl
├── functions
└── resolvers
    ├── Mutation
    └── Query
    └── Post
```
```ts
reader.readTypes(); // ['Mutation', 'Query', 'Post']
```

#### Returns

`string`[]

A list of GraphQL types

___

### readFields

▸ **readFields**(`typeName`): `string`[]

Reads the on-disk GraphQL field names. Essentially, the
second-level subdirectories of `resolvers` are read.
```tree
vtl
├── functions
└── resolvers
    ├── Mutation
    └── Query
        └── getPost
            ├── request.vtl
            └── response.vtl
```
```ts
reader.readFields('Query'); // ['getPost']
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `typeName` | `string` | GraphQL type name |

#### Returns

`string`[]

A list of GraphQL fields

___

### readResolver

▸ **readResolver**(`typeName`, `fieldName`): [`ResolverInfo`](../#resolverinfo)

Reads a GraphQL field resolver from disk.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `typeName` | `string` | GraphQL type name |
| `fieldName` | `string` | GraphQL field name |

#### Returns

[`ResolverInfo`](../#resolverinfo)

Unit or Pipeline Resolver information

___

### readFunction

▸ **readFunction**(`functionName`): [`FunctionInfo`](../interfaces/FunctionInfo)

Reads an AWS AppSync Function from disk.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `functionName` | `string` | Function name |

#### Returns

[`FunctionInfo`](../interfaces/FunctionInfo)

Function information

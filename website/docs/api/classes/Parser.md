---
id: "Parser"
title: "Class: Parser"
sidebar_label: "Parser"
sidebar_position: 0
custom_edit_url: null
---

Resolver and function parser.
```ts
import { Parser } from 'aws-appsync-butler';

const parser = new Parser();
parser.readTypes(); // ['Query', 'Mutation', 'Post']
parser.readFields('Query'); // ['getPost', 'getAuthor']
const resolver = parser.parseResolver('Query', 'getPost');

parser.readFunctions(); // ['getPostById', 'getAuthorByPostId']
const func = reader.parseFunction('getPostById');
```

## Hierarchy

- [`Reader`](Reader)

  ↳ **`Parser`**

## Constructors

### constructor

• **new Parser**(`optionsOrRoot?`)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `optionsOrRoot` | `string` \| [`ParserOptions`](../interfaces/ParserOptions) | Path to VTL directory or parsing directives. |

#### Overrides

[Reader](Reader).[constructor](Reader#constructor)

## Methods

### setVariable

▸ **setVariable**(`key`, `value`): [`Parser`](Parser)

Sets an in-memory variable for VTL file parsing.
```vtl title="vtl/resolvers/Mutation/addPost/request.vtl"
#set($postId = $util.autoId())

{
    "version" : "2018-05-29",
    "operation" : "BatchPutItem",
    "tables": {
        "{{ tableName }}": [
            {
                "pk": $util.dynamodb.toDynamoDBJson("p-$postId"),
                "sk": $util.dynamodb.toDynamoDBJson("A"),
                "postTitle": $util.dynamodb.toDynamoDBJson($ctx.args.postInput.title),
                "postContent": $util.dynamodb.toDynamoDBJson($ctx.args.postInput.content)
            },
            {
                "pk": $util.dynamodb.toDynamoDBJson("u-$ctx.identity.sub"),
                "sk": $util.dynamodb.toDynamoDBJson("p-$postId")
            }
        ]
    }
}
```
```ts
parser.setVariable("tableName", dynamodbTable.tableName);
const resolver = parser.parseResolver('Mutation', 'addPost');
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | Variable identifier |
| `value` | `string` | Value |

#### Returns

[`Parser`](Parser)

___

### getVariable

▸ **getVariable**(`key`): `undefined` \| `string`

Retrieves the defined variable value.
```ts
parser.setVariable('name', 'Ali');
parser.getVariable('name'); // 'Ali'
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | Variable identifier |

#### Returns

`undefined` \| `string`

Variable value if set, undefined otherwise.

___

### parseResolver

▸ **parseResolver**(`typeName`, `fieldName`): [`ParsedResolverInfo`](../#parsedresolverinfo)

Parses Resolver files including variable substitution in
mapping templates, pipeline sequence defintion parsing,
and data source binding.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `typeName` | `string` | GraphQL type name |
| `fieldName` | `string` | GraphQL field name |

#### Returns

[`ParsedResolverInfo`](../#parsedresolverinfo)

Parsed resolver information

___

### parseFunction

▸ **parseFunction**(`functionName`): [`ParsedFunctionInfo`](../interfaces/ParsedFunctionInfo)

Parses function files including variable substitution in
mapping templates and data source binding.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `functionName` | `string` | Function name |

#### Returns

[`ParsedFunctionInfo`](../interfaces/ParsedFunctionInfo)

Parsed function information

___

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

#### Inherited from

[Reader](Reader).[readFunctions](Reader#readfunctions)

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

#### Inherited from

[Reader](Reader).[readTypes](Reader#readtypes)

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

#### Inherited from

[Reader](Reader).[readFields](Reader#readfields)

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

#### Inherited from

[Reader](Reader).[readResolver](Reader#readresolver)

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

#### Inherited from

[Reader](Reader).[readFunction](Reader#readfunction)

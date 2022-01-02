---
id: "CdkLoader"
title: "Class: CdkLoader"
sidebar_label: "CdkLoader"
sidebar_position: 0
custom_edit_url: null
---

Load resolvers into an AppSync GraphQL API construct.

```ts
import { CdkLoader } from 'aws-appsync-butler';
import { GraphqlApi } from '@aws-cdk/aws-appsync';
import { Table } from '@aws-cdk/aws-dynamodb';

const graphqlApi = new GraphqlApi(...);
const table = new Table(...);

const loader = new CdkLoader(appStack, {
  api: graphqlApi,
  defaultUnitResolverDataSource: table,
  defaultFunctionDataSource: 'none',
  variables: {
    tableName: table.tableName
  }
});
loader.load();
```

## Hierarchy

- `Loader`<[`CdkLoaderOptions`](../interfaces/CdkLoaderOptions)\>

  ↳ **`CdkLoader`**

## Properties

### builder

• `Readonly` **builder**: [`Builder`](Builder)

The underlying builder instance that is responsible for building the resolver
tree and function dictionary.

#### Inherited from

Loader.builder

___

### functions

• `Readonly` **functions**: `Record`<`string`, `AppsyncFunction`\> = `{}`

The created Appsync Functions. Only populated after loading.

#### Inherited from

Loader.functions

## Constructors

### constructor

• **new CdkLoader**(`scope`, `options`)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `scope` | `Construct` | A CDK construct. Usually, it is the stack instance. |
| `options` | [`CdkLoaderOptions`](../interfaces/CdkLoaderOptions) | Loading, parsing, or reading directives. |

#### Inherited from

Loader<CdkLoaderOptions\>.constructor

## Methods

### load

▸ **load**(): `void`

Load on-disk resolvers and functions into AppSync.

#### Returns

`void`

#### Inherited from

Loader.load

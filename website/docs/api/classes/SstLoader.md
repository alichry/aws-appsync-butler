---
id: "SstLoader"
title: "Class: SstLoader"
sidebar_label: "SstLoader"
sidebar_position: 0
custom_edit_url: null
---

Load resolvers into an SST AppSyncAPI construct.

```ts
import { SstLoader } from 'aws-appsync-butler';
import { Table, AppSyncApi } from '@serverless-stack/resources';

const table = new Table(...);

const api = new AppSyncApi(myStack, "api", {
  dataSources: { myTable: { table } }
});

const loader = new SstLoader(myStack, {
  api,
  defaultUnitResolverDataSource: 'myTable',
  defaultFunctionDataSource: 'none',
  variables: {
    tableName: table.dynamodbTable.tableName
  }
})
```

## Hierarchy

- `Loader`<[`SstLoaderOptions`](../interfaces/SstLoaderOptions)\>

  ↳ **`SstLoader`**

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

• **new SstLoader**(`scope`, `options`)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `scope` | `Construct` | A CDK construct. Usually, it is the stack instance. |
| `options` | [`SstLoaderOptions`](../interfaces/SstLoaderOptions) | Loading, parsing, or reading directives. |

#### Inherited from

Loader<SstLoaderOptions\>.constructor

## Methods

### load

▸ **load**(): `void`

Load on-disk resolvers and functions into AppSync.

#### Returns

`void`

#### Inherited from

Loader.load

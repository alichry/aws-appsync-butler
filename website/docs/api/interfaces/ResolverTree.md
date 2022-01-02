---
id: "ResolverTree"
title: "Interface: ResolverTree"
sidebar_label: "ResolverTree"
sidebar_position: 0
custom_edit_url: null
---

The resolver tree is a two-dimensional object with keys as GraphQL types and
GraphQL fields for the first and second dimension (respectively).
Values cover information about parsed resolvers.

```ts
import { ResolverType, ResolverTree } from "aws-appsync-butler";
const tree: ResolverTree = {
  Query: {
    getPost: {
      typeName: 'Query',
      fieldName: 'getPost',
      resolverType: ResolverType.Unit,
      requestMappingTemplate: {
        path: 'vtl/resolvers/Query/getPost/request.vtl',
        data: '#returrn({ "id": 1, "title": "Good Soup!" })'
      },
      responseMappingTemplate: {
        path: 'vtl/resolvers/Query/getPost/response.vtl',
        data: '$util.toJson($ctx.result)'
      },
    }
  },
  Mutation: {}
}
```

## Indexable

▪ [typeName: `string`]: `Record`<`string`, [`ParsedResolverInfo`](../#parsedresolverinfo)\>

## Properties

### Query

• **Query**: `Record`<`string`, [`ParsedResolverInfo`](../#parsedresolverinfo)\>

___

### Mutation

• **Mutation**: `Record`<`string`, [`ParsedResolverInfo`](../#parsedresolverinfo)\>

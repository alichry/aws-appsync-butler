---
sidebar_position: 3
---

# Define a GraphQL schema

```shell
mkdir graphql
touch graphql/index.graphql
```
Now, edit `graphql/index.graphql` using your preferred editor. In this journey, we are going to add  
1. 🕰  A get datetime query, and
2. 🏓  A ping-pong mutation

```graphql title="graphql/index.graphql"
schema {
  query: Query
  mutation: Mutation
}

type Query {
  getDateTime: String!
}

type Mutation {
  pong(word: String!): String!
}
```
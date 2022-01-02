---
sidebar_position: 4
---

# Write resolvers

We need to create two resolvers, one for the `getDateTime` query and another for the `pong` mutation

## Preparing the files

Both resolvers are simple unit resolvers. To setup a unit resolver, two files are required:
- A request mapping template, defaults to `request.vtl`, and
- A response mapping template, defaults to `response.vtl`

To proceed, create the appropriate directories and files.
```shell
mkdir vtl/resolvers/Query/getDateTime vtl/resolvers/Mutation/pong
touch vtl/resolvers/Query/getDateTime/{request,response}.vtl vtl/resolvers/Mutation/pong/{request,response}.vtl
```

This would resuslt in the following directory tree:

```tree
vtl
├── functions
└── resolvers
    ├── Mutation
    │   └── pong
    │       ├── request.vtl
    │       └── response.vtl
    └── Query
        └── getDateTime
            ├── request.vtl
            └── response.vtl
```

### Query.getDateTime
<!--
Create the resolver directory, request mapping template, and response mapping template.

```shell
mkdir vtl/resolvers/Query/getDateTime
touch vtl/resolvers/Query/getDateTime/{request,response}.vtl
```
-->

To return the current date time, a data source (e.g. a DynamoDB table) is not necessary.
Therefore, we can set this resolver's data source to [None](https://docs.aws.amazon.com/appsync/latest/devguide/resolver-mapping-template-reference-none.html).

```json title="vtl/resolvers/Query/getDateTime/request.vtl"
##@butler.dataSource('none')

{
    "version": "2018-05-29"
}
```

The `none` data source key is a reserved key used internally by AppSync Butler to refer
to a None data source.

```vtl title="vtl/resolvers/Query/getDateTime/response.vtl"
$util.toJson($util.time.nowFormatted("yyyy-MM-dd HH:mm:ssZ"))
```

### Mutation.pong

<!--
Create the resolver directory, request mapping template, and response mapping template.

```shell
mkdir vtl/resolvers/Mutation/pong
touch vtl/resolvers/Mutation/pong/{request,response}.vtl
```
-->

Similarly, this a [None](https://docs.aws.amazon.com/appsync/latest/devguide/resolver-mapping-template-reference-none.html) (local) data source resolver. 

```json title="vtl/resolvers/Mutation/pong/request.vtl"
##@butler.dataSource('none')

{
    "version": "2018-05-29",
    "payload": {
        "word": "$ctx.args.word"
    }
}
```

```vtl title="vtl/resolvers/Mutation/pong/response.vtl"
#set($word = $ctx.result.word)
#set($reversed = "")
#set($end = $word.length() - 1)

#foreach ($i in [$end..0])
    #set($reversed = "${reversed}$word.charAt($i)")
#end

$util.toJson($reversed)
```

:::tip

The above resolver revereses the character sequence. When given the input word
is "hello", it outputs "olleh". Based on this resolver, a fun exercise would be
to check whether the input word is a palindrome or not.

:::
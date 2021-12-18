# AWS AppSync Butler

With the power of Apache Velocity, AWS AppSync allows for quick deployment of GraphQL APIs with custom business logic. Developers might prefer storing VTL resolvers and GraphQL files in their CDK/SST repository. For this, AppSync Butler offer a convenient method to parse and load VTL resolvers to CDK/SST AppSync constructs using an intuitive directory structure.  

## How it works
AppSync Butler offers VTL function, unit resolver, and pipeline resolver loading. Suppose VTL files are stored under `vtl/`, AppSync Butler would look for two subdirectories `functions` and `resolvers` to parse functions and resolvers respectively.

```tree
vtl
├── functions
│   ├── GetAuthorByAuthorId
│   │   ├── description.txt
│   │   ├── request.vtl
│   │   └── response.vtl
│   └── GetAuthorIdByPostId
│       ├── description.txt
│       ├── request.vtl
│       └── response.vtl
└── resolvers
    ├── Mutation
    │   └── addPost
    │       ├── request.vtl
    │       └── response.vtl
    ├── Post
    │   └── author
    │       ├── after.vtl
    │       ├── before.vtl
    │       └── pipeline.seq
    └── Query
        └── getPost
            ├── request.vtl
            └── response.vtl
```

### Functions
Each subdirectory under `vtl/functions/` should contain the necessary files to build an AppSync VTL function:
- Request Mapping Template: `request.vtl`
- Response Mapping Template: `response.vtl`
- Description (optional): `description.txt`

AppSync Butler will iterate over each function and add it to the supplied CDK/SST AppSync API.

### Resolvers
Each subdirectory under `vtl/resolvers/` should represent a valid GraphQL type (e.g. `vtl/resolvers/Query`) and contains zero-or-more subdirectories as field-level resolvers (e.g. `vtl/resolver/Query/getPost`). AppSync Butler reads the VTL files in `vtl/resolver/Query/getPost` and intuitively adds the resolver `Query.getPost` to the GraphQL API.    

AppSync Butler supports both unit and pipeline resolvers.

#### Unit resolver files
- Request Mapping Template: `request.vtl`
- Response Mapping Template: `response.vtl`

#### Pipeline resolver files
- Before Mapping Template: `before.vtl`
- Pipeline sequence definition file: `pipeline.seq`
- After Mapping Template: `after.vtl`

The pipeline sequence defintion file defines the ordered AppSync VTL functions to execute sequentially. To execute `vtl/functions/GetUserId` then `vtl/functions/GetUser`, we can define the pipeline sequence defintion file in the following format:
```
GetUserId
GetUser
```
AppSync Butler handles the necessary steps to load this pipeline resolver into AppSync.

### Variables
AppSync Butler parses mapping templates (request, response, before, after) and replaces references of a user-defined variable to its specified value. Variables are denoted as `{{ var }}`. AppSync Butler will throw an `UndefinedVariableError` if an unrecognized variable is encountered in a mapping template. Variables are defined during the instantialization of a loader or set using `loader.builder.reader.setVariable(key, value)`.

### Default data source
Currently, AppSync Butler only support one default data source for VTL functions and resolvers. This plays well with Single Table design on DynamoDB. Open an issue if you require more than one data source.

## Getting Started
Within your SST/CDK stack, create an instance of `SstVtlLoader` or `CdkVtlLoader`
```ts
// When using CDK:
import { CdkVtlLoader } from 'aws-appsync-butler';
import { GraphqlApi } from '@aws-cdk/aws-appsync';
import { Table, AttributeType } from '@aws-cdk/aws-dynamodb';

const dynamoDbTable = new Table(this, "dynamodb", {
    partitionKey: { name: "pk", type: AttributeType.STRING }
});
const graphqlApi = new GraphqlApi(this, "appsync", { name: "myApi" });
const dataSource = graphqlApi.addDynamoDbDataSource("myTable", dynamoDbTable, {
    name: "myTable"
});
const loader = new CdkVtlLoader(this, {
    api: graphqlApi,
    defaultFunctionDataSource: dataSource,
    defaultUnitResolverDataSource: dataSource
});

// When using SST:
import { SstVtlLoader } from 'aws-appsync-butler';
import { Table, AppSyncApi } from "@serverless-stack/resources";

const table = new Table(this, "dynamodb", {
    fields: { pk: sst.TableFieldType.STRING },
    primaryIndex: { partitionKey: "pk" }
});
const api = new AppSyncApi(this, "appsync", {
    dataSources: { myTable: { table } }
});
const loader = new SstVtlLoader(this, {
    api,
    defaultFunctionDataSource: "myTable",
    defaultUnitResolverDataSource: "myTable"
});

// Finally, load the functions and resolvers:
loader.load();
```

## Injecting variables
Your VTL templates might need access to some dynamic values such as a DynamoDB table name. This is the case when executing a DynamoDB batch operation where the table name must be specified. In a Single Table design, the `addPost` mutation would execute a `BatchPutItem` operation:
```vtl
## vtl/resolvers/Mutation/addPost/request.vtl

#set($postId = $util.autoId())

{
    "version" : "2018-05-29",
    "operation" : "BatchPutItem",
    "tables": {
        "{{ myTableName }}": [
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
And define the `myTableName` variable during instantialization:

```ts
// When using CDK:
const dynamoDbTable = new dynamodb.Table(this, "dynamodb", {
    partitionKey: { name: "pk", type: AttributeType.STRING }
});
const loader = new CdkVtlLoader({
    api,
    defaultFunctionDataSource,
    defaultUnitResolverDataSource,
    variables: { 
        myTableName: dynamoDbTable.tableName
    }
});

// When using SST:
const table = new sst.Table(this, "dynamodb", {
    fields: { pk: sst.TableFieldType.STRING },
    primaryIndex: { partitionKey: "pk" }
});
const loader = new SstVtlLoader(this, {
    api,
    defaultFunctionDataSource: "myTable",
    defaultUnitResolverDataSource: "myTable",
    variables: { 
        myTableName: table.dynamodbTable.tableName
    }
});
```

## Defaults and customization
By default, AppSync Butler expects your VTL functions and resolvers to be placed under `vtl/`. It is possible to change the root directory and file names such as the functions directory name, resolvers directory name, request mapping template file name by passing a `structure` object to `CdkVtlLoader` or `SstVtlLoader`. See [VtlDirectoryStructure](src/types.ts#65). Example:

```ts
const loader = new CdkVtlLoader({
    api,
    defaultFunctionDataSource,
    defaultUnitResolverDataSource,
    structure: {
        root: "vtl",
        resolvers: "resolvers",
        functions: "functions",
        unitStructure: {
            request: "request-mapping-template.vtl",
            response: "response-mapping-template.vtl"
        },
        pipelineStructure: {
            pipeline: "pipeline-def.seq",
            before: "before-mapping-template.vtl",
            after: "after-mapping-template.vtl"
        },
        functionStructure: {
            request: "request-mapping-template.vtl",
            response: "response-mapping-template.vtl",
            description: "description"
        }
    },
})
```


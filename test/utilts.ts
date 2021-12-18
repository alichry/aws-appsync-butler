import SstVtlLoader from '../src/SstVtlLoader';
import CdkVtlLoader from '../src/CdkVtlLoader';
import * as sst from "@serverless-stack/resources";
import * as cdk from '@aws-cdk/core';
import { Table, AttributeType } from '@aws-cdk/aws-dynamodb';
import { GraphqlApi } from '@aws-cdk/aws-appsync';
import { VtlReaderOptions } from '../src/types';

//dummyStack.resolve((api.graphqlApi.node.defaultChild as cdk.CfnElement).logicalId)

class SstDummyStack extends sst.Stack {}
class CdkDummyStack extends cdk.Stack {}

const createSstDummyStackAndAppsyncApi = () => {
    const app = new sst.App();
    const dummyStack = new SstDummyStack(app, "dummy-stack");
    const table = new sst.Table(dummyStack, "dynamodb-table", {
        fields: { pk: sst.TableFieldType.STRING, sk: sst.TableFieldType.STRING },
        primaryIndex: { partitionKey: "pk", sortKey: "sk" }
    });
    const api = new sst.AppSyncApi(dummyStack, "appsync-api", {
        dataSources: { myTable: { table } }
    });
    return { dummyStack,
        api: api,
        dynamoDbTable: table.dynamodbTable
    };
}

export const loadSst = (opts: VtlReaderOptions) => {
    const { dummyStack, api, dynamoDbTable } = createSstDummyStackAndAppsyncApi();
    const loader = new SstVtlLoader(dummyStack, {
        api,
        defaultFunctionDataSource: "myTable",
        defaultUnitResolverDataSource: "myTable",
        ...opts
    });
    loader.load();
    return {
        dummyStack,
        api,
        loader,
        dynamoDbTable
    };
}

export const loadCdk = (opts: VtlReaderOptions) => {
    const dummyStack = new CdkDummyStack();
    const table = new Table(dummyStack, "dummyTable", {
        partitionKey: { name: "pk", type: AttributeType.STRING }
    });
    const api = new GraphqlApi(dummyStack, "appsync", { name: "dummyApi" });
    const ds = api.addDynamoDbDataSource("dummyTable", table, { name: "myTable" });
    const loader = new CdkVtlLoader(dummyStack, {
        api,
        defaultFunctionDataSource: ds,
        defaultUnitResolverDataSource: ds,
        ...opts
    });
    loader.load();
    return { dummyStack, api, loader, dynamoDbTable: table };
}
import * as sst from "@serverless-stack/resources";
import * as cdk from 'aws-cdk-lib';
import { Table, AttributeType } from 'aws-cdk-lib/aws-dynamodb';
import { GraphqlApi } from '@aws-cdk/aws-appsync-alpha';
import { createLoader } from '../src/loader/utils.js';
import { ReaderOptions } from '../src/reader/types.js';
import { CdkLoaderOptions, SstLoaderOptions } from '../src/loader/types.js';

class SstDummyStack extends sst.Stack {}
class CdkDummyStack extends cdk.Stack {}

const createSstDummyStackAndAppsyncApi = () => {
    const app = new sst.App();
    const dummyStack = new SstDummyStack(app, "dummy-stack");
    const table = new sst.Table(dummyStack, "dynamodb-table", {
        fields: { pk: "string", sk: "string" },
        primaryIndex: { partitionKey: "pk", sortKey: "sk" }
    });
    const secondaryTable = new sst.Table(dummyStack, "dynamodb-table2", {
        fields: { pk: "string", sk: "string" },
        primaryIndex: { partitionKey: "pk", sortKey: "sk" }
    });
    const api = new sst.AppSyncApi(dummyStack, "appsync-api", {
        dataSources: {
            myTable: { type: "dynamodb", table },
            test: { type: "dynamodb", table: secondaryTable }
        }
    });
    return {
        dummyStack,
        api: api,
        dynamoDbTable: table.cdk.table,
        secondaryDynamoDbTable: secondaryTable.cdk.table
    };
}

export const loadSst = (opts: SstLoaderOptions | ReaderOptions, noDefault = false) => {
    const { dummyStack, api, dynamoDbTable, secondaryDynamoDbTable } = createSstDummyStackAndAppsyncApi();
    const loader = createLoader(dummyStack, {
        api,
        defaultFunctionDataSource: noDefault ? undefined : "myTable",
        defaultUnitResolverDataSource: noDefault ? undefined : "myTable",
        ...opts
    });
    loader.load();
    return {
        dummyStack,
        api,
        loader,
        dynamoDbTable,
        secondaryDynamoDbTable
    };
}

export const loadCdk = (opts: CdkLoaderOptions | ReaderOptions, noDefault = false) => {
    const dummyStack = new CdkDummyStack();
    const table = new Table(dummyStack, "dummyTable", {
        partitionKey: { name: "pk", type: AttributeType.STRING }
    });
    const secondaryTable = new Table(dummyStack, "dummyTable2", {
        partitionKey: { name: "pk", type: AttributeType.STRING }
    });
    const api = new GraphqlApi(dummyStack, "appsync", { name: "dummyApi" });
    const ds = api.addDynamoDbDataSource("myTable", table);
    const secondaryDs = api.addDynamoDbDataSource("test", secondaryTable);
    const loader = createLoader(dummyStack, {
        api,
        defaultFunctionDataSource: noDefault ? undefined : ds,
        defaultUnitResolverDataSource: noDefault ? undefined : ds,
        dataSources: {
            test: secondaryDs
        },
        ...opts
    });
    loader.load();
    return { dummyStack, api, loader, dynamoDbTable: table, secondaryDynamoDbTable: secondaryTable };
}
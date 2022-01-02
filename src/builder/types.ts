

import type { ParsedResolverInfo } from "../parser/types";

/**
 * The resolver tree is a two-dimensional object with keys as GraphQL types and
 * GraphQL fields for the first and second dimension (respectively).
 * Values cover information about parsed resolvers.
 * 
 * ```ts
 * import { ResolverType, ResolverTree } from "aws-appsync-butler";
 * const tree: ResolverTree = {
 *   Query: {
 *     getPost: {
 *       typeName: 'Query',
 *       fieldName: 'getPost',
 *       resolverType: ResolverType.Unit,
 *       requestMappingTemplate: {
 *         path: 'vtl/resolvers/Query/getPost/request.vtl',
 *         data: '#returrn({ "id": 1, "title": "Good Soup!" })'
 *       },
 *       responseMappingTemplate: {
 *         path: 'vtl/resolvers/Query/getPost/response.vtl',
 *         data: '$util.toJson($ctx.result)'
 *       },
 *     }
 *   },
 *   Mutation: {}
 * }
 * ```
 */
export interface ResolverTree {
    [typeName: string]: Record<string, ParsedResolverInfo>;
    Query: Record<string, ParsedResolverInfo>;
    Mutation: Record<string, ParsedResolverInfo>;
}
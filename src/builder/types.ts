import type { ParsedResolverInfo } from "../parser/types";

export interface ResolverTree {
    [typeName: string]: Record<string, ParsedResolverInfo>;
    Query: Record<string, ParsedResolverInfo>;
    Mutation: Record<string, ParsedResolverInfo>;
}
import type { ResolverTree } from "./types.js";
import type { ParsedResolverInfo,
    ParsedFunctionInfo,
    ParserOptions
} from '../parser/types.js';
import Parser from "../parser/Parser.js";

/**
 * Build a resolver tree from a VTL directory.
 * 
 * ```ts
 * import { Builder } from 'aws-appsync-butler';
 * const builder = new Builder();
 * builder.build();
 * const { getPost } = builder.resolvers.Query;
 * const { getUserById } = builder.functions;
 * ```
 */
export default class Builder {
    /**
     * The underlying parser instance that is responsible for parsing
     * resolvers and functions.
     */
    public readonly parser: Parser;

    /**
     * The resolver tree object, only populated after calling `build()`
     */
    public readonly resolvers: ResolverTree;

    /**
     * The function dictionary object, only populated after calling `build()`
     * Keys are function names and values are parsed function information.
     */
    public readonly functions: Record<string, ParsedFunctionInfo>;

    /**
     * @param optionsOrRoot Path to VTL directory or parsing instructions
     */
    constructor(optionsOrRoot?: ParserOptions | string) {
        this.resolvers = {
            Query: {},
            Mutation: {}
        };
        this.functions = {};
        this.parser = new Parser(optionsOrRoot);
    }

    /**
     * Traverse all the stored resolvers and functions to
     * build the resolver tree and function dictionary.
     */
    public build() {
        this.buildResolvers();
        this.buildFunctions();
    }

    protected buildResolvers() {
        const types = this.parser.readTypes();
        for (const typeName of types) {
            const fields = this.parser.readFields(typeName);
            for (const fieldName of fields) {
                const resolver = this.parser.parseResolver(typeName, fieldName);
                const type = this.createOrGetResolver(typeName);
                type[fieldName] = resolver;
            }
        }
    }

    protected buildFunctions() {
        const functions = this.parser.readFunctions();
        for (const fn of functions) {
            const func = this.parser.parseFunction(fn);
            this.functions[fn] = func;
        }
    }

    private createOrGetResolver(typeName: string): Record<string, ParsedResolverInfo> {
        const existingType = this.resolvers[typeName];
        if (existingType) {
            return existingType;
        }
        const type = {};
        this.resolvers[typeName] = type;
        return type;
    }
}
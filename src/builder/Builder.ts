import type { ResolverTree } from "./types";
import type { ParsedResolverInfo,
    ParsedFunctionInfo,
    ParserOptions
} from '../parser/types';
import Parser from "../parser/Parser";

export default class VtlBuilder {
    public readonly parser: Parser;
    public readonly resolvers: ResolverTree;
    public readonly functions: Record<string, ParsedFunctionInfo>;

    constructor(optionsOrRoot?: ParserOptions | string) {
        this.resolvers = {
            Query: {},
            Mutation: {}
        };
        this.functions = {};
        this.parser = new Parser(optionsOrRoot);
    }

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
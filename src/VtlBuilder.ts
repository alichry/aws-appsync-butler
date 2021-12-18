import VtlReader from "./VtlReader";
import type {
    ResolverTree,
    ResolverInfo,
    FunctionInfo,
    VtlReaderOptions,
} from "./types";

export default class VtlBuilder {
    public readonly reader: VtlReader;
    public readonly resolvers: ResolverTree;
    public readonly functions: Record<string, FunctionInfo>;

    constructor(optionsOrRoot?: VtlReaderOptions | string) {
        this.resolvers = {
            Query: {},
            Mutation: {}
        };
        this.functions = {};
        this.reader = new VtlReader(optionsOrRoot);
    }

    public build() {
        this.buildResolvers();
        this.buildFunctions();
    }

    protected buildResolvers() {
        const types = this.reader.readTypes();
        for (const typeName of types) {
            const fields = this.reader.readFields(typeName);
            for (const fieldName of fields) {
                const resolver = this.reader.readResolver(typeName, fieldName);
                const type = this.createOrGetResolver(typeName);
                type[fieldName] = resolver;
            }
        }
    }

    protected buildFunctions() {
        const functions = this.reader.readFunctions();
        for (const fn of functions) {
            const func = this.reader.readFunction(fn);
            this.functions[fn] = func;
        }
    }

    private createOrGetResolver(typeName: string): Record<string, ResolverInfo> {
        const existingType = this.resolvers[typeName];
        if (existingType) {
            return existingType;
        }
        const type = {};
        this.resolvers[typeName] = type;
        return type;
    }
}
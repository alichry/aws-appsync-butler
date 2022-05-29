import type { ReaderOptions,
    UnitResolverInfo,
    PipelineResolverInfo,
    FunctionInfo
} from "../reader/types.js";

export interface ParsedVtlFile {
    data: string;
}

export interface ParsedVtlRequest extends ParsedVtlFile {
    dataSource?: string;
}

export enum VtlFileType {
    Request = 'Request Mapping Template',
    Response = 'Response Mapping Template',
    Before = 'Before Mapping Template',
    After = 'After Mapping Template'
}

export interface ParsedUnitResolverInfo extends UnitResolverInfo {
    dataSource?: string;
}

export interface ParsedPipelineResolverInfo extends PipelineResolverInfo {
    functionSequence: string[];
}

export type ParsedResolverInfo = ParsedUnitResolverInfo | ParsedPipelineResolverInfo;

export interface ParsedFunctionInfo extends FunctionInfo {
    dataSource?: string;
}

export interface ParserOptions extends ReaderOptions {
    /**
     * Variables to replace in VTL files. See 
     * [Parser#setvariable](/docs/api/classes/Parser#setvariable) for sample usage
     */
    variables?: Record<string, string>;
}

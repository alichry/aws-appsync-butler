export const invalidDefaultRoot = "test/cases/invalid/default";
export const invalidCustomRoot = "test/cases/invalid/custom";
export const validDefaultRoot = "test/cases/valid/default";
export const validCustomRoot = "test/cases/valid/custom";

export const defaultStructure = {
    resolvers: "resolvers",
    functions: "functions",
    unitStructure: {
        request: "request.vtl",
        response: "response.vtl"
    },
    pipelineStructure: {
        pipeline: "pipeline.seq",
        before: "before.vtl",
        after: "after.vtl"
    },
    functionStructure: {
        request: "request.vtl",
        response: "response.vtl",
        description: "description.txt"
    }
};

export const customStructure = {
    resolvers: "vtl-resolvers",
    functions: "vtl-functions",
    unitStructure: {
        request: "request-mt.vtl",
        response: "response-mt.vtl"
    },
    pipelineStructure: {
        pipeline: "pipeline-def.seq",
        before: "before-mt.vtl",
        after: "after-mt.vtl"
    },
    functionStructure: {
        request: "request-mt.vtl",
        response: "response-mt.vtl",
        description: "description"
    }
};

export const invalidDefaultStructure = {
    root: invalidDefaultRoot,
    ...defaultStructure
};

export const invalidCustomStructure = {
    root: invalidCustomRoot,
    ...customStructure
};

export const validDefaultStructure = {
    root: validDefaultRoot,
    ...defaultStructure
};

export const validCustomStructure = {
    root: validCustomRoot,
    ...customStructure
};
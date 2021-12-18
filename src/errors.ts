export class ValidationError extends Error {
    constructor(message: string) {
        super(message);
  
        Object.setPrototypeOf(this, ValidationError.prototype);
        this.name = this.constructor.name;
    }
}

export class DirectoryValidationError extends ValidationError {
    public readonly directory: string;

    constructor(message: string, directory: string) {
        super(message + ` (directory: ${directory})`);
  
        Object.setPrototypeOf(this, DirectoryValidationError.prototype);
        this.name = this.constructor.name;
        this.directory = directory;
    }
}

export class FunctionValidationError extends ValidationError {
    public readonly functionName: string;
    
    constructor(message: string, functionName: string) {
        super(message + ` (function: ${functionName})`);
  
        Object.setPrototypeOf(this, FunctionValidationError.prototype);
        this.name = this.constructor.name;
        this.functionName = functionName;
    }
}

export class PipelineValidationError extends ValidationError {
    public readonly filePath: string;
    
    constructor(message: string, filePath: string) {
        super(message + ` (file: ${filePath})`);
  
        Object.setPrototypeOf(this, PipelineValidationError.prototype);
        this.name = this.constructor.name;
        this.filePath = filePath;
    }
}

export class UndefinedVariableError extends ValidationError {
    public readonly filePath: string;

    constructor(message: string, filePath: string) {
        super(message + ` (file: ${filePath})`);
  
        Object.setPrototypeOf(this, UndefinedVariableError.prototype);
        this.name = this.constructor.name;
        this.filePath = filePath;
    }
}
import ValidationError from "../ValidationError";

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

export class InvalidDirectiveError extends ValidationError {
    public readonly directive: string;
    public readonly filePath: string;

    constructor(message: string, filePath: string, directive: string) {
        super(
            message + " Possible directives are: ##@butler.dataSource('DataSourceKey') " +
            `(directive: ${directive} file: ${filePath})`
        );

        Object.setPrototypeOf(this, InvalidDirectiveError.prototype);
        this.name = this.constructor.name;
        this.directive = directive;
        this.filePath = filePath;
    }
}
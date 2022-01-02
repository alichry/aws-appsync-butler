import ValidationError from "../ValidationError";

/**
 * @category Error
 */
export class DirectoryValidationError extends ValidationError {
    public readonly directory: string;

    constructor(message: string, directory: string) {
        super(message + ` (directory: ${directory})`);
  
        Object.setPrototypeOf(this, DirectoryValidationError.prototype);
        this.name = this.constructor.name;
        this.directory = directory;
    }
}
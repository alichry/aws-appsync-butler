export default class ValidationError extends Error {
    constructor(message: string) {
        super(message);
  
        Object.setPrototypeOf(this, ValidationError.prototype);
        this.name = this.constructor.name;
    }
}
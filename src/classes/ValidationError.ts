import { OriginValidationError, ValidationErrorCodes, ValidationErrorsList } from "../data/validationErrors";

export { ValidationErrorCodes };

export interface ValidationErrorObject {
  code: ValidationErrorCodes;
  name: string;
  message: string;
};

export default class ValidationError {
  constructor(
    public code: ValidationErrorCodes,
    public name: string,
    public message: string
  ) { }

  static create(code: ValidationErrorCodes): ValidationError {
    let error: OriginValidationError = ValidationErrorsList[code];

    return new ValidationError(code, error.name, error.message);
  }

  get Error(): ValidationErrorObject {
    return {
      code: this.code,
      name: this.name,
      message: this.message
    };
  }

  get Message(): string {
    return this.message;
  }
}
interface ValidationErrorsList {
  [code: string]: OriginValidationError;
}

export interface OriginValidationError {
  name: string;
  message: string;
}

export enum ValidationErrorCodes {
  DEFAULT = 0,
  REQUIRED = 1,
  EMAIL = 2,
  PASSWORD = 3
};

export const ValidationErrorsList: ValidationErrorsList = {
  [ValidationErrorCodes.DEFAULT]: {
    name: "default",
    message: "Data not valid."
  },
  [ValidationErrorCodes.REQUIRED]: {
    name: "required",
    message: "Required field."
  },
  [ValidationErrorCodes.EMAIL]: {
    name: "email",
    message: "Wrong email."
  },
  [ValidationErrorCodes.PASSWORD]: {
    name: "password",
    message: "Passwords not match."
  }
}
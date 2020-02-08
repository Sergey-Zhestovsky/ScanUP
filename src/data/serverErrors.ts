type ErrorsList = {
  [code in ServerErrorCodes]: OriginError;
};

export interface OriginError {
  message: string;
}

export enum ServerErrorCodes {
  AXIOS__REQUEST_CANCELED = "client-001",
  ERROR_UNKNOWN = "000",
  USER__VALIDATION_MISSING_DATA = "001",
  USER__VALIDATION_TOKEN = "002",
  USER__BED_TOKEN = "003",
  USER_REGISTRATION__EMAIL_EXISTS = "004",
  USER_REGISTRATION__PASSPORT_EXISTS = "005",
  USER_AUTHORIZATION__WRONG_DATA = "006",
  USER_GET__NO_USER = "007",
  VALIDATION__REQUIRED_DATA = "008",
  TRANSPORT_SYSTEM_REMOVE__RECEPTIONS = "009",
  USER_REMOVE__BLOCKED = "010",
  PRIVILEGE__BLOCKED = "011",
  BAGGAGE__WRONG_STATE = "012",
  BAGGAGE__NOT_FOUND = "013",
  COMPLAINT__SCAN_NOT_FOUND = "014",
  SCANNER__IOT_NO_REQUESTS = "015"
};

export const ErrorsList: ErrorsList = {
  [ServerErrorCodes.AXIOS__REQUEST_CANCELED]: {
    message: "Request canceled"
  },
  [ServerErrorCodes.ERROR_UNKNOWN]: {
    message: "Unknown error occurred"
  },
  [ServerErrorCodes.USER__VALIDATION_MISSING_DATA]: {
    message: "Missing required user data"
  },
  [ServerErrorCodes.USER__VALIDATION_TOKEN]: {
    message: "Empty token"
  },
  [ServerErrorCodes.USER__BED_TOKEN]: {
    message: "Token was not verified"
  },
  [ServerErrorCodes.USER_REGISTRATION__EMAIL_EXISTS]: {
    message: "Email already exists"
  },
  [ServerErrorCodes.USER_REGISTRATION__PASSPORT_EXISTS]: {
    message: "Passport No. already exists"
  },
  [ServerErrorCodes.USER_AUTHORIZATION__WRONG_DATA]: {
    message: "Wrong email or password"
  },
  [ServerErrorCodes.USER_GET__NO_USER]: {
    message: "No user found"
  },
  [ServerErrorCodes.VALIDATION__REQUIRED_DATA]: {
    message: "Required data not received"
  },
  [ServerErrorCodes.TRANSPORT_SYSTEM_REMOVE__RECEPTIONS]: {
    message: "Transport system have receptions"
  },
  [ServerErrorCodes.USER_REMOVE__BLOCKED]: {
    message: "Cant remove user due to his privilege"
  },
  [ServerErrorCodes.PRIVILEGE__BLOCKED]: {
    message: "Not enough privileges"
  },
  [ServerErrorCodes.BAGGAGE__WRONG_STATE]: {
    message: "Wrong transportation state"
  },
  [ServerErrorCodes.BAGGAGE__NOT_FOUND]: {
    message: "Baggage not found"
  },
  [ServerErrorCodes.COMPLAINT__SCAN_NOT_FOUND]: {
    message: "Scan not found"
  },
  [ServerErrorCodes.SCANNER__IOT_NO_REQUESTS]: {
    message: "No requests in queue"
  },
};
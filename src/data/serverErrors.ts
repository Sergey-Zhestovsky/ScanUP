interface ErrorsList {
  [code: string]: OriginError;
}

export interface OriginError {
  message: string;
}

export enum ServerErrorCodes {
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
  "001": {
    message: "Missing required user data"
  },
  "002": {
    message: "Empty token"
  },
  "003": {
    message: "Token was not verified"
  },
  "004": {
    message: "Email already exists"
  },
  "005": {
    message: "Passport No. already exists"
  },
  "006": {
    message: "Wrong email or password"
  },
  "007": {
    message: "No user found"
  },
  "008": {
    message: "Required data not received"
  },
  "009": {
    message: "Transport system have receptions"
  },
  "010": {
    message: "Cant remove user due to his privilege"
  },
  "011": {
    message: "Not enough privileges"
  },
  "012": {
    message: "Wrong transportation state"
  },
  "013": {
    message: "Baggage not found"
  },
  "014": {
    message: "Scan not found"
  },
  "015": {
    message: "No requests in queue"
  },
};
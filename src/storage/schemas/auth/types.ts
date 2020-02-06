import { ACTIONS } from "./reducer";
import { ServerError } from "../../types/redux-actions";

export type DispatchObject =
  | DispatchUserObject
  | DispatchErrorObject
  | DispatchLoadingObject;

export interface DispatchLoadingObject {
  type: ACTIONS;
}

export interface DispatchUserObject {
  type: ACTIONS;
  user: object;
  details: DetailsObject;
}

export interface DispatchErrorObject {
  type: ACTIONS;
  error: ServerError;
}

export interface DetailsObject {
  name: string;
  passport?: string;
  transportSystemReception?: string;
  transportSystem?: string;
  [other: string]: any;
}

export interface AuthState {
  isAuthorized: boolean;
  user: Object | null;
  details: {
    name: string | null,
    passport: string | null,
    transportSystemReception: string | null,
    transportSystem: string | null
  },
  loaded: {
    login: boolean | null,
    signup: boolean | null,
    details: boolean | null
  },
  errors: {
    logout: ServerError | null,
    login: ServerError | null,
    signup: ServerError | null,
    details: ServerError | null
  }
}

export interface SignUpActionObject {
  user: string
}

export interface LoginActionObject {
  email: string,
  password: string
}

export interface IsRegisteredActionObject {
  passport: string
}
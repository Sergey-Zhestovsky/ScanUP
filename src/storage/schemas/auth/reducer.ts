import Cookies from "../../../classes/Cookies";
import { AuthState, DispatchUserObject, DispatchObject, DispatchErrorObject } from "./types";

export enum ACTIONS {
  LOGOUT_SUCCESS = "AUTHORIZATION::LOGOUT_SUCCESS",
  LOGOUT_ERROR = "AUTHORIZATION::LOGOUT_ERROR",
  LOGIN_SUCCESS = "AUTHORIZATION::LOGIN_SUCCESS",
  LOGIN_LOADING = "AUTHORIZATION::LOGIN_LOADING",
  LOGIN_ERROR = "AUTHORIZATION::LOGIN_ERROR",
  DETAILS_SUCCESS = "AUTHORIZATION::DETAILS_SUCCESS",
  DETAILS_LOADING = "AUTHORIZATION::DETAILS_LOADING",
  SIGN_UP_SUCCESS = "AUTHORIZATION::SIGN_UP_SUCCESS",
  SIGN_UP_ERROR = "AUTHORIZATION::SIGN_UP_ERROR",
  SIGN_UP_LOADING = "AUTHORIZATION::SIGN_UP_LOADING",
};

let user = Cookies.getAuthorizationFromCookie();

let initialState: AuthState = {
  isAuthorized: user ? true : false,
  user: user,
  details: {
    name: null,
    passport: null,
    transportSystemReception: null,
    transportSystem: null
  },
  loaded: {
    login: null,
    signup: null,
    details: null
  },
  errors: {
    logout: null,
    login: null,
    signup: null,
    details: null
  }
};

export default function authReducer(state = initialState, action: DispatchObject): AuthState {
  let userAction = action as DispatchUserObject,
    errorAction = action as DispatchErrorObject;

  switch (action.type) {
    case ACTIONS.LOGOUT_SUCCESS:
      return {
        ...state,
        isAuthorized: false,
        user: null,
        details: {
          name: null,
          passport: null,
          transportSystemReception: null,
          transportSystem: null
        },
        errors: {
          ...state.errors,
          logout: null
        }
      };
    case ACTIONS.LOGOUT_ERROR:
      return {
        ...state,
        errors: {
          ...state.errors,
          logout: errorAction.error
        }
      };
    case ACTIONS.LOGIN_SUCCESS:
      return {
        ...state,
        isAuthorized: true,
        user: userAction.user,
        details: {
          name: userAction.details.name,
          passport: userAction.details.passport || null,
          transportSystemReception: userAction.details.transportSystemReception || null,
          transportSystem: userAction.details.transportSystem || null
        },
        loaded: {
          ...state.loaded,
          login: true,
          details: true
        },
        errors: {
          ...state.errors,
          login: null
        }
      };
    case ACTIONS.LOGIN_LOADING:
      return {
        ...state,
        loaded: {
          ...state.loaded,
          login: false
        },
        errors: {
          ...state.errors,
          login: null
        }
      };
    case ACTIONS.LOGIN_ERROR:
      return {
        ...state,
        loaded: {
          ...state.loaded,
          login: true
        },
        errors: {
          ...state.errors,
          login: errorAction.error
        }
      };
    case ACTIONS.DETAILS_SUCCESS:
      console.log(action)
      action = action as DispatchUserObject;
      return {
        ...state,
        details: {
          name: userAction.details.name,
          passport: userAction.details.passport || null,
          transportSystemReception: userAction.details.transportSystemReception || null,
          transportSystem: userAction.details.transportSystem || null
        },
        loaded: {
          ...state.loaded,
          details: true
        }
      };
    case ACTIONS.DETAILS_LOADING:
      return {
        ...state,
        loaded: {
          ...state.loaded,
          details: false
        }
      };
    case ACTIONS.SIGN_UP_SUCCESS:
      action = action as DispatchUserObject;
      return {
        ...state,
        isAuthorized: true,
        user: userAction.user,
        details: {
          name: userAction.details.name,
          passport: userAction.details.passport || null,
          transportSystemReception: userAction.details.transportSystemReception || null,
          transportSystem: userAction.details.transportSystem || null
        },
        loaded: {
          ...state.loaded,
          signup: true,
          details: true
        },
        errors: {
          ...state.errors,
          signup: null
        }
      };
    case ACTIONS.SIGN_UP_LOADING:
      return {
        ...state,
        loaded: {
          ...state.loaded,
          signup: false
        },
        errors: {
          ...state.errors,
          signup: null
        }
      };
    case ACTIONS.SIGN_UP_ERROR:
      action = action as DispatchErrorObject;
      return {
        ...state,
        loaded: {
          ...state.loaded,
          signup: true
        },
        errors: {
          ...state.errors,
          signup: errorAction.error
        }
      };
    default:
      return state;
  }
}
import Cookies from "../../classes/Cookies";

export const ACTIONS = {
  LOGOUT_SUCCES: "AUTHORISATION::LOGOUT_SUCCES",
  LOGOUT_ERROR: "AUTHORISATION::LOGOUT_ERROR",
  LOGIN_SUCCES: "AUTHORISATION::LOGIN_SUCCES",
  LOGIN_LOADING: "AUTHORISATION::LOGIN_LOADING",
  LOGIN_ERROR: "AUTHORISATION::LOGIN_ERROR",
  DETAILS_SUCCES: "AUTHORISATION::DETAILS_SUCCES",
  DETAILS_LOADING: "AUTHORISATION::DETAILS_LOADING",
  SIGNUP_SUCCES: "AUTHORISATION::SIGNUP_SUCCES",
  SIGNUP_ERROR: "AUTHORISATION::SIGNUP_ERROR",
  SIGNUP_LOADING: "AUTHORISATION::SIGNUP_LOADING",
};

let user = Cookies.getAuthrizationFromCookie();

let initialState = {
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

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.LOGOUT_SUCCES:
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
        error: {
          ...state.errors,
          logout: null
        }
      };
    case ACTIONS.LOGOUT_ERROR:
      return {
        ...state,
        error: {
          ...state.errors,
          logout: action.error
        }
      };
    case ACTIONS.LOGIN_SUCCES:
      return {
        ...state,
        isAuthorized: true,
        user: action.user,
        details: {
          name: action.details.name,
          passport: action.details.passport,
          transportSystemReception: action.details.transportSystemReception || null,
          transportSystem: action.details.transportSystem || null
        },
        loaded: {
          ...state.loaded,
          login: true,
          details: true
        },
        error: {
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
        error: {
          ...state.errors,
          login: action.error
        }
      };
    case ACTIONS.DETAILS_SUCCES:
      return {
        ...state,
        details: {
          name: action.details.name,
          passport: action.details.passport,
          transportSystemReception: action.details.transportSystemReception || null,
          transportSystem: action.details.transportSystem || null
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
    case ACTIONS.SIGNUP_SUCCES:
      return {
        ...state,
        isAuthorized: true,
        user: action.user,
        details: {
          name: action.details.name,
          passport: action.details.passport,
          transportSystemReception: action.details.transportSystemReception || null,
          transportSystem: action.details.transportSystem || null
        },
        loaded: {
          ...state.loaded,
          signup: true,
          details: true
        },
        error: {
          ...state.errors,
          signup: null
        }
      };
    case ACTIONS.SIGNUP_LOADING:
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
    case ACTIONS.SIGNUP_ERROR:
      return {
        ...state,
        loaded: {
          ...state.loaded,
          signup: true
        },
        error: {
          ...state.errors,
          signup: action.error
        }
      };
    default:
      return state;
  }
}
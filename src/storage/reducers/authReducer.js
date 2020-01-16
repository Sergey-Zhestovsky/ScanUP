import Cookies from "../../classes/Cookies";

export const ACTIONS = {
  LOGOUT_SUCCES: "AUTHORISATION::LOGOUT_SUCCES",
  LOGOUT_ERROR: "AUTHORISATION::LOGOUT_ERROR",
  LOGIN_SUCCES: "AUTHORISATION::LOGIN_SUCCES",
  LOGIN_LOADING: "AUTHORISATION::LOGIN_LOADING",
  LOGIN_ERROR: "AUTHORISATION::LOGIN_ERROR",
  DETAILS_SUCCES: "AUTHORISATION::DETAILS_SUCCES"
};

let user = Cookies.getAuthrizationFromCookie();

let initialState = {
  isAuthorized: user ? true : false,
  user: user,
  details: {
    name: null
  },
  loading: {
    logout: false,
    login: false
  },
  errors: {
    logout: null,
    login: null
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
          name: null
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
          name: action.details.name
        },
        loading: {
          ...state.loading,
          login: false
        },
        error: {
          ...state.errors,
          login: null
        }
      };
    case ACTIONS.LOGIN_LOADING:
      return {
        ...state,
        loading: {
          ...state.loading,
          login: true
        },
        errors: {
          ...state.errors,
          login: null
        }
      };
    case ACTIONS.LOGIN_ERROR:
      return {
        ...state,
        loading: {
          ...state.loading,
          login: false
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
          name: action.details.name
        }
      };
    default:
      return state;
  }
}
import Cookies from "../../classes/Cookies";

export const ACTIONS = {
  LOGOUT_SUCCES: "AUTHORISATION::LOGOUT_SUCCES",
  LOGOUT_ERROR: "AUTHORISATION::LOGOUT_ERROR",
  LOGIN_SUCCES: "AUTHORISATION::LOGIN_SUCCES",
  LOGIN_LOADING: "AUTHORISATION::LOGIN_LOADING",
  LOGIN_ERROR: "AUTHORISATION::LOGIN_ERROR"
};

let user = Cookies.getAuthrizationFromCookie();

let initialState = {
  isAuthorized: user ? true : false,
  user: user,
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
  console.log(action)

  switch (action.type) {
    case ACTIONS.LOGOUT_SUCCES:
      return {
        ...state,
        isAuthorized: false,
        user: null,
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
    default:
      return state;
  }
}
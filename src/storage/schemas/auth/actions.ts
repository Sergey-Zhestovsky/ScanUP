import { Action } from "redux";
import { ACTIONS } from "./reducer";
import Cookies from "../../../classes/Cookies";
import { DispatchThunkWrapper, ServerErrorObject } from "../../types/redux-actions";
import { RootState } from "../../reducers/rootReducer";
import { RootConnector } from "../../connections/rootConnector";
import { DispatchObject, DetailsObject, SignUpActionObject, LoginActionObject } from "./types";

let signUp: DispatchThunkWrapper<SignUpActionObject, void, RootState, RootConnector, DispatchObject>;

signUp = function signUp(user) {
  return (dispatch, getState, { authConnector }) => {
    dispatch({ type: ACTIONS.SIGN_UP_LOADING });

    authConnector.signup(user)
      .then((details: DetailsObject) => {
        dispatch({
          type: ACTIONS.SIGN_UP_SUCCESS,
          user: Cookies.getAuthorizationFromCookie(),
          details
        });
      })
      .catch((error: ServerErrorObject) => {
        dispatch({
          type: ACTIONS.SIGN_UP_ERROR,
          error
        });
      });
  }
}

let logout: DispatchThunkWrapper<void, void, RootState, RootConnector, Action<string>>;

logout = function logout() {
  return (dispatch, getState, { authConnector }) => {
    authConnector.logout()
      .then((result: any) => {
        dispatch({
          type: ACTIONS.LOGOUT_SUCCESS
        });
      })
      .catch((error: ServerErrorObject) => {
        dispatch({
          type: ACTIONS.LOGOUT_ERROR,
          error
        });
      });
  }
}

let login: DispatchThunkWrapper<LoginActionObject, void, RootState, RootConnector, DispatchObject>;

login = function login(user) {
  return (dispatch, getState, { authConnector }) => {
    dispatch({ type: ACTIONS.LOGIN_LOADING });

    authConnector.login(user)
      .then((details: DetailsObject) => {
        dispatch({
          type: ACTIONS.LOGIN_SUCCESS,
          user: Cookies.getAuthorizationFromCookie(),
          details
        });
      })
      .catch((error: ServerErrorObject) => {
        dispatch({
          type: ACTIONS.LOGIN_ERROR,
          error
        });
      });
  }
}

let getUserDetail: DispatchThunkWrapper<void, void, RootState, RootConnector, DispatchObject>;

getUserDetail = function getUserDetail() {
  return (dispatch, getState, { authConnector }) => {
    let state = getState();

    if (!state.auth.isAuthorized)
      return;

    dispatch({ type: ACTIONS.DETAILS_LOADING });

    authConnector.getDetails()
      .then((details: DetailsObject) => {
        dispatch({
          type: ACTIONS.DETAILS_SUCCESS,
          details
        });
      })
      .catch((error: ServerErrorObject) => { });
  }
}

export { signUp, logout, login, getUserDetail };
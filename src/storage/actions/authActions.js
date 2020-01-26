import { ACTIONS } from "../reducers/authReducer";
import Cookies from "../../classes/Cookies";

export function signUp(user) {
  return (dispatch, getState, { authConnector }) => {
    dispatch({ type: ACTIONS.SIGNUP_LOADING });

    authConnector.signup(user)
      .then(details => {
        dispatch({
          type: ACTIONS.SIGNUP_SUCCES,
          user: Cookies.getAuthrizationFromCookie(),
          details
        });
      })
      .catch(error => {
        dispatch({
          type: ACTIONS.SIGNUP_ERROR,
          error
        });
      });
  }
}

export function logout() {
  return (dispatch, getState, { authConnector }) => {
    authConnector.logout()
      .then(result => {
        dispatch({
          type: ACTIONS.LOGOUT_SUCCES
        });
      })
      .catch(error => {
        dispatch({
          type: ACTIONS.LOGOUT_ERROR,
          error
        });
      });
  }
}

export function login(user) {
  return (dispatch, getState, { authConnector }) => {
    dispatch({ type: ACTIONS.LOGIN_LOADING });

    authConnector.login(user)
      .then(details => {
        dispatch({
          type: ACTIONS.LOGIN_SUCCES,
          user: Cookies.getAuthrizationFromCookie(),
          details
        });
      })
      .catch(error => {
        dispatch({
          type: ACTIONS.LOGIN_ERROR,
          error
        });
      });
  }
}

export function getUserDetail() {
  return (dispatch, getState, { authConnector }) => {
    let state = getState();

    if (!state.auth.isAuthorized)
      return;

    dispatch({ type: ACTIONS.DETAILS_LOADING });

    authConnector.getDetails()
      .then(details => {
        dispatch({
          type: ACTIONS.DETAILS_SUCCES,
          details
        });
      })
      .catch(error => { });
  }
}
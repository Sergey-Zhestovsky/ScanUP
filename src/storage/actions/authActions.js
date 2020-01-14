import { ACTIONS } from "../reducers/authReducer";
import Cookies from "../../classes/Cookies";

// export function signUp(user) {
//   return (dispatch, getState, { userConnector }) => {
//     userConnector.setUser(user)
//       .then(user => {
//         dispatch({
//           type: "SIGNUP_SUCCES",
//           user
//         });
//       })
//       .catch(error => {
//         dispatch({
//           type: "SIGNUP_ERROR",
//           error
//         });
//       });
//   }
// }

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
      .then(isAuthorized => {
        dispatch({
          type: ACTIONS.LOGIN_SUCCES,
          user: Cookies.getAuthrizationFromCookie()
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
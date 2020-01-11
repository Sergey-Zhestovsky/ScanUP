import jwt from "jsonwebtoken";
import Cookies from "js-cookie";

const SESION_COOKIE_NAME = "session_token";

export const ACTIONS = {

};

let user = getAuthrization();

let initialState = {
  isAuthorized: user ? true : false,
  user: user,
  errors: {}
};
console.log(initialState)
export default function authReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

function getAuthrization() {
  let token = Cookies.get(SESION_COOKIE_NAME);

  if (!token)
    return null;

  try {
    token = jwt.decode(token);
  } catch (err) {
    return null;
  }

  return token;
}
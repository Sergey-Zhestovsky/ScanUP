import jwt from "jsonwebtoken";
import CookiesAPI from "js-cookie";

import COOKIE_NAME from "../data/cookies";

export default class Cookies {
  static getAuthorizationFromCookie() {
    let token = CookiesAPI.get(COOKIE_NAME.SESSION);

    if (!token)
      return null;

    try {
      token = jwt.decode(token);
    } catch (err) {
      return null;
    }
  
    return token;
  }
}
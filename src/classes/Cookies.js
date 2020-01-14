import jwt from "jsonwebtoken";
import CookiesAPI from "js-cookie";

import COOKIE_NAME from "../data/cookies";

export default class Cookies {
  static getAuthrizationFromCookie() {
    let token = CookiesAPI.get(COOKIE_NAME.SESION);

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
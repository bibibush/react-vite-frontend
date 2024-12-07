import { CookieSetOptions } from "node_modules/universal-cookie/cjs/types";
import { Cookies } from "react-cookie";

const cookie = new Cookies();
export const cookieService = {
  getCookie(name: string) {
    return cookie.get(name);
  },

  setCookie(name: string, value: string, options?: CookieSetOptions) {
    cookie.set(name, value, options);
  },

  removeCookie(name: string) {
    cookie.remove(name);
  },
};

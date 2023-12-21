import Cookies from "js-cookie";

export const getToken = () => {
  // eslint-disable-next-line valid-typeof
  if (typeof window === undefined) {
    return null;
  }
  return Cookies.get("auth_token");
};

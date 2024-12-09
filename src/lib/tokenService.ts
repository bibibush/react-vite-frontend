export const tokenService = {
  getToken(key: string) {
    const token = localStorage.getItem(key);

    return token;
  },
  setToken(key: string, value: string) {
    localStorage.setItem(key, value);
  },
  removeToken(key: string[]) {
    for (const k of key) {
      localStorage.removeItem(k);
    }
  },
};

import { cookieService } from "@/lib/cookieService";
import { tokenService } from "@/lib/tokenService";
import Invested from "@/types/Invested";
import User from "@/types/User";
import { create } from "zustand";

interface Store {
  user: User;
  accessToken: string | null;
  isSignedIn: boolean;
  topbarKeyword: string;
}
interface Actions {
  setAccessToken: (token: string) => void;
  onChangeKeyword: (value: string) => void;
  setUser: (user: User) => void;
  setUserId: (userId: string) => void;
  setInvests: (invests: Array<Invested>) => void;
  onSignout: () => void;
}

const initialState: Store = {
  user: {
    id: null,
    isSuperuser: false,
    username: null,
    firstName: null,
    lastName: null,
    email: null,
    isStaff: false,
    dateJoined: null,
    invests: null,
  },
  accessToken: null,
  isSignedIn: false,
  topbarKeyword: "",
};

export const useFoxStore = create<Store & Actions>((set) => ({
  ...initialState,
  setAccessToken: (token) =>
    set(() => {
      tokenService.setToken("accessToken", token);
      return { accessToken: token, isSignedIn: true };
    }),
  onChangeKeyword: (value) =>
    set(() => {
      return { topbarKeyword: value };
    }),
  setUserId: (userId) =>
    set((state) => {
      tokenService.setToken("userId", userId);
      return { user: { ...state.user, id: Number(userId) } };
    }),
  setUser: (user) =>
    set(() => {
      return { user };
    }),
  setInvests: (invests) =>
    set((state) => {
      return { user: { ...state.user, invests } };
    }),
  onSignout: () =>
    set(() => {
      cookieService.removeCookie("refreshToken");
      tokenService.removeToken(["accessToken", "userId"]);
      return initialState;
    }),
}));

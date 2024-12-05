import { tokenService } from "@/lib/tokenService";
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
  setUser: (user) =>
    set(() => {
      return { user };
    }),
  onSignout: () =>
    set(() => {
      tokenService.removeToken("accessToken");
      return initialState;
    }),
}));

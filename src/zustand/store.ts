import { tokenService } from "@/lib/tokenService";
import { create } from "zustand";

interface Store {
  user: {
    id: number | null;
    isSuperuser: boolean;
    username: string | null;
    firstName: string | null;
    lastName: string | null;
    email: string | null;
    isStaff: boolean;
    createDt: string | null;
  };
  accessToken: string | null;
  isSignedIn: boolean;
  topbarKeyword: string;
}
interface Actions {
  setAccessToken: (token: string) => void;
  onChangeKeyword: (value: string) => void;
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
    createDt: null,
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
}));

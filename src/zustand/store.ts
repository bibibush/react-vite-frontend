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
};

export const useFoxStore = create<Store>((set) => ({
  ...initialState,
  isSignedIn: !!initialState.user.id,
  getAccessToken: (token: string) =>
    set(() => {
      tokenService.setToken("accessToken", token);
      return { accessToken: token };
    }),
}));

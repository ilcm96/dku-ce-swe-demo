import { create } from "zustand";

interface RegisterState {
  agreements: {
    terms: boolean;
    privacy: boolean;
    marketing: boolean;
  };
  userInfo: {
    id: string;
    password: string;
    name: string;
    birthdate: string;
    phone: string;
  };
  setAgreements: (agreements: RegisterState["agreements"]) => void;
  setUserInfo: (userInfo: Partial<RegisterState["userInfo"]>) => void;
  reset: () => void;
}

const initialState = {
  agreements: {
    terms: false,
    privacy: false,
    marketing: false,
  },
  userInfo: {
    id: "",
    password: "",
    name: "",
    birthdate: "",
    phone: "",
  },
};

export const useRegisterStore = create<RegisterState>((set) => ({
  ...initialState,
  setAgreements: (agreements) =>
    set((state) => ({
      ...state,
      agreements: { ...state.agreements, ...agreements },
    })),
  setUserInfo: (userInfo) =>
    set((state) => ({
      ...state,
      userInfo: { ...state.userInfo, ...userInfo },
    })),
  reset: () => set(initialState),
}));

import { create } from "zustand";

interface AuthStore {
  user: string;
  login: (username: string) => void;
  logout: () => void;
}

const useAuthStore = create<AuthStore>((setState) => ({
  user: "",

  login: (username) => setState(() => ({ user: username })),

  logout: () => setState(() => ({ user: "" })),
}));

export default useAuthStore;

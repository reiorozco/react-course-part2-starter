import { create } from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";

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

if (process.env.NODE_ENV === "development") {
  mountStoreDevtool("Auth store: ", useAuthStore);
}

export default useAuthStore;

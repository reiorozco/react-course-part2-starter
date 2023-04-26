import React, { ReactNode, useReducer } from "react";

import AuthContext from "./authContext";

interface LogInAction {
  type: "LOGIN";
  username: string;
}

interface LogOutAction {
  type: "LOGOUT";
}

export type AuthAction = LogInAction | LogOutAction;

const authReducer = (user: string, action: AuthAction): string => {
  switch (action.type) {
    case "LOGIN":
      return action.username;

    case "LOGOUT":
      return "";

    default:
      return user;
  }
};

interface Props {
  children: ReactNode;
}

function AuthProvider({ children }: Props) {
  const [user, dispatch] = useReducer(authReducer, "");

  return (
    <AuthContext.Provider value={{ user, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;

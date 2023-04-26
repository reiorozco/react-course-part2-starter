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

export default authReducer;

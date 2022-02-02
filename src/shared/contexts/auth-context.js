import { createContext } from "react";

export const AuthContext = createContext({
  isLoggedIn: false,
  userId: null,
  userImage: null,
  login: () => {},
  logout: () => {},
});

import { createContext } from "react";

export const initialState = {
  loggedIn: Boolean(localStorage.getItem("token")),
  flashMessages: [],
  user: localStorage.removeItem("user"),
  token: localStorage.getItem("token"),
};

const StateContext = createContext(initialState);

export default StateContext;

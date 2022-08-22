import React, { useReducer, createContext } from "react";
import { loginReducer } from "./reducer";

export const UserStateContext = createContext(null);

const initialState = {
  user: null,
};

const ContextProvider = ({ children }) => {
  const [userState, dispatch] = useReducer(loginReducer, initialState);

  return (
    <UserStateContext.Provider value={{ user: userState.user, dispatch }}>
      {children}
    </UserStateContext.Provider>
  );
};

export default ContextProvider;

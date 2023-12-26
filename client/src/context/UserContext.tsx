// UserContext.tsx
import React, { createContext, useContext, ReactNode, useReducer } from "react";

type UserState = {
  userId: string;
};

type UserAction = { type: "SET_USER_ID"; payload: string };

type UserContextType = {
  state: UserState;
  dispatch: React.Dispatch<UserAction>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

type UserProviderProps = {
  children: ReactNode;
};

const userReducer = (state: UserState, action: UserAction): UserState => {
  switch (action.type) {
    case "SET_USER_ID":
      return { ...state, userId: action.payload };
    default:
      return state;
  }
};

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, { userId: "" });

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

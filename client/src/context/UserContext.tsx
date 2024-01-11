// UserContext.tsx
import React, { createContext, useContext, ReactNode, useReducer } from "react";

export type UserState = {
  USER_ID: string;
  EMP_FULLNAME: string;
  APPROVALS: number;
  USER_EMAIL: string;
  USER_MOBILE1: string;
  OTP?: string;
};

type UserAction = { type: "SET_USER"; payload: UserState };

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
    case "SET_USER":
      return {
        ...state,
        USER_ID: action.payload.USER_ID,
        EMP_FULLNAME: action.payload.EMP_FULLNAME,
        APPROVALS: action.payload.APPROVALS,
        USER_EMAIL: action.payload.USER_EMAIL,
        USER_MOBILE1: action.payload.USER_MOBILE1,
        OTP: action.payload.OTP,
      };
    default:
      return state;
  }
};

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, {
    USER_ID: "",
    EMP_FULLNAME: "",
    APPROVALS: 0,
    USER_EMAIL: "",
    USER_MOBILE1: "",
    OTP: "",
  });

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

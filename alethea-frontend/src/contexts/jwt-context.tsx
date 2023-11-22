"use client";
import { createContext, useReducer } from "react";
import type { FC, ReactNode } from "react";
import PropTypes from "prop-types";
import type { User } from "@app/types";
import { axios } from "@app/utils";
import Cookies from "js-cookie";

interface State {
  user: User | null;
}

interface AuthContextValue extends State {
  platform: "JWT";
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

type LoginAction = {
  type: "LOGIN";
  payload: {
    user: User;
  };
};

type LogoutAction = {
  type: "LOGOUT";
};

type Action = LoginAction | LogoutAction;

const initialState: State = {
  user: Cookies.get("user") ? JSON?.parse(Cookies?.get("user") as any) : null,
};

const handlers: Record<string, (state: State, action: Action | any) => State> =
  {
    LOGIN: (state: State, action: LoginAction): State => {
      const { user } = action.payload;

      return {
        ...state,
        user,
      };
    },
    LOGOUT: (state: State): State => ({
      ...state,
      user: null,
    }),
  };

const reducer = (state: State, action: Action): State =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

const AuthContext = createContext<AuthContextValue>({
  ...initialState,
  platform: "JWT",
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
});

export const AuthProvider: FC<AuthProviderProps> = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);

  const login = async (email: string, password: string): Promise<void> => {
    const response = await axios.post("/users/login", { email, password });
    Cookies.set("user", JSON.stringify(response.data));

    dispatch({
      type: "LOGIN",
      payload: {
        user: response.data,
      },
    });
  };

  const logout = async (): Promise<void> => {
    Cookies.remove("user");
    dispatch({ type: "LOGOUT" });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        platform: "JWT",
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContext;

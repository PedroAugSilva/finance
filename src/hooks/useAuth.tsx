"use client";
import {
  createContext,
  ReactNode,
  useState,
  useEffect,
  useCallback,
  useContext,
} from "react";
import { useRouter } from "next/navigation";

import { setCookie, parseCookies, destroyCookie } from "nookies";
import { api } from "@/lib/axios";

interface IUser {
  id?: string;
  email: string;
  username?: string;
}

interface IUserSignin extends IUser {
  password: string;
}

interface IReceiveUserInfo {
  token: string;
  user: IUser;
}

interface IAuthContext {
  isAuthenticated: boolean;
  user: IUser | null;
  signup: ({ email, password, username }: IUserSignin) => Promise<void>;
  signin: ({ email, password }: IUserSignin) => Promise<void>;
  signout: () => void;
}

const AuthContext = createContext({} as IAuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  const [user, setUser] = useState<IUser | null>(null);

  const STORAGE_KEY = "finance.user-info";

  useEffect(() => {
    const { "finance.token": hasToken } = parseCookies();

    const hasStorage = localStorage.getItem(STORAGE_KEY);

    if (hasToken && hasStorage) {
      setUser(JSON.parse(hasStorage));
    }
  }, []);

  const signout = () => {
    localStorage.removeItem(STORAGE_KEY);
    router.push("/signin");
    destroyCookie(undefined, "finance.token");
  };

  const signup = useCallback(
    async ({ email, password, username }: IUserSignin) => {
      await api.post("/signup", {
        email,
        password,
        username,
      });
      router.push("/signin");
    },
    [router]
  );

  const signin = useCallback(
    async ({ email, password }: IUserSignin) => {
      const response = await api.post("/signin", {
        email,
        password,
      });

      const { token, user: receivedUser }: IReceiveUserInfo =
        await response.data;

      setCookie(undefined, "finance.token", token, {
        maxAge: 60 * 60 * 1,
      });

      api.defaults.headers["Authorization"] = `Bearer ${token}`;

      setUser(receivedUser);

      localStorage.setItem(STORAGE_KEY, JSON.stringify(receivedUser));

      router.push("/");
    },
    [router]
  );

  return (
    <AuthContext.Provider
      value={{ isAuthenticated: !!user, user, signup, signin, signout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

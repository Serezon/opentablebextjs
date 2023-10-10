"use client";

import axios from "axios";
import { getCookie } from "cookies-next";
import { useState, createContext, useEffect } from "react";

type TUser = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  city: string;
};

type TData = {
  loading: boolean;
  error: string | null;
  data: TUser | null;
};

type TAuthState = TData & {
  setAuthState: React.Dispatch<React.SetStateAction<TData>>;
};

export const AuthContext = createContext<TAuthState>({
  loading: true,
  error: null,
  data: null,
  setAuthState: () => {},
});

export default function AuthContextProvider({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState<TData>({
    loading: true,
    error: null,
    data: null,
  });

  const fetchUser = async () => {
    setAuthState({
      data: null,
      error: null,
      loading: true,
    });

    try {
      const jwt = getCookie("jwt");

      if (!jwt) {
        setAuthState({
          data: null,
          error: null,
          loading: false,
        });
        return;
      }

      axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;

      const response = await axios.get(`${window.location.origin}/api/auth/me`);

      setAuthState({
        data: response.data,
        error: null,
        loading: false,
      });
    } catch (e: any) {
      setAuthState({
        data: null,
        error: e?.response?.data?.message || null,
        loading: false,
      });
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ ...authState, setAuthState }}>{children}</AuthContext.Provider>
  );
}

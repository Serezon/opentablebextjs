import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { deleteCookie } from "cookies-next";

type TSignInParams = {
  email: string;
  password: string;
};

type TSignUpParams = {
  email: string;
  password: string;
  city: string;
  firstName: string;
  lastName: string;
  phone: string;
};

export default function useAuth() {
  const { setAuthState } = useContext(AuthContext);

  const signIn = async ({ email, password }: TSignInParams, onSuccess?: () => void) => {
    setAuthState({
      data: null,
      error: null,
      loading: true,
    });

    try {
      const response = await axios.post(`${window.location.origin}/api/auth/signin`, {
        email,
        password,
      });

      setAuthState({
        data: response.data,
        error: null,
        loading: false,
      });
      onSuccess?.();
    } catch (e: any) {
      setAuthState({
        data: null,
        error: e?.response?.data?.message || null,
        loading: false,
      });
    }
  };

  const signUp = async (params: TSignUpParams, onSuccess?: () => void) => {
    setAuthState({
      data: null,
      error: null,
      loading: true,
    });
    try {
      const response = await axios.post(`${window.location.origin}/api/auth/signup`, params);

      setAuthState({
        data: response.data,
        error: null,
        loading: false,
      });
      onSuccess?.();
    } catch (e: any) {
      setAuthState({
        data: null,
        error: e?.response?.data?.message || null,
        loading: false,
      });
    }
  };

  const signOut = async () => {
    deleteCookie("jwt");

    setAuthState({
      data: null,
      error: null,
      loading: false,
    });
  };

  return {
    signIn,
    signUp,
    signOut,
  };
}

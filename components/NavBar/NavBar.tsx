"use client";

import Link from "next/link";
import { useContext } from "react";
import AuthModal from "../AuthModal/AuthModal";
import { AuthContext } from "../../context/AuthContext";
import useAuth from "../../hooks/useAuth";

const NavBar = () => {
  const { signOut } = useAuth();
  const { data, loading } = useContext(AuthContext);

  const getActionButtons = () => {
    if (loading) {
      return new Array(2)
        .fill(0)
        .map((_, i) => i + 1)
        .map((i) => (
          <div
            key={i}
            className="mr-3 h-[34px] w-[80px] animate-pulse cursor-pointer overflow-hidden rounded border bg-slate-200 p-1 px-4"
          />
        ));
    }

    if (data) {
      return (
        <button className="mr-3 rounded border bg-blue-400 p-1 px-4 text-white" onClick={signOut}>
          Sign out
        </button>
      );
    }

    return (
      <>
        <AuthModal isSignIn />
        <AuthModal isSignIn={false} />
      </>
    );
  };

  return (
    <nav className="flex justify-between bg-white p-2">
      <Link href="/" className="text-2xl font-bold text-gray-700">
        OpenTable
      </Link>
      <div>
        <div className="flex">{getActionButtons()}</div>
      </div>
    </nav>
  );
};

export default NavBar;

"use client";

import { useMemo, useState, useContext } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import AuthModalInputs from "../AuthModalInputs/AuthModalInput";
import useAuth from "../../hooks/useAuth";
import { AuthContext } from "../../context/AuthContext";
import { Alert, CircularProgress } from "@mui/material";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

interface Props {
  isSignIn: boolean;
}

export default function AuthModal({ isSignIn }: Props) {
  const { data, error, loading } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  const { signIn, signUp } = useAuth();

  const renderContent = (signinContent: string, signupContent: string) => {
    return isSignIn ? signinContent : signupContent;
  };

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phone: "",
    city: "",
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setInputs({
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      phone: "",
      city: "",
    });
  };

  const isFormValid = useMemo<boolean>(() => {
    if (!isSignIn) {
      return Object.values(inputs).every((input) => input);
    }
    return Boolean(inputs.email && inputs.password);
  }, [inputs, isSignIn]);

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    if (isSignIn) {
      signIn({ email: inputs.email, password: inputs.password }, handleClose);
    } else {
      signUp(inputs, handleClose);
    }
  };

  return (
    <div>
      <button
        className={`mr-3 rounded border p-1 px-4${renderContent("", " bg-blue-400 text-white")}`}
        type="button"
        onClick={handleOpen}
      >
        {renderContent("Sign in", "Sign up")}
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {loading ? (
            <div className="flex h-[600px] items-center justify-center px-2 py-24">
              <CircularProgress />
            </div>
          ) : (
            <div className="h-[600px] p-2">
              {error && (
                <Alert severity="error" className="mb-4">
                  {error}
                </Alert>
              )}
              <div className="mb-2 border-b pb-2 text-center font-bold uppercase">
                <p className="text-sm">{renderContent("Sign In", "Create Account")}</p>
                <p>
                  {data?.firstName} {data?.lastName}
                </p>
              </div>
              <div className="m-auto">
                <h2 className="text-center text-2xl font-light">
                  {renderContent("Login Into Your Account", "Create Your Account")}
                </h2>
                <AuthModalInputs
                  inputs={inputs}
                  handleChangeInput={handleChangeInput}
                  isSignIn={isSignIn}
                />
                <button
                  className="mb-5 w-full rounded bg-red-600 p-3 text-sm uppercase text-white disabled:bg-gray-400"
                  disabled={!isFormValid}
                  onClick={handleSubmit}
                >
                  {renderContent("Sign In", "Create Account")}
                </button>
              </div>
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
}

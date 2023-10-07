"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import AuthModalInputs from "../AuthModalInputs/AuthModalInput";

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
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div>
      <button
        className={`mr-3 rounded border p-1 px-4${renderContent(
          "",
          " bg-blue-400 text-white"
        )}`}
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
          <div className="h-[600px] p-2">
            <div className="mb-2 border-b pb-2 text-center font-bold uppercase">
              <p className="text-sm">
                {renderContent("Sign In", "Create Account")}
              </p>
            </div>
            <div className="m-auto">
              <h2 className="text-center text-2xl font-light">
                {renderContent(
                  "Login Into Your Account",
                  "Create Your Account"
                )}
              </h2>
              <AuthModalInputs
                inputs={inputs}
                handleChangeInput={handleChangeInput}
                isSignIn={isSignIn}
              />
              <button className="mb-5 w-full rounded bg-red-600 p-3 text-sm uppercase text-white disabled:bg-gray-400">
                {renderContent("Sign In", "Create Account")}
              </button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

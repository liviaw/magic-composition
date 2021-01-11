import React from "react";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

export const showError: (msg: string) => React.ReactText = (msg: string) =>
  toast.error(`❌${msg}`, {
    position: "top-center",
    autoClose: 5000,
  });

export const ErrorModal: React.FC = () => (
  <ToastContainer
    position="top-center"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable={false}
    pauseOnHover
  />
);

import React from "react";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

// red-colored Toast
export const showError: (msg: string) => React.ReactText = (msg: string) =>
  toast.error(`❌${msg}`, {
    position: "top-center",
    autoClose: 5000,
  });

  // White-colored toast
export const showToast: (msg: string) => React.ReactText = (msg: string) =>
  toast(`💙${msg}`, {
    position: "top-center",
    autoClose: 10000,
  });

export const Toast: React.FC = () => (
  <ToastContainer
    position="top-center"
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable={false}
    pauseOnHover
  />
);

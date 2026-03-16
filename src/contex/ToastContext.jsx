import React, { createContext, useContext, useState } from "react";
import styles from "../styles/toast.module.css";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });

    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {toast && (
        <div className={`${styles.toast} ${styles[toast.type]}`}>
          {toast.message}
        </div>
      )}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  return useContext(ToastContext);
};
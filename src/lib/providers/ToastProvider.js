"use client";

import React, { createContext, useContext } from "react";
import { useToast } from "@/lib/hooks/useToast";
import { ErrorToastContainer } from "@/components/ui/ErrorToast";

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const toast = useToast();

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <ErrorToastContainer 
        toasts={toast.toasts} 
        removeToast={toast.removeToast} 
      />
    </ToastContext.Provider>
  );
}

export function useToastContext() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToastContext must be used within ToastProvider");
  }
  return context;
}
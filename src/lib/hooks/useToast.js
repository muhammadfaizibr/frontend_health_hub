"use client";

import { useState, useCallback } from "react";

let toastId = 0;

export function useToast() {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = "error", duration = 5000) => {
    const id = ++toastId;
    const newToast = { id, message, type, duration };
    
    setToasts((prev) => [...prev, newToast]);

    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const error = useCallback((message, duration) => {
    return showToast(message, "error", duration);
  }, [showToast]);

  const success = useCallback((message, duration) => {
    return showToast(message, "success", duration);
  }, [showToast]);

  const warning = useCallback((message, duration) => {
    return showToast(message, "warning", duration);
  }, [showToast]);

  const info = useCallback((message, duration) => {
    return showToast(message, "info", duration);
  }, [showToast]);

  const clearAll = useCallback(() => {
    setToasts([]);
  }, []);

  return {
    toasts,
    showToast,
    removeToast,
    error,
    success,
    warning,
    info,
    clearAll
  };
}
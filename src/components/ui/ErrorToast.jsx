"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export function ErrorToast({ 
  message, 
  onClose, 
  duration = 5000,
  type = "error" // error, success, warning, info
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Trigger enter animation
    requestAnimationFrame(() => {
      setIsVisible(true);
    });

    // Auto dismiss
    if (duration > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      onClose();
    }, 300); // Match animation duration
  };

  const getTypeStyles = () => {
    switch (type) {
      case "success":
        return {
          bg: "bg-green-50 dark:bg-green-900/20",
          border: "border-green-200 dark:border-green-800",
          icon: "check_circle",
          iconColor: "text-green-600 dark:text-green-400",
          textColor: "text-green-900 dark:text-green-100"
        };
      case "warning":
        return {
          bg: "bg-yellow-50 dark:bg-yellow-900/20",
          border: "border-yellow-200 dark:border-yellow-800",
          icon: "warning",
          iconColor: "text-yellow-600 dark:text-yellow-400",
          textColor: "text-yellow-900 dark:text-yellow-100"
        };
      case "info":
        return {
          bg: "bg-blue-50 dark:bg-blue-900/20",
          border: "border-blue-200 dark:border-blue-800",
          icon: "info",
          iconColor: "text-blue-600 dark:text-blue-400",
          textColor: "text-blue-900 dark:text-blue-100"
        };
      default: // error
        return {
          bg: "bg-red-50 dark:bg-red-900/20",
          border: "border-red-200 dark:border-red-800",
          icon: "error",
          iconColor: "text-red-600 dark:text-red-400",
          textColor: "text-red-900 dark:text-red-100"
        };
    }
  };

  const styles = getTypeStyles();

  return (
    <div
      className={`
        flex items-start gap-3 p-4 rounded-lg border shadow-lg backdrop-blur-sm
        min-w-[320px] max-w-[420px]
        ${styles.bg} ${styles.border}
        transition-all duration-300 ease-out
        ${isVisible && !isExiting ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
      `}
      role="alert"
    >
      <span className={`material-symbols-outlined ${styles.iconColor} flex-shrink-0`}>
        {styles.icon}
      </span>
      
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-medium ${styles.textColor} break-words`}>
          {message}
        </p>
      </div>
      
      <button
        onClick={handleClose}
        className={`
          flex-shrink-0 ${styles.iconColor} hover:opacity-70 
          transition-opacity focus:outline-none focus:ring-2 
          focus:ring-offset-1 rounded
        `}
        aria-label="Close notification"
      >
        <span className="material-symbols-outlined text-lg">close</span>
      </button>
    </div>
  );
}

export function ErrorToastContainer({ toasts, removeToast }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 pointer-events-none">
      {toasts.map((toast) => (
        <div key={toast.id} className="pointer-events-auto">
          <ErrorToast
            message={toast.message}
            type={toast.type}
            duration={toast.duration}
            onClose={() => removeToast(toast.id)}
          />
        </div>
      ))}
    </div>,
    document.body
  );
}

export default ErrorToast;
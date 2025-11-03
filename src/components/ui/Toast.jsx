"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Button } from "./Button";

export function Toast({ 
  message, 
  onClose, 
  duration = 5000,
  type = "error"
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => {
      setIsVisible(true);
    });

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
    }, 300);
  };

  const getTypeStyles = () => {
    switch (type) {
      case "success":
        return {
          bgClass: "bg-success/10",
          borderClass: "border-success",
          icon: "check_circle",
          iconClass: "text-success",
          textClass: "text-success"
        };
      case "warning":
        return {
          bgClass: "bg-warning/10",
          borderClass: "border-warning",
          icon: "warning",
          iconClass: "text-warning",
          textClass: "text-warning"
        };
      case "info":
        return {
          bgClass: "bg-info/10",
          borderClass: "border-info",
          icon: "info",
          iconClass: "text-info",
          textClass: "text-info"
        };
      default:
        return {
          bgClass: "bg-error/10",
          borderClass: "border-error",
          icon: "error",
          iconClass: "text-error",
          textClass: "text-error"
        };
    }
  };

  const styles = getTypeStyles();

  return (
    <div
      className={`
        flex items-center gap-3 p-4 rounded-lg border shadow-lg backdrop-blur-sm
        min-w-[320px] max-w-[420px]
        ${styles.bgClass} ${styles.borderClass}
        transition-all duration-300 ease-out
        ${isVisible && !isExiting ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
      `}
      role="alert"
    >
      <span className={`material-symbols-outlined ${styles.iconClass} flex-shrink-0`}>
        {styles.icon}
      </span>
      
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-medium ${styles.textClass} break-words`}>
          {message}
        </p>
      </div>
      
      <Button
        variant="ghost"
        size="sm"
        onClick={handleClose}
        className={`flex-shrink-0 p-1 ${styles.iconClass}`}
      >
        <span className="material-symbols-outlined text-lg">close</span>
      </Button>
    </div>
  );
}

export function ToastContainer({ toasts, removeToast }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <div className="fixed bottom-4 right-4 z-100 flex items-center flex-col gap-2 pointer-events-none">
      {toasts.map((toast) => (
        <div key={toast.id} className="pointer-events-auto">
          <Toast
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

export default Toast;
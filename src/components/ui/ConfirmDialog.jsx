"use client";

import React from "react";
import { Button } from "@/components/ui/Button";

export default function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  isLoading = false,
  variant = "danger", // danger, primary, warning
}) {
  if (!isOpen) return null;

  const variantStyles = {
    danger: "bg-red-600 hover:bg-red-700",
    primary: "bg-primary hover:bg-primary/90",
    warning: "bg-yellow-600 hover:bg-yellow-700",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-surface rounded-lg shadow-xl max-w-md w-full">
        <div className="p-6">
          <div className="flex items-start gap-4">
            <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
              variant === 'danger' ? 'bg-red-100' : 
              variant === 'warning' ? 'bg-yellow-100' : 
              'bg-blue-100'
            }`}>
              <span className={`material-symbols-outlined ${
                variant === 'danger' ? 'text-red-600' : 
                variant === 'warning' ? 'text-yellow-600' : 
                'text-blue-600'
              }`}>
                {variant === 'danger' ? 'warning' : 'info'}
              </span>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-primary mb-2">
                {title}
              </h3>
              <p className="text-sm text-secondary">
                {message}
              </p>
            </div>
          </div>
        </div>

        <div className="px-6 pb-6 flex gap-3">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
            className="flex-1"
          >
            {cancelText}
          </Button>
          <Button
            onClick={onConfirm}
            disabled={isLoading}
            className={`flex-1 ${variantStyles[variant]}`}
          >
            {isLoading ? "Processing..." : confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
}
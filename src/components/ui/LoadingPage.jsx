"use client";

import React from "react";
import { LoadingSpinner } from "./LoadingSpinner";

export const LoadingPage = ({ message = "Loading..." }) => {
  return (
    <div className="min-h-screen bg-primary flex items-center justify-center">
      <div className="text-center">
        <LoadingSpinner size="lg" className="mb-4" />
        <p className="text-secondary">{message}</p>
      </div>
    </div>
  );
};

export default LoadingPage;

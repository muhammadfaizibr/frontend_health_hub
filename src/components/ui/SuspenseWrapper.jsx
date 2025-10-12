"use client";

import React, { Suspense } from "react";
import { LoadingPage } from "./LoadingPage";

export const SuspenseWrapper = ({ children, fallback }) => {
  return (
    <Suspense fallback={fallback || <LoadingPage />}>
      {children}
    </Suspense>
  );
};

export default SuspenseWrapper;

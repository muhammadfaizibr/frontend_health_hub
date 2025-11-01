"use client";

import React from "react";
import { Button } from "@/components/ui/Button";

export function EmptyState({ icon, title, description, actionLabel, onAction }) {
  return (
    <div className="text-center py-12">
      <span className="material-symbols-outlined text-6xl text-secondary mb-4">
        {icon}
      </span>
      <h3 className="text-xl font-semibold text-primary mb-2">
        {title}
      </h3>
      <p className="text-secondary mb-4">
        {description}
      </p>
      {actionLabel && onAction && (
        <Button onClick={onAction}>
          <span className="material-symbols-outlined text-sm">add</span>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
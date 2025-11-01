"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import PropTypes from "prop-types";

export const EmptyState = ({ 
  icon, 
  title, 
  description, 
  actionLabel, 
  actionHref,
  onAction 
}) => (
  <div className="flex flex-col gap-2 text-center py-12 items-center">
    <span className="material-symbols-outlined icon-xl text-secondary mb-4">
      {icon}
    </span>
    <h3 className="text-xl font-semibold text-primary mb-2">{title}</h3>
    <p className="text-secondary mb-4">{description}</p>
    {actionLabel && (actionHref || onAction) && (
      actionHref ? (
        <Link href={actionHref}>
          <Button>
            <span className="material-symbols-outlined text-sm">add</span>
            {actionLabel}
          </Button>
        </Link>
      ) : (
        <Button onClick={onAction}>
          <span className="material-symbols-outlined text-sm">add</span>
          {actionLabel}
        </Button>
      )
    )}
  </div>
);

EmptyState.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  actionLabel: PropTypes.string,
  actionHref: PropTypes.string,
  onAction: PropTypes.func,
};

export default EmptyState;
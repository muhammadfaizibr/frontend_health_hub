"use client";

import React from "react";
import PropTypes from "prop-types";
import { Badge } from "./Badge";

export const StatusBadge = ({ status, size = "md", className = "" }) => {
  if (!status) return null;

  const normalized = status.toLowerCase().replace(/\s+/g, '_');
  
  return (
    <Badge variant={normalized} size={size} className={className}>
      {status}
    </Badge>
  );
};

StatusBadge.propTypes = {
  status: PropTypes.string.isRequired,
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  className: PropTypes.string
};

export default StatusBadge;
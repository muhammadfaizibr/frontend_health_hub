import React from "react";

export default function StatusBadge({ status }) {
  const statusClasses = {
    "Confirmed": "badge badge-success",
    "Pending": "badge badge-warning",
    "Completed": "badge badge-info",
    "Cancelled": "badge badge-error",
    "In Progress": "badge badge-primary",
    "Open": "badge badge-info",
    "confirmed": "badge badge-success",
    "completed": "badge badge-info",
    "cancelled": "badge badge-error",
    "pending": "badge badge-warning",
    "active": "badge badge-success",
    "expired": "badge badge-error"
  };
  
  return (
    <span className={statusClasses[status] || "badge badge-secondary"}>
      {status}
    </span>
  );
}
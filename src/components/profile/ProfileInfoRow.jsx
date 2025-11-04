// components/profile/ProfileInfoRow.jsx
import React from "react";

export default function ProfileInfoRow({ label, value, icon }) {
  return (
    <div className="flex items-start gap-3 py-3 border-b border-color last:border-0">
      {icon && (
        <span className="material-symbols-outlined text-secondary text-xl mt-0.5">
          {icon}
        </span>
      )}
      <div className="flex-1">
        <p className="text-sm text-secondary mb-1">{label}</p>
        <p className="text-primary font-medium">{value || "Not provided"}</p>
      </div>
    </div>
  );
}
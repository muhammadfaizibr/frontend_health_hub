// components/profile/ProfileSection.jsx
import React from "react";

export default function ProfileSection({ title, icon, children, action }) {
  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          {icon && (
            <span className="material-symbols-outlined text-primary-color text-2xl">
              {icon}
            </span>
          )}
          <h2 className="text-xl font-semibold text-primary">{title}</h2>
        </div>
        {action}
      </div>
      {children}
    </div>
  );
}
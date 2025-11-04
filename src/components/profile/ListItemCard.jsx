// components/profile/ListItemCard.jsx
import React from "react";
import { Button } from "@/components/ui/Button";

export default function ListItemCard({ 
  title, 
  subtitle, 
  details, 
  onEdit, 
  onDelete,
  icon 
}) {
  return (
    <div className="card hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex gap-3 flex-1">
          {icon && (
            <span className="material-symbols-outlined text-primary-color text-2xl">
              {icon}
            </span>
          )}
          <div className="flex-1">
            <h3 className="font-semibold text-primary mb-1">{title}</h3>
            {subtitle && (
              <p className="text-sm text-secondary mb-2">{subtitle}</p>
            )}
            {details && (
              <div className="text-sm text-secondary space-y-1">
                {details.map((detail, index) => (
                  <p key={index}>{detail}</p>
                ))}
              </div>
            )}
          </div>
        </div>
        
        <div className="flex gap-2">
          {onEdit && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onEdit}
              icon="edit"
            />
          )}
          {onDelete && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onDelete}
              icon="delete"
              className="text-error hover:text-error hover:bg-error/10"
            />
          )}
        </div>
      </div>
    </div>
  );
}
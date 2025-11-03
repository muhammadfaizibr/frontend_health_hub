// components/translator/LanguageCard.jsx
"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { useToastContext } from "@/lib/providers/ToastProvider";
import { useDeleteTranslatorLanguage } from "@/lib/hooks/useTranslator";
import { Modal } from "@/components/ui/Modal";

const PROFICIENCY_COLORS = {
  basic: "bg-warning/10 text-warning",
  intermediate: "bg-info/10 text-info",
  advanced: "bg-success/10 text-success",
  native: "bg-primary-color/10 text-primary-color",
};

export default function LanguageCard({ language, onEdit, onUpdate }) {
  const toast = useToastContext();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const deleteLanguageMutation = useDeleteTranslatorLanguage();

  const handleDelete = async () => {
    try {
      await deleteLanguageMutation.mutateAsync(language.id);
      toast.success("Language deleted successfully");
      setShowDeleteConfirm(false);
      onUpdate?.();
    } catch (error) {
      toast.error(error?.response?.data?.detail || "Failed to delete language");
    }
  };

  return (
    <>
      <div className="card bg-surface p-4 hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-primary">
                translate
              </span>
              <h3 className="font-semibold text-primary text-lg uppercase">
                {language.language_code}
              </h3>
            </div>
            
            <div className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
              PROFICIENCY_COLORS[language.proficiency_level] || 'bg-secondary/10 text-secondary'
            }`}>
              {language.proficiency_level}
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(language)}
              className="p-2"
            >
              <span className="material-symbols-outlined text-sm">edit</span>
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowDeleteConfirm(true)}
              className="p-2 text-error hover:bg-error/10"
            >
              <span className="material-symbols-outlined text-sm">delete</span>
            </Button>
          </div>
        </div>
      </div>

      <Modal
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        title="Delete Language"
        size="sm"
      >
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-full bg-error/10 flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-error text-2xl">warning</span>
            </div>
            <div className="flex-1">
              <p className="text-primary font-semibold mb-2">
                Are you sure you want to delete this language?
              </p>
              <p className="text-sm text-secondary">
                This will remove {language.language_code.toUpperCase()} ({language.proficiency_level}) from your profile.
              </p>
            </div>
          </div>

          <div className="flex gap-3 justify-end pt-2">
            <Button 
              variant="outline"
              onClick={() => setShowDeleteConfirm(false)}
              disabled={deleteLanguageMutation.isPending}
            >
              Cancel
            </Button>
            <Button 
              variant="emergency"
              onClick={handleDelete}
              isLoading={deleteLanguageMutation.isPending}
            >
              Delete Language
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
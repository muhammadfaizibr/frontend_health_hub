// app/translator/languages/page.jsx
"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import EmptyState from "@/components/ui/EmptyState";
import LanguageCard from "@/components/translator/LanguageCard";
import LanguageModal from "@/components/translator/LanguageModal";
import { useTranslatorLanguages } from "@/lib/hooks/useTranslator";

export default function TranslatorLanguagesPage() {
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(null);

  const { languages: languagesData, isLoading, refetch } = useTranslatorLanguages();

  const languages = languagesData?.results || [];

  const handleEditLanguage = (language) => {
    setSelectedLanguage(language);
    setShowLanguageModal(true);
  };

  const handleLanguageModalClose = () => {
    setShowLanguageModal(false);
    setSelectedLanguage(null);
  };

  const handleLanguageSuccess = () => {
    handleLanguageModalClose();
    refetch();
  };

  // Group languages by proficiency level
  const languagesByProficiency = languages.reduce((acc, lang) => {
    if (!acc[lang.proficiency_level]) {
      acc[lang.proficiency_level] = [];
    }
    acc[lang.proficiency_level].push(lang);
    return acc;
  }, {});

  const proficiencyOrder = ['native', 'fluent', 'intermediate', 'advanced'];

  return (
    <>
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold text-primary">Languages</h1>
            <p className="text-secondary mt-1">
              Manage the languages you can translate
            </p>
          </div>
          <Button onClick={() => setShowLanguageModal(true)}>
            <span className="material-symbols-outlined text-sm">add</span>
            Add Language
          </Button>
        </div>

        {/* Statistics */}
        {languages.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="card bg-surface p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-secondary mb-1">Total Languages</p>
                  <p className="text-2xl font-bold text-primary">{languages.length}</p>
                </div>
                <div className="flex p-3 bg-primary-color/10 rounded-lg">
                  <span className="material-symbols-outlined text-2xl text-primary-color">
                    translate
                  </span>
                </div>
              </div>
            </div>

            {proficiencyOrder.map(level => {
              const count = languagesByProficiency[level]?.length || 0;
              if (count === 0) return null;
              
              return (
                <div key={level} className="card bg-surface p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-secondary mb-1 capitalize">{level}</p>
                      <p className="text-2xl font-bold text-primary">{count}</p>
                    </div>
                    <div className="flex p-3 bg-success/10 rounded-lg">
                      <span className="material-symbols-outlined text-2xl text-success">
                        verified
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Languages List */}
        <div className="space-y-6">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <LoadingSpinner />
            </div>
          ) : languages.length > 0 ? (
            proficiencyOrder.map(level => {
              const levelLanguages = languagesByProficiency[level];
              if (!levelLanguages || levelLanguages.length === 0) return null;

              return (
                <div key={level} className="flex flex-col gap-2 space-y-3">
                  <h2 className="text-xl font-semibold text-primary capitalize">
                    {level} ({levelLanguages.length})
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {levelLanguages.map(language => (
                      <LanguageCard
                        key={language.id}
                        language={language}
                        onEdit={handleEditLanguage}
                        onUpdate={refetch}
                      />
                    ))}
                  </div>
                </div>
              );
            })
          ) : (
            <EmptyState
              icon="translate"
              title="No languages added"
              description="Add the languages you can translate to help patients find you."
              actionLabel="Add First Language"
              onAction={() => setShowLanguageModal(true)}
            />
          )}
        </div>

        {/* Info Card */}
{languages.length > 0 && (
  <div className="flex flex-col gap-4 card bg-surface p-6">
    <h3 className="text-lg font-semibold text-primary mb-4">
      Language Proficiency Levels
    </h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      <div className="flex items-start gap-2">
        <span className="material-symbols-outlined text-primary-color text-sm mt-0.5">
          check_circle
        </span>
        <div>
          <p className="text-sm font-medium text-primary">Native</p>
          <p className="text-xs text-secondary">Native or bilingual proficiency</p>
        </div>
      </div>
      <div className="flex items-start gap-2">
        <span className="material-symbols-outlined text-success text-sm mt-0.5">
          check_circle
        </span>
        <div>
          <p className="text-sm font-medium text-primary">Fluent</p>
          <p className="text-xs text-secondary">Full professional proficiency</p>
        </div>
      </div>
      <div className="flex items-start gap-2">
        <span className="material-symbols-outlined text-info text-sm mt-0.5">
          check_circle
        </span>
        <div>
          <p className="text-sm font-medium text-primary">Advanced</p>
          <p className="text-xs text-secondary">Professional working proficiency</p>
        </div>
      </div>
      <div className="flex items-start gap-2">
        <span className="material-symbols-outlined text-warning text-sm mt-0.5">
          check_circle
        </span>
        <div>
          <p className="text-sm font-medium text-primary">Intermediate</p>
          <p className="text-xs text-secondary">Limited working proficiency</p>
        </div>
      </div>
    </div>
  </div>
)}

      </div>

      {/* Language Modal */}
      <LanguageModal
        isOpen={showLanguageModal}
        onClose={handleLanguageModalClose}
        language={selectedLanguage}
        onSuccess={handleLanguageSuccess}
      />
    </>
  );
}
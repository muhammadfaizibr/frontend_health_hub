"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/forms/Input";
import { Select } from "@/components/forms/Select";

export default function TranslatorLanguagesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [proficiencyFilter, setProficiencyFilter] = useState("");

  const languages = [
    {
      id: 1,
      name: "Spanish",
      code: "es",
      proficiency: "native",
      certifications: [
        "Certified Medical Interpreter (CMI) - Spanish",
        "Healthcare Interpreter Certificate - Spanish"
      ],
      experience: "8 years",
      totalAssignments: 156,
      averageRating: 4.8,
      isActive: true,
      specialties: ["Cardiology", "General Practice", "Pediatrics"]
    },
    {
      id: 2,
      name: "French",
      code: "fr",
      proficiency: "fluent",
      certifications: [
        "Certified Medical Interpreter (CMI) - French"
      ],
      experience: "6 years",
      totalAssignments: 89,
      averageRating: 4.7,
      isActive: true,
      specialties: ["Surgery", "Orthopedics", "Emergency Medicine"]
    },
    {
      id: 3,
      name: "Hindi",
      code: "hi",
      proficiency: "fluent",
      certifications: [
        "Healthcare Interpreter Certificate - Hindi"
      ],
      experience: "5 years",
      totalAssignments: 67,
      averageRating: 4.6,
      isActive: true,
      specialties: ["Internal Medicine", "Dermatology", "Psychiatry"]
    },
    {
      id: 4,
      name: "Arabic",
      code: "ar",
      proficiency: "conversational",
      certifications: [],
      experience: "3 years",
      totalAssignments: 34,
      averageRating: 4.4,
      isActive: true,
      specialties: ["General Practice", "Emergency Medicine"]
    },
    {
      id: 5,
      name: "Mandarin",
      code: "zh",
      proficiency: "conversational",
      certifications: [],
      experience: "2 years",
      totalAssignments: 23,
      averageRating: 4.2,
      isActive: false,
      specialties: ["General Practice"]
    }
  ];

  const proficiencyOptions = [
    { value: "", label: "All Proficiency Levels" },
    { value: "native", label: "Native" },
    { value: "fluent", label: "Fluent" },
    { value: "conversational", label: "Conversational" },
    { value: "basic", label: "Basic" }
  ];

  const getProficiencyBadge = (proficiency) => {
    const proficiencyClasses = {
      native: "badge badge-success",
      fluent: "badge badge-info",
      conversational: "badge badge-warning",
      basic: "badge badge-error"
    };
    
    return proficiencyClasses[proficiency] || "badge badge-secondary";
  };

  const getRatingStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={`material-symbols-outlined text-sm ${
          i < Math.floor(rating) ? 'text-warning' : 'text-secondary'
        }`}
      >
        star
      </span>
    ));
  };

  const filteredLanguages = languages.filter(lang => {
    const matchesSearch = lang.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lang.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesProficiency = !proficiencyFilter || lang.proficiency === proficiencyFilter;
    
    return matchesSearch && matchesProficiency;
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">Language Management</h1>
          <p className="text-secondary mt-1">
            Manage your language skills and certifications
          </p>
        </div>
        <Button>
          <span className="material-symbols-outlined text-sm mr-2">add</span>
          Add Language
        </Button>
      </div>

      {/* Filters */}
      <div className="card bg-surface p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            placeholder="Search languages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon="search"
          />
          <Select
            value={proficiencyFilter}
            onChange={(e) => setProficiencyFilter(e.target.value)}
            options={proficiencyOptions}
            placeholder="Filter by proficiency"
          />
        </div>
      </div>

      {/* Languages List */}
      <div className="flex flex-col gap-4">
        {filteredLanguages.map((language) => (
          <div key={language.id} className="card bg-surface p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-xl font-semibold text-primary">
                    {language.name} ({language.code.toUpperCase()})
                  </h3>
                  <span className={getProficiencyBadge(language.proficiency)}>
                    {language.proficiency}
                  </span>
                  {language.isActive ? (
                    <span className="badge badge-success">Active</span>
                  ) : (
                    <span className="badge badge-secondary">Inactive</span>
                  )}
                </div>
                <p className="text-secondary text-sm mb-2">
                  Experience: {language.experience} • Assignments: {language.totalAssignments}
                </p>
                <div className="flex items-center gap-1 mb-2">
                  {getRatingStars(language.averageRating)}
                  <span className="text-xs text-secondary ml-1">
                    {language.averageRating}/5.0
                  </span>
                </div>
              </div>
              <div className="text-right">
                <Button variant="outline" size="sm" className="mb-2">
                  <span className="material-symbols-outlined text-sm mr-1">
                    edit
                  </span>
                  Edit
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className={language.isActive ? "text-error" : "text-success"}
                >
                  <span className="material-symbols-outlined text-sm mr-1">
                    {language.isActive ? "pause" : "play_arrow"}
                  </span>
                  {language.isActive ? "Deactivate" : "Activate"}
                </Button>
              </div>
            </div>

            {/* Certifications */}
            {language.certifications.length > 0 && (
              <div className="mb-4">
                <p className="text-sm font-medium text-primary mb-2">Certifications:</p>
                <div className="flex flex-col gap-1">
                  {language.certifications.map((cert, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <span className="material-symbols-outlined text-success text-sm">
                        verified
                      </span>
                      <span className="text-secondary">{cert}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Specialties */}
            {language.specialties.length > 0 && (
              <div className="mb-4">
                <p className="text-sm font-medium text-primary mb-2">Medical Specialties:</p>
                <div className="flex flex-wrap gap-1">
                  {language.specialties.map((specialty, index) => (
                    <span key={index} className="badge badge-info text-xs">
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Performance Stats */}
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-3 bg-surface-secondary rounded-lg">
                <p className="text-sm text-secondary">Total Assignments</p>
                <p className="text-lg font-bold text-primary">{language.totalAssignments}</p>
              </div>
              <div className="p-3 bg-surface-secondary rounded-lg">
                <p className="text-sm text-secondary">Average Rating</p>
                <p className="text-lg font-bold text-primary">{language.averageRating}</p>
              </div>
              <div className="p-3 bg-surface-secondary rounded-lg">
                <p className="text-sm text-secondary">Experience</p>
                <p className="text-lg font-bold text-primary">{language.experience}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredLanguages.length === 0 && (
        <div className="text-center py-12">
          <span className="material-symbols-outlined text-6xl text-secondary mb-4">
            language
          </span>
          <h3 className="text-xl font-semibold text-primary mb-2">
            No languages found
          </h3>
          <p className="text-secondary">
            Try adjusting your search criteria or add a new language.
          </p>
        </div>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card bg-surface p-4 text-center">
          <span className="material-symbols-outlined text-primary-color text-3xl mb-2">
            language
          </span>
          <p className="text-sm text-secondary">Total Languages</p>
          <p className="text-2xl font-bold text-primary">{languages.length}</p>
        </div>
        <div className="card bg-surface p-4 text-center">
          <span className="material-symbols-outlined text-success text-3xl mb-2">
            check_circle
          </span>
          <p className="text-sm text-secondary">Active Languages</p>
          <p className="text-2xl font-bold text-primary">
            {languages.filter(l => l.isActive).length}
          </p>
        </div>
        <div className="card bg-surface p-4 text-center">
          <span className="material-symbols-outlined text-info text-3xl mb-2">
            verified
          </span>
          <p className="text-sm text-secondary">Certified Languages</p>
          <p className="text-2xl font-bold text-primary">
            {languages.filter(l => l.certifications.length > 0).length}
          </p>
        </div>
        <div className="card bg-surface p-4 text-center">
          <span className="material-symbols-outlined text-warning text-3xl mb-2">
            star
          </span>
          <p className="text-sm text-secondary">Avg Rating</p>
          <p className="text-2xl font-bold text-primary">
            {(languages.reduce((sum, l) => sum + l.averageRating, 0) / languages.length).toFixed(1)}
          </p>
        </div>
      </div>
    </div>
  );
}

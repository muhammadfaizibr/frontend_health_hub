"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/forms/Input";
import { Select } from "@/components/forms/Select";
import { Textarea } from "@/components/forms/Textarea";

export default function TranslatorProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "Sarah",
    lastName: "Johnson",
    email: "sarah.johnson@healthhub.com",
    phone: "+1-555-0123",
    countryCode: "US",
    bio: "Professional medical interpreter with 8+ years of experience in healthcare settings. Specialized in Spanish, French, and Hindi interpretation with certifications from NBCMI and IMIA.",
    isActive: true,
    timezone: "America/New_York",
    languages: ["Spanish", "French", "Hindi", "Arabic"],
    certifications: [
      "Certified Medical Interpreter (CMI) - Spanish",
      "Healthcare Interpreter Certificate - French",
      "Basic Medical Interpreter Training - Arabic"
    ],
    experience: "8+ years",
    hourlyRate: 45,
    currency: "USD",
    availability: "Monday-Friday, 9AM-6PM EST",
    emergencyContact: "John Johnson",
    emergencyPhone: "+1-555-0124",
    address: "123 Main St, New York, NY 10001",
    dateOfBirth: "1985-03-15",
    gender: "Female",
    profileImage: "/api/placeholder/150/150"
  });

  const countryOptions = [
    { value: "US", label: "United States" },
    { value: "CA", label: "Canada" },
    { value: "GB", label: "United Kingdom" },
    { value: "AU", label: "Australia" },
    { value: "DE", label: "Germany" },
    { value: "FR", label: "France" },
    { value: "ES", label: "Spain" },
    { value: "MX", label: "Mexico" }
  ];

  const timezoneOptions = [
    { value: "America/New_York", label: "Eastern Time (ET)" },
    { value: "America/Chicago", label: "Central Time (CT)" },
    { value: "America/Denver", label: "Mountain Time (MT)" },
    { value: "America/Los_Angeles", label: "Pacific Time (PT)" },
    { value: "Europe/London", label: "Greenwich Mean Time (GMT)" },
    { value: "Europe/Paris", label: "Central European Time (CET)" },
    { value: "Asia/Tokyo", label: "Japan Standard Time (JST)" },
    { value: "Asia/Shanghai", label: "China Standard Time (CST)" }
  ];

  const genderOptions = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
    { value: "Other", label: "Other" },
    { value: "Prefer not to say", label: "Prefer not to say" }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLanguageChange = (index, value) => {
    const newLanguages = [...formData.languages];
    newLanguages[index] = value;
    setFormData(prev => ({
      ...prev,
      languages: newLanguages
    }));
  };

  const addLanguage = () => {
    setFormData(prev => ({
      ...prev,
      languages: [...prev.languages, ""]
    }));
  };

  const removeLanguage = (index) => {
    const newLanguages = formData.languages.filter((_, i) => i !== index);
    setFormData(prev => ({
      ...prev,
      languages: newLanguages
    }));
  };

  const handleCertificationChange = (index, value) => {
    const newCertifications = [...formData.certifications];
    newCertifications[index] = value;
    setFormData(prev => ({
      ...prev,
      certifications: newCertifications
    }));
  };

  const addCertification = () => {
    setFormData(prev => ({
      ...prev,
      certifications: [...prev.certifications, ""]
    }));
  };

  const removeCertification = (index) => {
    const newCertifications = formData.certifications.filter((_, i) => i !== index);
    setFormData(prev => ({
      ...prev,
      certifications: newCertifications
    }));
  };

  const handleSave = () => {
    // Mock save functionality
    console.log("Saving profile:", formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">Profile</h1>
          <p className="text-secondary mt-1">
            Manage your personal and professional information
          </p>
        </div>
        <div className="flex flex-col gap-2">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button onClick={handleSave}>
                Save Changes
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)}>
              <span className="material-symbols-outlined text-sm">edit</span>
              Edit Profile
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Summary */}
        <div className="lg:col-span-1">
          <div className="card bg-surface p-6">
            <div className="text-center mb-6">
              <div className="w-24 h-24 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="material-symbols-outlined text-4xl text-primary">
                  person
                </span>
              </div>
              <h2 className="text-xl font-semibold text-primary">
                {formData.firstName} {formData.lastName}
              </h2>
              <p className="text-secondary text-sm">
                Professional Medical Interpreter
              </p>
              <div className="flex items-center justify-center gap-2 mt-2">
                <span className={`status-dot ${formData.isActive ? 'bg-success' : 'bg-error'}`}></span>
                <span className="text-sm text-secondary">
                  {formData.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div>
                <h3 className="text-sm font-medium text-primary mb-2">Contact Information</h3>
                <div className="flex flex-col gap-2 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary text-sm">
                      email
                    </span>
                    <span className="text-secondary">{formData.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary text-sm">
                      phone
                    </span>
                    <span className="text-secondary">{formData.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary text-sm">
                      location_on
                    </span>
                    <span className="text-secondary">{formData.address}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-primary mb-2">Professional Details</h3>
                <div className="flex flex-col gap-2 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary text-sm">
                      work
                    </span>
                    <span className="text-secondary">{formData.experience} experience</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary text-sm">
                      attach_money
                    </span>
                    <span className="text-secondary">${formData.hourlyRate}/hour</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary text-sm">
                      schedule
                    </span>
                    <span className="text-secondary">{formData.availability}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Form */}
        <div className="lg:col-span-2">
          <div className="card bg-surface p-6">
            <h2 className="text-xl font-semibold text-primary mb-6">
              Personal Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                disabled={!isEditing}
      
              />
              <Input
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                disabled={!isEditing}
      
              />
              <Input
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                disabled={!isEditing}
      
              />
              <Input
                label="Phone Number"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                disabled={!isEditing}
      
              />
              <Select
                label="Country"
                name="countryCode"
                value={formData.countryCode}
                onChange={handleInputChange}
                options={countryOptions}
                disabled={!isEditing}
      
              />
              <Select
                label="Gender"
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                options={genderOptions}
                disabled={!isEditing}
              />
              <Input
                label="Date of Birth"
                name="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
              <Select
                label="Timezone"
                name="timezone"
                value={formData.timezone}
                onChange={handleInputChange}
                options={timezoneOptions}
                disabled={!isEditing}
      
              />
            </div>

            <div className="mt-6">
              <Textarea
                label="Bio"
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                disabled={!isEditing}
                rows={4}
                placeholder="Tell us about your professional background and experience..."
              />
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold text-primary mb-4">Languages</h3>
              <div className="flex flex-col gap-3">
                {formData.languages.map((language, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      value={language}
                      onChange={(e) => handleLanguageChange(index, e.target.value)}
                      disabled={!isEditing}
                      placeholder="Enter language"
                    />
                    {isEditing && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeLanguage(index)}
                        className="text-error hover:bg-error/10"
                      >
                        <span className="material-symbols-outlined text-sm">
                          remove
                        </span>
                      </Button>
                    )}
                  </div>
                ))}
                {isEditing && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={addLanguage}
                    className="w-full"
                  >
                    <span className="material-symbols-outlined text-sm">add</span>
                    Add Language
                  </Button>
                )}
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold text-primary mb-4">Certifications</h3>
              <div className="flex flex-col gap-3">
                {formData.certifications.map((certification, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      value={certification}
                      onChange={(e) => handleCertificationChange(index, e.target.value)}
                      disabled={!isEditing}
                      placeholder="Enter certification"
                    />
                    {isEditing && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeCertification(index)}
                        className="text-error hover:bg-error/10"
                      >
                        <span className="material-symbols-outlined text-sm">
                          remove
                        </span>
                      </Button>
                    )}
                  </div>
                ))}
                {isEditing && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={addCertification}
                    className="w-full"
                  >
                    <span className="material-symbols-outlined text-sm">add</span>
                    Add Certification
                  </Button>
                )}
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold text-primary mb-4">Professional Settings</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Hourly Rate"
                  name="hourlyRate"
                  type="number"
                  value={formData.hourlyRate}
                  onChange={handleInputChange}
                  disabled={!isEditing}
        
                />
                <Input
                  label="Currency"
                  name="currency"
                  value={formData.currency}
                  onChange={handleInputChange}
                  disabled={!isEditing}
        
                />
                <Input
                  label="Availability"
                  name="availability"
                  value={formData.availability}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  placeholder="e.g., Monday-Friday, 9AM-6PM EST"
                />
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="isActive"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      isActive: e.target.checked
                    }))}
                    disabled={!isEditing}
                    className="form-checkbox"
                  />
                  <label htmlFor="isActive" className="text-sm text-primary">
                    Available for assignments
                  </label>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold text-primary mb-4">Emergency Contact</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Emergency Contact Name"
                  name="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
                <Input
                  label="Emergency Contact Phone"
                  name="emergencyPhone"
                  value={formData.emergencyPhone}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/forms/Input";
import { Select } from "@/components/forms/Select";

export default function TranslatorCertificationsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [languageFilter, setLanguageFilter] = useState("");

  const certifications = [
    {
      id: 1,
      title: "Certified Medical Interpreter (CMI)",
      issuingOrganization: "National Board of Certification for Medical Interpreters",
      language: "Spanish",
      issueDate: "2020-03-15",
      expirationDate: "2025-03-15",
      status: "active",
      credentialId: "CMI-SP-2020-001",
      credentialUrl: "https://certificates.nbcmie.org/verify/CMI-SP-2020-001",
      description: "Professional certification for medical interpreters in Spanish",
      file: "cmi-spanish-cert.pdf",
      isVerified: true
    },
    {
      id: 2,
      title: "Healthcare Interpreter Certificate",
      issuingOrganization: "International Medical Interpreters Association",
      language: "Spanish",
      issueDate: "2019-06-20",
      expirationDate: "2024-06-20",
      status: "expiring_soon",
      credentialId: "HIC-SP-2019-002",
      credentialUrl: "https://certificates.imia.org/verify/HIC-SP-2019-002",
      description: "Comprehensive healthcare interpretation certification",
      file: "hic-spanish-cert.pdf",
      isVerified: true
    },
    {
      id: 3,
      title: "Certified Medical Interpreter (CMI)",
      issuingOrganization: "National Board of Certification for Medical Interpreters",
      language: "French",
      issueDate: "2021-08-10",
      expirationDate: "2026-08-10",
      status: "active",
      credentialId: "CMI-FR-2021-003",
      credentialUrl: "https://certificates.nbcmie.org/verify/CMI-FR-2021-003",
      description: "Professional certification for medical interpreters in French",
      file: "cmi-french-cert.pdf",
      isVerified: true
    },
    {
      id: 4,
      title: "Healthcare Interpreter Certificate",
      issuingOrganization: "International Medical Interpreters Association",
      language: "Hindi",
      issueDate: "2022-01-15",
      expirationDate: "2027-01-15",
      status: "active",
      credentialId: "HIC-HI-2022-004",
      credentialUrl: "https://certificates.imia.org/verify/HIC-HI-2022-004",
      description: "Comprehensive healthcare interpretation certification in Hindi",
      file: "hic-hindi-cert.pdf",
      isVerified: true
    },
    {
      id: 5,
      title: "Basic Medical Interpreter Training",
      issuingOrganization: "Local Community College",
      language: "Arabic",
      issueDate: "2023-05-01",
      expirationDate: "2025-05-01",
      status: "active",
      credentialId: "BMIT-AR-2023-005",
      credentialUrl: null,
      description: "Basic training in medical interpretation for Arabic speakers",
      file: "bmit-arabic-cert.pdf",
      isVerified: false
    }
  ];

  const statusOptions = [
    { value: "", label: "All Statuses" },
    { value: "active", label: "Active" },
    { value: "expiring_soon", label: "Expiring Soon" },
    { value: "expired", label: "Expired" }
  ];

  const languageOptions = [
    { value: "", label: "All Languages" },
    { value: "spanish", label: "Spanish" },
    { value: "french", label: "French" },
    { value: "hindi", label: "Hindi" },
    { value: "arabic", label: "Arabic" }
  ];

  const getStatusBadge = (status) => {
    const statusClasses = {
      active: "badge badge-success",
      expiring_soon: "badge badge-warning",
      expired: "badge badge-error"
    };
    
    return statusClasses[status] || "badge badge-secondary";
  };

  const isExpiringSoon = (expirationDate) => {
    const expDate = new Date(expirationDate);
    const today = new Date();
    const daysUntilExpiry = Math.ceil((expDate - today) / (1000 * 60 * 60 * 24));
    return daysUntilExpiry <= 90 && daysUntilExpiry > 0;
  };

  const isExpired = (expirationDate) => {
    const expDate = new Date(expirationDate);
    const today = new Date();
    return expDate < today;
  };

  const filteredCertifications = certifications.filter(cert => {
    const matchesSearch = cert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cert.issuingOrganization.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cert.language.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || cert.status === statusFilter;
    const matchesLanguage = !languageFilter || cert.language.toLowerCase() === languageFilter;
    
    return matchesSearch && matchesStatus && matchesLanguage;
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">Certifications</h1>
          <p className="text-secondary mt-1">
            Manage your professional certifications and credentials
          </p>
        </div>
        <Button>
          <span className="material-symbols-outlined text-sm mr-2">add</span>
          Add Certification
        </Button>
      </div>

      {/* Filters */}
      <div className="card bg-surface p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            placeholder="Search certifications..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon="search"
          />
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            options={statusOptions}
            placeholder="Filter by status"
          />
          <Select
            value={languageFilter}
            onChange={(e) => setLanguageFilter(e.target.value)}
            options={languageOptions}
            placeholder="Filter by language"
          />
        </div>
      </div>

      {/* Certifications List */}
      <div className="flex flex-col gap-4">
        {filteredCertifications.map((cert) => (
          <div key={cert.id} className="card bg-surface p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-xl font-semibold text-primary">
                    {cert.title}
                  </h3>
                  <span className={getStatusBadge(cert.status)}>
                    {cert.status.replace('_', ' ')}
                  </span>
                  {cert.isVerified ? (
                    <span className="badge badge-success">Verified</span>
                  ) : (
                    <span className="badge badge-warning">Pending Verification</span>
                  )}
                </div>
                <p className="text-secondary text-sm mb-2">
                  {cert.issuingOrganization}
                </p>
                <p className="text-secondary text-sm mb-2">
                  Language: {cert.language} • Credential ID: {cert.credentialId}
                </p>
                <p className="text-secondary text-sm mb-2">
                  Issued: {new Date(cert.issueDate).toLocaleDateString()} • 
                  Expires: {new Date(cert.expirationDate).toLocaleDateString()}
                </p>
                {cert.description && (
                  <p className="text-secondary text-sm">
                    {cert.description}
                  </p>
                )}
              </div>
              <div className="text-right">
                <Button variant="outline" size="sm" className="mb-2">
                  <span className="material-symbols-outlined text-sm mr-1">
                    edit
                  </span>
                  Edit
                </Button>
                <Button variant="outline" size="sm">
                  <span className="material-symbols-outlined text-sm mr-1">
                    download
                  </span>
                  Download
                </Button>
              </div>
            </div>

            {/* Expiration Warning */}
            {isExpiringSoon(cert.expirationDate) && (
              <div className="mb-4 p-3 bg-warning/10 border border-warning/20 rounded-lg">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-warning">
                    warning
                  </span>
                  <p className="text-sm text-warning font-medium">
                    This certification expires in {Math.ceil((new Date(cert.expirationDate) - new Date()) / (1000 * 60 * 60 * 24))} days
                  </p>
                </div>
              </div>
            )}

            {isExpired(cert.expirationDate) && (
              <div className="mb-4 p-3 bg-error/10 border border-error/20 rounded-lg">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-error">
                    error
                  </span>
                  <p className="text-sm text-error font-medium">
                    This certification has expired
                  </p>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex justify-between items-center">
              <div className="flex flex-col gap-2">
                {cert.credentialUrl && (
                  <Button variant="outline" size="sm">
                    <span className="material-symbols-outlined text-sm mr-1">
                      link
                    </span>
                    Verify Online
                  </Button>
                )}
                <Button variant="outline" size="sm">
                  <span className="material-symbols-outlined text-sm mr-1">
                    visibility
                  </span>
                  View Details
                </Button>
              </div>
              <div className="text-sm text-secondary">
                File: {cert.file}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredCertifications.length === 0 && (
        <div className="text-center py-12">
          <span className="material-symbols-outlined text-6xl text-secondary mb-4">
            verified_user
          </span>
          <h3 className="text-xl font-semibold text-primary mb-2">
            No certifications found
          </h3>
          <p className="text-secondary">
            Try adjusting your search criteria or add a new certification.
          </p>
        </div>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card bg-surface p-4 text-center">
          <span className="material-symbols-outlined text-primary-color text-3xl mb-2">
            verified_user
          </span>
          <p className="text-sm text-secondary">Total Certifications</p>
          <p className="text-2xl font-bold text-primary">{certifications.length}</p>
        </div>
        <div className="card bg-surface p-4 text-center">
          <span className="material-symbols-outlined text-success text-3xl mb-2">
            check_circle
          </span>
          <p className="text-sm text-secondary">Active</p>
          <p className="text-2xl font-bold text-primary">
            {certifications.filter(c => c.status === 'active').length}
          </p>
        </div>
        <div className="card bg-surface p-4 text-center">
          <span className="material-symbols-outlined text-warning text-3xl mb-2">
            warning
          </span>
          <p className="text-sm text-secondary">Expiring Soon</p>
          <p className="text-2xl font-bold text-primary">
            {certifications.filter(c => c.status === 'expiring_soon').length}
          </p>
        </div>
        <div className="card bg-surface p-4 text-center">
          <span className="material-symbols-outlined text-info text-3xl mb-2">
            verified
          </span>
          <p className="text-sm text-secondary">Verified</p>
          <p className="text-2xl font-bold text-primary">
            {certifications.filter(c => c.isVerified).length}
          </p>
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Tabs } from "@/components/ui/Tabs";
import CaseCard from "@/components/patient/cases/CaseCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { useCases } from "@/lib/hooks/usePatients";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function PatientCasesPage() {
  const router = useRouter();
  const [statusFilter, setStatusFilter] = useState("all");
  
  const { cases, isLoading, error, refetch } = useCases();

  const casesList = cases?.results || [];

  const getFilteredCases = () => {
    if (statusFilter === "all") return casesList;
    return casesList.filter(c => c.status.toLowerCase() === statusFilter);
  };

  const filteredCases = getFilteredCases();

  const statusCounts = {
    all: casesList.length,
    open: casesList.filter(c => c.status.toLowerCase() === "open").length,
    in_progress: casesList.filter(c => c.status.toLowerCase() === "in_progress").length,
    closed: casesList.filter(c => c.status.toLowerCase() === "closed").length,
  };

  const tabs = [
    { id: "all", label: "All Cases", count: statusCounts.all },
    { id: "open", label: "Open", count: statusCounts.open },
    { id: "in_progress", label: "In Progress", count: statusCounts.in_progress },
    { id: "closed", label: "Closed", count: statusCounts.closed },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <LoadingSpinner />
      </div>
    );
  }

  const getStatusLabel = (status) => {
    if (status === "all") return "cases";
    return status.replace(/_/g, " ");
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-primary">My Cases</h1>
          <p className="text-secondary mt-1">
            Manage your medical cases and track appointments
          </p>
        </div>
        <Link href="/patient/cases/create">
          <Button>
            <span className="material-symbols-outlined text-sm">add</span>
            Create New Case
          </Button>
        </Link>
      </div>

      <Tabs
        tabs={tabs}
        activeTab={statusFilter}
        onChange={setStatusFilter}
        showCounts={true}
        variant="underline"
      />

      <div className="flex flex-col gap-4">
        {filteredCases.length > 0 ? (
          filteredCases.map(caseItem => (
            <CaseCard
              key={caseItem.id}
              caseData={caseItem}
              onUpdate={refetch}
            />
          ))
        ) : (
          <EmptyState
            icon="folder_open"
            title={statusFilter === "all" ? "No cases found" : `No ${getStatusLabel(statusFilter)} cases`}
            description={
              statusFilter === "all"
                ? "You haven't created any medical cases yet. Create your first case to get started."
                : `You don't have any ${getStatusLabel(statusFilter)} cases at the moment.`
            }
            actionLabel={statusFilter === "all" ? "Create Your First Case" : undefined}
            actionHref={statusFilter === "all" ? "/patient/cases/create" : undefined}
          />
        )}
      </div>
    </div>
  );
}
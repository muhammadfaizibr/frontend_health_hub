// app/doctor/cases/page.jsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Tabs } from "@/components/ui/Tabs";
import CaseCard from "@/components/patient/cases/CaseCard";
import { EmptyState } from "@/components/ui/EmptyState";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { useQuery } from "@tanstack/react-query";
import { getDoctorCases } from "@/lib/api/services/doctor";

export default function DoctorCasesPage() {
  const [statusFilter, setStatusFilter] = useState("all");
  
  const { data: cases, isLoading, error, refetch } = useQuery({
    queryKey: ['doctor-cases'],
    queryFn: () => getDoctorCases(),
    staleTime: 2 * 60 * 1000,
    retry: 1,
  });

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
            Manage patient cases and track treatment progress
          </p>
        </div>
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
            <Link key={caseItem.id} href={`/doctor/cases/${caseItem.id}`}>
              <CaseCard
                caseData={caseItem}
                onUpdate={refetch}
                isDoctor={true}
              />
            </Link>
          ))
        ) : (
          <EmptyState
            icon="folder_open"
            title={statusFilter === "all" ? "No cases found" : `No ${getStatusLabel(statusFilter)} cases`}
            description={
              statusFilter === "all"
                ? "You don't have any assigned cases yet."
                : `You don't have any ${getStatusLabel(statusFilter)} cases at the moment.`
            }
          />
        )}
      </div>
    </div>
  );
}
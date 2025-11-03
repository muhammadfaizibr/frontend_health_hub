// app/doctor/schedule/page.jsx
"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Tabs } from "@/components/ui/Tabs";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import EmptyState from "@/components/ui/EmptyState";
import AvailabilitySlotCard from "@/components/doctor/schedule/AvailabilitySlotCard";
import ServiceFeeCard from "@/components/doctor/schedule/ServiceFeeCard";
import AvailabilitySlotModal from "@/components/doctor/schedule/AvailabilitySlotModal";
import ServiceFeeModal from "@/components/doctor/schedule/ServiceFeeModal";
import { useMyAvailability, useMyFees } from "@/lib/hooks/useBase";

export default function DoctorSchedulePage() {
  const [activeTab, setActiveTab] = useState("availability");
  const [showSlotModal, setShowSlotModal] = useState(false);
  const [showFeeModal, setShowFeeModal] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedFee, setSelectedFee] = useState(null);

  const { availability, isLoading: slotsLoading, refetch: refetchSlots } = useMyAvailability();
  const { fees, isLoading: feesLoading, refetch: refetchFees } = useMyFees();

  const availabilitySlots = availability || [];
  const serviceFees = fees || [];

  // Group slots by day
  const slotsByDay = availabilitySlots.reduce((acc, slot) => {
    if (!acc[slot.day_of_week]) {
      acc[slot.day_of_week] = [];
    }
    acc[slot.day_of_week].push(slot);
    return acc;
  }, {});

  const handleEditSlot = (slot) => {
    setSelectedSlot(slot);
    setShowSlotModal(true);
  };

  const handleEditFee = (fee) => {
    setSelectedFee(fee);
    setShowFeeModal(true);
  };

  const handleSlotModalClose = () => {
    setShowSlotModal(false);
    setSelectedSlot(null);
  };

  const handleFeeModalClose = () => {
    setShowFeeModal(false);
    setSelectedFee(null);
  };

  const handleSlotSuccess = () => {
    handleSlotModalClose();
    refetchSlots();
  };

  const handleFeeSuccess = () => {
    handleFeeModalClose();
    refetchFees();
  };

  const tabs = [
    { 
      id: "availability", 
      label: "Availability", 
      icon: "schedule",
      count: availabilitySlots.length 
    },
    { 
      id: "fees", 
      label: "Service Fees", 
      icon: "payments",
      count: serviceFees.length 
    },
  ];

  return (
    <>
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold text-primary">Schedule & Pricing</h1>
            <p className="text-secondary mt-1">
              Manage your availability and consultation fees
            </p>
          </div>
        </div>

        {/* Tabs */}
        <Tabs
          tabs={tabs}
          activeTab={activeTab}
          onChange={setActiveTab}
          showCounts={true}
          variant="underline"
        />

        {/* Availability Tab */}
        {activeTab === "availability" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-primary">
                  Weekly Availability
                </h2>
                <p className="text-sm text-secondary mt-1">
                  Set your available time slots for each day of the week
                </p>
              </div>
              <Button onClick={() => setShowSlotModal(true)}>
                <span className="material-symbols-outlined text-sm">add</span>
                Add Time Slot
              </Button>
            </div>

            {slotsLoading ? (
              <div className="flex items-center justify-center py-12">
                <LoadingSpinner />
              </div>
            ) : availabilitySlots.length > 0 ? (
              <div className="space-y-6">
                {Object.keys(slotsByDay)
                  .sort((a, b) => parseInt(a) - parseInt(b))
                  .map(dayOfWeek => (
                    <div key={dayOfWeek} className="flex flex-col gap-2 space-y-3">
                      <h3 className="font-semibold text-primary text-lg">
                        {slotsByDay[dayOfWeek][0].day_name}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {slotsByDay[dayOfWeek].map(slot => (
                          <AvailabilitySlotCard
                            key={slot.id}
                            slot={slot}
                            onEdit={handleEditSlot}
                            onUpdate={refetchSlots}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <EmptyState
                icon="schedule"
                title="No availability slots"
                description="Add your available time slots to let patients book appointments."
                actionLabel="Add First Time Slot"
                onAction={() => setShowSlotModal(true)}
              />
            )}
          </div>
        )}

        {/* Service Fees Tab */}
        {activeTab === "fees" && (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2 items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-primary">
                  Consultation Fees
                </h2>
                <p className="text-sm text-secondary mt-1">
                  Set your fees for different consultation durations
                </p>
              </div>
              <Button onClick={() => setShowFeeModal(true)}>
                <span className="material-symbols-outlined text-sm">add</span>
                Add Service Fee
              </Button>
            </div>

            {feesLoading ? (
              <div className="flex items-center justify-center py-12">
                <LoadingSpinner />
              </div>
            ) : serviceFees.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {serviceFees.map(fee => (
                  <ServiceFeeCard
                    key={fee.id}
                    fee={fee}
                    onEdit={handleEditFee}
                    onUpdate={refetchFees}
                  />
                ))}
              </div>
            ) : (
              <EmptyState
                icon="payments"
                title="No service fees"
                description="Add your consultation fees for different durations."
                actionLabel="Add First Fee"
                onAction={() => setShowFeeModal(true)}
              />
            )}

          </div>
        )}
      </div>

      {/* Modals */}
      <AvailabilitySlotModal
        isOpen={showSlotModal}
        onClose={handleSlotModalClose}
        slot={selectedSlot}
        onSuccess={handleSlotSuccess}
      />

      <ServiceFeeModal
        isOpen={showFeeModal}
        onClose={handleFeeModalClose}
        fee={selectedFee}
        onSuccess={handleFeeSuccess}
      />
    </>
  );
}
"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";

export default function PatientEmergencyPage() {
  const [emergencyType, setEmergencyType] = useState("");

  const emergencyContacts = [
    {
      name: "Emergency Services",
      number: "911",
      type: "emergency",
      description: "Call for life-threatening emergencies"
    },
    {
      name: "Poison Control",
      number: "1-800-222-1222",
      type: "poison",
      description: "24/7 poison emergency hotline"
    },
    {
      name: "Suicide Prevention",
      number: "988",
      type: "crisis",
      description: "24/7 crisis support and suicide prevention"
    },
    {
      name: "Dr. Sarah Johnson",
      number: "(555) 123-4567",
      type: "doctor",
      description: "Your primary care physician"
    }
  ];

  const emergencyInstructions = [
    "Stay calm and assess the situation",
    "Call 911 for life-threatening emergencies",
    "Provide clear information about the emergency",
    "Follow the dispatcher&apos;s instructions",
    "Stay with the person until help arrives"
  ];

  const handleEmergencyCall = (contact) => {
    if (contact.type === "emergency") {
      alert("Calling 911... Please stay on the line and follow the dispatcher's instructions.");
    } else {
      alert(`Calling ${contact.name} at ${contact.number}`);
    }
  };

  const getContactIcon = (type) => {
    const icons = {
      emergency: "emergency",
      poison: "warning",
      crisis: "psychology",
      doctor: "medical_services"
    };
    return icons[type] || "phone";
  };

  const getContactColor = (type) => {
    const colors = {
      emergency: "text-error",
      poison: "text-warning",
      crisis: "text-info",
      doctor: "text-primary-color"
    };
    return colors[type] || "text-secondary";
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-primary mb-4">
          Emergency Care
        </h1>
        <p className="text-xl text-secondary max-w-2xl mx-auto">
          Quick access to emergency services and healthcare providers when you need them most.
        </p>
      </div>

      {/* Emergency Alert */}
      <div className="card bg-error/10 border border-error p-6">
        <div className="flex items-center gap-4">
          <span className="material-symbols-outlined text-error text-3xl">
            emergency
          </span>
          <div>
            <h2 className="text-xl font-semibold text-error mb-2">
              Life-Threatening Emergency?
            </h2>
            <p className="text-secondary mb-4">
              If you or someone else is experiencing a life-threatening emergency, call 911 immediately.
            </p>
            <Button 
              className="bg-error hover:bg-error/90 text-inverse"
              onClick={() => handleEmergencyCall(emergencyContacts[0])}
            >
              <span className="material-symbols-outlined text-sm">phone</span>
              Call 911 Now
            </Button>
          </div>
        </div>
      </div>

      {/* Emergency Contacts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {emergencyContacts.map((contact, index) => (
          <div key={index} className="card bg-surface p-6">
            <div className="flex items-start gap-4">
              <span className={`material-symbols-outlined text-2xl ${getContactColor(contact.type)}`}>
                {getContactIcon(contact.type)}
              </span>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-primary mb-1">
                  {contact.name}
                </h3>
                <p className="text-secondary mb-3">{contact.description}</p>
                <div className="flex items-center gap-3">
                  <span className="text-lg font-semibold text-primary">
                    {contact.number}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEmergencyCall(contact)}
                  >
                    <span className="material-symbols-outlined text-sm">phone</span>
                    Call
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Emergency Instructions */}
      <div className="card bg-surface p-6">
        <h2 className="text-xl font-semibold text-primary mb-4">
          Emergency Response Instructions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-primary mb-3">General Guidelines</h3>
            <ul className="flex flex-col gap-2">
              {emergencyInstructions.map((instruction, index) => (
                <li key={index} className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary-color text-sm mt-1">
                    check_circle
                  </span>
                  <span className="text-secondary">{instruction}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-primary mb-3">What to Tell 911</h3>
            <ul className="flex flex-col gap-2 text-secondary">
              <li>• Your exact location</li>
              <li>• Nature of the emergency</li>
              <li>• Number of people involved</li>
              <li>• Any injuries or symptoms</li>
              <li>• Your phone number</li>
              <li>• Stay on the line until told to hang up</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Button variant="outline" fullWidth>
          <span className="material-symbols-outlined text-sm">location_on</span>
          Find Nearest Hospital
        </Button>
        <Button variant="outline" fullWidth>
          <span className="material-symbols-outlined text-sm">medical_services</span>
          Urgent Care Centers
        </Button>
        <Button variant="outline" fullWidth>
          <span className="material-symbols-outlined text-sm">share</span>
          Share Location
        </Button>
      </div>

      {/* Medical Information Card */}
      <div className="card bg-surface p-6">
        <h2 className="text-xl font-semibold text-primary mb-4">
          Important Medical Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-primary mb-3">Personal Information</h3>
            <div className="flex flex-col gap-2 text-secondary">
              <p><strong>Name:</strong> John Doe</p>
              <p><strong>Date of Birth:</strong> January 1, 1980</p>
              <p><strong>Blood Type:</strong> O+</p>
              <p><strong>Allergies:</strong> None known</p>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-primary mb-3">Current Medications</h3>
            <div className="flex flex-col gap-2 text-secondary">
              <p>• Lisinopril 10mg (daily)</p>
              <p>• Metformin 500mg (twice daily)</p>
              <p>• Multivitamin (daily)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import React from "react";

const GENERAL_NOTES = [
  { icon: "schedule", text: "Arrive 15 minutes early" },
  { icon: "badge", text: "Bring your ID and insurance card" },
  { icon: "folder", text: "Bring any relevant medical records" },
  { icon: "medication", text: "List of current medications" },
];

const TELEHEALTH_NOTES = [
  { icon: "wifi", text: "Ensure stable internet connection" },
  { icon: "videocam", text: "Test your camera and microphone" },
  { icon: "headset", text: "Find a quiet, private location" },
  { icon: "phone", text: "Have your phone nearby as backup" },
];

const IN_PERSON_NOTES = [
  { icon: "local_parking", text: "Check parking information" },
  { icon: "accessible", text: "Note accessibility options if needed" },
  { icon: "masks", text: "Wear a mask if required" },
];

export default function PreparationNotesCard() {
  const isTelehealth = "telehealth";
  
  const displayNotes = isTelehealth 
    ? [...GENERAL_NOTES.slice(1), ...TELEHEALTH_NOTES]
    : [...GENERAL_NOTES, ...IN_PERSON_NOTES];

  return (
    <div className="card bg-surface p-6">
      <div className="flex items-center gap-2 mb-4">
        <span className="material-symbols-outlined text-primary-color">checklist</span>
        <h3 className="text-lg font-semibold text-primary">Preparation Checklist</h3>
      </div>
      
      <div className="flex flex-col gap-3">
        {displayNotes.map((note, index) => (
          <div key={index} className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary-color text-base mt-0.5">
              {note.icon}
            </span>
            <p className="text-sm text-secondary flex-1">{note.text}</p>
          </div>
        ))}
      </div>

      {isTelehealth && (
        <div className="mt-4 p-3 bg-secondary rounded-lg">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-info text-sm mt-0.5">info</span>
            <p className="text-xs text-secondary">
              You'll receive a video call link via email 24 hours before your appointment
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
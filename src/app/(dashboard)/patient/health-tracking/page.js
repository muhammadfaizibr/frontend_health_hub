"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";

export default function PatientHealthTrackingPage() {
  const [activeTab, setActiveTab] = useState("overview");

  const healthMetrics = [
    {
      id: 1,
      type: "Blood Pressure",
      value: "120/80",
      unit: "mmHg",
      status: "normal",
      date: "2024-01-15",
      trend: "stable"
    },
    {
      id: 2,
      type: "Heart Rate",
      value: "72",
      unit: "bpm",
      status: "normal",
      date: "2024-01-15",
      trend: "stable"
    },
    {
      id: 3,
      type: "Weight",
      value: "70",
      unit: "kg",
      status: "normal",
      date: "2024-01-15",
      trend: "decreasing"
    },
    {
      id: 4,
      type: "Blood Sugar",
      value: "95",
      unit: "mg/dL",
      status: "normal",
      date: "2024-01-15",
      trend: "stable"
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: "Exercise",
      activity: "Morning Walk",
      duration: "30 minutes",
      date: "2024-01-15",
      calories: 150
    },
    {
      id: 2,
      type: "Exercise",
      activity: "Yoga Session",
      duration: "45 minutes",
      date: "2024-01-14",
      calories: 200
    },
    {
      id: 3,
      type: "Sleep",
      activity: "Night Sleep",
      duration: "7.5 hours",
      date: "2024-01-14",
      quality: "good"
    }
  ];

  const getStatusColor = (status) => {
    const colors = {
      normal: "text-success",
      high: "text-warning",
      low: "text-info",
      critical: "text-error"
    };
    return colors[status] || "text-secondary";
  };

  const getTrendIcon = (trend) => {
    const icons = {
      increasing: "trending_up",
      decreasing: "trending_down",
      stable: "trending_flat"
    };
    return icons[trend] || "trending_flat";
  };

  const getTrendColor = (trend) => {
    const colors = {
      increasing: "text-warning",
      decreasing: "text-success",
      stable: "text-info"
    };
    return colors[trend] || "text-secondary";
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">Health Tracking</h1>
          <p className="text-secondary mt-1">
            Monitor your health metrics and track your wellness journey
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <span className="material-symbols-outlined text-sm">add</span>
            Log Metric
          </Button>
          <Button>
            <span className="material-symbols-outlined text-sm">analytics</span>
            View Reports
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-color">
        <nav className="flex gap-8">
          <button
            onClick={() => setActiveTab("overview")}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === "overview"
                ? "border-primary-color text-primary-color"
                : "border-transparent text-secondary hover:text-primary hover:border-color"
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab("metrics")}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === "metrics"
                ? "border-primary-color text-primary-color"
                : "border-transparent text-secondary hover:text-primary hover:border-color"
            }`}
          >
            Health Metrics
          </button>
          <button
            onClick={() => setActiveTab("activities")}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === "activities"
                ? "border-primary-color text-primary-color"
                : "border-transparent text-secondary hover:text-primary hover:border-color"
            }`}
          >
            Activities
          </button>
        </nav>
      </div>

      {/* Content */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Health Metrics Summary */}
          <div className="lg:col-span-2">
            <div className="card bg-surface p-6">
              <h2 className="text-xl font-semibold text-primary mb-4">Today&apos;s Health Metrics</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {healthMetrics.map((metric) => (
                  <div key={metric.id} className="p-4 border border-color rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-primary">{metric.type}</h3>
                      <span className={`material-symbols-outlined text-sm ${getTrendColor(metric.trend)}`}>
                        {getTrendIcon(metric.trend)}
                      </span>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-primary">{metric.value}</span>
                      <span className="text-sm text-secondary">{metric.unit}</span>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className={`text-sm font-medium ${getStatusColor(metric.status)}`}>
                        {metric.status}
                      </span>
                      <span className="text-xs text-secondary">{metric.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activities */}
            <div className="card bg-surface p-6 mt-6">
              <h2 className="text-xl font-semibold text-primary mb-4">Recent Activities</h2>
              <div className="flex flex-col gap-3">
                {recentActivities.slice(0, 3).map((activity) => (
                  <div key={activity.id} className="flex items-center gap-4 p-3 border border-color rounded-lg">
                    <span className="material-symbols-outlined text-primary-color">
                      {activity.type === "Exercise" ? "fitness_center" : "bedtime"}
                    </span>
                    <div className="flex-1">
                      <h3 className="font-semibold text-primary">{activity.activity}</h3>
                      <p className="text-sm text-secondary">
                        {activity.duration} • {activity.date}
                      </p>
                    </div>
                    <div className="text-right">
                      {activity.calories && (
                        <p className="text-sm font-semibold text-primary">{activity.calories} cal</p>
                      )}
                      {activity.quality && (
                        <p className="text-sm text-secondary capitalize">{activity.quality}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions & Goals */}
          <div className="flex flex-col gap-6">
            <div className="card bg-surface p-6">
              <h2 className="text-xl font-semibold text-primary mb-4">Quick Actions</h2>
              <div className="flex flex-col gap-3">
                <Button fullWidth variant="outline">
                  <span className="material-symbols-outlined text-sm">add</span>
                  Log Blood Pressure
                </Button>
                <Button fullWidth variant="outline">
                  <span className="material-symbols-outlined text-sm">add</span>
                  Log Weight
                </Button>
                <Button fullWidth variant="outline">
                  <span className="material-symbols-outlined text-sm">add</span>
                  Log Exercise
                </Button>
                <Button fullWidth variant="outline">
                  <span className="material-symbols-outlined text-sm">add</span>
                  Log Sleep
                </Button>
              </div>
            </div>

            <div className="card bg-surface p-6">
              <h2 className="text-xl font-semibold text-primary mb-4">Health Goals</h2>
              <div className="flex flex-col gap-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-secondary">Daily Steps</span>
                    <span className="text-sm font-semibold text-primary">8,500 / 10,000</span>
                  </div>
                  <div className="w-full bg-surface-secondary rounded-full h-2">
                    <div className="bg-primary-color h-2 rounded-full" style={{width: '85%'}}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-secondary">Water Intake</span>
                    <span className="text-sm font-semibold text-primary">6 / 8 glasses</span>
                  </div>
                  <div className="w-full bg-surface-secondary rounded-full h-2">
                    <div className="bg-primary-color h-2 rounded-full" style={{width: '75%'}}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-secondary">Sleep Hours</span>
                    <span className="text-sm font-semibold text-primary">7.5 / 8 hours</span>
                  </div>
                  <div className="w-full bg-surface-secondary rounded-full h-2">
                    <div className="bg-primary-color h-2 rounded-full" style={{width: '94%'}}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "metrics" && (
        <div className="flex flex-col gap-4">
          {healthMetrics.map((metric) => (
            <div key={metric.id} className="card bg-surface p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary-color/10 rounded-full flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary-color">
                      {metric.type === "Blood Pressure" ? "monitor_heart" :
                       metric.type === "Heart Rate" ? "favorite" :
                       metric.type === "Weight" ? "monitor_weight" : "bloodtype"}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-primary">{metric.type}</h3>
                    <p className="text-secondary">Last recorded: {metric.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-primary">{metric.value}</span>
                    <span className="text-sm text-secondary">{metric.unit}</span>
                    <span className={`material-symbols-outlined text-sm ${getTrendColor(metric.trend)}`}>
                      {getTrendIcon(metric.trend)}
                    </span>
                  </div>
                  <span className={`text-sm font-medium ${getStatusColor(metric.status)}`}>
                    {metric.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "activities" && (
        <div className="flex flex-col gap-4">
          {recentActivities.map((activity) => (
            <div key={activity.id} className="card bg-surface p-6">
              <div className="flex items-center gap-4">
                <span className="material-symbols-outlined text-primary-color text-2xl">
                  {activity.type === "Exercise" ? "fitness_center" : "bedtime"}
                </span>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-primary">{activity.activity}</h3>
                  <p className="text-secondary mb-2">{activity.duration}</p>
                  <p className="text-sm text-tertiary">{activity.date}</p>
                </div>
                <div className="text-right">
                  {activity.calories && (
                    <p className="text-lg font-semibold text-primary">{activity.calories} cal</p>
                  )}
                  {activity.quality && (
                    <p className="text-sm text-secondary capitalize">{activity.quality}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

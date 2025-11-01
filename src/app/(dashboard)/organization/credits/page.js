"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/forms/Input";
import { Select } from "@/components/forms/Select";

export default function OrganizationCreditsPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");

  const creditPackages = [
    {
      id: 1,
      name: "Starter",
      credits: 100,
      price: 100,
      currency: "USD",
      patientLimit: "~10 patients",
      description: "Perfect for small practices",
      isActive: true,
      displayOrder: 1
    },
    {
      id: 2,
      name: "Professional",
      credits: 400,
      price: 400,
      currency: "USD",
      patientLimit: "~40 patients",
      description: "Ideal for growing practices",
      isActive: true,
      displayOrder: 2
    },
    {
      id: 3,
      name: "Enterprise",
      credits: 1000,
      price: 1000,
      currency: "USD",
      patientLimit: "~100 patients",
      description: "For large healthcare organizations",
      isActive: true,
      displayOrder: 3
    }
  ];

  const creditsLedger = [
    {
      id: 1,
      type: "Purchase",
      amount: 400,
      balanceBefore: 200,
      balanceAfter: 600,
      description: "Professional Package Purchase",
      relatedPurchase: "PKG-2024-001",
      date: "2024-01-15",
      createdBy: "John Smith"
    },
    {
      id: 2,
      type: "Deduction",
      amount: -50,
      balanceBefore: 600,
      balanceAfter: 550,
      description: "Appointment with Dr. Sarah Johnson",
      relatedAppointment: "APT-2024-001",
      date: "2024-01-14",
      createdBy: "System"
    },
    {
      id: 3,
      type: "Deduction",
      amount: -30,
      balanceBefore: 550,
      balanceAfter: 520,
      description: "Appointment with Dr. Michael Chen",
      relatedAppointment: "APT-2024-002",
      date: "2024-01-13",
      createdBy: "System"
    },
    {
      id: 4,
      type: "Refund",
      amount: 25,
      balanceBefore: 520,
      balanceAfter: 545,
      description: "Cancelled appointment refund",
      relatedAppointment: "APT-2024-003",
      date: "2024-01-12",
      createdBy: "System"
    }
  ];

  const packagePurchases = [
    {
      id: 1,
      packageName: "Professional",
      creditsAmount: 400,
      pricePaid: 400,
      currency: "USD",
      status: "Completed",
      purchasedBy: "John Smith",
      purchasedAt: "2024-01-15",
      paymentTransaction: "TXN-2024-001"
    },
    {
      id: 2,
      packageName: "Starter",
      creditsAmount: 100,
      pricePaid: 100,
      currency: "USD",
      status: "Completed",
      purchasedBy: "Jane Doe",
      purchasedAt: "2023-12-20",
      paymentTransaction: "TXN-2023-045"
    }
  ];

  const currentBalance = 545;
  const totalSpent = 1055;
  const totalPurchased = 1600;

  const getTransactionIcon = (type) => {
    const icons = {
      Purchase: "add_circle",
      Deduction: "remove_circle",
      Refund: "refresh",
      Adjustment: "tune",
      Bonus: "card_giftcard"
    };
    return icons[type] || "account_balance_wallet";
  };

  const getTransactionColor = (type) => {
    const colors = {
      Purchase: "text-success",
      Deduction: "text-error",
      Refund: "text-info",
      Adjustment: "text-warning",
      Bonus: "text-purple-600"
    };
    return colors[type] || "text-secondary";
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      Completed: "badge badge-success",
      Pending: "badge badge-warning",
      Failed: "badge badge-error",
      Refunded: "badge badge-info"
    };
    
    return statusClasses[status] || "badge badge-secondary";
  };

  const filteredLedger = creditsLedger.filter(entry => {
    return entry.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
           entry.type.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const PackageCard = ({ pkg }) => (
    <div className="card bg-surface p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-semibold text-primary mb-1">
            {pkg.name} Package
          </h3>
          <p className="text-secondary text-sm mb-2">{pkg.description}</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-primary">
            ${pkg.price}
          </p>
          <p className="text-secondary text-sm">
            {pkg.credits} credits
          </p>
        </div>
      </div>
      
      <div className="flex flex-col gap-2 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-secondary">Credits:</span>
          <span className="text-primary font-medium">{pkg.credits}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-secondary">Patient Limit:</span>
          <span className="text-primary font-medium">{pkg.patientLimit}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-secondary">Price per Credit:</span>
          <span className="text-primary font-medium">${(pkg.price / pkg.credits).toFixed(2)}</span>
        </div>
      </div>
      
      <Button fullWidth>
        <span className="material-symbols-outlined text-sm">shopping_cart</span>
        Purchase Package
      </Button>
    </div>
  );

  const LedgerEntry = ({ entry }) => (
    <div className="flex items-center justify-between p-4 bg-surface-secondary rounded-lg">
      <div className="flex items-center gap-3">
        <span className={`material-symbols-outlined ${getTransactionColor(entry.type)}`}>
          {getTransactionIcon(entry.type)}
        </span>
        <div>
          <p className="text-primary font-medium">{entry.description}</p>
          <p className="text-secondary text-sm">
            {entry.date} • {entry.createdBy}
          </p>
        </div>
      </div>
      <div className="text-right">
        <p className={`font-bold ${entry.amount > 0 ? 'text-success' : 'text-error'}`}>
          {entry.amount > 0 ? '+' : ''}${entry.amount}
        </p>
        <p className="text-secondary text-sm">
          Balance: ${entry.balanceAfter}
        </p>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">Credits & Billing</h1>
          <p className="text-secondary mt-1">
            Manage your organization's credits and billing
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <span className="material-symbols-outlined text-sm">download</span>
            Export Report
          </Button>
          <Button>
            <span className="material-symbols-outlined text-sm">add</span>
            Purchase Credits
          </Button>
        </div>
      </div>

      {/* Balance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card bg-surface p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-secondary text-sm mb-1">Current Balance</p>
              <p className="text-3xl font-bold text-primary">${currentBalance}</p>
              <p className="text-success text-sm">Available Credits</p>
            </div>
            <span className="material-symbols-outlined text-primary-color text-4xl">
              account_balance_wallet
            </span>
          </div>
        </div>
        
        <div className="card bg-surface p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-secondary text-sm mb-1">Total Spent</p>
              <p className="text-3xl font-bold text-primary">${totalSpent}</p>
              <p className="text-secondary text-sm">This month</p>
            </div>
            <span className="material-symbols-outlined text-error text-4xl">
              trending_down
            </span>
          </div>
        </div>
        
        <div className="card bg-surface p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-secondary text-sm mb-1">Total Purchased</p>
              <p className="text-3xl font-bold text-primary">${totalPurchased}</p>
              <p className="text-secondary text-sm">All time</p>
            </div>
            <span className="material-symbols-outlined text-info text-4xl">
              trending_up
            </span>
          </div>
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
            onClick={() => setActiveTab("packages")}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === "packages"
                ? "border-primary-color text-primary-color"
                : "border-transparent text-secondary hover:text-primary hover:border-color"
            }`}
          >
            Credit Packages
          </button>
          <button
            onClick={() => setActiveTab("ledger")}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === "ledger"
                ? "border-primary-color text-primary-color"
                : "border-transparent text-secondary hover:text-primary hover:border-color"
            }`}
          >
            Credits Ledger
          </button>
          <button
            onClick={() => setActiveTab("purchases")}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === "purchases"
                ? "border-primary-color text-primary-color"
                : "border-transparent text-secondary hover:text-primary hover:border-color"
            }`}
          >
            Purchase History
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === "overview" && (
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="card bg-surface p-6">
              <h2 className="text-xl font-semibold text-primary mb-4">Recent Transactions</h2>
              <div className="flex flex-col gap-3">
                {creditsLedger.slice(0, 5).map((entry) => (
                  <LedgerEntry key={entry.id} entry={entry} />
                ))}
              </div>
            </div>
            
            <div className="card bg-surface p-6">
              <h2 className="text-xl font-semibold text-primary mb-4">Usage Statistics</h2>
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <span className="text-secondary">Credits Used Today</span>
                  <span className="text-primary font-bold">15</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-secondary">Credits Used This Week</span>
                  <span className="text-primary font-bold">85</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-secondary">Credits Used This Month</span>
                  <span className="text-primary font-bold">320</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-secondary">Average Daily Usage</span>
                  <span className="text-primary font-bold">12</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "packages" && (
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {creditPackages.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} />
            ))}
          </div>
        </div>
      )}

      {activeTab === "ledger" && (
        <div className="flex flex-col gap-6">
          <div className="card bg-surface p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-primary">Credits Ledger</h2>
              <Input
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                icon="search"
                className="w-64"
              />
            </div>
            <div className="flex flex-col gap-3">
              {filteredLedger.map((entry) => (
                <LedgerEntry key={entry.id} entry={entry} />
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "purchases" && (
        <div className="flex flex-col gap-6">
          <div className="card bg-surface p-6">
            <h2 className="text-xl font-semibold text-primary mb-4">Purchase History</h2>
            <div className="flex flex-col gap-4">
              {packagePurchases.map((purchase) => (
                <div key={purchase.id} className="flex items-center justify-between p-4 bg-surface-secondary rounded-lg">
                  <div className="flex items-center gap-4">
                    <span className="material-symbols-outlined text-primary-color">
                      shopping_cart
                    </span>
                    <div>
                      <p className="text-primary font-medium">{purchase.packageName} Package</p>
                      <p className="text-secondary text-sm">
                        {purchase.purchasedAt} • {purchase.purchasedBy}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-primary font-bold">${purchase.pricePaid}</p>
                    <p className="text-secondary text-sm">{purchase.creditsAmount} credits</p>
                    <span className={getStatusBadge(purchase.status)}>
                      {purchase.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

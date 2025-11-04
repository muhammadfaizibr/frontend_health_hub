// app/doctor/payments/page.jsx
"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { useWalletLedger, usePayoutRequests, useWalletSummary } from "@/lib/hooks/useBilling";
import { formatCurrency, formatDateTime } from "@/lib/utils/global";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import PaymentMethodsList from "@/components/doctor/PaymentMethodsList";
import WithdrawFundsModal from "@/components/doctor/WithdrawFundsModal";

export default function DoctorPaymentsPage() {
  const [activeTab, setActiveTab] = useState('summary');
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  
  const { data: summary, isLoading: summaryLoading, refetch: refetchSummary } = useWalletSummary();
  const { data: ledgerData, isLoading: ledgerLoading, refetch: refetchLedger } = useWalletLedger();
  const { data: payoutsData, isLoading: payoutsLoading, refetch: refetchPayouts } = usePayoutRequests();

  const handleWithdrawSuccess = () => {
    refetchSummary();
    refetchLedger();
    refetchPayouts();
    setActiveTab('withdrawals');
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-3xl font-bold text-primary">Payments</h1>
          <p className="text-secondary mt-1">
            Manage your earnings and withdrawals
          </p>
        </div>
        <Button
          onClick={() => setShowWithdrawModal(true)}
          disabled={!summary?.available_balance || summary.available_balance < 1000}
        >
          <span className="material-symbols-outlined text-sm">payments</span>
          Withdraw Funds
        </Button>
      </div>

      {/* Summary Cards */}
      {summaryLoading ? (
        <div className="flex items-center justify-center py-8">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="card bg-surface p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-secondary mb-1">Available Balance</p>
                <p className="text-2xl font-bold text-success">
                  {formatCurrency(summary?.available_balance || 0, 'PKR')}
                </p>
              </div>
              <div className="flex p-3 bg-success/10 rounded-lg">
                <span className="material-symbols-outlined text-2xl text-success">
                  account_balance_wallet
                </span>
              </div>
            </div>
          </div>

          <div className="card bg-surface p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-secondary mb-1">Pending</p>
                <p className="text-2xl font-bold text-warning">
                  {formatCurrency(summary?.pending_balance || 0, 'PKR')}
                </p>
              </div>
              <div className="flex p-3 bg-warning/10 rounded-lg">
                <span className="material-symbols-outlined text-2xl text-warning">
                  schedule
                </span>
              </div>
            </div>
          </div>

          <div className="card bg-surface p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-secondary mb-1">Total Earnings</p>
                <p className="text-2xl font-bold text-primary">
                  {formatCurrency(summary?.total_earnings || 0, 'PKR')}
                </p>
              </div>
              <div className="flex p-3 bg-primary-color/10 rounded-lg">
                <span className="material-symbols-outlined text-2xl text-primary-color">
                  trending_up
                </span>
              </div>
            </div>
          </div>

          <div className="card bg-surface p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-secondary mb-1">Withdrawn</p>
                <p className="text-2xl font-bold text-blue-500">
                  {formatCurrency(Math.abs(summary?.total_withdrawn || 0), 'PKR')}
                </p>
              </div>
              <div className="flex p-3 bg-blue-500/10 rounded-lg">
                <span className="material-symbols-outlined text-2xl text-blue-500">
                  payment
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-2 border-b border-color overflow-x-auto">
        <button
          className={`px-4 py-2 font-medium transition-colors whitespace-nowrap ${
            activeTab === 'summary'
              ? 'text-primary-color border-b-2 border-primary-color'
              : 'text-secondary hover:text-primary'
          }`}
          onClick={() => setActiveTab('summary')}
        >
          Transaction History
        </button>
        <button
          className={`px-4 py-2 font-medium transition-colors whitespace-nowrap ${
            activeTab === 'withdrawals'
              ? 'text-primary-color border-b-2 border-primary-color'
              : 'text-secondary hover:text-primary'
          }`}
          onClick={() => setActiveTab('withdrawals')}
        >
          Withdrawals
        </button>
        <button
          className={`px-4 py-2 font-medium transition-colors whitespace-nowrap ${
            activeTab === 'payment-methods'
              ? 'text-primary-color border-b-2 border-primary-color'
              : 'text-secondary hover:text-primary'
          }`}
          onClick={() => setActiveTab('payment-methods')}
        >
          Payment Methods
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'summary' && (
        <div className="card bg-surface">
          {ledgerLoading ? (
            <div className="flex items-center justify-center py-12">
              <LoadingSpinner />
            </div>
          ) : ledgerData?.results?.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-color">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-secondary">
                      Date
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-secondary">
                      Type
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-secondary">
                      Description
                    </th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-secondary">
                      Amount
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-secondary">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {ledgerData.results.map((entry) => (
                    <tr key={entry.id} className="border-b border-color hover:bg-hover">
                      <td className="py-3 px-4 text-sm text-secondary">
                        {formatDateTime(entry.created_at)}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`text-xs px-2 py-1 rounded ${
                          entry.transaction_type === 'earning'
                            ? 'bg-success/10 text-success'
                            : 'bg-blue-500/10 text-blue-500'
                        }`}>
                          {entry.transaction_type}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-primary">
                        {entry.description}
                      </td>
                      <td className={`py-3 px-4 text-sm text-right font-semibold ${
                        entry.amount >= 0 ? 'text-success' : 'text-error'
                      }`}>
                        {entry.amount >= 0 ? '+' : ''}{formatCurrency(entry.amount, 'PKR')}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`text-xs px-2 py-1 rounded ${
                          entry.status === 'available'
                            ? 'bg-success/10 text-success'
                            : entry.status === 'pending'
                            ? 'bg-warning/10 text-warning'
                            : 'bg-blue-500/10 text-blue-500'
                        }`}>
                          {entry.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12 text-secondary">
              <span className="material-symbols-outlined text-5xl mb-2 opacity-50">
                receipt_long
              </span>
              <p>No transactions yet</p>
            </div>
          )}
        </div>
      )}

      {activeTab === 'withdrawals' && (
        <div className="card bg-surface">
          {payoutsLoading ? (
            <div className="flex items-center justify-center py-12">
              <LoadingSpinner />
            </div>
          ) : payoutsData?.results?.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-color">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-secondary">
                      Requested Date
                    </th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-secondary">
                      Amount
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-secondary">
                      Payment Method
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-secondary">
                      Status
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-secondary">
                      Processed Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {payoutsData.results.map((payout) => (
                    <tr key={payout.id} className="border-b border-color hover:bg-hover">
                      <td className="py-3 px-4 text-sm text-secondary">
                        {formatDateTime(payout.requested_at)}
                      </td>
                      <td className="py-3 px-4 text-sm text-right font-semibold text-primary">
                        {formatCurrency(payout.amount, payout.currency)}
                      </td>
                      <td className="py-3 px-4 text-sm text-secondary">
                        {payout.payment_method 
                          ? `${payout.payment_method.metadata?.bank_name || 'Bank'} - ${payout.payment_method.metadata?.account_number || 'N/A'}`
                          : 'N/A'
                        }
                      </td>
                      <td className="py-3 px-4">
                        <span className={`text-xs px-2 py-1 rounded ${
                          payout.status === 'completed'
                            ? 'bg-success/10 text-success'
                            : payout.status === 'failed'
                            ? 'bg-error/10 text-error'
                            : payout.status === 'cancelled'
                            ? 'bg-gray-500/10 text-gray-500'
                            : 'bg-warning/10 text-warning'
                        }`}>
                          {payout.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-secondary">
                        {payout.processed_at ? formatDateTime(payout.processed_at) : '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12 text-secondary">
              <span className="material-symbols-outlined text-5xl mb-2 opacity-50">
                payments
              </span>
              <p>No withdrawal requests yet</p>
            </div>
          )}
        </div>
      )}

      {activeTab === 'payment-methods' && (
        <PaymentMethodsList />
      )}

      {/* Withdraw Modal */}
      <WithdrawFundsModal
        isOpen={showWithdrawModal}
        onClose={() => setShowWithdrawModal(false)}
        availableBalance={summary?.available_balance || 0}
        currency="PKR"
        onSuccess={handleWithdrawSuccess}
      />
    </div>
  );
}
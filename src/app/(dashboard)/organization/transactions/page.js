// app/organization/transactions/page.jsx

"use client";

import React, { useState } from "react";
import { useCreditsLedger } from "@/lib/hooks/useOrganization";
import { formatCurrency, formatDateTime } from "@/lib/utils/global";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { Button } from "@/components/ui/Button";

export default function OrganizationTransactionsPage() {
  const [transactionType, setTransactionType] = useState('all');
  const { data: ledgerData, isLoading } = useCreditsLedger();

  const filteredTransactions = ledgerData?.results?.filter(entry => 
    transactionType === 'all' || entry.transaction_type === transactionType
  ) || [];

  const stats = {
    totalCredits: ledgerData?.results?.filter(e => e.transaction_type === 'credit').reduce((sum, e) => sum + parseFloat(e.amount), 0) || 0,
    totalDebits: Math.abs(ledgerData?.results?.filter(e => e.transaction_type === 'debit').reduce((sum, e) => sum + parseFloat(e.amount), 0) || 0),
    totalTransactions: ledgerData?.results?.length || 0,
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold text-primary">Transaction History</h1>
        <p className="text-secondary mt-1">
          View all credit purchases and appointment charges
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="card bg-surface p-4">
          <p className="text-sm text-secondary mb-1">Total Credits Purchased</p>
          <p className="text-2xl font-bold text-success">
            {formatCurrency(stats.totalCredits, 'PKR')}
          </p>
        </div>
        <div className="card bg-surface p-4">
          <p className="text-sm text-secondary mb-1">Total Spent</p>
          <p className="text-2xl font-bold text-error">
            {formatCurrency(stats.totalDebits, 'PKR')}
          </p>
        </div>
        <div className="card bg-surface p-4">
          <p className="text-sm text-secondary mb-1">Total Transactions</p>
          <p className="text-2xl font-bold text-primary">{stats.totalTransactions}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="card bg-surface p-4">
        <div className="flex gap-2 flex-wrap">
          <Button
            variant={transactionType === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTransactionType('all')}
          >
            All
          </Button>
          <Button
            variant={transactionType === 'credit' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTransactionType('credit')}
          >
            Credits
          </Button>
          <Button
            variant={transactionType === 'debit' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTransactionType('debit')}
          >
            Debits
          </Button>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="card bg-surface">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <LoadingSpinner />
          </div>
        ) : filteredTransactions.length > 0 ? (
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
                  <th className="text-right py-3 px-4 text-sm font-semibold text-secondary">
                    Balance
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((entry) => (
                  <tr key={entry.id} className="border-b border-color hover:bg-hover">
                    <td className="py-3 px-4 text-sm text-secondary">
                      {formatDateTime(entry.created_at)}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`text-xs px-2 py-1 rounded ${
                        entry.transaction_type === 'credit'
                          ? 'bg-success/10 text-success'
                          : 'bg-error/10 text-error'
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
                      {entry.amount >= 0 ? '+' : ''}{formatCurrency(Math.abs(entry.amount), 'PKR')}
                    </td>
                    <td className="py-3 px-4 text-sm text-right text-primary font-semibold">
                      {formatCurrency(entry.balance_after, 'PKR')}
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
    </div>
  );
}
// components/doctor/PaymentMethodsList.jsx
"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { usePaymentMethods } from "@/lib/hooks/useBilling";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import PaymentMethodForm from "./PaymentMethodForm";
import DeletePaymentMethodModal from "./DeletePaymentMethodModal";

export default function PaymentMethodsList() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [methodToDelete, setMethodToDelete] = useState(null);
  const { data: paymentMethods, isLoading, refetch } = usePaymentMethods();

  const handleAddSuccess = () => {
    setShowAddForm(false);
    refetch();
  };

  const handleDeleteSuccess = () => {
    setMethodToDelete(null);
    refetch();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-xl font-semibold text-primary">Payment Methods</h2>
          <p className="text-sm text-secondary mt-1">
            Manage your bank accounts for receiving payouts
          </p>
        </div>
        <Button onClick={() => setShowAddForm(!showAddForm)}>
          <span className="material-symbols-outlined text-sm">
            {showAddForm ? 'close' : 'add'}
          </span>
          {showAddForm ? 'Cancel' : 'Add Payment Method'}
        </Button>
      </div>

      {showAddForm && (
        <div className="card bg-surface p-6">
          <h3 className="text-lg font-semibold text-primary mb-4">
            Add New Payment Method
          </h3>
          <PaymentMethodForm
            onSuccess={handleAddSuccess}
            onCancel={() => setShowAddForm(false)}
          />
        </div>
      )}

      <div className="space-y-4">
        {paymentMethods?.results?.length > 0 ? (
          paymentMethods.results.map((method) => (
            <div
              key={method.id}
              className="card bg-surface p-4"
            >
              <div className="flex items-start justify-between flex-wrap gap-4">
                <div className="flex items-start gap-4 flex-1">
                  <div className="flex p-3 bg-primary-color/10 rounded-lg flex-shrink-0">
                    <span className="material-symbols-outlined text-2xl text-primary-color">
                      account_balance
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <h3 className="font-semibold text-primary">
                        {method.metadata?.bank_name || 'Bank Account'}
                      </h3>
                      {method.is_default && (
                        <Badge variant="success" size="sm">Default</Badge>
                      )}
                    </div>
                    <div className="space-y-1 text-sm text-secondary">
                      <p className="flex items-center gap-2">
                        <span className="text-xs font-medium">Account:</span>
                        <span className="font-mono">{method.metadata?.account_number || 'N/A'}</span>
                      </p>
                      <p className="flex items-center gap-2">
                        <span className="text-xs font-medium">Title:</span>
                        <span>{method.metadata?.account_title || 'N/A'}</span>
                      </p>
                      {method.metadata?.iban && (
                        <p className="flex items-center gap-2">
                          <span className="text-xs font-medium">IBAN:</span>
                          <span className="font-mono text-xs">{method.metadata.iban}</span>
                        </p>
                      )}
                      {method.metadata?.branch_code && (
                        <p className="flex items-center gap-2">
                          <span className="text-xs font-medium">Branch:</span>
                          <span>{method.metadata.branch_code}</span>
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-error text-error hover:bg-error hover:text-white"
                  onClick={() => setMethodToDelete(method)}
                >
                  <span className="material-symbols-outlined text-sm">delete</span>
                  Delete
                </Button>
              </div>
            </div>
          ))
        ) : (
          <div className="card bg-surface p-12">
            <div className="text-center text-secondary">
              <span className="material-symbols-outlined text-6xl mb-3 opacity-50">
                account_balance
              </span>
              <h3 className="font-semibold text-primary mb-2">
                No Payment Methods
              </h3>
              <p className="text-sm mb-4">
                Add a payment method to receive payouts
              </p>
              <Button onClick={() => setShowAddForm(true)}>
                <span className="material-symbols-outlined text-sm">add</span>
                Add Your First Payment Method
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <DeletePaymentMethodModal
        isOpen={!!methodToDelete}
        onClose={() => setMethodToDelete(null)}
        paymentMethod={methodToDelete}
        onSuccess={handleDeleteSuccess}
      />
    </div>
  );
}
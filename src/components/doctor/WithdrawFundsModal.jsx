// components/doctor/WithdrawFundsModal.jsx
"use client";

import React, { useState, useEffect } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/forms/Input";
import { Select } from "@/components/forms/Select";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { usePaymentMethods, useCreatePayoutRequest } from "@/lib/hooks/useBilling";
import { formatCurrency } from "@/lib/utils/global";
import { toast } from "react-hot-toast";

export default function WithdrawFundsModal({ 
  isOpen, 
  onClose, 
  availableBalance = 0,
  currency = 'PKR',
  onSuccess 
}) {
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [errors, setErrors] = useState({});
  
  const { data: paymentMethodsData, isLoading: isLoadingMethods } = usePaymentMethods();
  const { mutateAsync: createPayout, isPending: isCreatingPayout } = useCreatePayoutRequest();

  const minWithdrawal = currency === 'PKR' ? 1000 : 10;

  useEffect(() => {
    if (!isOpen) {
      setWithdrawAmount('');
      setSelectedPaymentMethod('');
      setErrors({});
    }
  }, [isOpen]);

  useEffect(() => {
    // Auto-select default payment method
    if (paymentMethodsData?.results?.length > 0 && !selectedPaymentMethod) {
      const defaultMethod = paymentMethodsData.results.find(m => m.is_default);
      if (defaultMethod) {
        setSelectedPaymentMethod(defaultMethod.id);
      } else {
        setSelectedPaymentMethod(paymentMethodsData.results[0].id);
      }
    }
  }, [paymentMethodsData, selectedPaymentMethod]);

  const paymentMethodOptions = paymentMethodsData?.results?.map(method => ({
    value: method.id,
    label: `${method.metadata?.bank_name || 'Bank Account'} - ${method.metadata?.account_number || 'N/A'}${method.is_default ? ' (Default)' : ''}`
  })) || [];

  const validate = () => {
    const newErrors = {};
    const amount = parseFloat(withdrawAmount);

    if (!withdrawAmount || isNaN(amount)) {
      newErrors.amount = 'Please enter a valid amount';
    } else if (amount <= 0) {
      newErrors.amount = 'Amount must be greater than zero';
    } else if (amount < minWithdrawal) {
      newErrors.amount = `Minimum withdrawal amount is ${formatCurrency(minWithdrawal, currency)}`;
    } else if (amount > availableBalance) {
      newErrors.amount = 'Insufficient balance';
    }

    if (!selectedPaymentMethod) {
      newErrors.paymentMethod = 'Please select a payment method';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) return;

    try {
      await createPayout({
        amount: parseFloat(withdrawAmount),
        currency: currency,
        payment_method: selectedPaymentMethod,
      });
      
      toast.success('Withdrawal request submitted successfully');
      onSuccess?.();
      onClose();
    } catch (error) {
      const errorMessage = error?.response?.data?.detail 
        || error?.response?.data?.amount?.[0]
        || error?.response?.data?.payment_method?.[0]
        || error?.response?.data?.non_field_errors?.[0]
        || error.message 
        || 'Failed to create withdrawal request';
      
      toast.error(errorMessage);
    }
  };

  const handleAmountChange = (e) => {
    setWithdrawAmount(e.target.value);
    if (errors.amount) {
      setErrors(prev => ({ ...prev, amount: '' }));
    }
  };

  const handlePaymentMethodChange = (e) => {
    setSelectedPaymentMethod(e.target.value);
    if (errors.paymentMethod) {
      setErrors(prev => ({ ...prev, paymentMethod: '' }));
    }
  };

  const setMaxAmount = () => {
    setWithdrawAmount(availableBalance.toString());
    if (errors.amount) {
      setErrors(prev => ({ ...prev, amount: '' }));
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Withdraw Funds"
      size="md"
    >
      {isLoadingMethods ? (
        <div className="flex items-center justify-center py-8">
          <LoadingSpinner />
        </div>
      ) : paymentMethodsData?.results?.length === 0 ? (
        <div className="text-center py-6">
          <span className="material-symbols-outlined text-5xl mb-3 opacity-50 text-secondary">
            account_balance
          </span>
          <p className="text-primary font-medium mb-2">No Payment Method Found</p>
          <p className="text-sm text-secondary mb-4">
            Please add a payment method first to withdraw funds
          </p>
          <Button onClick={onClose}>
            Close
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-success/10 rounded-lg p-4 border border-success/20">
            <p className="text-sm text-secondary mb-2">Available Balance</p>
            <p className="text-3xl font-bold text-success">
              {formatCurrency(availableBalance, currency)}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-2">
              Payment Method *
            </label>
            <Select
              value={selectedPaymentMethod}
              onChange={handlePaymentMethodChange}
              options={paymentMethodOptions}
              required
              disabled={isCreatingPayout}
              error={errors.paymentMethod}
            />
            {errors.paymentMethod && (
              <p className="text-sm text-error mt-1">{errors.paymentMethod}</p>
            )}
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-primary">
                Withdrawal Amount *
              </label>
              <button
                type="button"
                onClick={setMaxAmount}
                className="text-xs text-primary-color hover:text-primary-color/80 font-medium"
                disabled={isCreatingPayout}
              >
                Max: {formatCurrency(availableBalance, currency)}
              </button>
            </div>
            <Input
              type="number"
              value={withdrawAmount}
              onChange={handleAmountChange}
              placeholder="Enter amount"
              disabled={isCreatingPayout}
              error={errors.amount}
              min={minWithdrawal}
              max={availableBalance}
              step="0.01"
            />
            <p className="text-xs text-secondary mt-1">
              Minimum withdrawal: {formatCurrency(minWithdrawal, currency)}
            </p>
          </div>

          <div className="bg-info/10 rounded-lg p-4 border border-info/20">
            <div className="flex items-start gap-2">
              <span className="material-symbols-outlined text-info text-xl">info</span>
              <div className="text-sm text-primary">
                <p className="font-medium mb-1">Processing Time</p>
                <p className="text-secondary">
                  Withdrawal requests are typically processed within 2-3 business days.
                  You'll receive a notification once processed.
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-3 justify-end pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isCreatingPayout}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              isLoading={isCreatingPayout}
              disabled={isCreatingPayout}
            >
              <span className="material-symbols-outlined text-base">payments</span>
              Submit Request
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
}
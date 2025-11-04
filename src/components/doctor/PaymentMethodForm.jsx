// components/doctor/PaymentMethodForm.jsx
"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/forms/Input";
import { Select } from "@/components/forms/Select";
import { useCreatePaymentMethod } from "@/lib/hooks/useBilling";
import { toast } from "react-hot-toast";

const BANK_OPTIONS = [
  { value: "HBL", label: "Habib Bank Limited (HBL)" },
  { value: "UBL", label: "United Bank Limited (UBL)" },
  { value: "MCB", label: "Muslim Commercial Bank (MCB)" },
  { value: "ABL", label: "Allied Bank Limited (ABL)" },
  { value: "NBP", label: "National Bank of Pakistan (NBP)" },
  { value: "Meezan", label: "Meezan Bank" },
  { value: "Alfalah", label: "Bank Alfalah" },
  { value: "Standard", label: "Standard Chartered Bank" },
  { value: "Faysal", label: "Faysal Bank" },
  { value: "Askari", label: "Askari Bank" },
  { value: "Other", label: "Other" },
];

export default function PaymentMethodForm({ onSuccess, onCancel }) {
  const [formData, setFormData] = useState({
    bank_name: "",
    account_title: "",
    account_number: "",
    iban: "",
    branch_code: "",
    is_default: false,
  });
  const [errors, setErrors] = useState({});
  const { mutateAsync: createPaymentMethod, isPending } = useCreatePaymentMethod();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.bank_name) {
      newErrors.bank_name = "Bank name is required";
    }

    if (!formData.account_title.trim()) {
      newErrors.account_title = "Account title is required";
    } else if (formData.account_title.trim().length < 3) {
      newErrors.account_title = "Account title must be at least 3 characters";
    }

    if (!formData.account_number.trim()) {
      newErrors.account_number = "Account number is required";
    } else if (!/^\d+$/.test(formData.account_number)) {
      newErrors.account_number = "Account number must contain only digits";
    }

    if (formData.iban && !/^PK\d{2}[A-Z]{4}\d{16}$/.test(formData.iban.replace(/\s/g, ''))) {
      newErrors.iban = "Invalid IBAN format (e.g., PK36ABCD1234567890123456)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) return;

    try {
      const paymentMethodData = {
        payment_type: 'bank_account',
        is_default: formData.is_default,
        metadata: {
          bank_name: formData.bank_name,
          account_title: formData.account_title.trim(),
          account_number: formData.account_number.trim(),
          ...(formData.iban && { iban: formData.iban.replace(/\s/g, '').trim() }),
          ...(formData.branch_code && { branch_code: formData.branch_code.trim() }),
        }
      };

      await createPaymentMethod(paymentMethodData);
      toast.success('Payment method added successfully');
      onSuccess?.();
    } catch (error) {
      const errorMessage = error?.response?.data?.detail 
        || error?.response?.data?.metadata?.[0]
        || error?.response?.data?.payment_type?.[0]
        || error.message 
        || 'Failed to add payment method';
      
      toast.error(errorMessage);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-primary mb-2">
          Bank Name *
        </label>
        <Select
          name="bank_name"
          value={formData.bank_name}
          onChange={handleChange}
          options={BANK_OPTIONS}
          required
          disabled={isPending}
          error={errors.bank_name}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-primary mb-2">
          Account Title *
        </label>
        <Input
          type="text"
          name="account_title"
          value={formData.account_title}
          onChange={handleChange}
          placeholder="Enter account holder name"
          disabled={isPending}
          error={errors.account_title}
          maxLength={100}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-primary mb-2">
          Account Number *
        </label>
        <Input
          type="text"
          name="account_number"
          value={formData.account_number}
          onChange={handleChange}
          placeholder="Enter account number"
          disabled={isPending}
          error={errors.account_number}
          maxLength={30}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-primary mb-2">
          IBAN (Optional)
        </label>
        <Input
          type="text"
          name="iban"
          value={formData.iban}
          onChange={handleChange}
          placeholder="PK36ABCD1234567890123456"
          disabled={isPending}
          error={errors.iban}
          maxLength={26}
        />
        <p className="text-xs text-secondary mt-1">
          Format: PK + 2 digits + 4 letters + 16 digits
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-primary mb-2">
          Branch Code (Optional)
        </label>
        <Input
          type="text"
          name="branch_code"
          value={formData.branch_code}
          onChange={handleChange}
          placeholder="Enter branch code"
          disabled={isPending}
          maxLength={10}
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          name="is_default"
          id="is_default"
          checked={formData.is_default}
          onChange={handleChange}
          disabled={isPending}
          className="w-4 h-4 text-primary-color focus:ring-primary-color border-color rounded"
        />
        <label htmlFor="is_default" className="text-sm text-primary cursor-pointer">
          Set as default payment method
        </label>
      </div>

      <div className="flex gap-3 justify-end pt-2">
        {onCancel && (
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isPending}
          >
            Cancel
          </Button>
        )}
        <Button
          type="submit"
          isLoading={isPending}
          disabled={isPending}
        >
          <span className="material-symbols-outlined text-base">add</span>
          Add Payment Method
        </Button>
      </div>
    </form>
  );
}
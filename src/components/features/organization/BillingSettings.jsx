import React from "react";
import PropTypes from "prop-types";
import { Input } from "@/components/forms/Input";
import { Select } from "@/components/forms/Select";

export const BillingSettings = ({ billingSettings, handleInputChange, isEditing }) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="card bg-surface p-6">
        <h3 className="text-lg font-semibold text-primary mb-4">Billing & Payment Settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-primary font-medium">Auto Renewal</p>
              <p className="text-secondary text-sm">Automatically purchase credits when balance is low</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={billingSettings.autoRenewal}
                onChange={(e) => handleInputChange("billing", "autoRenewal", e.target.checked)}
                disabled={!isEditing}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-color/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-color"></div>
            </label>
          </div>
          
          <Input
            label="Low Credit Alert Threshold"
            value={billingSettings.lowCreditAlert}
            onChange={(e) => handleInputChange("billing", "lowCreditAlert", e.target.value)}
            type="number"
            disabled={!isEditing}
            hint="Get notified when credits fall below this amount"
          />
          
          <Input
            label="Credit Alert Email"
            value={billingSettings.creditAlertEmail}
            onChange={(e) => handleInputChange("billing", "creditAlertEmail", e.target.value)}
            disabled={!isEditing}
          />
          
          <Select
            label="Billing Cycle"
            value={billingSettings.billingCycle}
            onChange={(e) => handleInputChange("billing", "billingCycle", e.target.value)}
            options={[
              { value: "Monthly", label: "Monthly" },
              { value: "Quarterly", label: "Quarterly" },
              { value: "Annually", label: "Annually" }
            ]}
            disabled={!isEditing}
          />
          
          <Select
            label="Payment Method"
            value={billingSettings.paymentMethod}
            onChange={(e) => handleInputChange("billing", "paymentMethod", e.target.value)}
            options={[
              { value: "Credit Card", label: "Credit Card" },
              { value: "Bank Transfer", label: "Bank Transfer" },
              { value: "PayPal", label: "PayPal" }
            ]}
            disabled={!isEditing}
          />
          
          <Input
            label="Tax ID"
            value={billingSettings.taxId}
            onChange={(e) => handleInputChange("billing", "taxId", e.target.value)}
            disabled={!isEditing}
          />
        </div>
      </div>
    </div>
  );
};

BillingSettings.propTypes = {
  billingSettings: PropTypes.shape({
    autoRenewal: PropTypes.bool,
    lowCreditThreshold: PropTypes.string,
    creditAlertEmail: PropTypes.string,
    billingCycle: PropTypes.string,
    paymentMethod: PropTypes.string,
    taxId: PropTypes.string
  }).isRequired,
  handleInputChange: PropTypes.func.isRequired,
  isEditing: PropTypes.bool.isRequired
};
"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { useCreditPackages, usePurchasePackage, useConfirmPurchase } from "@/lib/hooks/useOrganization";
import { formatCurrency } from "@/lib/utils/global";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { toast } from "react-hot-toast";

const stripePromise = loadStripe("pk_test_51SPQzWHYjN0rrTgkBOKk4MHIyVzDv2howBDaP7GSImNRMTUSRJPHZIhzsK7Lhx4kawWcb8HdAL1nGXC2YEun9cG80074Z9AOlu");

function CheckoutForm({ selectedPackage, onSuccess }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  
  const { mutateAsync: purchasePackage } = usePurchasePackage();
  const { mutateAsync: confirmPurchase } = useConfirmPurchase();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!stripe || !elements) return;
    
    setLoading(true);
    
    try {
      // Step 1: Create purchase and get client secret
      const { client_secret, purchase_id } = await purchasePackage({
        packageId: selectedPackage.id,
      });
      
      // Step 2: Confirm payment with Stripe
      const { error, paymentIntent } = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });
      
      if (error) {
        toast.error(error.message);
        setLoading(false);
        return;
      }
      
      if (paymentIntent.status === 'succeeded') {
        // Step 3: Confirm purchase on backend
        await confirmPurchase(purchase_id);
        toast.success('Credits purchased successfully!');
        onSuccess();
      }
    } catch (error) {
      toast.error(error.message || 'Purchase failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="p-4 border border-color rounded-lg">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
      </div>
      
      <Button
        type="submit"
        disabled={!stripe || loading}
        className="w-full"
      >
        {loading ? (
          <>
            <LoadingSpinner />
            <span>Processing...</span>
          </>
        ) : (
          <>
            <span className="material-symbols-outlined text-sm">payment</span>
            <span>Pay {formatCurrency(selectedPackage.price, 'PKR')}</span>
          </>
        )}
      </Button>
    </form>
  );
}

export default function PurchaseCreditsPage() {
  const { data: packages, isLoading } = useCreditPackages();
  const [selectedPackage, setSelectedPackage] = useState(null);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold text-primary">Purchase Credits</h1>
        <p className="text-secondary mt-1">
          Choose a credit package to continue processing appointments
        </p>
      </div>

      {!selectedPackage ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {packages?.results?.map((pkg) => (
            <div
              key={pkg.id}
              className="card bg-surface p-6 hover:shadow-lg transition-shadow"
            >
              <div className="text-center mb-4">
                <h3 className="text-2xl font-bold text-primary mb-2">
                  {pkg.name}
                </h3>
                <p className="text-sm text-secondary mb-4">
                  {pkg.description}
                </p>
                <div className="text-4xl font-bold text-primary-color mb-2">
                  {formatCurrency(pkg.price, 'PKR')}
                </div>
                <p className="text-sm text-secondary">
                  {pkg.credits} Credits
                </p>
              </div>

              <ul className="space-y-2 mb-6">
                {pkg.bonus_credits > 0 && (
                  <li className="flex items-center gap-2 text-sm text-success">
                    <span className="material-symbols-outlined text-sm">check_circle</span>
                    <span>+{pkg.bonus_credits} Bonus Credits</span>
                  </li>
                )}
                <li className="flex items-center gap-2 text-sm text-secondary">
                  <span className="material-symbols-outlined text-sm">check_circle</span>
                  <span>Valid for {pkg.validity_days} days</span>
                </li>
                <li className="flex items-center gap-2 text-sm text-secondary">
                  <span className="material-symbols-outlined text-sm">check_circle</span>
                  <span>24/7 Support</span>
                </li>
              </ul>

              <Button
                onClick={() => setSelectedPackage(pkg)}
                className="w-full"
                disabled={!pkg.is_active}
              >
                Select Package
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <div className="max-w-2xl mx-auto w-full">
          <div className="card bg-surface p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-primary">
                Checkout
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedPackage(null)}
              >
                Change Package
              </Button>
            </div>

            <div className="bg-hover p-4 rounded-lg mb-6">
              <h3 className="font-semibold text-primary mb-2">
                {selectedPackage.name}
              </h3>
              <div className="flex justify-between items-center mb-2">
                <span className="text-secondary">Credits:</span>
                <span className="font-semibold text-primary">
                  {selectedPackage.credits}
                </span>
              </div>
              {selectedPackage.bonus_credits > 0 && (
                <div className="flex justify-between items-center mb-2">
                  <span className="text-secondary">Bonus Credits:</span>
                  <span className="font-semibold text-success">
                    +{selectedPackage.bonus_credits}
                  </span>
                </div>
              )}
              <div className="flex justify-between items-center pt-2 border-t border-color">
                <span className="font-semibold text-primary">Total:</span>
                <span className="text-2xl font-bold text-primary-color">
                  {formatCurrency(selectedPackage.price, 'PKR')}
                </span>
              </div>
            </div>

            <Elements stripe={stripePromise}>
              <CheckoutForm
                selectedPackage={selectedPackage}
                onSuccess={() => {
                  setSelectedPackage(null);
                  window.location.href = '/organization';
                }}
              />
            </Elements>
          </div>
        </div>
      )}
    </div>
  );
}
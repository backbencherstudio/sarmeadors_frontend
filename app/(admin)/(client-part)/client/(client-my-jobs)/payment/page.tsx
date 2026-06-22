"use client";

import PaymentPage from "@/components/client/ClientPayment/StripePayment";

export default function PaymentMethodPage() {
  const STORAGE_KEY = "short-term-job-details";
  const stored = localStorage.getItem(STORAGE_KEY);

  return (
    <div className="p-6">
      <PaymentPage storedData={stored ? JSON.parse(stored) : null} />
    </div>
  );
}

import ClientPaymentTopMenu from "@/components/client/ClientPayment/ClientPaymentTopMenu";
import React from "react";

export default function PaymentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="p-6">
      <ClientPaymentTopMenu />
      {children}
    </div>
  );
}

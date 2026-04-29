import InvoiceHeader from "@/components/clients/AgencyLongTermJob/ViewInvoice/InvoiceHeader";
import PaymentSummary from "@/components/clients/AgencyLongTermJob/ViewInvoice/PaymentSummary";
import PaymentTable from "@/components/clients/AgencyLongTermJob/ViewInvoice/PaymentTable";

export default function page() {
  return (
    <div className="p-6">
      <InvoiceHeader />
      <div className="mt-4 mb-6">
        <PaymentSummary />
      </div>
      <PaymentTable />
    </div>
  );
}

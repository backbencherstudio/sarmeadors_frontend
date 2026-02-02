import ViewInvoicePage from "@/components/clients/AdminTabs/payment/ViewInvoicePage";
import PageLink from "@/components/common/PageLink";

function ViewInvoice() {
  return (
    <div className="md:p-6 p-4">
      <div>
        <PageLink path="/clients" title="View Invoice Page" />
      </div>
      <div>
        <ViewInvoicePage />
      </div>
    </div>
  );
}

export default ViewInvoice;

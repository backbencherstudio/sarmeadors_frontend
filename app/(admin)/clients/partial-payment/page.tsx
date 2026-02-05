import PartialPayment from "@/components/clients/AdminTabs/payment/PartialPayment";
import PageLink from "@/components/common/PageLink";

function page() {
  return (
    <div className="md:p-6 p-4">
      <div>
        <PageLink path="/clients" title="Partial request - saiful" />
      </div>
      <div>
        <PartialPayment />
      </div>
    </div>
  );
}

export default page;

import ManualPayments from "@/components/dashboard/ManualPayments";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import InvoiceInfo from "./InvoiceInfo";

function PaymentPage() {
  const role = "admin"; // This can be dynamic based on your application logic
  return (
    <div className="md:p-6 p-2 rounded-2xl border-borderColor border">
      <Tabs defaultValue="payment" className="bg-transparent">
        <TabsList className="flex max-w-[360px] border border-borderColor w-full px-1 gap-1 items-center bg-transparent h-13.5!">
          <TabsTrigger
            value="payment"
            className={`lg:px-3 !h-11 hover:bg-grayColor1 hover:border duration-200 data-[state=active]:border data-[state=active]:bg-grayColor1 cursor-pointer rounded-sm text-[13px] md:text-sm font-semibold transition `}
          >
            Manually Payments
          </TabsTrigger>

          <TabsTrigger
            value="invoice"
            className={`lg:px-3 !h-11 hover:bg-grayColor1 hover:border duration-200 cursor-pointer data-[state=active]:border data-[state=active]:bg-grayColor1 rounded-sm text-[13px] md:text-sm font-semibold transition `}
          >
            Advance Invoice Manager
          </TabsTrigger>
        </TabsList>
        <TabsContent value="payment" className="">
          <div className="mt-4">
            <ManualPayments />
          </div>
        </TabsContent>
        <TabsContent value="invoice" className="bg-transparent">
          <div className="">
            <InvoiceInfo />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default PaymentPage;

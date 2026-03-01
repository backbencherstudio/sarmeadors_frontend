import PaymentHistoryTable from "@/components/client/ClientPayment/PaymentHistoryTable";

export default function PaymentPage() {
  return (
    <div>
      <div className="p-5 border boder-[#E5E7EB] rounded-2xl bg-[#F9FAFB] mt-4">
        <div className="mb-4">
          <h1 className="text-[#111927] text-[20px] font-medium leading-[120%]">
            Your Invoice
          </h1>
          <p className="mt-1.5 text-[#778593] text-[14px] leading-[142.857%] font-medium">
            Client has not entered stripe information. Invoices can be sent but
            invoices can not be automatically collected
          </p>
        </div>
        <div className="grid grid-cols-4 gap-x-1.5">
          <div className="bg-[#FFFFFF] p-4 rounded-[8px] w-full col-span-3">
            <h1 className="text-lg leading-[111.111%] text-[#111927] font-medium">
              $100
            </h1>
          </div>
          <div className="col-span-1">
            <button className="px-4 py-[14px] bg-[#111927] border border-[#384250] rounded-[12px] text-[#FCFCFD] text-[16px] leading-[137.5%] font-semibold cursor-pointer">
              Pay Now
            </button>
          </div>
        </div>
      </div>
      <div className="mt-6">
        <PaymentHistoryTable />
      </div>
    </div>
  );
}

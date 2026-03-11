import InvoiceTable from "@/components/client/ClientPayment/InvoiceTable";
import PaymentForm from "@/components/client/ClientPayment/PaymentForm";
import ArrowLeftIcon from "@/public/icon/ArrowLeftIcon";
import Image from "next/image";
import Link from "next/link";

export default function InvoiceDetails() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <Link
          href="/client/client-payments/advanced-invoice/invoice-details"
          className="text-lg font-semibold flex items-center gap-3 w-fit"
        >
          <ArrowLeftIcon />
          <span>View Invoice Page</span>
        </Link>
      </div>
      <div className="mt-8 p-10 bg-white border border-[#E5E7EB] rounded-lg shadow">
        <div className="flex items-center justify-center">
          <Image
            src={"/client/logo.png"}
            alt="logo"
            width={400}
            height={400}
            className="object-cover "
          />
        </div>
        <div>
          <h1 className="text-[#111927] text-2xl font-semibold leading-[116.667%]">
            Invoice:
          </h1>
          <div className="mt-4">
            <div className="flex items-center gap-x-2">
              <p className="text-[#778593] text-[16px] font-medium leading-[137.5%]">
                Status:
              </p>
              <p className="text-[#111927] text-[16px] font-medium leading-[137.5%]">
                Not Sent
              </p>
            </div>
            <div className="flex items-center gap-x-2 mt-1">
              <p className="text-[#778593] text-[16px] font-medium leading-[137.5%]">
                Invoice No:
              </p>
              <p className="text-[#111927] text-[16px] font-medium leading-[137.5%]">
                5837
              </p>
            </div>
            <div className="flex items-center gap-x-2 mt-1">
              <p className="text-[#778593] text-[16px] font-medium leading-[137.5%]">
                Invoice Name:
              </p>
              <p className="text-[#111927] text-[16px] font-medium leading-[137.5%]">
                Invoice #1
              </p>
            </div>
            <div className="flex items-center gap-x-2 mt-1">
              <p className="text-[#778593] text-[16px] font-medium leading-[137.5%]">
                Date:
              </p>
              <p className="text-[#111927] text-[16px] font-medium leading-[137.5%]">
                Sun Nov 30 2025
              </p>
            </div>
          </div>
        </div>

        <div>
          <h1 className="text-[#111927] text-2xl font-semibold leading-[116.667%] mt-[34px]">
            Bill to:
          </h1>
          <div className="mt-4">
            <p className="text-[#778593] text-[16px] font-medium leading-[137.5%]">
              Parvez Rahman
            </p>
            <p className="text-[#778593] text-[16px] font-medium leading-[137.5%]">
              Parvezz13913@gmail.com
            </p>
          </div>
        </div>
        <div>
          <InvoiceTable />
        </div>
        <div className="border-b border-[#E5E7EB] pb-8" />
        <div>
          <PaymentForm />
        </div>
      </div>
    </div>
  );
}

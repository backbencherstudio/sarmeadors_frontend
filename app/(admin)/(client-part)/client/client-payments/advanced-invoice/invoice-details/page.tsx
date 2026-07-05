"use client";

import InvoiceTable from "@/components/client/ClientPayment/InvoiceTable";
import { useGetPaymentInvoiceDetailsQuery } from "@/feature/dashboard/client/payment";
import ArrowLeftIcon from "@/public/icon/ArrowLeftIcon";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function InvoiceDetails() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const { data } = useGetPaymentInvoiceDetailsQuery(id);

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
                {data?.data?.status}
              </p>
            </div>
            <div className="flex items-center gap-x-2 mt-1">
              <p className="text-[#778593] text-[16px] font-medium leading-[137.5%]">
                Invoice No:
              </p>
              <p className="text-[#111927] text-[16px] font-medium leading-[137.5%]">
                {data?.data?.invoice_no}
              </p>
            </div>
            <div className="flex items-center gap-x-2 mt-1">
              <p className="text-[#778593] text-[16px] font-medium leading-[137.5%]">
                Invoice Name:
              </p>
              <p className="text-[#111927] text-[16px] font-medium leading-[137.5%]">
                {data?.data?.invoice_name}
              </p>
            </div>
            <div className="flex items-center gap-x-2 mt-1">
              <p className="text-[#778593] text-[16px] font-medium leading-[137.5%]">
                Date:
              </p>
              <p className="text-[#111927] text-[16px] font-medium leading-[137.5%]">
                {data?.data?.date}
              </p>
            </div>
          </div>
        </div>

        <div>
          <h1 className="text-[#111927] text-2xl font-semibold leading-[116.667%] mt-8.5">
            Bill to:
          </h1>
          <div className="mt-4">
            <p className="text-[#778593] text-[16px] font-medium leading-[137.5%]">
              {data?.data?.bill_to?.name}
            </p>
            <p className="text-[#778593] text-[16px] font-medium leading-[137.5%]">
              {data?.data?.bill_to?.email}
            </p>
          </div>
        </div>
        <div>
          <InvoiceTable data={data?.data} />
        </div>
        {/* <div className="border-b border-[#E5E7EB] pb-8" /> */}
        {/* <div>
          <PaymentForm />
        </div> */}
      </div>
    </div>
  );
}

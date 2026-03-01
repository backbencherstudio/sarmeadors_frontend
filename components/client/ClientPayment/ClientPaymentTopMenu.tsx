"use client";

import StripeLogoIcon from "@/components/icon/StripeLogoIcon";
import Link from "next/link";
import { usePathname } from "next/navigation";

function ClientPaymentTopMenu({ title, id }: { title?: string; id?: string }) {
  const path = usePathname();
  const isActive = (href: string) => {
    if (!path) return false;
    return path === href || path.startsWith(`${href}/`);
  };
  const activeAdminPath =
    isActive("/clients/admin") || isActive(`/client/client-payments/payment`);
  const activeProfilePath =
    isActive("/clients/profile") ||
    isActive(`/client/client-my-candidates/previous-candidates`);
  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[#111927] text-2xl leading-[116.667%] font-medium">
            Payments
          </h1>
          <p className="text-[#384250] text-[14px] leading-[142.857%]">
            Set up and manage your payments through{" "}
            <span className="text-[#0065FF]">Stripe</span>
          </p>
        </div>
        <div>
          <button className="px-6 py-4 bg-[#111927] border border-[#384250] rounded-[12px] flex items-center gap-x-1.5 cursor-pointer">
            <StripeLogoIcon />
            <span className="text-[#FCFCFD] font-semibold text-[16px] leading-[137.5%]">
              Connect Stripe
            </span>
          </button>
        </div>
      </div>
      <div className="w-full">
        <div className="w-full border-b border-gray-200">
          <div className="bg-transparent h-auto p-0 gap-5 rounded-none flex justify-start items-center whitespace-nowrap">
            <Link
              href={
                title == "clients"
                  ? "/clients/admin/list"
                  : `/client/client-payments/payment`
              }
              className={`flex items-center gap-2 px-4 py-3 rounded-none border-b-2 ${activeAdminPath ? "border-gray-800 text-gray-900 font-semibold" : "border-transparent text-gray-700"} hover:text-gray-900 cursor-pointer`}
            >
              <span>Payments</span>
            </Link>
            <Link
              href={
                title == "clients"
                  ? "/clients/profile/contact-and-address"
                  : `/client/client-my-candidates/previous-candidates`
              }
              className={`flex items-center gap-2 px-4 py-3 rounded-none border-b-2 ${activeProfilePath ? "border-gray-800 text-gray-900 font-semibold" : "border-transparent text-gray-700"} hover:text-gray-900 cursor-pointer`}
            >
              <span>Advance Invoice Manager</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClientPaymentTopMenu;

"use client";
import { useRouter } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io";

export default function InvoiceHeader() {
  const router = useRouter();
  return (
    <div>
      <button
        onClick={() => router.back()}
        className="font-semibold capitalize leading-[160%] flex items-center cursor-pointer"
      >
        <IoIosArrowBack />
        <span>Job Details</span>
      </button>
    </div>
  );
}

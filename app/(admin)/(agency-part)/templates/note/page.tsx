"use client";
import NoteTable from "@/components/clients/Templates/NoteTable";
import LinkReuseable from "@/components/reusable/CustomLink";
import ArrowLeftIcon from "@/public/icon/ArrowLeftIcon";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export default function page() {
  const router = useRouter();
  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1 cursor-pointer"
        >
          <ArrowLeftIcon />
          <h1 className="text-[#111927] text-2xl font-semibold">
            Note Template
          </h1>
        </button>
        <LinkReuseable
          href="/templates/add-email-template"
          title="Add Template"
          icon={<Plus />}
          className="py-2.5 px-3 rounded-md md:rounded-lg cursor-pointer bg-blackColor text-white h-full hover:scale-105 transition-all  duration-200"
        />
      </div>
      <div className="mt-4 p-3 border rounded-[8px]">
        <NoteTable />
      </div>
    </div>
  );
}

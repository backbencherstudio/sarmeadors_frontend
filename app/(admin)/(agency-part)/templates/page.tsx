"use client";
import SearchFilterBar from "@/components/clients/Templates/SearchFilterBar";
import TemplatesTable from "@/components/clients/Templates/TemplatesTable";
import ButtonReuseable from "@/components/reusable/CustomButton";
import { Plus } from "lucide-react";
const userTypeOptions = [
  { label: "Admin", value: "admin" },
  { label: "Nanny", value: "nanny" },
  { label: "Client", value: "client" },
];
const statusOptions = [
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" },
  { label: "Pending", value: "pending" },
];

const categoryType1Options = [
  { label: "Full-Time", value: "full-time" },
  { label: "Part-Time", value: "part-time" },
];
const categoryType2Options = [
  { label: "Live-In", value: "live-in" },
  { label: "Live-Out", value: "live-out" },
];

export default function page() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[#111927] text-2xl font-semibold">
            All Email Template
          </h1>
          <p className="text-[#778593] text-base">
            List of all current clients and their details.
          </p>
        </div>
        <ButtonReuseable title="Add Template" icon={<Plus />} />
      </div>
      <div>
        <SearchFilterBar
          onSearch={(val) => console.log("search:", val)}
          onFilterUserType={(val) => console.log("userType:", val)}
          onFilterStatus={(val) => console.log("status:", val)}
          onFilterCategoryType1={(val) => console.log("category1:", val)}
          onFilterCategoryType2={(val) => console.log("category2:", val)}
          userTypeOptions={userTypeOptions}
          statusOptions={statusOptions}
          categoryType1Options={categoryType1Options}
          categoryType2Options={categoryType2Options}
        />
      </div>
      <div className="mt-4 p-3 border rounded-[8px]">
        <TemplatesTable />
      </div>
    </div>
  );
}

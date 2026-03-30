"use client";
import Search from "@/components/common/Search";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from "@/components/ui/select";

import { Plus } from "lucide-react";
import { useState } from "react";
import { AiOutlineDownload } from "react-icons/ai";
import { IoMailOutline } from "react-icons/io5";
import { MdOutlineFilterAlt } from "react-icons/md";

export default function ApplicantsFilter() {
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedStatuses, setSelectedStatuses] = useState("");

  const handleChange = (value) => {
    setSelectedStatus(value);
  };

  const handleStatuses = (value) => {
    setSelectedStatuses(value);
  };
  return (
    <div className="mt-6">
      <div className="grid grid-cols-2">
        <div>
          <h1 className="text-[#111927] text-xl font-semibold">
            Applicants List
          </h1>
          <p className="text-[#CCD1D7] text-base">
            Total number of applicants:18
          </p>
        </div>
        <div className="flex items-center justify-end gap-2">
          <Search />
          <button className="p-3.5 border rounded-[12px] cursor-pointer">
            <AiOutlineDownload className="h-5 w-5" />
          </button>
          <button className="p-3.5 border rounded-[12px] cursor-pointer">
            <MdOutlineFilterAlt className="h-5 w-5" />
          </button>
          <button className="p-3.5 border rounded-[12px] cursor-pointer">
            <IoMailOutline className="h-5 w-5" />
          </button>
          <button className="p-3.5 border rounded-[12px] flex items-center gap-1 bg-[#111927] hover:bg-[#111927]/90 text-white cursor-pointer text-nowrap">
            <Plus className="h-5 w-5" />
            <span>Add Applicants</span>
          </button>
        </div>
      </div>
      <div className="p-3 border rounded-[12px] mt-2.5">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Select value={selectedStatus} onValueChange={handleChange}>
              <SelectTrigger className="w-full p-3 text-sm text-gray-700 border rounded-lg bg-[#F9FAFB] h-12! cursor-pointer">
                <SelectGroup>
                  <SelectLabel className="text-sm">
                    Filter by Status
                  </SelectLabel>
                </SelectGroup>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Select value={selectedStatuses} onValueChange={handleStatuses}>
              <SelectTrigger className="w-full p-3 text-sm text-gray-700 border rounded-lg bg-[#F9FAFB] h-12! cursor-pointer">
                <SelectGroup>
                  <SelectLabel className="text-sm">
                    Statuses to Hide
                  </SelectLabel>
                </SelectGroup>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3 mt-3">
          <div>
            <Select value={selectedStatus} onValueChange={handleChange}>
              <SelectTrigger className="w-full p-3 text-sm text-gray-700 border rounded-lg bg-[#F9FAFB] h-12! cursor-pointer">
                <SelectGroup>
                  <SelectLabel className="text-sm">
                    Filter by Applicants Status
                  </SelectLabel>
                </SelectGroup>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Select value={selectedStatuses} onValueChange={handleStatuses}>
              <SelectTrigger className="w-full p-3 text-sm text-gray-700 border rounded-lg bg-[#F9FAFB] h-12! cursor-pointer">
                <SelectGroup>
                  <SelectLabel className="text-sm">
                    Filter by Applicants Types
                  </SelectLabel>
                </SelectGroup>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Select value={selectedStatuses} onValueChange={handleStatuses}>
              <SelectTrigger className="w-full p-3 text-sm text-gray-700 border rounded-lg bg-[#F9FAFB] h-12! cursor-pointer">
                <SelectGroup>
                  <SelectLabel className="text-sm">
                    Filter by Applicants Tags
                  </SelectLabel>
                </SelectGroup>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}

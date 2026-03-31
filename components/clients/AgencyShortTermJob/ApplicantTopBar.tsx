"use client";
import SettingIcon from "@/components/icon/SettingIcon";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DeleteIcon from "@/public/icon/DeleteIcon";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { BiEditAlt } from "react-icons/bi";
import { IoIosArrowBack } from "react-icons/io";

export default function ApplicantTopBar() {
  const router = useRouter();
  return (
    <div className="">
      <button
        onClick={() => router.back()}
        className="font-semibold capitalize leading-[160%] flex items-center cursor-pointer"
      >
        <IoIosArrowBack />
        <span className="inline-block">Applicants</span>
      </button>

      <div className="p-6 border rounded-[12px] mt-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[#111927] text-xl font-semibold">
              Full-Time Housekeeper / Family Assistant (Cooking + Deep Cleaning
              Focus)
            </h1>
            <div className="flex items-center gap-3 mt-3">
              <Image
                src={"/candidates/candidates-profile.png"}
                alt="profile image"
                height={100}
                width={100}
                className="h-8 w-8"
              />
              <h6 className="text-[#778593] text-lg">Robart Fox</h6>
              <button className="px-4 py-1 bg-[#E6F0FF] rounded-[4px] text-[#0065FF] font-semibold cursor-pointer">
                Broadcast
              </button>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {/* Delete Button */}
            <button className="p-4 border rounded-lg cursor-pointer transform transition-all duration-300 hover:scale-110 hover:bg-red-100 hover:text-[#CB121D]">
              <DeleteIcon className="text-[#CB121D] h-4 w-4" />
            </button>

            {/* Edit Button */}
            <button className="p-4 border rounded-lg cursor-pointer transform transition-all duration-300 hover:scale-110 hover:bg-gray-100 hover:text-gray-800">
              <BiEditAlt className="h-4 w-4" />
            </button>

            {/* Settings Button */}
            <button className="p-4 border rounded-lg cursor-pointer transform transition-all duration-300 hover:scale-110 hover:bg-gray-100 hover:text-gray-800">
              <SettingIcon className="h-4 w-4" />
            </button>

            {/* Select Dropdown */}
            <Select>
              <SelectTrigger className="border rounded-lg h-12! cursor-pointer transform transition-all duration-300 hover:scale-110 hover:bg-gray-100 hover:text-gray-800">
                <SelectValue placeholder="Broadcast" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="broadcast">Broadcast</SelectItem>
                <SelectItem value="applicants">Applicants</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}

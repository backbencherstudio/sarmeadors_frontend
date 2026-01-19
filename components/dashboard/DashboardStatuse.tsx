import { statuse } from "@/demoData/DashboardData";
import { useEffect, useState } from "react";
import { BiEditAlt } from "react-icons/bi";
import { FaPlus } from "react-icons/fa6";
import { FiSearch } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";
import ButtonReuseable from "../reusable/CustomButton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import StatuseSetting from "./StatuseSetting";

function DashboardStatuse({
  value,
  record,
  loadingStatusId,
}: {
  value: string;
  record?: any;
  loadingStatusId?: string | null;
}) {
  const [statuseSearchTerm, setStatuseSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectOpen, setSelectOpen] = useState(false);
  const filteredStatus = statuse.filter(
    (s) =>
      s.value.toLowerCase().includes(statuseSearchTerm.toLowerCase()) ||
      s.value === statuseSearchTerm,
  );
  useEffect(() => {
    const handler = setTimeout(() => {
      // Handle status search filtering if needed
    }, 300);
    return () => clearTimeout(handler);
  }, [statuseSearchTerm]);
  const handleSettingClick = () => {
    setSelectOpen(false);
    setTimeout(() => {
      setIsModalOpen(true);
    }, 10);
  };

  return (
    <div>
      <div className="change-arrow">
        <Select
          value={value || "Pre Application"}
          open={selectOpen}
          onOpenChange={setSelectOpen}
          // disabled={loadingStatusId === record?._id}
        >
          <SelectTrigger className="flex items-center gap-1.5 p-1 !h-9 w-full justify-between">
            <div
              className={`px-2 cursor-pointer flex items-center  py-2.5!  h-full w-full text-xs justify-center focus-visible:ring-0 font-medium rounded-md border-0 ${
                value === "Applied"
                  ? "bg-purple-500/15 text-purple-600"
                  : value === "Pre Application"
                    ? "bg-green-500/15 text-green-600"
                    : value === "Inactive"
                      ? "bg-red-500/15 text-red-600"
                      : value === "Pending"
                        ? "bg-orange-500/15 text-orange-600"
                        : "bg-gray-500/15 text-gray-600"
              }`}
            >
              <SelectValue />
            </div>
            <div>
              <IoIosArrowDown />
            </div>
          </SelectTrigger>
          <SelectContent className="p-2 ">
            <div className="pb-2">
              <div
                className="w-full relative"
                onMouseDown={(e) => e.preventDefault()}
              >
                <input
                  type="text"
                  name="search"
                  autoComplete="off"
                  autoFocus
                  value={statuseSearchTerm}
                  onChange={(e) => setStatuseSearchTerm(e.target.value)}
                  onKeyDown={(e) => {
                    e.stopPropagation();
                  }}
                  onMouseDown={(e) => e.stopPropagation()}
                  className="w-full text-sm bg-whiteColor border border-borderColor rounded-sm py-2 px-3 pl-8 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  placeholder="Search tags"
                />
                <FiSearch
                  className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                  size={16}
                />
              </div>
            </div>
            <div>
              {filteredStatus.length > 0 ? (
                filteredStatus.map((status) => (
                  <SelectItem
                    key={status.value}
                    className={`${status.color} cursor-pointer mb-1.5`}
                    value={status.value}
                  >
                    {status.value}
                  </SelectItem>
                ))
              ) : (
                <div className="text-center text-sm text-gray-500">
                  No status found
                </div>
              )}
            </div>
            <div className=" flex justify-end gap-1.5 pt-4 px-2 border-t mt-2">
              <ButtonReuseable
                onClick={handleSettingClick}
                icon={<BiEditAlt className="text-black" />}
                className="px-1.5! py-1.5! bg-gray2Color rounded-sm! border!"
              />
              <ButtonReuseable
                icon={<FaPlus />}
                className="px-1.5! py-1.5! rounded-sm!"
              />
            </div>
          </SelectContent>
        </Select>
      </div>

      {isModalOpen && (
        <StatuseSetting open={isModalOpen} setOpen={setIsModalOpen} />
      )}
    </div>
  );
}

export default DashboardStatuse;

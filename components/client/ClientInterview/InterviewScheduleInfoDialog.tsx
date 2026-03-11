import LinkIcon from "@/components/icon/LinkIcon";
import MeetIcon from "@/components/icon/MeetIcon";
import TimeRescheduleIcon from "@/components/icon/TimeRescheduleIcon";
import ButtonReuseable from "@/components/reusable/CustomButton";
import { Ellipsis, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

function InterviewScheduleInfoDialog({
  isOpen,
  setOpen,
}: {
  isOpen: boolean;
  setOpen: () => void;
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown if clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={setOpen}
      />

      {/* Modal */}
      <div className="bg-white w-full max-w-xl rounded-2xl p-6 z-50 shadow-lg relative">
        {/* Top Right Buttons */}
        <div className="flex items-center justify-end gap-x-2">
          {/* Ellipsis Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <div className="flex items-center gap-2">
              <button
                className="cursor-pointer text-gray-500 hover:text-gray-700"
                onClick={() => setDropdownOpen((prev) => !prev)}
              >
                <Ellipsis size={20} />
              </button>

              <button
                onClick={setOpen}
                className="cursor-pointer text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden">
                <button
                  className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => alert("Copy Link clicked")}
                >
                  <LinkIcon />
                  Copy Link
                </button>
                <button
                  className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => alert("Reschedule clicked")}
                >
                  <TimeRescheduleIcon />
                  Reschedule
                </button>
                <button
                  className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-500 hover:bg-gray-100"
                  onClick={() => setDropdownOpen(false)}
                >
                  <X size={16} /> Cancel
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Header Section */}
        <div className="mb-2">
          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-3 mb-2">
            <div>
              <h2 className="text-xl font-semibold text-blackColor">
                After School Nanny
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 text-sm font-medium rounded-sm bg-[#E6F0FF] text-[#5799FF]">
                1st interview
              </span>
            </div>
          </div>
        </div>

        {/* Candidate Info */}
        <div className="flex items-center gap-3 pb-2">
          <div className="w-8 h-8 rounded-full bg-[#96C0FF] flex items-center justify-center text-blackColor text-sm">
            OP
          </div>
          <div>
            <h3 className="text-base text-blackColor">
              You and <span className="font-semibold">Charlotte Hamlin</span>
            </h3>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-secondaryColor mb-1 leading-relaxed">
          Full responsibility for three energetic children, ages 2, 5, and 7,
          including crafting delicious and...
          <span className="text-[#5799FF] cursor-pointer">View details</span>
        </p>

        {/* Date and Time */}
        <div className="flex items-center justify-between pt-4">
          <div>
            <p className="text-base text-black font-semibold">
              10:00AM - 11:00AM
            </p>
          </div>
          <div>
            <ButtonReuseable
              title="Join"
              icon={<MeetIcon />}
              sendingMsg="Join"
              className="bg-blackColor text-white"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default InterviewScheduleInfoDialog;

import SelecteInputField from "@/components/common/InputFiled/SelecteInputField";
import clockImage from "@/public/icon/clock.png";
import Image from "next/image";
const monthOptions = [
  { value: "2025-11", label: "November 2025" },
  { value: "2025-12", label: "December 2025" },
  { value: "2026-01", label: "January 2026" },
  { value: "2026-02", label: "February 2026" },
  { value: "2026-03", label: "March 2026" },
];
function CandidateJobDailyActivityFilter({
  selectedMonth,
  handleMonthChange,
}: {
  selectedMonth: string;
  handleMonthChange: (value: string) => void;
}) {
  return (
    <div>
      <div className="grid grid-cols-1 gap-3 border-b justify-end border-borderColor bg-white px-4 py-3 md:grid-cols-2 md:items-center">
        <div className="md:w-[190px]">
          <SelecteInputField
            value={selectedMonth}
            onValueChange={handleMonthChange}
            options={monthOptions}
            className="h-10! w-full! border border-borderColor bg-grayColor1! text-sm text-blackColor"
          />
        </div>

        <div className="flex justify-end divide-x-2 space-x-4 items-center">
          <div className="flex items-center justify-center gap-2 border-borderColor md:px-4">
            <Image
              src={clockImage}
              alt="Clock"
              width={40}
              height={40}
              className="w-10 h-10 object-contain"
            />
            <div>
              <p className="text-base md:text-base  font-semibold text-lightblackColor">
                4 hr 11 min
              </p>
              <p className="text-sm font-medium text-secondaryColor">
                Today Working Period
              </p>
            </div>
          </div>

          <div className="text-left md:text-right">
            <p className="text-base md:text-base font-semibold text-lightblackColor">
              08:00 AM - 05:00 PM
            </p>
            <p className="text-sm font-medium text-secondaryColor">
              Morning 8:00AM to 5:00PM
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CandidateJobDailyActivityFilter;

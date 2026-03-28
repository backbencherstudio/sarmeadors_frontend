import RootDialog from "@/components/common/RootDialog";
import ZoomIcon from "@/components/icon/ZoomIcon";
import ButtonReuseable from "@/components/reusable/CustomButton";
import dayjs from "dayjs";
import { PhoneIcon, X } from "lucide-react";
import Image from "next/image";
interface ScheduleData {
  id?: string;
  title: string;
  type: string;
  dotColor: string;
  start: string;
  jobTime?: string;
  allDay?: boolean;
  candidateName?: string;
  avatar?: string;
  description?: string;
  location?: string;
  date?: string;
  time?: string;
}
export default function InterviewRequestDialog({
  isOpen,
  setOpen,
  data,
}: {
  isOpen: boolean;
  setOpen: () => void;
  data: ScheduleData | null;
}) {
  if (!data) return null;

  // Format date from ISO string
  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      const day = date.getDate();
      const month = date
        .toLocaleString("en-US", { month: "short" })
        .toUpperCase();
      const year = date.getFullYear();
      const dayName = date
        .toLocaleString("en-US", { weekday: "short" })
        .toUpperCase();
      return `${day} ${month},${dayName}`;
    } catch {
      return dateStr;
    }
  };
  const today = dayjs();
  const jobDate = dayjs(data.start);

  const isEqualDay = jobDate.isSame(today, "day");
  const isScheduled = jobDate.isBefore(today, "day");
  return (
    <RootDialog open={isOpen} setOpen={setOpen}>
      <div className="w-full  rounded-2xl  p-6">
        {/* Header Section */}
        <div className="mb-2">
          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-3 mb-2">
            <div className="flex items-center">
              {/* First Avatar */}
              <div className="w-12 h-12 rounded-full overflow-hidden border-4 border-white">
                <Image
                  height={100}
                  width={100}
                  src="/candidates/candidates-profile.png"
                  alt="user1"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Second Avatar (overlapping) */}
              <div className="w-12 h-12 rounded-full overflow-hidden border-4 border-white -ml-5">
                <Image
                  height={100}
                  width={100}
                  src="/candidates/candidates-profile.png"
                  alt="user2"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        <h3 className="text-base font-semibold text-blackColor">
          Interview Request
        </h3>

        <div className="mt-4 grid grid-cols-2">
          <div className="space-y-4">
            <p className="text-[#808790]">Client Name:</p>
            <p className="text-[#808790]">Candidates Name:</p>
            <p className="text-[#808790]">Schedule Request:</p>
            <p className="text-[#808790]">Meeting Type:</p>
            <p className="text-[#808790]">status:</p>
          </div>
          <div className="space-y-4">
            <p>Jennifer Williams</p>
            <p>Jenny Wilson</p>
            <p>15-12-18 from 2:00 PM to 5:00 PM</p>
            <p className="flex items-center gap-1">
              <ZoomIcon className="text-[#4087FC]" />
              <span>Zoom Metting</span>
            </p>
            <span className="inline-block px-2 py-1 bg-[#F8EBFF] rounded-sm text-[#B626FD] font-bold">
              Requested
            </span>
          </div>
        </div>

        {/* Date and Time */}
        <div className="flex justify-end mt-5">
          <div className="flex items-center gap-2">
            <ButtonReuseable
              title="Decline"
              icon={<X />}
              className={`bg-[#FEF1F1]! text-[#D74A52]! border-0! outline-none!`}
            />
            <ButtonReuseable
              title="Created Metting"
              icon={<PhoneIcon />}
              className={`bg-blackColor text-white`}
            />
          </div>
        </div>
      </div>
    </RootDialog>
  );
}

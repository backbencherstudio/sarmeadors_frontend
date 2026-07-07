import { JobClient, JobLocation, JobModal } from "@/types";
import dayjs from "dayjs";
import Image from "next/image";
import RootDialog from "../common/RootDialog";
import ClockICon from "../icon/ClockICon";
import LocationIcon from "../icon/LocationIcon";
import ButtonReuseable from "../reusable/CustomButton";

interface ScheduleData {
  id?: string;
  title: string;
  type: string;
  dotColor: string;
  start: string;
  jobTime?: string;
  allDay?: boolean;
  client?: JobClient;
  avatar?: string;
  description?: string;
  date?: string;
  location: JobLocation;
  modal?: JobModal;
  time?: string;
}

function CandidateScheduleInfoDialog({
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
            <div>
              <h2 className="text-lg font-medium text-blackColor">
                {data.title}
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <span
                className={` px-2 py-1 text-sm font-medium rounded-sm ${data?.type === "long" ? "bg-blueColor/20 text-blueColor" : "bg-greenColor/20 text-greenColor"}`}
              >
                {data?.type === "long" ? "Long-term" : "Short-term"}
              </span>
              {/* Today Badge */}
              {!isScheduled && (
                <div
                  className={`${isEqualDay ? "text-blackColor" : "text-secondaryColor"} text-sm flex items-center gap-1.5 bg-bgColor px-2 py-1 font-medium rounded-sm `}
                >
                  <div
                    className={`${isEqualDay ? "bg-greenColor text-blackColor!" : "bg-secondaryColor"} w-3 h-3  rounded-full`}
                  ></div>{" "}
                  <p>{`${isEqualDay ? "Today" : "Next Schedule"}: ${formatDate(data.start)}`}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Candidate Info */}
        <div className="flex items-center gap-3  pb-2 ">
          <div className="w-8 h-8 rounded-full bg-[#96C0FF] flex items-center justify-center text-blackColor font-bold text-sm">
            {data.client?.image_url ? (
              <Image
                src={data.client.image_url}
                alt={data.client.name}
                width={60}
                height={60}
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              data.client.name.slice(0, 2).toUpperCase()
            )}{" "}
          </div>
          <div>
            <h3 className="text-base font-semibold text-blackColor">
              {data?.client?.name || "Olivia Parker"}
            </h3>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-secondaryColor mb-1 leading-relaxed">
          {data?.description ||
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget ultricies lacinia, nunc nisl aliquam nisl, eget aliquam nunc nisl eget nunc."}
        </p>

        {/* Location */}
        <div className="flex items-start gap-3 mb-8">
          <LocationIcon className="w-5 h-5 text-secondaryColor " />
          <p className="text-sm text-secondaryColor">
            {data?.location?.label || "Address not available"},{" "}
            {data?.location?.postal_code || "4605"}
          </p>
        </div>

        {/* Date and Time */}
        <div className="flex items-center justify-between  border-borderColor">
          <div>
            <p className="text-base font-semibold text-blackColor">
              {data?.modal?.date}
            </p>
            <p className="text-xs text-secondaryColor">
              {data?.modal?.time_range}
            </p>
          </div>
          <div>
            <ButtonReuseable
              title="Check In"
              icon={<ClockICon />}
              loading={!data?.modal?.can_check_in}
              sendingMsg="Check In"
              className={`bg-blackColor text-white`}
            />
          </div>
        </div>
      </div>
    </RootDialog>
  );
}

export default CandidateScheduleInfoDialog;

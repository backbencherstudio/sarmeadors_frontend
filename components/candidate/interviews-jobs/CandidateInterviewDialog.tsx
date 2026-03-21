import RootDialog from "@/components/common/RootDialog";
import MeetingZoomIcon from "@/components/icon/MeetingZoomIcon";
import ButtonReuseable from "@/components/reusable/CustomButton";
import dayjs from "dayjs";

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

function CandidateInterviewDialog({
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
            OP
          </div>
          <div>
            <h3 className="text-base font-semibold text-blackColor">
              Arlene McCoy
            </h3>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-secondaryColor mb-1 leading-relaxed">
          Full responsibility for three energetic children, ages 2, 5, and 7,
          including crafting delicious and...
        </p>

        {/* Location */}
        {/* <div className="flex items-start gap-3 mb-8">
          <LocationIcon className="w-5 h-5 text-secondaryColor " />
          <p className="text-sm text-secondaryColor">
            71 Raglan Street, CROWNTHORPE, Queensland(QLD), 4605
          </p>
        </div> */}

        {/* Date and Time */}
        <div className="flex items-center justify-between  border-borderColor mt-6">
          <div>
            {/* <p className="text-base font-semibold text-blackColor">
              {formatDate(data.start)}
            </p> */}
            <p className="text-sm text-headerColor">10:00AM - 11:00AM</p>
          </div>
          <div>
            <ButtonReuseable
              title="Join"
              icon={<MeetingZoomIcon />}
              loading={isEqualDay ? false : true}
              sendingMsg="Check In"
            />
          </div>
        </div>
      </div>
    </RootDialog>
  );
}

export default CandidateInterviewDialog;

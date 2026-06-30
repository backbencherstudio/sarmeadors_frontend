import { Job } from "@/types";
import dayjs from "dayjs";
import ArrowTopBoxIcon from "../icon/ArrowTopBoxIcon";
import CalenderIcon from "../icon/CalenderIcon";
import ClockICon from "../icon/ClockICon";
import LocationIcon from "../icon/LocationIcon";
import SmsIcon from "../icon/SmsIcon";
import ButtonReuseable from "../reusable/CustomButton";
import LinkReuseable from "../reusable/CustomLink";
import CandidateJobsReviewAction from "./CandidateJobsReviewAction";

function CandidatejobsCard({ job }: { job?: Job }) {
  const today = dayjs();
  const jobDate = dayjs(job?.latest_attendance?.booking_date);

  const isEqualDay = jobDate.isSame(today, "day");
  const isScheduled = jobDate.isBefore(today, "day");

  return (
    <div>
      <div className="hover:bg-white bg-bgColor  border-l-4 border-bgColor hover:shadow-xl  hover:border-[#6BA6FF] transition-all duration-200 shadow rounded-lg p-4 md:p-5 space-y-4">
        <div className="">
          <div className="flex justify-between items-center">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-2 mb-2">
              <div className="flex flex-wrap  md:items-center gap-2 ">
                <h3 className="md:text-lg text-base font-semibold text-blackColor">
                  {job?.title}
                </h3>
                <p
                  className={`text-xs md:text-sm px-2 py-1 rounded-sm font-semibold ${
                    job?.job_type === "short_term"
                      ? "bg-greenColor/20 text-greenColor"
                      : "bg-blueColor/20 text-blueColor"
                  }`}
                >
                  {job?.job_type}
                </p>
                {job?.status == "cancelled" && (
                  <p className="text-xs md:text-sm px-2 py-1 bg-borderColor rounded-sm font-semibold">
                    {job?.status}
                  </p>
                )}
                {job?.status == "completed" && (
                  <p className="text-xs md:text-sm px-2 py-1 bg-blackColor text-whiteColor rounded-sm font-semibold">
                    {job?.status}
                  </p>
                )}
              </div>
              {!isScheduled &&
                job?.status !== "cancelled" &&
                job?.status !== "completed" && (
                  <div
                    className={`${isEqualDay ? "text-blackColor" : "text-secondaryColor"} text-sm flex items-center gap-1.5 bg-bgColor px-2 py-1 font-medium rounded-sm `}
                  >
                    <div
                      className={`${isEqualDay ? "bg-greenColor text-blackColor!" : "bg-secondaryColor"} w-3 h-3  rounded-full`}
                    ></div>{" "}
                    <p>{`${isEqualDay ? "Today" : "Next Schedule"}: ${dayjs(job?.latest_attendance?.date).format("MMM DD, YYYY")}`}</p>
                  </div>
                )}
            </div>
            <p className="text-lg font-semibold text-blackColor mb-3">
              ${job?.compensation?.amount}{" "}
              {job?.compensation?.type === "per_hour" ? "/hr" : ""}
            </p>
          </div>
          <div className="md:flex  flex-col md:flex-row md:justify-between  items-center">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-full bg-[#96C0FF] flex items-center justify-center text-xs font-semibold text-headerColor">
                  {job?.title
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <span className="text-sm text-lightblackColor">
                  {job?.title}
                </span>
              </div>
              <p className="text-sm text-secondaryColor mb-3">
                {job?.description}
              </p>
              <div className="space-y-2 text-sm text-gray-500 mb-4">
                <div className="flex items-center gap-2">
                  <LocationIcon className="w-4 h-4" />
                  <span>
                    {job?.address?.city}, {job?.address?.province},{" "}
                    {job?.address?.line}, {job?.address?.postal_code}
                  </span>
                </div>
                <div className="flex gap-3 items-center">
                  {job?.latest_attendance && (
                    <div className="flex items-center gap-2">
                      <CalenderIcon className="w-4 h-4" />
                      <span>
                        {dayjs(job?.latest_attendance?.booking_date).format(
                          "MMM DD, YYYY",
                        )}
                      </span>
                    </div>
                  )}

                  {job?.latest_attendance && (
                    <div className="flex items-center gap-2">
                      <ClockICon className="w-4 h-4 fill-secondaryColor" />
                      <span>
                        {job?.latest_attendance?.check_in} -{" "}
                        {job?.latest_attendance?.check_out}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {isEqualDay && job?.latest_attendance && (
              <div className="md:space-y-1 flex justify-between md:flex-col md:items-end w-full  text-right text-xs items-center md:text-sm">
                <div>
                  <p className="text-blackColor w-full py-1.5 px-2 bg-bgColor rounded-sm font-medium">
                    <span className="text-greenColor">Check In</span>{" "}
                    {job?.latest_attendance?.check_in || "Not checked in yet"}
                  </p>
                </div>
                <div>
                  <p className="text-blackColor py-1.5 w-full px-2 bg-bgColor rounded-sm font-medium">
                    <span className="text-redColor">Check Out</span>{" "}
                    {job?.latest_attendance?.check_out || "Not checked out yet"}
                  </p>
                </div>
                {/* {job?.total && (
                  <div className="  mt-1">
                    <p className="text-gray-900 font-medium">
                      {" "}
                      <span className="text-secondaryColor">Total</span>{" "}
                      {job.total}
                    </p>
                  </div>
                )} */}
              </div>
            )}
          </div>
          <div>
            {job?.status === "cancelled" && (
              <div className="">
                <h4 className="text-lightblackColor text-sm font-semibold">
                  Cancel Reason
                </h4>

                <p className="px-3 py-4 mt-2 text-secondaryColor border border-borderColor  bg-grayColor1 rounded-sm ">
                  {job?.latest_attendance?.notes || "No reason provided"}
                </p>
              </div>
            )}
          </div>
          <div className="pt-3 mt-3 border-t flex justify-between items-center border-borderColor">
            <div className="flex items-center h-full gap-2">
              <ButtonReuseable
                rightIcon={<SmsIcon className="w-5 h-5" />}
                className="bg-grayColor1! h-full border border-borderColor text-blackColor!"
              />
              <LinkReuseable
                title="View Details"
                href="/candidate/candidate-job-details/1/attendance-calendar"
                rightIcon={<ArrowTopBoxIcon />}
                className="bg-grayColor1! px-4 rounded-md font-medium tex-sm py-[10.5px]! border border-borderColor text-blackColor!"
              />
            </div>
            <div className="text-right ml-4">
              {job?.status === "cancelled" || job?.status === "completed" ? (
                <CandidateJobsReviewAction />
              ) : (
                <div className="flex flex-col items-end gap-1">
                  <ButtonReuseable
                    title="Check In"
                    icon={<ClockICon />}
                    loading={job?.status !== "running"}
                    sendingMsg="Check In"
                    className={`bg-blackColor text-white`}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CandidatejobsCard;

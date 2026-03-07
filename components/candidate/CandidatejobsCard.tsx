import ArrowRightUp from "../icon/ArrowRightUp";
import CalenderIcon from "../icon/CalenderIcon";
import ClockICon from "../icon/ClockICon";
import LocationIcon from "../icon/LocationIcon";
import ButtonReuseable from "../reusable/CustomButton";

function CandidatejobsCard({ job }: { job: any }) {
  return (
    <div>
      <div className="bg-white border border-gray-200 rounded-lg p-5 space-y-4">
        <div className="">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-lg font-semibold text-blackColor">
                {job.title}
              </h3>
              <p
                className={`text-sm px-2 py-1 rounded-sm font-semibold ${
                  job.jobType === "Short-term"
                    ? "bg-greenColor/20 text-greenColor"
                    : "bg-blueColor/20 text-blueColor"
                }`}
              >
                {job.jobType}
              </p>
              {job.status === "scheduled" && (
                <div className="text-sm flex items-center gap-1.5 text-gray-500">
                  <div className={"w-3 h-3 rounded-full bg-secondaryColor"}></div>{" "}
                  <p>Next Schedule: {job.checkIn}</p>
                </div>
              )}
            </div>
            <p className="text-lg font-semibold text-blackColor mb-3">
              {job.hourlyRate}
            </p>
          </div>
          <div className="flex justify-between  items-center">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-full bg-[#96C0FF] flex items-center justify-center text-xs font-semibold text-headerColor">
                  {job.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <span className="text-sm text-lightblackColor">{job.name}</span>
              </div>
              <p className="text-sm text-secondaryColor mb-3">
                {job.description}
              </p>
              <div className="space-y-2 text-sm text-gray-500 mb-4">
                <div className="flex items-center gap-2">
                  <LocationIcon className="w-4 h-4" />
                  <span>{job.location}</span>
                </div>
                <div className="flex gap-3 items-center">
                  <div className="flex items-center gap-2">
                    <CalenderIcon className="w-4 h-4" />
                    <span>{job.startDate}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ClockICon className="w-4 h-4 fill-secondaryColor" />
                    <span>
                      {job.startTime} - {job.endTime}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {job.status === "completed" && (
              <div className="space-y-1 text-right text-sm">
                <div>
                  <p className="text-blackColor py-1.5 px-2 bg-bgColor rounded-sm font-medium">
                    <span className="text-greenColor">Check In</span>{" "}
                    {job.checkIn}
                  </p>
                </div>
                <div>
                  <p className="text-blackColor py-1.5 px-2 bg-bgColor rounded-sm font-medium">
                    <span className="text-redColor">Check Out</span>{" "}
                    {job.checkOut}
                  </p>
                </div>
                <div className="  mt-1">
                  <p className="text-gray-900 font-medium">
                    {" "}
                    <span className="text-secondaryColor">Total</span>{" "}
                    {job.total}
                  </p>
                </div>
              </div>
            )}
          </div>
          <div className="pt-3 border-t flex justify-between items-center border-borderColor">
            <ButtonReuseable
              title="View Details"
              rightIcon={<ArrowRightUp />}
              className="bg-grayColor1! border border-borderColor text-blackColor!"
            />
            <div className="text-right ml-4">
              <div className="flex flex-col items-end gap-1">
                <ButtonReuseable
                  title="Check In"
                  icon={<ClockICon />}
                  loading={job.status !== "running"}
                  sendingMsg="Check In"
                  className={`bg-blackColor text-white`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CandidatejobsCard;

import ViewInvoiceModal from "@/components/client/ClientMyJobs/LongTermJob/Completed/ViewInvoiceModal";
import CandidatesReviewModal from "@/components/client/ClientMyJobs/ShortTermJob/Marketplace/Applicants/(view-details)/CandidatesReviewModal";
import ArrowTopBoxIcon from "@/components/icon/ArrowTopBoxIcon";
import CalenderIcon from "@/components/icon/CalenderIcon";
import ClockICon from "@/components/icon/ClockICon";
import LocationIcon from "@/components/icon/LocationIcon";
import SmsIcon from "@/components/icon/SmsIcon";
import ButtonReuseable from "@/components/reusable/CustomButton";
import LinkReuseable from "@/components/reusable/CustomLink";
import dayjs from "dayjs";
import { Check, X } from "lucide-react";

function ShortTermJobCard({ job }: { job: any }) {
  const today = dayjs();
  const jobDate = dayjs(job.startDate);

  const viewDetailsHrefByStatus: Record<string, string> = {
    running: "/short-term-job/view-list/running/job-description",
    pending: "/short-term-job/view-list/pending/job-description",
    marketplace: "/client/marketplace-view-details/job-description",
    canceled: "/client/canceled-view-details",
    rejected: "/client/rejected-view-details",
  };
  const viewDetailsHref = viewDetailsHrefByStatus[job.status];

  const isEqualDay = jobDate.isSame(today, "day");

  return (
    <div>
      <div className="hover:bg-white bg-bgColor  border-l-4 border-bgColor hover:shadow-xl  hover:border-[#6BA6FF] transition-all duration-200 shadow rounded-lg p-4 md:p-5 space-y-4">
        <div className="">
          <div className="flex justify-between items-start">
            <div className="flex items-start gap-6">
              <div>
                <h1 className="text-2xl font-semibold">18</h1>
                <p className="text-base">JAN,SUN</p>
              </div>
              <div className="flex flex-col items-start gap-2 mb-2">
                <div className="flex  md:items-center gap-2 ">
                  <h3 className="md:text-lg text-base font-semibold text-blackColor">
                    {job.title}
                  </h3>
                  <p
                    className={`text-xs md:text-sm px-2 py-1  rounded-sm font-semibold capitalize ${
                      job.status === "running" && "bg-black text-white"
                    }
                                        ${
                                          job.status === "pending" &&
                                          "px-2 py-1 text-sm bg-amber-400 text-white rounded-md"
                                        }
                                        ${
                                          job.status === "marketplace" &&
                                          "px-2 py-1 text-sm bg-blue-600 text-white rounded-md"
                                        }
                                        ${
                                          job.status === "completed" &&
                                          "px-2 py-1 text-sm bg-green-600 text-white rounded-md"
                                        }
                                        ${
                                          job.status === "canceled" &&
                                          "px-2 py-1 text-sm bg-red-200 text-red-600 rounded-md"
                                        }
                                        ${
                                          job.status === "rejected" &&
                                          "px-2 py-1 text-sm text-white bg-red-600 rounded-md"
                                        }
                                        `}
                  >
                    {job.status}
                  </p>
                </div>
                <div className="md:flex  flex-col md:flex-row md:justify-between items-center">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-full bg-[#96C0FF] flex items-center justify-center text-xs font-semibold text-headerColor">
                        {job.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <span className="text-sm text-lightblackColor">
                        {job.name}
                      </span>
                    </div>
                    <p className="text-sm text-secondaryColor mb-3">
                      {job.description}
                    </p>
                    <div className="space-y-2 text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-2">
                        <LocationIcon className="w-4 h-4" />
                        <span>{job.location}</span>
                      </div>
                      {(job.status === "pending" ||
                        job.status === "marketplace") && (
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
                      )}
                    </div>
                  </div>
                  {isEqualDay && (
                    <div className="md:space-y-1 flex justify-between md:flex-col md:items-end w-full  text-right text-xs items-center md:text-sm">
                      <div>
                        <p className="text-blackColor w-full py-1.5 px-2 bg-bgColor rounded-sm font-medium">
                          <span className="text-greenColor">Check In</span>{" "}
                          {job.checkIn}
                        </p>
                      </div>
                      <div>
                        <p className="text-blackColor py-1.5 w-full px-2 bg-bgColor rounded-sm font-medium">
                          <span className="text-redColor">Check Out</span>{" "}
                          {job.checkOut}
                        </p>
                      </div>
                      <div className="  mt-1">
                        <p className="text-gray-900 font-medium">
                          {" "}
                          <span className="text-secondaryColor">
                            Total
                          </span>{" "}
                          {job.total}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="space-y-4">
              {job.status === "completed" || (
                <div className="flex items-center gap-2">
                  {/* <ClockICon className="w-4 h-4 fill-secondaryColor" /> */}
                  <span className="font-medium">
                    {job.startTime} - {job.endTime}
                  </span>
                </div>
              )}
              {job.status === "completed" && (
                <div className="flex flex-col justify-end items-end">
                  <div className="flex items-center gap-2">
                    <p className="text-lg font-semibold text-blackColor mb-3">
                      {job.hourlyRate}
                    </p>
                  </div>
                  <div className="space-y-2 text-end">
                    <div className="font-medium text-sm space-x-1 bg-[#F3F4F6] px-2 py-1.5 rounded-md">
                      <span className="text-[#04A755]">Check In</span>
                      <span>{job.checkIn}</span>
                    </div>
                    <div className="font-medium text-sm space-x-1 bg-[#F3F4F6] px-2 py-1.5 rounded-md">
                      <span className="text-[#CB121D]">Check Out</span>
                      <span>{job.checkOut}</span>
                    </div>
                    <div className="font-medium text-sm space-x-1">
                      <span className="text-[#778593]">Total</span>
                      <span>{job.total}</span>
                    </div>
                  </div>
                </div>
              )}
              {job.status === "running" && (
                <div className="bg-[#F3F4F6] rounded-lg px-4 py-3">
                  <p className="font-medium">
                    <span className="text-[#778593] text-sm">Check In:</span>{" "}
                    {job.checkIn}
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="pt-3 mt-3 border-t flex justify-between items-center border-borderColor">
            <div className="flex items-center h-full gap-2 w-full">
              <div className="flex items-center gap-[8px]">
                {job.status === "running" && (
                  <ButtonReuseable
                    rightIcon={<SmsIcon className="w-5 h-5" />}
                    className="bg-grayColor1! h-full border border-borderColor text-blackColor!"
                  />
                )}
                {job.status === "running" && (
                  <>
                    <LinkReuseable
                      title="View Details"
                      href={viewDetailsHref}
                      rightIcon={<ArrowTopBoxIcon />}
                      className="bg-grayColor1! px-4 rounded-md font-medium tex-sm py-[10.5px]! border border-borderColor text-blackColor!"
                    />
                  </>
                )}
              </div>
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-[8px]">
                  {job.status === "pending" && (
                    <>
                      <LinkReuseable
                        title="Approve"
                        href={viewDetailsHref}
                        icon={<Check className="h-4 w-4" />}
                        className="bg-grayColor1! px-4 font-semibold rounded-md tex-sm py-[10.5px]! border border-borderColor text-blackColor!"
                      />
                    </>
                  )}
                  {job.status === "pending" && (
                    <>
                      <LinkReuseable
                        title="Reject"
                        href={viewDetailsHref}
                        icon={<X className="h-4 w-4 text-[#CB121D]" />}
                        className="bg-grayColor1! px-4 font-semibold rounded-md tex-sm py-[10.5px]! border border-borderColor text-[#CB121D]"
                      />
                    </>
                  )}
                </div>
                {job.status === "pending" && (
                  <div className="flex items-end">
                    <LinkReuseable
                      title="View Details"
                      href={viewDetailsHref}
                      rightIcon={<ArrowTopBoxIcon />}
                      className="bg-grayColor1! px-4 rounded-md font-medium tex-sm py-[10.5px]! border border-borderColor text-blackColor!"
                    />
                  </div>
                )}
              </div>

              {job.status === "completed" && (
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center justify-between">
                    {/* Buttons */}
                    <CandidatesReviewModal />
                  </div>
                </div>
              )}
            </div>

            {job.status === "marketplace" && (
              <div className="flex flex-col items-end">
                <span className="text-xs text-gray-500 mb-2">
                  Applicant Candidates
                </span>

                <div className="flex items-center">
                  {[
                    "https://randomuser.me/api/portraits/women/44.jpg",
                    "https://randomuser.me/api/portraits/men/32.jpg",
                    "https://randomuser.me/api/portraits/women/68.jpg",
                    "https://randomuser.me/api/portraits/men/75.jpg",
                    "https://randomuser.me/api/portraits/women/12.jpg",
                  ].map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt="candidate"
                      className="w-8 h-8 rounded-full border-2 border-white -ml-2 first:ml-0 object-cover"
                    />
                  ))}

                  {/* Extra Count */}
                  <div className="w-8 h-8 rounded-full bg-gray-200 text-xs font-medium flex items-center justify-center border-2 border-white -ml-2">
                    +5
                  </div>
                </div>
              </div>
            )}

            {/* Candidates */}
            {job.status === "completed" && <ViewInvoiceModal />}
          </div>
          <div>
            {job.status === "cancel" && (
              <div className="">
                <h4 className="text-lightblackColor text-sm font-semibold">
                  Cancel Reason
                </h4>
                <p className="px-3 py-4 mt-2 text-secondaryColor border border-borderColor  bg-grayColor1 rounded-sm ">
                  {job.cancelReason || "No reason provided"}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShortTermJobCard;

import ArrowTopBoxIcon from "@/components/icon/ArrowTopBoxIcon";
import CalenderIcon from "@/components/icon/CalenderIcon";
import ClockICon from "@/components/icon/ClockICon";
import LocationIcon from "@/components/icon/LocationIcon";
import SmsIcon from "@/components/icon/SmsIcon";
import ButtonReuseable from "@/components/reusable/CustomButton";
import LinkReuseable from "@/components/reusable/CustomLink";
import dayjs from "dayjs";
import CancelModal from "./ShortTermJob/Common/CancelModal";
import CandidatesReviewModal from "./ShortTermJob/Marketplace/Applicants/(view-details)/CandidatesReviewModal";
import ViewInvoiceModal from "./LongTermJob/Completed/ViewInvoiceModal";

function ClientjobsCard({ job }: { job: any }) {
    const today = dayjs();
    const jobDate = dayjs(job.startDate);

    const viewDetailsHrefByStatus: Record<string, string> = {
        running: "/client/running-view-details/job-description",
        pending: "/client/pending-view-details/job-description",
        marketplace: "/client/marketplace-view-details/job-description",
        canceled: "/client/canceled-view-details",
        rejected: "/client/rejected-view-details",
    };
    const viewDetailsHref = viewDetailsHrefByStatus[job.status];

    const isEqualDay = jobDate.isSame(today, "day");
    const isScheduled = jobDate.isBefore(today, "day");

    return (
        <div>
            <div className="hover:bg-white bg-bgColor  border-l-4 border-bgColor hover:shadow-xl  hover:border-[#6BA6FF] transition-all duration-200 shadow rounded-lg p-4 md:p-5 space-y-4">
                <div className="">
                    <div className="flex flex-col md:flex-row md:justify-between items-start gap-4 md:gap-0">
                        <div className="flex flex-col items-start gap-2 mb-2">
                            <div className="flex  md:items-center gap-2 ">
                                <h3 className="md:text-lg text-base font-semibold text-blackColor">
                                    {job.title}
                                </h3>
                                <p
                                    className={`text-xs md:text-sm px-2 py-1  rounded-sm font-semibold capitalize ${job.status === "running"
                                        && "bg-black text-white"
                                        }
                                        ${job.status === "pending"
                                        && "px-2 py-1 text-sm bg-amber-400 text-white rounded-md"
                                        }
                                        ${job.status === "marketplace"
                                        && "px-2 py-1 text-sm bg-blue-600 text-white rounded-md"
                                        }
                                        ${job.status === "completed"
                                        && "px-2 py-1 text-sm bg-green-600 text-white rounded-md"
                                        }
                                        ${job.status === "canceled"
                                        && "px-2 py-1 text-sm bg-red-200 text-red-600 rounded-md"
                                        }
                                        ${job.status === "rejected"
                                        && "px-2 py-1 text-sm text-white bg-red-600 rounded-md"
                                        }
                                        `}
                                >
                                    {job.status}
                                </p>
                            </div>
                            <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center gap-4 md:gap-6">
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
                                        {
                                            (job.status === "pending" || job.status === "marketplace") &&
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
                                        }
                                    </div>
                                </div>
                                {/* {isEqualDay && (
                                    <div className="space-y-1 flex flex-col md:flex-col md:items-end items-start w-full text-left md:text-right text-xs md:text-sm">
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
                                                <span className="text-secondaryColor">Total</span>{" "}
                                                {job.total}
                                            </p>
                                        </div>
                                    </div>
                                )} */}
                            </div>
                        </div>
                        <div className="space-y-4 md:text-right">
                            {
                                job.status === "completed" ||
                                <div className="flex items-center gap-2">
                                    {/* <ClockICon className="w-4 h-4 fill-secondaryColor" /> */}
                                    <span className="font-medium">
                                        {job.startTime} - {job.endTime}
                                    </span>
                                </div>
                            }
                            {
                                job.status === "completed" &&
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
                            }
                            {
                                job.status === "running" && (
                                    <div className="bg-[#F3F4F6] rounded-lg px-4 py-3">
                                        <p className="font-medium"><span className="text-[#778593] text-sm">Check In:</span> {job.checkIn}</p>
                                    </div>
                                )
                            }
                        </div>
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
                    <div className="pt-3 mt-3 border-t flex flex-col md:flex-row md:justify-between items-start md:items-center gap-3 border-borderColor">

                        <div className="flex flex-wrap items-center h-full gap-2">
                            <ButtonReuseable
                                rightIcon={<SmsIcon className="w-5 h-5" />}
                                className="bg-grayColor1! h-full border border-borderColor text-blackColor!"
                            />
                            {
                                job.status === "completed" &&
                                <div className="flex items-center justify-between w-full">
                                    <div className="flex items-center justify-between">
                                        {/* Buttons */}
                                        <CandidatesReviewModal />
                                    </div>
                                </div>

                            }
                            {
                                job.status === "completed" ||
                                <>
                                    <LinkReuseable
                                        title="View Details"
                                        href={viewDetailsHref}
                                        rightIcon={<ArrowTopBoxIcon />}
                                        className="bg-grayColor1! px-4 rounded-md font-medium tex-sm py-[10.5px]! border border-borderColor text-blackColor!"
                                    />

                                    {
                                        (job.status === "canceled" || job.status === "rejected") ||
                                        <CancelModal />
                                    }
                                </>
                            }
                        </div>


                        {/* <div className="text-right ml-4">
                            {job.status === "cancel" || job.status === "completed" ? (
                                <CandidateJobsReviewAction />
                            ) : (
                                <div className="flex flex-col items-end gap-1">
                                    <ButtonReuseable
                                        title="Check In"
                                        icon={<ClockICon />}
                                        loading={job.status !== "running"}
                                        sendingMsg="Check In"
                                        className={`bg-blackColor text-white`}
                                    />
                                </div>
                            )}

                        </div> */}

                        {
                            job.status === "marketplace" &&
                            <div className="flex flex-col md:items-end items-start w-full md:w-auto">
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
                        }

                        {/* Candidates */}
                        {
                            job.status === "completed" &&
                            <ViewInvoiceModal />
                        }

                        {
                            job.status === "canceled" &&
                            <button className="bg-black! px-4 rounded-md font-medium tex-sm py-[10.5px]! border border-borderColor text-white cursor-pointer">
                                Request for Refund
                            </button>
                        }
                        {
                            job.status === "rejected" &&
                            <button className="bg-black! px-4 rounded-md font-medium tex-sm py-[10.5px]! border border-borderColor text-white cursor-pointer">
                                Edit & Resubmit
                            </button>
                        }
                    </div>
                </div>
            </div>
        </div >
    );
}

export default ClientjobsCard;

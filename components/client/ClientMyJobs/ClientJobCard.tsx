import ArrowRightUp from "@/components/icon/ArrowRightUp";
import LocationIcon from "@/components/icon/LocationIcon";
import ButtonReuseable from "@/components/reusable/CustomButton";
import Image from "next/image";
import JobsCardSkeleton from "./JobsCardSkeleton";

interface ClientJobCardProps {
  job?: any;
  loading?: boolean;
}

function ClientJobCard({ job, loading }: ClientJobCardProps) {
  if (loading) {
    return <JobsCardSkeleton />;
  }

  return (
    <div className="border flex flex-col md:flex-row justify-between border-borderColor hover:shadow-xl transition-all duration-200 p-5 rounded-lg">
      <div className="flex gap-4 flex-col md:flex-row items-center">
        <div className="w-full md:w-[220px] md:h-[160px] lg:w-[280px] lg:h-[204px] h-[204px] rounded-lg overflow-hidden ">
          <Image
            src={job.image}
            alt={job.candidateName}
            width={280}
            height={204}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h4 className="text-lg font-semibold text-blackColor leading-6">
            {job.candidateName}{" "}
            <span
              className={` px-2 py-1 text-sm rounded-sm ${job?.jobType === "long-term" ? "bg-blueColor/20 text-blueColor" : "bg-greenColor/20 text-greenColor"}`}
            >
              {job?.jobType && job?.jobType}
            </span>
          </h4>
          <p className="text-base text-descriptionColor mt-1">
            {job.position} | {job.roles.join(" | ")}
          </p>
          <p className="text-base text-descriptionColor mt-1 flex items-center gap-1.5">
            <LocationIcon className="w-4 h-4" />
            {job.location}
          </p>
          <div className="mt-8">
            <ButtonReuseable
              title="View Details"
              rightIcon={<ArrowRightUp />}
              className="bg-grayColor1! border border-borderColor text-blackColor!"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col items-end ">
        <h4 className="text-lg md:text-xl lg:text-2xl font-semibold text-blackColor leading-6 ">
          {job.price}
        </h4>
        <p className="text-xs px-2 py-1.5 font-semibold text-whiteColor rounded-sm bg-yellowColor  mt-1">
          {job.status}
        </p>
      </div>
    </div>
  );
}

export default ClientJobCard;

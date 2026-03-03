import ArrowRightUp from "@/components/icon/ArrowRightUp";
import LocationIcon from "@/components/icon/LocationIcon";
import ButtonReuseable from "@/components/reusable/CustomButton";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";

interface ClientJobCardProps {
  job?: any;
  loading?: boolean;
}

function ClientJobCard({ job, loading = false }: ClientJobCardProps) {
  if (loading) {
    return (
      <div className="border flex flex-col lg:flex-row justify-between border-borderColor p-5 rounded-lg">
        <div className="flex gap-4 flex-col lg:flex-row items-center w-full">
          <Skeleton className="w-full md:w-[280px] h-[204px] rounded-lg" />
          <div className="flex-1 w-full space-y-3">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-5 w-64" />
            <Skeleton className="h-5 w-56" />
            <Skeleton className="h-10 w-32 mt-8" />
          </div>
        </div>
        <div className="flex flex-col items-end gap-2 mt-4 lg:mt-0">
          <Skeleton className="h-7 w-20" />
          <Skeleton className="h-6 w-16" />
        </div>
      </div>
    );
  }

  return (
    <div className="border flex flex-col lg:flex-row justify-between border-borderColor p-5 rounded-lg">
      <div className="flex gap-4 flex-col lg:flex-row items-center">
        <div className="w-full md:w-[280px] h-[204px] rounded-lg overflow-hidden ">
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
            {job.candidateName}
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

import LocationIcon from "@/components/icon/LocationIcon";
import candidateImage from "@/public/candidates/candidates-2.png";
import { Job } from "@/types";
import Image from "next/image";
import ClientJobcardAction from "./ClientJobcardAction";
interface ClientJobCardProps {
  job?: Job;
  loading?: boolean;
  userType?: string;
}

function ClientJobCard({ job, userType }: ClientJobCardProps) {
  console.log(job);
  return (
    <div className="border flex flex-col md:flex-row justify-between border-borderColor hover:shadow-xl transition-all duration-200 p-5 rounded-lg">
      <div className="flex gap-4 flex-col md:flex-row items-center">
        <div className="w-full md:w-55 md:h-40 lg:w-70 lg:h-51 h-51 rounded-lg overflow-hidden ">
          <Image
            src={job.cover_image_url || candidateImage}
            alt={job.title}
            width={280}
            height={204}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h4 className="text-lg font-semibold text-blackColor leading-6">
            {job.client_name || job.title}{" "}
            <span
              className={` px-2 py-1 text-sm rounded-sm ${job?.job_type === "long_term" ? "bg-blueColor/20 text-blueColor" : "bg-greenColor/20 text-greenColor"}`}
            >
              {job?.job_type == "long_term" ? "Long-Term" : "Short-Term"}
            </span>
          </h4>
          <p className="text-base text-descriptionColor mt-1">
            {job?.services?.map((service, index) => (
              <span key={index}>
                {service} {index < job.services.length - 1 ? "| " : ""}
              </span>
            ))}
          </p>
          <p className="text-base text-descriptionColor mt-1 flex items-center gap-1.5">
            <LocationIcon className="w-4 h-4" />
            {job.address?.city}, {job.address?.province}, {job.address?.country}
          </p>
          <div>
            <ClientJobcardAction job={job} userType={userType} />
          </div>
        </div>
      </div>
      <div className="flex flex-col items-end ">
        <h4 className="text-lg md:text-xl lg:text-2xl font-semibold text-blackColor leading-6 ">
          {job.compensation?.amount}{" "}
          {job.compensation?.type === "per_hour" ? "/hr" : ""}
        </h4>
        <p className="text-xs px-2 py-1.5 font-semibold text-whiteColor rounded-sm bg-yellowColor mt-1">
          {job.status}
        </p>
      </div>
    </div>
  );
}

export default ClientJobCard;

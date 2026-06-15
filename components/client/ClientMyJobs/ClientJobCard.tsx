import LocationIcon from "@/components/icon/LocationIcon";
import Image from "next/image";
import { useState } from "react";
import ClientJobcardAction from "./ClientJobcardAction";
import jobImage from "@/public/jobs/Rectangle 856.png";

interface ClientJobCardProps {
  job?: any;
  loading?: boolean;
  userType?: string;
}

function ClientJobCard({ job, userType }: ClientJobCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  const title = job?.title;
  const description = job?.description_preview;
  const services = Array.isArray(job?.services)
    ? job.services
    : typeof job?.services === "string"
      ? job.services.split(",")
      : [];
  const locationLabel = job?.location?.label
    ? job.location.label
    : [job?.location?.city, job?.location?.province, job?.location?.country]
        .filter(Boolean)
        .join(", ");
  const priceLabel = job?.compensation?.label;
  const statusLabel = job?.status_label;
  const badgeText = job?.job_type_label;
  const imageSrc = job?.cover_image_url || jobImage;

  const handleInterview = () => {
    setIsOpen(true);
    console.log("Interview button clicked for job:", job);
  };

  return (
    <div className="border flex flex-col md:flex-row justify-between border-borderColor hover:shadow-xl transition-all duration-200 p-5 rounded-lg">
      <div className="flex gap-4 flex-col md:flex-row items-center md:items-center w-full">
        <div className="w-full h-[204px] md:w-[220px] md:h-[160px] lg:w-[280px] lg:h-[204px]  rounded-lg overflow-hidden bg-gray-100">
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={title}
              width={280}
              height={204}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-lg font-semibold text-gray-500">
              {title?.charAt(0) ?? "J"}
            </div>
          )}
        </div>

        <div className="flex justify-between w-full">
          <div className="w-full md:max-w-xl">
            <h4 className="text-lg font-semibold text-blackColor leading-6 flex flex-wrap items-center gap-2">
              {title}
              <span
                className={`px-2 py-1 text-sm rounded-sm ${
                  (job?.job_type ?? "long_term").toLowerCase().includes("long")
                    ? "bg-blueColor/20 text-blueColor"
                    : "bg-greenColor/20 text-greenColor"
                }`}
              >
                {badgeText}
              </span>
            </h4>

            {services.length > 0 ? (
              <p className="text-base text-descriptionColor mt-1">
                {services.join(" • ")}
              </p>
            ) : null}

            {locationLabel ? (
              <p className="text-base text-descriptionColor mt-1 flex items-center gap-1.5">
                <LocationIcon className="w-4 h-4" />
                {locationLabel}
              </p>
            ) : null}

            {/* {description ? (
            <p className="text-base text-descriptionColor mt-1">
              {description}
            </p>
          ) : null} */}

            <div>
              <ClientJobcardAction job={job} userType={userType} />
            </div>
          </div>
          <div className="flex flex-col items-start md:items-end mt-4 md:mt-0">
            <h4 className="text-lg md:text-xl lg:text-2xl font-semibold text-blackColor leading-6">
              {priceLabel}
            </h4>
            <p className="text-xs px-2 py-1.5 font-semibold text-whiteColor rounded-sm bg-yellowColor mt-1">
              {statusLabel}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClientJobCard;

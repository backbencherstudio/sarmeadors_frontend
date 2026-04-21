import LocationIcon from "@/components/icon/LocationIcon";
import ViewInvoiceIcon from "@/components/icon/ViewInvoiceIcon";
import ButtonReuseable from "@/components/reusable/CustomButton";
import LinkReuseable from "@/components/reusable/CustomLink";
import { AlertTriangle } from "lucide-react";
import Image from "next/image";

const LongTermJobCard = ({ job }) => {
  return (
    <div>
      <div className="p-6 bg-[#F9FAFB] rounded-[12px]">
        <div className="flex items-center gap-2 border-b border-gray-300 pb-3">
          <Image
            src={job.profile}
            alt="profile-image"
            height={100}
            width={100}
            className="h-8 w-8"
          />
          <h1 className="font-semibold text-lg">{job.name}</h1>
        </div>

        <div className="mt-4 border-b border-gray-300 pb-4">
          <div className="flex items-center justify-between w-full">
            <h1 className="text-[#111927] font-semibold text-lg">
              {job.title}
            </h1>
            <h1 className="text-[#111927] font-medium text-lg">
              $ {job.rate}/hr
            </h1>
          </div>

          <p className="mt-1.5 text-[#B8BFC7] text-base">{job.description}</p>

          <p className="mt-1.5 text-[#B8BFC7] text-base">
            <LocationIcon className="h-4 w-4 inline-block mr-1" />
            <span>{job.location}</span>
          </p>
        </div>

        <div className="mt-4 flex items-center gap-3">
          <ButtonReuseable title="Publish This job" />

          <LinkReuseable
            href={"/long-term-requested-job/contact-address"}
            title="View Details"
            rightIcon={<ViewInvoiceIcon />}
            className="bg-white !text-blackColor border border-gray2Color font-semibold !p-3 rounded-[8px] hover:scale-105 transition-all  duration-200"
          />

          <ButtonReuseable
            title="Reject Job"
            icon={<AlertTriangle className="text-[#CB121D]" />}
            className="bg-white !text-[#CB121D] border border-gray2Color font-semibold"
          />
        </div>
      </div>
    </div>
  );
};

export default LongTermJobCard;

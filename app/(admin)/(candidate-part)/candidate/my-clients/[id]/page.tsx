import CandidatejobsCard from "@/components/candidate/CandidatejobsCard";
import LocationIcon from "@/components/icon/LocationIcon";
import { currentJobs } from "@/demoData/DashboardData";
import CallIcon from "@/public/icon/CallIcon";
import EmailIcon from "@/public/icon/EmailIcon";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FaStar } from "react-icons/fa6";

async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const { id } = params;

  const clientJob = currentJobs.find((job) => job.id === parseInt(id));
  return (
    <section className="space-y-5 p-3 sm:p-4 lg:p-6 h-full">
      <Link
        href="/candidate/my-clients"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-blackColor"
      >
        <ChevronLeft className="h-4 w-4" />
        Client details
      </Link>

      <div className=" bg-white p-4 md:p-5 border-b border-borderColor">
        <div className="">
          <div className="flex flex-col md:flex-row items-center  gap-3">
            <div className="relative h-14 w-14 overflow-hidden rounded-full border border-borderColor">
              <Image
                src={clientJob.avatar || "/empty-user.png"}
                alt={clientJob.name}
                width={50}
                height={50}
                className="object-cover h-full w-full"
              />
            </div>
            <div>
              <div className="flex flex-col md:flex-row items-center md:gap-2">
                <h2 className="md:text-2xl text-lg font-semibold text-blackColor">
                  {clientJob.name}
                </h2>
                <p className=" text-sm text-headerColor font-medium underline flex items-center md:items-end gap-2">
                  <FaStar className="text-ratingColor" /> 4.5 Rating (8)
                </p>
              </div>
              <div className="flex flex-wrap justify-center items-center gap-x-5 gap-y-2 text-sm text-headerColor font-medium mt-2.5">
                <span className="flex items-center gap-1.5">
                  <EmailIcon className="h-4 w-4 stroke-gray2Color!" />
                  {clientJob.name}@gmail.com
                </span>
                <span className="flex items-center gap-1.5">
                  <CallIcon className="h-4 w-4 stroke-gray2Color!" />
                  +17036258009
                </span>
                <span className="flex items-center gap-1.5">
                  <LocationIcon className="h-4 w-4 stroke-gray2Color!  " />
                  DC Metro Area
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-blackColor">Job History</h3>
        {currentJobs.map((job) => (
          <CandidatejobsCard key={job.id} />
        ))}
      </div>
    </section>
  );
}

export default Page;

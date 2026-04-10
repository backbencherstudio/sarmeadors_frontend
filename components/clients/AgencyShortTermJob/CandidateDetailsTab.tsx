"use client";
import StarIcon from "@/components/icon/StarIcon";
import ReusableTabs from "@/components/reusable/ReusableTabs";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io";

export default function CandidateDetailsTab() {
  const router = useRouter();
  const tabs = [
    {
      label: "Personal Information",
      link: "/marketplace-view-details/candidate-details/personal-information",
    },
    {
      label: "Professional Information",
      link: "/marketplace-view-details/candidate-details/professional-information",
    },
    {
      label: "Documents",
      link: "/marketplace-view-details/candidate-details/document",
    },
    {
      label: "Additional Information",
      link: "/marketplace-view-details/candidate-details/additional-information",
    },
  ];

  return (
    <div>
      <div>
        <button
          onClick={() => router.back()}
          className="font-semibold capitalize leading-[160%] flex items-center cursor-pointer"
        >
          <IoIosArrowBack />
          <span className="inline-block">Candidate Details</span>
        </button>
        <div className="my-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div>
              <Image
                src={"/candidates/candidates-profile.png"}
                alt="Profile-image"
                height={100}
                width={100}
                className="h-[56px] w-[56px] rounded-full"
              />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-[#111927] font-bold text-xl">
                  Kristin Ben
                </h1>
                <p className="flex items-center gap-1">
                  <StarIcon className="text-[#E5B400] h-4 w-4" />
                  <Link
                    href={"/marketplace-view-details/candidate-review"}
                    className="underline text-[#202735] text-lg"
                  >
                    4.5 Rating (8)
                  </Link>
                </p>
              </div>
              <div className="mt-2">
                <p className="text-[#384250] text-base">
                  Nanny | House Manager | Chef
                </p>
              </div>
            </div>
          </div>
          <div>
            <button className="px-6 py-4 rounded-[8px] text-white bg-[#111927] hover:bg-[#111927]/90 cursor-pointer">
              Assign Candidate
            </button>
          </div>
        </div>
      </div>
      <div className="mb-6">
        <ReusableTabs tabs={tabs} initialPath={""} />
      </div>
    </div>
  );
}

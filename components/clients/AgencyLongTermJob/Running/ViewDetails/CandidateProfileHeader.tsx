import ReusableTabs from "@/components/reusable/ReusableTabs";
import Image from "next/image";

export default function CandidateProfileHeader() {
  const tabs = [
    {
      label: "Personal Information",
      link: "/view-job-details/candidate-profile/personal-information",
    },
    {
      label: "Professional Information",
      link: "/view-job-details/candidate-profile/professional-information",
    },
    {
      label: "Document",
      link: "/view-job-details/candidate-profile/document",
    },
    {
      label: "Additional Information",
      link: "/view-job-details/candidate-profile/additional-information",
    },
  ];
  return (
    <div>
      <div>
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src={"/profile.png"}
              alt="profile-image"
              height={100}
              width={100}
              className="h-12 w-12"
            />
            <div>
              <h1 className="text-[#111927] font-semibold text-lg">
                Kristin Ben
              </h1>
              <p className="text-[#384250] text-sm">
                Nanny | House Manager | Baby/Night Nurse
              </p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <ReusableTabs tabs={tabs} initialPath={""} />
      </div>
    </div>
  );
}

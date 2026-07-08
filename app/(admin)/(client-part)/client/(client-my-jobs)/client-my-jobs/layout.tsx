import ReusableLineTabs from "@/components/reusable/ReusableLineTabs";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function MyJobsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const TabsData = [
    {
      label: "Short-Term Job",
      link: "/client/client-my-jobs/short-term-job",
    },
    {
      label: "Long-Term Job",
      link: "/client/client-my-jobs/long-term-job/running",
    },
  ];

  return (
    <div className="p-6">
      {/* My Jobs */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-3">
        <div className="">
          <h1 className="font-semibold capitalize leading-[160%]">My Jobs</h1>
          <p className="text-gray-500">
            List of all current clients and their details.
          </p>
        </div>
        <Link
          href={"/client/post-job"}
          className="w-fit flex items-center gap-1.5 bg-[#111927] text-white cursor-pointer  md:px-4 md:py-[17px] px-4 py-2 rounded-[12px]"
        >
          <Plus /> Post a Job
        </Link>
      </div>
      {/* Reusable Line Tabs */}
      <ReusableLineTabs
        tabs={TabsData}
        currentPath="/client/client-my-jobs/short-term-job/running"
      />
      {/* Children */}

      {children}
    </div>
  );
}

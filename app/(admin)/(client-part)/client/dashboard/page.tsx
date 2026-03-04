import ClientJobList from "@/components/client/ClientMyJobs/ClientJobList";
import StatCards from "@/components/dashboard/StatCards";
import ProgressAvatar from "@/components/ProgressAvatar";

import ClientHeroSection from "@/components/client/ClientMyJobs/ClientHeroSection";
import { cookies } from "next/headers";
import Link from "next/link";
import NewCandidatesPage from "../client-my-candidates/new-candidates/page";

async function CandidatesDashboard() {
  const cookieStore = await cookies();
  const token = cookieStore?.get("jobtoken")?.value;

  const statCards = [
    {
      title: "Total Job Post",
      value: 0,
      percentage: "0%",
    },
    {
      title: "Applications",
      value: 0,
      percentage: "0%",
    },
    {
      title: "Messages",
      value: 0,
      percentage: "0%",
    },
    {
      title: "Interviews",
      value: 0,
      percentage: "0%",
    },
  ];

  if (token) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Link
          href="/login"
          className="text-xl underline text-primaryColor text-center"
        >
          Please log in to view the dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="md:p-6 p-3">
      <div className="flex items-center gap-3 mb-6">
        <ProgressAvatar
          src="/profile.png"
          alt="User Avatar"
          percentage={70}
          width={66}
          height={66}
        />
        <div>
          <p className="text-sm text-descriptionColor">Welcome back, Alex</p>
          <p className="text-lg md:text-xl font-semibold text-blackColor">
            Welcome, Alex 👋
          </p>
        </div>
      </div>
      <div>
        <ClientHeroSection />
      </div>
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-blackColor mb-4">
          Status Statistics
        </h3>
        <StatCards statCards={statCards} />
      </div>
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-blackColor mb-4">My Job</h3>
        <div className="space-y-4">
          <ClientJobList />
        </div>
      </div>
      
    </div>
  );
}

export default CandidatesDashboard;

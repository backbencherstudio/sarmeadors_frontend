import StatCards from "@/components/dashboard/StatCards";
import ClientCandiateInfo from "@/components/client/ClientMyJobs/ClientCandiateInfo";
import ClientHeroSection from "@/components/client/ClientMyJobs/ClientHeroSection";
import UserInfo from "@/components/clients/UserInfo";
import { cookies } from "next/headers";
import Link from "next/link";

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
      <UserInfo />
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
        <ClientCandiateInfo />
      </div>
    </div>
  );
}

export default CandidatesDashboard;

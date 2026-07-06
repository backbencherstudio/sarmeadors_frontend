"use client";

import ClientCandiateInfo from "@/components/client/ClientMyJobs/ClientCandiateInfo";
import UserInfo from "@/components/clients/UserInfo";
import StatCards from "@/components/dashboard/StatCards";
import { useGetClientDashboardQuery } from "@/feature/dashboard/client/dashboard";

function CandidatesDashboard() {
  // const token = await getToken();

  const { data, isLoading } = useGetClientDashboardQuery({});
  console.log(data?.data?.stats?.total_job_posts);

  const statCards = [
    {
      title: "Total job posts",
      value: data?.data?.stats?.total_job_posts,
    },
    {
      title: "Applications",
      value: data?.data?.stats?.applications,
    },
    {
      title: "Messages",
      value: data?.data?.stats?.messages,
    },
    {
      title: "Interviews",
      value: data?.data?.stats?.interviews,
    },
  ];

  // if (!token) {
  //   return (
  //     <div className="flex justify-center items-center h-screen">
  //       <Link
  //         href="/login"
  //         className="text-xl underline text-primaryColor text-center"
  //       >
  //         Please log in to view the dashboard
  //       </Link>
  //     </div>
  //   );
  // }

  return (
    <div className="md:p-6 p-3">
      <UserInfo clientInfo={data?.data?.client} />
      <div>{/* <ClientHeroSection /> */}</div>
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-blackColor mb-4">
          Status Statistics
        </h3>
        <StatCards statCards={statCards} isLoading={isLoading} />
      </div>
      <div className="mb-8">
        <ClientCandiateInfo data={data?.data} />
      </div>
    </div>
  );
}

export default CandidatesDashboard;

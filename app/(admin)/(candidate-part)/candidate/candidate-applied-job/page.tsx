"use client";
import ClientJobList from "@/components/client/ClientMyJobs/ClientJobList";
import { jobs } from "@/demoData/DashboardData";
import { useGetShortTermJobsQuery } from "@/feature/slice/candidate/candidate-dashboard/CandidateAppliedJobSlice";

function page() {
  const { data, isLoading, isError } = useGetShortTermJobsQuery(
    "candidate-dashboard",
  );

  // console.log("data=======", data?.data?.jobs);

  return (
    <div>
      <div className="space-y-4">
        <ClientJobList
          userType="candidate"
          jobs={data?.data?.jobs?.data}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}

export default page;

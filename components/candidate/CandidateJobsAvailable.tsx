import jobImage from "@/public/jobs/Rectangle 856.png";
import ClientJobList from "../client/ClientMyJobs/ClientJobList";
import SearchIcon from "../icon/SearchIcon";
import ButtonReuseable from "../reusable/CustomButton";
import { useGetCandidateDashboardQuery } from "@/feature/slice/candidate/candidate-dashboard/CandidateDashboardSlice";
function CandidateJobsAvailable() {
const { data, isLoading, isError } = useGetCandidateDashboardQuery(
    "candidate-dashboard",
  );
  return (
    <div>
      <div className="flex h-full justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-blackColor ">
          Available Jobs
        </h3>
        <ButtonReuseable
          title="Discover Candidates"
          icon={<SearchIcon className="w-4 h-4" />}
          className="bg-blackColor text-white"
        />
      </div>
      <div className="space-y-4">
        <ClientJobList jobs={data?.data?.running_jobs} isLoading={isLoading} />
      </div>
    </div>
  );
}

export default CandidateJobsAvailable;

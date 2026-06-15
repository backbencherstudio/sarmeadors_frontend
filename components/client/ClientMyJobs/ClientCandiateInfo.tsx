import NewCandidatesPage from "@/app/(admin)/(client-part)/client/client-my-candidates/page";
import { jobs } from "@/demoData/DashboardData";
import ClientJobList from "./ClientJobList";
function ClientCandiateInfo({ data }) {
  // console.log(data?.current_job);
  return (
    <div>
      <h3 className="text-lg font-semibold text-blackColor mb-4">My Job</h3>
      <div className="space-y-4">
        <ClientJobList jobs={data?.current_job} />
      </div>
      <div className="my-8">
        <NewCandidatesPage data={data?.recommended_candidates} />
      </div>
    </div>
  );
}

export default ClientCandiateInfo;

import NewCandidatesPage from "@/app/(admin)/(client-part)/client/client-my-candidates/new-candidates/page";

import ClientJobList from "./ClientJobList";
import { jobs } from "@/demoData/DashboardData";
function ClientCandiateInfo() {
  
  return (
    <div>
      <h3 className="text-lg font-semibold text-blackColor mb-4">My Job</h3>
      <div className="space-y-4">
        <ClientJobList jobs={jobs} />
      </div>
      <div className="my-8">
        <NewCandidatesPage />
      </div>
    </div>
  );
}

export default ClientCandiateInfo;

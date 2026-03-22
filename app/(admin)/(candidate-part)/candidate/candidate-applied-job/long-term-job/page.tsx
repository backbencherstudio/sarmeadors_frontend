import ClientJobList from "@/components/client/ClientMyJobs/ClientJobList";
import { jobs } from "@/demoData/DashboardData";

function page() {
  return (
    <div>
      <div className="space-y-4">
        <ClientJobList userType="candidate" jobs={jobs} />
      </div>
    </div>
  );
}

export default page;

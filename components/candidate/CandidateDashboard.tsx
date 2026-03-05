import UserInfo from "../clients/UserInfo";
import StatCards from "../dashboard/StatCards";
import CandidateHeroSection from "./CandidateHeroSection";
import CandidateJobsAvailable from "./CandidateJobsAvailable";

function CandidateDashboard() {
  const statCards = [
    {
      title: "Short-Term Job",
      value: 0,
    },
    {
      title: "Long-Term Job",
      value: 0,
    },
    {
      title: "My Jobs",
      value: 0,
    },
    {
      title: "My Families",
      value: 0,
    },
  ];
  return (
    <div>
      <div className="md:p-6 p-3">
        <UserInfo />
        <div>
          <CandidateHeroSection />
        </div>
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-blackColor mb-4">
            Status Statistics
          </h3>
          <StatCards statCards={statCards} />
        </div>
        <div className="mb-8">
          <CandidateJobsAvailable />
        </div>
      </div>
    </div>
  );
}

export default CandidateDashboard;

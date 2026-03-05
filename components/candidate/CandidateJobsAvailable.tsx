import jobImage from "@/public/jobs/Rectangle 856.png";
import ClientJobList from "../client/ClientMyJobs/ClientJobList";
import SearchIcon from "../icon/SearchIcon";
import ButtonReuseable from "../reusable/CustomButton";
function CandidateJobsAvailable() {
  const jobs = [
    {
      id: 1,
      candidateName: "Darlene Robertson",
      position: "Nanny",
      roles: ["House Manager", "Baby/Night Nurse"],
      location: "Miami, New York, Other Locations",
      price: "$34/hr",
      status: "Pending",
      jobType: "short-term",
      image: jobImage,
    },
    {
      id: 2,
      candidateName: "Darlene Robertson",
      position: "Nanny",
      roles: ["House Manager", "Baby/Night Nurse"],
      location: "Miami, New York, Other Locations",
      price: "$34/hr",
      status: "Pending",
      jobType: "long-term",
      image: jobImage,
    },
  ];
  return (
    <div>
      <div className="flex h-full justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-blackColor ">
          Available Jobs
        </h3>
        <ButtonReuseable
          title="Discover Candidates"
          icon={<SearchIcon className="w-4 h-4" />}
          className=""
        />
      </div>
      <div className="space-y-4">
        <ClientJobList jobs={jobs} />
      </div>
    </div>
  );
}

export default CandidateJobsAvailable;

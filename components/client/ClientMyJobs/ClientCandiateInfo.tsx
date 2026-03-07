import NewCandidatesPage from "@/app/(admin)/(client-part)/client/client-my-candidates/new-candidates/page";
import jobImage from "@/public/jobs/Rectangle 856.png";
import ClientJobList from "./ClientJobList";
function ClientCandiateInfo() {
  const jobs = [
    {
      id: 1,
      candidateName: "Darlene Robertson",
      position: "Nanny",
      roles: ["House Manager", "Baby/Night Nurse"],
      location: "Miami, New York, Other Locations",
      price: "$34/hr",
      status: "Pending",
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
      image: jobImage,
    },
  ];
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

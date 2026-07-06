import ClientJobList from "../client/ClientMyJobs/ClientJobList";
import SearchIcon from "../icon/SearchIcon";
import ButtonReuseable from "../reusable/CustomButton";
import { useGetCandidateDashboardQuery } from "@/feature/slice/candidate/candidate-dashboard/CandidateDashboardSlice";

function CandidateJobsAvailable() {
  const { data, isLoading } = useGetCandidateDashboardQuery(
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

//  {
//                 "id": 18,
//                 "job_type": "long_term",
//                 "title": "Status Showcase \u2014 Marketplace (Long-Term)",
//                 "client_name": "Alex Johnson",
//                 "description": "Candidate My Jobs status showcase(marketplace).",
//                 "cover_image_url": null,
//                 "address": {
//                     "line": "456 Status Dr",
//                     "city": "Miami Beach",
//                     "province": "FL",
//                     "postal_code": "33139",
//                     "country": "US"
//                 },
//                 "compensation": {
//                     "amount": "25.00",
//                     "currency": "usd",
//                     "type": "per_hour"
//                 },
//                 "status": "marketplace",
//                 "latest_attendance": null,
//                 "can_check_in": false,
//                 "can_check_out": false
//             },

// ===============================

//  {
//                 "id": 18,
//                 "job_type": "long_term",
//                 "job_type_label": "Long-Term Job",
//                 "title": "Status Showcase \u2014 Marketplace (Long-Term)",
//                 "cover_image_url": null,
//                 "description": "Candidate My Jobs status showcase (marketplace).",
//                 "description_preview": "Candidate My Jobs status showcase (marketplace).",
//                 "services": [
//                     "Nanny",
//                     "Baby\/Night Nurse"
//                 ],
//                 "location": {
//                     "label": "Miami Beach, FL, US",
//                     "city": "Miami Beach",
//                     "province": "FL",
//                     "country": "US"
//                 },
//                 "compensation": {
//                     "amount": "25.00",
//                     "currency": "usd",
//                     "type": "per_hour",
//                     "label": "$25\/hr"
//                 },
//                 "status": "marketplace",
//                 "status_label": "Pending",
//                 "applicants": {
//                     "count": 0,
//                     "avatars": []
//                 },
//                 "assigned_candidate": {
//                     "id": 1,
//                     "name": "Maria Garcia",
//                     "image_url": null
//                 },
//                 "actions": {
//                     "can_view_details": true
//                 }
//             },

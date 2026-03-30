import ApplicantsFilter from "@/components/clients/AgencyShortTermJob/ApplicantsFilter";
import ApplicantsTable from "@/components/clients/AgencyShortTermJob/ApplicantsTable";
import ApplicantTopBar from "@/components/clients/AgencyShortTermJob/ApplicantTopBar";
import StatCards from "@/components/dashboard/StatCards";

const statCards = [
  {
    title: "Pre Application",
    value: 195,
    percentage: "0.1%",
  },
  {
    title: "Application Started",
    value: 7,
    percentage: "0.8%",
  },
  {
    title: "Applied",
    value: 18,
    percentage: "1.5%",
  },
  {
    title: "Inactive",
    value: 635,
    percentage: "72.6%",
  },
  {
    title: "Initial Payment Made",
    value: 0,
    percentage: "3.2%",
  },
  {
    title: "Consultation Booked",
    value: 0,
    percentage: "3.2%",
  },
  {
    title: "Consultation Complete",
    value: 0,
    percentage: "3.2%",
  },
  {
    title: "Job Posted",
    value: 97,
    percentage: "3.2%",
  },
];

export default function page() {
  return (
    <div className="p-6">
      <ApplicantTopBar />
      <div className="pt-12">
        <StatCards statCards={statCards} />
      </div>
      <ApplicantsFilter />
      <ApplicantsTable />
    </div>
  );
}

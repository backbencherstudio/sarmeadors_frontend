import BookingFee from "@/components/agency/globalSetting/jobs/BookingFee";
import General from "@/components/agency/globalSetting/jobs/General";
import LongTermJobs from "@/components/agency/globalSetting/jobs/LongTermJobs";
import ShortTermJobs from "@/components/agency/globalSetting/jobs/ShortTermJobs";

export default function JobsPage() {
  return (
    <div className="space-y-4">
      <General />
      <BookingFee />
      <ShortTermJobs />
      <LongTermJobs />
    </div>
  );
}

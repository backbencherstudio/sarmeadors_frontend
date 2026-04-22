import HideCandidates from "@/components/clients/AgencyLongTermJob/PostedJobBroadcast/HideCandidates";
import PostedJobBroadcastHeader from "@/components/clients/AgencyLongTermJob/PostedJobBroadcast/PostedJobBroadcastHeader";
import BroadcastButtonSection from "@/components/clients/AgencyShortTermJob/BroadcastButtonSection";
import { BroadcastChannels } from "@/components/clients/AgencyShortTermJob/BroadcastChannels";
import BroadcastForm from "@/components/clients/AgencyShortTermJob/BroadcastForm";
import BroadcastTable from "@/components/clients/AgencyShortTermJob/BroadcastTable";

export default function page() {
  return (
    <div className="p-6">
      <PostedJobBroadcastHeader />
      <HideCandidates />
      <div className="mt-4">
        <BroadcastTable />
      </div>
      <div>
        <div className="flex items-center mt-4">
          <input
            type="checkbox"
            id="noMatchList"
            className="h-4 w-4 cursor-pointer rounded border border-gray-300 accent-[#111927] focus:ring-0 focus:ring-offset-0"
          />
          <label
            htmlFor="noMatchList"
            className="ml-2 text-[#111927] font-medium"
          >
            Add select candidates as applicants
          </label>
        </div>
      </div>
      <BroadcastForm />
      <BroadcastChannels />
      <BroadcastButtonSection />
    </div>
  );
}

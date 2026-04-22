import HideCandidates from "@/components/clients/AgencyLongTermJob/PostedJobBroadcast/HideCandidates";
import PostedBroadcastTable from "@/components/clients/AgencyLongTermJob/PostedJobBroadcast/PostedBroadcastTable";
import PostedJobBroadcastHeader from "@/components/clients/AgencyLongTermJob/PostedJobBroadcast/PostedJobBroadcastHeader";

export default function page() {
  return (
    <div className="p-6">
      <PostedJobBroadcastHeader />
      <HideCandidates />
      <div className="mt-4">
        <PostedBroadcastTable />
      </div>
    </div>
  );
}

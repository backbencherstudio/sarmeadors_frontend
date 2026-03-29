"use client";
import BroadcastTable from "@/components/clients/AgencyShortTermJob/BroadcastTable";
import BroadcastTopBar from "@/components/clients/AgencyShortTermJob/BroadcastTopBar";

export default function page() {
  return (
    <div className="p-6">
      <BroadcastTopBar />
      <BroadcastTable />
    </div>
  );
}

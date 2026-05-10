import LongTermJobProfileInfo from "@/components/clients/AgencyLongTermJob/LongTermJobProfileInfo";
import LongTermJobProfileHeader from "@/components/clients/AgencyLongTermJob/RequestedJobDetails/LongTermJobProfileHeader";
import ViewDetailsTab from "@/components/clients/AgencyLongTermJob/Running/ViewDetails/ViewDetailsTab";

export default function ViewDetailsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="border grid grid-cols-1 lg:grid-cols-12">
        <div className="lg:col-span-3 2xl:col-span-2">
          <LongTermJobProfileInfo />
        </div>
        <div className="bg-white lg:col-span-9 2xl:col-span-10 p-4 lg:p-6">
          <ViewDetailsTab />
          {/* children */}
          <div className="py-4">{children}</div>
        </div>
      </div>
    </div>
  );
}

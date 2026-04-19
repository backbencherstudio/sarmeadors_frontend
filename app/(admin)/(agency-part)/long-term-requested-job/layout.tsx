import LongTermJobProfileHeader from "@/components/clients/AgencyLongTermJob/LongTermJobProfileHeader";
import LongTermJobProfileInfo from "@/components/clients/AgencyLongTermJob/LongTermJobProfileInfo";

export default function LongTermRequestedJobLayout({
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
        <div className=" bg-white lg:col-span-9 2xl:col-span-10 p-4 lg:p-6">
          <LongTermJobProfileHeader />
          {/* children */}
          <div className="py-4">{children}</div>
        </div>
      </div>
    </div>
  );
}

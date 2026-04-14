import AgencyShortTermViewListMenu from "@/components/clients/AgencyShortTermJob/AgencyShortTermViewListMenu";

export default function ShortTermViewListLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className=" bg-white lg:col-span-9 2xl:col-span-10 p-4 lg:p-6">
      <div>
        <AgencyShortTermViewListMenu />
      </div>
      {/* children */}
      <div className="py-4">{children}</div>
    </div>
  );
}

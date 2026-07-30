// components/AgencyStatsCards.tsx

type AgencyStatsCardsProps = {
  total_agencies?: number;
  active_agencies?: number;
  suspended_agencies?: number;
};

export default function AgencyStatsCards({
  total_agencies = 0,
  active_agencies = 0,
  suspended_agencies = 0,
}: AgencyStatsCardsProps) {
  const stats = [
    { label: "Total Agencies", value: total_agencies },
    { label: "Active Agencies", value: active_agencies },
    { label: "Suspended", value: suspended_agencies },
    {
      label: "Inactive",
      value: total_agencies - active_agencies - suspended_agencies,
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-3">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-[#F9FAFB] border border-gray-200 rounded-xl p-5"
        >
          <p className="text-sm text-gray-500 mb-4">{stat.label}</p>
          <p className="text-[22px] font-bold text-gray-900">
            {stat.value.toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
}

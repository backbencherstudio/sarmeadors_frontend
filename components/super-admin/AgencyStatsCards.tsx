// components/AgencyStatsCards.tsx

type StatCard = {
  label: string;
  value: number;
};

const stats: StatCard[] = [
  { label: "Total Agencies", value: 3000 },
  { label: "Active Agencies", value: 112 },
  { label: "Suspended", value: 21 },
  { label: "Inactive", value: 2900 },
];

export default function AgencyStatsCards() {
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

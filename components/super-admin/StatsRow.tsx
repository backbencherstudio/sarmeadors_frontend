const stats = [
  {
    label: "Total Agencies",
    value: "148",
    badge: "(0.1%)",
    badgeColor: "text-[#04A755]",
  },
  {
    label: "Active Agencies",
    value: "112",
    badge: "(75.7% of total)",
    badgeColor: "text-[#04A755]",
  },
  {
    label: "Suspended",
    value: "21",
    badge: "(14.2% of total)",
    badgeColor: "text-[#CB121D]",
  },
  {
    label: "Total Clients",
    value: "8,340",
    badge: "(last month)",
    badgeColor: "text-[#A5600D]",
  },
  {
    label: "Total Candidates",
    value: "54,920",
    badge: "(last month)",
    badgeColor: "text-[#AD0AFD]",
  },
];

export default function StatsRow() {
  return (
    <div>
      <h1 className="text-[#111927] font-semibold text-xl mb-4">
        Status Statistics
      </h1>
      <div className="grid grid-cols-5 gap-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-[#F9FAFB] border border-gray-200 rounded-lg p-5"
          >
            <p className="text-lg text-[#778593] mb-2.5">{stat.label}</p>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-medium text-gray-900">
                {stat.value}
              </span>
              <span className={`text-lg ${stat.badgeColor}`}>{stat.badge}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

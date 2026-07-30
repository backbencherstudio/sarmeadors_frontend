type StatsRowProps = {
  total_agencies?: number;
  active_agencies?: number;
  suspended_agencies?: number;
  total_clients?: number;
  total_candidates?: number;
};

export default function StatsRow({
  total_agencies = 0,
  active_agencies = 0,
  suspended_agencies = 0,
  total_clients = 0,
  total_candidates = 0,
}: StatsRowProps) {
  const inactive_agencies =
    total_agencies - active_agencies - suspended_agencies;

  const stats = [
    {
      label: "Total Agencies",
      value: total_agencies.toString(),
      // badge: `(${total_agencies > 0 ? "100%" : "0%"})`,
      badgeColor: "text-[#04A755]",
    },
    {
      label: "Active Agencies",
      value: active_agencies.toString(),
      // badge: `(${total_agencies > 0 ? Math.round((active_agencies / total_agencies) * 100) : 0}% of total)`,
      badgeColor: "text-[#04A755]",
    },
    {
      label: "Suspended",
      value: suspended_agencies.toString(),
      // badge: `(${total_agencies > 0 ? Math.round((suspended_agencies / total_agencies) * 100) : 0}% of total)`,
      badgeColor: "text-[#CB121D]",
    },
    {
      label: "Total Clients",
      value: total_clients.toLocaleString(),
      // badge: "(total)",
      badgeColor: "text-[#A5600D]",
    },
    {
      label: "Total Candidates",
      value: total_candidates.toLocaleString(),
      // badge: "(total)",
      badgeColor: "text-[#AD0AFD]",
    },
  ];

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
              {/* <span className={`text-lg ${stat.badgeColor}`}>{stat.badge}</span> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

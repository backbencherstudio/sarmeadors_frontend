"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const yearlyData = [
  { label: "2013", value: 245 },
  { label: "2014", value: 255 },
  { label: "2015", value: 270 },
  { label: "2016", value: 253 },
  { label: "2017", value: 265 },
  { label: "2018", value: 305 },
  { label: "2019", value: 268 },
  { label: "2020", value: 382 },
  { label: "2021", value: 262 },
  { label: "2022", value: 252 },
  { label: "2023", value: 278 },
  { label: "2024", value: 408 },
  { label: "2025", value: 392 },
];

const monthlyData = [
  { label: "Jan", value: 280 },
  { label: "Feb", value: 295 },
  { label: "Mar", value: 310 },
  { label: "Apr", value: 290 },
  { label: "May", value: 325 },
  { label: "Jun", value: 340 },
  { label: "Jul", value: 315 },
  { label: "Aug", value: 360 },
  { label: "Sep", value: 345 },
  { label: "Oct", value: 380 },
  { label: "Nov", value: 395 },
  { label: "Dec", value: 408 },
];

const dateRanges = ["2014 - 2025", "2018 - 2025", "2020 - 2025"];

const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { value: number }[];
  label?: string;
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg px-3 py-2 shadow-sm text-sm">
        <p className="text-gray-500 text-xs mb-0.5">{label}</p>
        <p className="font-medium text-gray-900">{payload[0].value}</p>
      </div>
    );
  }
  return null;
};

export default function JobsChart() {
  const [collapsed, setCollapsed] = useState(false);
  const [view, setView] = useState<"Monthly" | "Yearly">("Yearly");
  const [dateRange, setDateRange] = useState("2014 - 2025");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const data = view === "Yearly" ? yearlyData : monthlyData;

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div
          onClick={() => setCollapsed((p) => !p)}
          className="flex items-center gap-2 text-sm font-medium text-gray-800 hover:text-gray-600 transition-colors"
        >
          {collapsed ? (
            <button className="p-2 bg-[#F3F4F6] rounded-[8px] cursor-pointer">
              <ChevronUp size={16} className="text-gray-500" />
            </button>
          ) : (
            <button className="p-2 bg-[#F3F4F6] rounded-[8px] cursor-pointer">
              <ChevronDown size={16} className="text-gray-500" />
            </button>
          )}
          <span className="text-[#111927] text-xl font-semibold">
            Number of new long-term jobs over time
          </span>
        </div>

        {/* Controls — hidden when collapsed */}
        {collapsed && (
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-gray-100 rounded-md p-2">
              {(["Monthly", "Yearly"] as const).map((v) => (
                <button
                  key={v}
                  onClick={() => setView(v)}
                  className={`px-3 py-1 text-xs rounded-md transition-all cursor-pointer ${
                    view === v
                      ? "bg-[#F3F4F6] text-[#111927] font-semibold p-1 shadow-sm border border-gray-200"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>

            {/* Date range dropdown */}
            <div className="relative">
              <button
                onClick={() => setDropdownOpen((p) => !p)}
                className="flex items-center gap-1.5 p-2.5 text-xs text-gray-700 bg-white border border-gray-200 rounded-md hover:bg-gray-50 transition-colors cursor-pointer"
              >
                {dateRange}
                <ChevronDown size={12} className="text-gray-400" />
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 top-full mt-1 w-36 bg-white border border-gray-200 rounded-lg shadow-md z-10 overflow-hidden">
                  {dateRanges.map((r) => (
                    <button
                      key={r}
                      onClick={() => {
                        setDateRange(r);
                        setDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs transition-colors hover:bg-gray-50 ${
                        dateRange === r
                          ? "text-[#111927] font-semibold bg-gray-50"
                          : "text-gray-600"
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Chart — hidden when collapsed */}
      {!collapsed && (
        <div className="px-4 pt-4 pb-2 border rounded-[20px]">
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart
              data={data}
              margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
            >
              <defs>
                <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#9ca3af" stopOpacity={0.25} />
                  <stop offset="100%" stopColor="#9ca3af" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="0"
                stroke="#f0f0f0"
                vertical={false}
              />
              <XAxis
                dataKey="label"
                tick={{ fontSize: 11, fill: "#9ca3af" }}
                tickLine={false}
                axisLine={false}
                dy={6}
              />
              <YAxis
                domain={[0, 600]}
                ticks={[0, 100, 200, 300, 400, 500, 600]}
                tick={{ fontSize: 11, fill: "#9ca3af" }}
                tickLine={false}
                axisLine={false}
                dx={-4}
              />
              <Tooltip content={<CustomTooltip />} cursor={false} />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#6b7280"
                strokeWidth={1.5}
                fill="url(#areaGradient)"
                dot={(props) => {
                  const { cx, cy, index } = props;
                  const peaks = [1, 4, 7, 9, 11, 12];
                  if (peaks.includes(index)) {
                    return (
                      <circle
                        key={`dot-${index}`}
                        cx={cx}
                        cy={cy}
                        r={3.5}
                        fill="#6b7280"
                        stroke="none"
                      />
                    );
                  }
                  return <g key={`dot-${index}`} />;
                }}
                activeDot={{ r: 4, fill: "#6b7280", stroke: "none" }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

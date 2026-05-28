"use client";

type Props = {
  field: any;
};

export default function SalaryRangeRenderer({ field }: Props) {
  return (
    <div className="space-y-2 w-full">
      <label className="block text-xs font-semibold text-headerColor">
        {field.label || "Select Salary Range"}
        {field.required && " *"}
      </label>
      <div className="flex items-end gap-2">
        <div className="flex-1 space-y-1">
          <span className="text-xs text-gray-400">From</span>
          <div className="flex items-center border border-borderColor rounded-lg bg-bgColor px-3 py-2.5">
            <span className="text-xs text-gray-400 mr-1">$</span>
            <span className="text-sm text-gray-300">0</span>
          </div>
        </div>
        <div className="flex-1 space-y-1">
          <span className="text-xs text-gray-400">To</span>
          <div className="flex items-center border border-borderColor rounded-lg bg-bgColor px-3 py-2.5">
            <span className="text-xs text-gray-400 mr-1">$</span>
            <span className="text-sm text-gray-300">0</span>
          </div>
        </div>
        <div className="flex-1 space-y-1">
          <span className="text-xs text-gray-400">Per</span>
          <div className="flex items-center justify-around border border-borderColor rounded-lg bg-bgColor px-2 py-2.5">
            {["Hour", "Week", "Month", "Year"].map((u) => (
              <span key={u} className="text-xs text-gray-400 cursor-pointer">
                {u}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

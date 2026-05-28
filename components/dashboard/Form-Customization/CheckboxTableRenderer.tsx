"use client";

import { Check } from "lucide-react";
import { useState } from "react";

type Props = {
  field: any;
};

export default function CheckboxTableRenderer({ field }: Props) {
  const [selected, setSelected] = useState<Record<string, string[]>>({});
  const columns = field.columns?.length
    ? field.columns
    : ["Column 1", "Column 2", "Column 3", "Column 4"];
  const rows = field.rows?.length
    ? field.rows
    : ["Row 1", "Row 2", "Row 3", "Row 4"];

  const toggle = (row: string, col: string) =>
    setSelected((prev) => {
      const cur = prev[row] || [];
      return {
        ...prev,
        [row]: cur.includes(col) ? cur.filter((c) => c !== col) : [...cur, col],
      };
    });

  return (
    <div className="space-y-2 w-full overflow-x-auto">
      <label className="block text-xs font-semibold text-headerColor">
        {field.label || "Checkbox Table"}
        {field.required && " *"}
      </label>
      <table className="w-full text-xs border-collapse">
        <thead>
          <tr>
            <th className="text-left p-2 text-headerColor font-medium w-24" />
            {columns.map((col: string, i: number) => (
              <th
                key={i}
                className="p-2 text-headerColor font-medium text-center"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row: string) => (
            <tr key={row} className="border-t border-borderColor">
              <td className="p-2 text-headerColor text-sm font-medium">
                {row}
              </td>
              {columns.map((col: string) => (
                <td key={col} className="p-2 text-center">
                  <div
                    onClick={() => toggle(row, col)}
                    className={`w-4 h-4 border-2 rounded flex items-center justify-center mx-auto cursor-pointer ${
                      (selected[row] || []).includes(col)
                        ? "bg-blackColor border-blackColor"
                        : "border-borderColor bg-white"
                    }`}
                  >
                    {(selected[row] || []).includes(col) && (
                      <Check size={10} className="text-white" />
                    )}
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

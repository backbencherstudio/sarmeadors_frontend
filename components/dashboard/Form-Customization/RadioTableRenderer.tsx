"use client";

import { useState } from "react";

type Props = {
  field: any;
};

export default function RadioTableRenderer({ field }: Props) {
  const [selected, setSelected] = useState<Record<string, string>>({});
  const columns = field.columns?.length
    ? field.columns
    : ["Column 1", "Column 2", "Column 3"];
  const rows = field.rows?.length ? field.rows : ["Row 1", "Row 2"];

  return (
    <div className="space-y-2 w-full overflow-x-auto">
      <label className="block text-xs font-semibold text-headerColor">
        {field.label || "Radio Table"}
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
                    onClick={() =>
                      setSelected((prev) => ({ ...prev, [row]: col }))
                    }
                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center mx-auto cursor-pointer ${
                      selected[row] === col
                        ? "border-blackColor"
                        : "border-borderColor"
                    }`}
                  >
                    {selected[row] === col && (
                      <div className="w-2 h-2 rounded-full bg-blackColor" />
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

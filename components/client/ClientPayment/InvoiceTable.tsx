"use client";
import { useState } from "react";

const initialData = [
  {
    id: 1,
    item: "Felicia reid",
    rate: 200,
    quantity: 5,
    discount: "$50",
    tax: "15%",
    total: "$2,018",
  },
  {
    id: 2,
    item: "Felicia reid",
    rate: 300,
    quantity: 4,
    discount: "$20",
    tax: "20%",
    total: "$2,018",
  },
  {
    id: 3,
    item: "Felicia reid",
    rate: 45,
    quantity: 1,
    discount: "$30",
    tax: "33%",
    total: "$2,018",
  },
  {
    id: 4,
    item: "Felicia reid",
    rate: 564,
    quantity: 32,
    discount: "$40",
    tax: "40%",
    total: "$2,018",
  },
  {
    id: 5,
    item: "Felicia reid",
    rate: 4564,
    quantity: 8,
    discount: "$40",
    tax: "60%",
    total: "$2,018",
  },
  {
    id: 6,
    item: "Felicia reid",
    rate: 455,
    quantity: 6,
    discount: "$80",
    tax: "10%",
    total: "$2,018",
  },
];

const columns = ["Item", "Rate", "Quantity", "Discount", "Tax", "Total"];

const SortIcon = () => (
  <svg
    className="w-3 h-3 ml-1 inline-block opacity-70"
    viewBox="0 0 10 14"
    fill="currentColor"
  >
    <path d="M5 0L9 5H1L5 0Z" />
    <path d="M5 14L1 9H9L5 14Z" />
  </svg>
);

export default function InvoiceTable() {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const handleSort = (col) => {
    setSortConfig((prev) =>
      prev.key === col
        ? { key: col, direction: prev.direction === "asc" ? "desc" : "asc" }
        : { key: col, direction: "asc" },
    );
  };

  return (
    <div className="py-6 font-sans">
      {/* Desktop Table */}
      <div className="hidden md:block overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-900 text-white">
              {columns.map((col) => (
                <th
                  key={col}
                  onClick={() => handleSort(col)}
                  className="px-5 py-4 text-left font-semibold cursor-pointer select-none whitespace-nowrap hover:bg-gray-700 transition-colors"
                >
                  {col === "Total" ? (
                    <span className="block text-right">
                      {col} <SortIcon />
                    </span>
                  ) : (
                    <span>
                      {col} <SortIcon />
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {initialData.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-5 py-4 text-gray-800">{row.item}</td>
                <td className="px-5 py-4 text-gray-700">{row.rate}</td>
                <td className="px-5 py-4 text-gray-700">{row.quantity}</td>
                <td className="px-5 py-4 text-gray-700">{row.discount}</td>
                <td className="px-5 py-4 text-gray-700">{row.tax}</td>
                <td className="px-5 py-4 text-gray-800 font-medium flex items-end justify-end">
                  {row.total}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Footer */}
        <div className="bg-white border-t border-gray-200">
          {/* Subtotal */}
          <div className="flex justify-between items-center px-5 py-4 border-b border-gray-100">
            <span className="text-gray-800 font-semibold">Subtotal</span>
            <span className="text-gray-800 font-semibold">$7,592.40</span>
          </div>
          {/* Paid Amount */}
          <div className="flex justify-between items-center px-5 py-4 border-b border-gray-100">
            <span className="text-gray-800 font-semibold">Paid Amount</span>
            <span className="text-gray-800 font-semibold">$0.00</span>
          </div>
          {/* Balance Due */}
          <div className="flex justify-between items-center px-5 py-4 bg-gray-100">
            <span className="text-gray-900 font-bold text-base">
              Balance Due
            </span>
            <span className="text-gray-900 font-bold text-base">$7,592.40</span>
          </div>
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {initialData.map((row) => (
          <div
            key={row.id}
            className="rounded-xl border border-gray-200 shadow-sm overflow-hidden"
          >
            <div className="bg-gray-900 text-white px-4 py-3 font-semibold text-sm">
              {row.item}
            </div>
            <div className="bg-white divide-y divide-gray-100 text-sm">
              {[
                ["Rate", row.rate],
                ["Quantity", row.quantity],
                ["Discount", row.discount],
                ["Tax", row.tax],
                ["Total", row.total],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between px-4 py-3">
                  <span className="text-gray-500 font-medium">{label}</span>
                  <span className="text-gray-800 font-semibold">{value}</span>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Mobile Footer */}
        <div className="rounded-xl border border-gray-200 shadow-sm overflow-hidden text-sm">
          <div className="flex justify-between px-4 py-3 border-b border-gray-100 bg-white">
            <span className="text-gray-800 font-semibold">Subtotal</span>
            <span className="text-gray-800 font-semibold">$7,592.40</span>
          </div>
          <div className="flex justify-between px-4 py-3 border-b border-gray-100 bg-white">
            <span className="text-gray-800 font-semibold">Paid Amount</span>
            <span className="text-gray-800 font-semibold">$0.00</span>
          </div>
          <div className="flex justify-between px-4 py-3 bg-gray-100 rounded-b-xl">
            <span className="text-gray-900 font-bold">Balance Due</span>
            <span className="text-gray-900 font-bold">$7,592.40</span>
          </div>
        </div>
      </div>
    </div>
  );
}

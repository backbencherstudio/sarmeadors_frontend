"use client";

interface StatCard {
  label: string;
  value: string;
}

interface PaymentSummaryProps {
  compensation?: string;
  totalWorkedHour?: number | string;
  totalPayableAmount?: number | string;
  totalPayment?: number | string;
  duePayment?: number | string;
}

function StatCard({ label, value }: StatCard) {
  return (
    <div className="flex-1 border border-gray-200 rounded-lg p-4 bg-[#F9FAFB] shadow-md">
      <p className="text-lg text-[#778593] mb-5">{label}</p>
      <p className="text-2xl font-bold text-[#111927]">{value}</p>
    </div>
  );
}

export default function PaymentSummary({
  compensation = "$35/hr",
  totalWorkedHour = 100,
  totalPayableAmount = 35000,
  totalPayment = 25000,
  duePayment = 10000,
}: PaymentSummaryProps) {
  const formatCurrency = (val: number | string) => {
    const num =
      typeof val === "string" ? parseFloat(val.replace(/[^0-9.]/g, "")) : val;
    return isNaN(num) ? String(val) : `$${num.toLocaleString()}`;
  };

  const cards: StatCard[] = [
    { label: "Compensation", value: String(compensation) },
    { label: "Total Worked Hour", value: `${totalWorkedHour} hr` },
    {
      label: "Total Payable Amount",
      value: formatCurrency(totalPayableAmount),
    },
    { label: "Total Payment", value: formatCurrency(totalPayment) },
    { label: "Due Payment", value: formatCurrency(duePayment) },
  ];

  return (
    <div
      className="flex gap-3"
      style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
    >
      {cards.map((card) => (
        <StatCard key={card.label} label={card.label} value={card.value} />
      ))}
    </div>
  );
}

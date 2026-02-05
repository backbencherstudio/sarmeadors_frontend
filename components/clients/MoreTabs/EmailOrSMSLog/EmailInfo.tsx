import MessageCard from "./MessageCard";

const logs = [
  {
    id: 1,
    status: "Delivered",
    statusClass: "bg-blue-500 text-white",
    dateLabel: "Sat Dec 06 2025 03:24:07 GMT+0600 (Bangladesh Standard Time)",
    to: "ddellapo@gmail.com",
    from: "sarah@nanniescoasttocoast.com",
    subject: "Welcome to Coast to Coast Nannies",
  },
  {
    id: 2,
    status: "Opened",
    statusClass: "bg-green-500 text-white",
    dateLabel: "Sat Dec 06 2025 03:24:07 GMT+0600 (Bangladesh Standard Time)",
    to: "ddellapo@gmail.com",
    from: "sarah@nanniescoasttocoast.com",
    subject: "Welcome to Coast to Coast Nannies",
  },
  {
    id: 3,
    status: "Clicked",
    statusClass: "bg-gray-300 text-gray-800",
    dateLabel: "Sat Dec 06 2025 03:24:07 GMT+0600 (Bangladesh Standard Time)",
    to: "ddellapo@gmail.com",
    from: "sarah@nanniescoasttocoast.com",
    subject: "Welcome to Coast to Coast Nannies",
  },
];

export default function EmailInfo() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {logs.map((l) => (
        <MessageCard key={l.id} value={l} />
      ))}
    </div>
  );
}

import ClientInterviewTopbar from "@/components/client/ClientInterview/ClientInterviewTopbar";

export default function ClientInterviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="p-6">
      <ClientInterviewTopbar />
      {children}
    </div>
  );
}

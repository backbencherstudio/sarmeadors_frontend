import DocumentList from "@/components/clients/AdminTabs/Documents/DocumentList";

export default function DocumentsPage() {
  return (
    <div className="w-full space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row gap-4 md:items-end justify-between items-start">
        <div className="space-y-4 w-full">
          <h1 className="text-2xl font-bold text-gray-900">Agreements</h1>
        </div>
      </div>

      {/* Cards */}
      <DocumentList />
    </div>
  );
}

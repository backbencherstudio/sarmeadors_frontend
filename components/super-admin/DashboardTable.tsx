"use client";
import { useState } from "react";
import DynamicTableTwo from "../common/DynamicTableTwo";
import TableColAscDsc from "../dashboard/TableColAscDsc";

const statusConfig: Record<string, { label: string; className: string }> = {
  Active: {
    label: "Active",
    className: "text-[#217D43] bg-[#E8FAEF]",
  },
  Suspended: {
    label: "Suspended",
    className: "text-[#CB121D] bg-[#FEF1F1]",
  },
  Inactive: {
    label: "Inactive",
    className: "text-[#4F5865] bg-[#F3F4F6]",
  },
};

function AgencyAvatar({ name }: { name: string }) {
  const initial = name?.charAt(0).toUpperCase() ?? "?";
  return (
    <div className="w-8 h-8 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-xs font-medium text-gray-600 shrink-0">
      {initial}
    </div>
  );
}

type RecentAgency = {
  id: number;
  name: string;
  email: string;
  status: string;
  created_at: string;
};

type DashboardTableProps = {
  recent_agencies?: RecentAgency[];
  loading?: boolean;
};

export default function DashboardTable({
  recent_agencies = [],
  loading = false,
}: DashboardTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [tooltipRow, setTooltipRow] = useState<string | null>(null);

  const [visibleColumns] = useState({
    agency_name: true,
    status: true,
    client: true,
    candidate: true,
    joined: true,
  });

  // Map API data to table rows
  const tableData = (recent_agencies || []).map((agency) => ({
    id: String(agency.id),
    agency_name: agency.name,
    domain: agency.email,
    status:
      agency.status === "active"
        ? "Active"
        : agency.status === "suspended"
          ? "Suspended"
          : "Inactive",
    client: "-",
    candidate: "-",
    joined: agency.created_at
      ? new Date(agency.created_at).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : "-",
  }));

  const toggleSelectAll = () => {
    if (selectedRows.length === tableData.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(tableData.map((row) => row.id));
    }
  };

  const toggleRowSelection = (rowId: string) => {
    setSelectedRows((prev) =>
      prev.includes(rowId)
        ? prev.filter((id) => id !== rowId)
        : [...prev, rowId],
    );
  };

  const handleColShort = () => {
    console.log("Column sorting clicked");
  };

  const columns = [
    {
      label: (
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={
              selectedRows.length === tableData.length && tableData.length > 0
            }
            onChange={toggleSelectAll}
            className="w-4 h-4 cursor-pointer rounded border-gray-300"
          />
          <span>Agency Name</span>
          <TableColAscDsc onClick={handleColShort} />
        </div>
      ),
      accessor: "agency_name",
      width: "280px",
      formatter: (value: string, record: any) => (
        <div className="flex items-center gap-3">
          <AgencyAvatar name={value} />
          <div className="min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {value}
            </p>
            <p className="text-xs text-gray-400 truncate">{record.domain}</p>
          </div>
        </div>
      ),
    },
    {
      label: (
        <div className="flex items-center gap-1">
          <span>Status</span>
          <TableColAscDsc onClick={handleColShort} />
        </div>
      ),
      accessor: "status",
      width: "160px",
      formatter: (value: string, record: any) => {
        const config = statusConfig[value] ?? statusConfig.Inactive;

        return (
          <div className="relative inline-block group">
            {record.revenue && (
              <div
                className="absolute -top-9 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-sm font-medium px-3 py-1.5 whitespace-nowrap z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                style={{ pointerEvents: "none" }}
              >
                {record.revenue}
                <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-900" />
              </div>
            )}

            <span
              className={`inline-flex items-center px-3 py-1.5 text-sm rounded-md font-medium ${config.className}`}
            >
              {config.label}
            </span>
          </div>
        );
      },
    },
    {
      label: (
        <div className="flex items-center gap-1">
          <span>Clients</span>
          <TableColAscDsc onClick={handleColShort} />
        </div>
      ),
      accessor: "client",
      width: "150px",
      formatter: (value: number) => (
        <span className="text-sm text-gray-700">{value?.toLocaleString()}</span>
      ),
    },
    {
      label: (
        <div className="flex items-center gap-1">
          <span>Candidates</span>
          <TableColAscDsc onClick={handleColShort} />
        </div>
      ),
      accessor: "candidate",
      width: "150px",
      formatter: (value: number) => (
        <span className="text-sm text-gray-700">{value?.toLocaleString()}</span>
      ),
    },
    {
      label: (
        <div className="flex items-center gap-1">
          <span>Joined</span>
          <TableColAscDsc onClick={handleColShort} />
        </div>
      ),
      accessor: "joined",
      width: "170px",
      formatter: (value: string) => (
        <span className="text-sm text-gray-700">{value}</span>
      ),
    },
  ];

  const visibleColumnsArray = columns.filter(
    (col) => visibleColumns[col.accessor as keyof typeof visibleColumns],
  );

  const totalPages = Math.max(1, Math.ceil(tableData.length / itemsPerPage));

  return (
    <div>
      <DynamicTableTwo
        columns={visibleColumnsArray}
        data={tableData || []}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        onPageChange={(page) => setCurrentPage(page)}
        onItemsPerPageChange={(newItemsPerPage) => {
          setItemsPerPage(newItemsPerPage);
          setCurrentPage(1);
        }}
        loading={loading}
        totalItems={tableData.length}
        totalpage={totalPages}
      />
    </div>
  );
}

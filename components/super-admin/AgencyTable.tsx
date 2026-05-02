"use client";
import { AgencyDashboardData, SuperAdminDashboardData } from "@/demoData/DashboardData";
import { useState } from "react";
import DynamicTableTwo from "../common/DynamicTableTwo";
import TableColAscDsc from "../dashboard/TableColAscDsc";
import { MoreVertical, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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

const tabs = [
  { label: "All",       key: "All",       count: 3000 },
  { label: "Active",    key: "Active",    count: 189  },
  { label: "Suspended", key: "Suspended", count: 18   },
  { label: "Inactive",  key: "Inactive",  count: 2900 },
];

function AgencyAvatar({ name }: { name: string }) {
  const initial = name?.charAt(0).toUpperCase() ?? "?";
  return (
    <div className="w-8 h-8 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-xs font-medium text-gray-600 flex-shrink-0">
      {initial}
    </div>
  );
}

export default function AgencyTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState(AgencyDashboardData);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");

  const [visibleColumns] = useState({
    agency_name: true,
    contact: true,
    status: true,
    client: true,
    candidate: true,
    joined: true,
    action: true,
  });

  const filteredData = data.filter((row) => {
    const matchesTab = activeTab === "All" || row.status === activeTab;
    const matchesSearch =
      search === "" ||
      row.agency_name.toLowerCase().includes(search.toLowerCase()) ||
      row.email.toLowerCase().includes(search.toLowerCase()) ||
      row.phone.includes(search);
    return matchesTab && matchesSearch;
  });

  const toggleSelectAll = () => {
    if (selectedRows.length === filteredData.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(filteredData.map((row) => row.id));
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
              selectedRows.length === filteredData.length &&
              filteredData.length > 0
            }
            onChange={toggleSelectAll}
            className="w-4 h-4 cursor-pointer rounded border-gray-300"
          />
          <span>Agency Name</span>
          <TableColAscDsc onClick={handleColShort} />
        </div>
      ),
      accessor: "agency_name",
      width: "260px",
      formatter: (value: string, record: any) => (
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={selectedRows.includes(record.id)}
            onChange={() => toggleRowSelection(record.id)}
            className="w-4 h-4 cursor-pointer rounded border-gray-300 flex-shrink-0"
          />
          <AgencyAvatar name={value} />
          <div className="min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">{value}</p>
            <p className="text-xs text-gray-400 truncate">{record.domain}</p>
          </div>
        </div>
      ),
    },
    {
      label: (
        <div className="flex items-center gap-1">
          <span>Contact</span>
          <TableColAscDsc onClick={handleColShort} />
        </div>
      ),
      accessor: "contact",
      width: "220px",
      formatter: (_: any, record: any) => (
        <div>
          <p className="text-sm text-gray-700">{record.email}</p>
          <p className="text-xs text-gray-400">{record.phone}</p>
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
      width: "140px",
      formatter: (value: string, record: any) => {
        const config = statusConfig[value] ?? statusConfig.Inactive;
        return (
          <div className="relative inline-block group">
            {record.revenue && (
              <div
                className="absolute -top-9 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-sm font-medium px-3 py-1.5 rounded-md whitespace-nowrap z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
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
      width: "120px",
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
      width: "130px",
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
      width: "160px",
      formatter: (value: string) => (
        <span className="text-sm text-gray-700">{value}</span>
      ),
    },
    {
      label: (
        <div className="flex items-center gap-1">
          <span>Action</span>
          <TableColAscDsc onClick={handleColShort} />
        </div>
      ),
      accessor: "action",
      width: "80px",
      formatter: (_: any, record: any) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="p-1.5 rounded-md hover:bg-gray-100 transition-colors">
              <MoreVertical className="w-4 h-4 text-gray-500" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuItem onClick={() => console.log("View", record.id)}>
              View
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => console.log("Edit", record.id)}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-red-600"
              onClick={() => console.log("Delete", record.id)}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  const visibleColumnsArray = columns.filter(
    (col) => visibleColumns[col.accessor as keyof typeof visibleColumns],
  );

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-4">
        {/* Tabs */}
        <div className="flex items-center gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab.key
                  ? "bg-gray-900 text-white"
                  : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}
            >
              {tab.label} ({tab.count.toLocaleString()})
            </button>
          ))}
        </div>

        {/* Search + Add */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by Name, Email or Phone Number"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg w-72 focus:outline-none focus:ring-2 focus:ring-gray-300"
            />
          </div>
          <Button className="bg-gray-900 hover:bg-gray-800 text-white gap-1.5">
            <Plus className="w-4 h-4" />
            Add Agency
          </Button>
        </div>
      </div>

      {/* Table */}
      <DynamicTableTwo
        columns={visibleColumnsArray}
        data={filteredData}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        onPageChange={(page) => setCurrentPage(page)}
        onItemsPerPageChange={(newItemsPerPage) => {
          setItemsPerPage(newItemsPerPage);
          setCurrentPage(1);
        }}
        loading={false}
        totalItems={filteredData.length}
        totalpage={Math.ceil(filteredData.length / itemsPerPage)}
      />
    </div>
  );
}
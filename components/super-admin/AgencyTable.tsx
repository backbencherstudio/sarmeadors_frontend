"use client";
import { Plus, Search, Eye, MoreHorizontal } from "lucide-react";
import { useState, useEffect } from "react";
import DynamicTableTwo from "../common/DynamicTableTwo";
import TableColAscDsc from "../dashboard/TableColAscDsc";
import LinkReuseable from "../reusable/CustomLink";
import {
  useDeleteAgencyMutation,
  useGetAllAgenciesQuery,
  useSuspendsAgencyMutation,
} from "@/feature/dashboard/super-admin/agency";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import Link from "next/link";

const tabs = [
  { label: "All", key: "" },
  { label: "Active", key: "active" },
  { label: "Suspended", key: "suspended" },
];

function AgencyAvatar({ name }: { name: string }) {
  const initial = name?.charAt(0).toUpperCase() ?? "?";
  return (
    <div className="w-8 h-8 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-xs font-medium text-gray-600 shrink-0">
      {initial}
    </div>
  );
}

const statusConfig: Record<string, { label: string; className: string }> = {
  active: {
    label: "Active",
    className: "text-[#217D43] bg-[#E8FAEF]",
  },
  suspended: {
    label: "Suspended",
    className: "text-[#CB121D] bg-[#FEF1F1]",
  },
  inactive: {
    label: "Inactive",
    className: "text-[#4F5865] bg-[#F3F4F6]",
  },
};

function formatDate(dateStr: string): string {
  if (!dateStr) return "-";
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function AgencyTable() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [activeTab, setActiveTab] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [deleteAgency] = useDeleteAgencyMutation();
  const [suspendsAgency] = useSuspendsAgencyMutation();

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setCurrentPage(1);
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  const {
    data: agenciesData,
    isLoading,
    refetch,
  } = useGetAllAgenciesQuery({
    search: debouncedSearch || undefined,
    status: activeTab || undefined,
    page: currentPage,
    per_page: itemsPerPage,
  });

  const agencies = agenciesData?.data ?? [];
  const pagination = agenciesData?.pagination ?? {
    current_page: 1,
    per_page: 10,
    total: 0,
    last_page: 1,
  };

  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const toggleSelectAll = () => {
    if (selectedRows.length === agencies.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(agencies.map((row: any) => String(row.id)));
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

  const handleView = (row: any) => {
    console.log("View agency:", row.id);
  };

  const handleSuspendToggle = async (row: any) => {
    try {
      const result = await suspendsAgency(row.id).unwrap();
      if (result.status) {
        toast.success(result.message);
        refetch();
      }
    } catch (error) {
      console.error("Failed to toggle suspend:", error);
    }
  };

  const handleDelete = async (row: any) => {
    try {
      const result = await deleteAgency(row.id).unwrap();
      if (result.status) {
        toast.success(result.message);
        refetch();
      }
    } catch (error) {
      console.error("Failed to delete agency:", error);
    }
  };

  const columns = [
    {
      label: (
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={
              selectedRows.length === agencies.length && agencies.length > 0
            }
            onChange={toggleSelectAll}
            className="w-4 h-4 cursor-pointer rounded border-gray-300"
          />
          <span>Agency Name</span>
          <TableColAscDsc onClick={handleColShort} />
        </div>
      ),
      accessor: "name",
      width: "260px",
      formatter: (value: string, record: any) => (
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={selectedRows.includes(String(record.id))}
            onChange={() => toggleRowSelection(String(record.id))}
            className="w-4 h-4 cursor-pointer rounded border-gray-300 shrink-0"
          />
          <AgencyAvatar name={value} />
          <div className="min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {value}
            </p>
            <p className="text-xs text-gray-400 truncate">{record.subdomain}</p>
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
      accessor: "email",
      width: "220px",
      formatter: (_: any, record: any) => (
        <div>
          <p className="text-sm text-gray-700">{record.email}</p>
          <p className="text-xs text-gray-400">{record.mobile}</p>
        </div>
      ),
    },
    {
      label: (
        <div className="flex items-center gap-1">
          <span>Clients</span>
          <TableColAscDsc onClick={handleColShort} />
        </div>
      ),
      accessor: "total_clients",
      width: "120px",
      formatter: (value: number) => (
        <span className="text-sm text-gray-700">
          {value?.toLocaleString() ?? 0}
        </span>
      ),
    },
    {
      label: (
        <div className="flex items-center gap-1">
          <span>Candidates</span>
          <TableColAscDsc onClick={handleColShort} />
        </div>
      ),
      accessor: "total_candidates",
      width: "130px",
      formatter: (value: number) => (
        <span className="text-sm text-gray-700">
          {value?.toLocaleString() ?? 0}
        </span>
      ),
    },
    {
      label: (
        <div className="flex items-center gap-1">
          <span>Joined</span>
          <TableColAscDsc onClick={handleColShort} />
        </div>
      ),
      accessor: "created_at",
      width: "160px",
      formatter: (value: string) => (
        <span className="text-sm text-gray-700">{formatDate(value)}</span>
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
      width: "130px",
      formatter: (value: string) => {
        const config =
          statusConfig[value?.toLowerCase()] ?? statusConfig.inactive;
        return (
          <span
            className={`inline-flex items-center px-3 py-1.5 text-sm rounded-md font-medium ${config.className}`}
          >
            {config.label}
          </span>
        );
      },
    },
    {
      label: (
        <div className="flex items-center gap-1">
          <span>Action</span>
        </div>
      ),
      accessor: "id",
      width: "100px",
      formatter: (_: any, record: any) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="p-1.5 rounded-md hover:bg-gray-100 transition-colors">
              <MoreHorizontal className="w-4 h-4 text-gray-500" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="min-w-40">
            <Link href={`/super-admin/agencies/${record.id}`}>
              <DropdownMenuItem
                onClick={() => handleView(record)}
                className="cursor-pointer text-sm"
              >
                Edit
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem
              onClick={() => handleSuspendToggle(record)}
              className="cursor-pointer text-sm"
            >
              {record.status?.toLowerCase() === "suspended"
                ? "Activate Agency"
                : "Suspend Agency"}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleDelete(record)}
              className="cursor-pointer text-sm hover:text-red-500! hover:bg-red-100!"
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-4">
        {/* Tabs */}
        <div className="flex items-center gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => {
                setActiveTab(tab.key);
                setCurrentPage(1);
              }}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab.key
                  ? "bg-gray-900 text-white"
                  : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}
            >
              {tab.label}
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
              className="pl-9 pr-4 py-3 text-sm border border-gray-200 rounded-lg w-72 focus:outline-none focus:ring-2 focus:ring-gray-300"
            />
          </div>
          <LinkReuseable
            href="/super-admin/add-agency"
            title="Add Agency"
            icon={<Plus />}
            className="text-white px-4 py-3 bg-[#111927] rounded-md"
          />
        </div>
      </div>

      {/* Table */}
      <DynamicTableTwo
        columns={columns}
        data={agencies}
        currentPage={pagination.current_page}
        itemsPerPage={itemsPerPage}
        onPageChange={(page) => setCurrentPage(page)}
        onItemsPerPageChange={(newItemsPerPage) => {
          setItemsPerPage(newItemsPerPage);
          setCurrentPage(1);
        }}
        loading={isLoading}
        totalItems={pagination.total}
        totalpage={pagination.last_page}
      />
    </div>
  );
}

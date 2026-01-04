"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { demoData } from "@/demoData/DashboardData";
import { useToken } from "@/hooks/useToken";
import { useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FiPlus, FiSearch } from "react-icons/fi";
import { GrEdit } from "react-icons/gr";
import DynamicTableTwo from "../common/DynamicTableTwo";
import ButtonReuseable from "../reusable/CustomButton";
function DashboardUserTable({ recentOrder }: any) {
  const [recentOrders, setRecentOrders] = useState<any>(recentOrder);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedEditRecord, setSelectedEditRecord] = useState<any>(null);
  const [isEdite, setIsEdite] = useState(false);
  const [loadingStatusId, setLoadingStatusId] = useState<string | null>(null);
  const { token } = useToken();
  const router = useRouter();
  const queryClient = useQueryClient();

  // Debounce search term
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchTerm, selectedType, selectedStatus]);

  // Build query parameters
  const buildQueryParams = () => {
    const params = new URLSearchParams();
    if (debouncedSearchTerm.trim()) {
      params.append("search", debouncedSearchTerm.trim());
    }
    if (selectedType !== "all") {
      params.append("type", selectedType);
    }
    if (selectedStatus !== "all") {
      params.append("status", selectedStatus);
    }
    params.append("page", currentPage.toString());
    params.append("limit", itemsPerPage.toString());

    return params.toString();
  };

  const columns = [
    {
      label: "Name",
      accessor: "full_name",
      width: "200px",
      formatter: (value: string, record: any) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
            <span className="text-xs font-medium text-gray-600">
              {record?.image_name ? (
                <Image
                  src={`/empty-user.png`}
                  alt="Uploaded Preview"
                  width={100}
                  height={100}
                  className=" w-8 h-8 rounded-full object-cover"
                />
              ) : (
                value
                  ?.split(" ")
                  ?.map((n) => n[0])
                  ?.join("")
              )}
            </span>
          </div>
          <span className="text-sm font-medium">{value}</span>
        </div>
      ),
    },
    {
      label: "Type",
      accessor: "enquiry_type",
      width: "100px",
      formatter: (value: string) => <span className="text-sm">{value}</span>,
    },
    {
      label: "Contact",
      accessor: "mobile_number",
      width: "150px",
      formatter: (value: string) => <span className="text-sm">{value}</span>,
    },
    {
      label: "Date",
      accessor: "createdAt",
      width: "120px",
      formatter: (value: string) => (
        <span className="text-sm">{dayjs(value).format("DD/MM/YYYY")}</span>
      ),
    },
    {
      label: "Time",
      accessor: "time",
      width: "100px",
      formatter: (value: string) => (
        <span className="text-sm">{dayjs(value).format("hh:mm A")}</span>
      ),
    },
    {
      label: "Source",
      accessor: "additional_information",
      width: "120px",
      formatter: (value: string) => <span className="text-sm">{value}</span>,
    },
    {
      label: "Status",
      accessor: "status",
      width: "140px",
      formatter: (value: string, record: any) => (
        <div className="change-arrow">
          <Select
            value={value || "uncontacted"}
            disabled={loadingStatusId === record?._id}
          >
            <SelectTrigger
              className={`w-full cursor-pointer change-arrow h-10 text-xs justify-center! focus-visible:ring-ring/50 focus-visible:ring-0 font-semibold rounded-md border-0 ${
                value === "contacted"
                  ? "bg-greenColor/15 text-greenColor"
                  : value === "pending"
                  ? "bg-yellow-500/15 text-yellow-500"
                  : "bg-redColor/15 text-redColor"
              }`}
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="">
              <SelectItem
                className={"bg-redColor/15 text-redColor cursor-pointer mb-1!"}
                value="uncontacted"
              >
                Uncontacted
              </SelectItem>
              <SelectItem
                className={
                  "bg-greenColor/15 text-greenColor cursor-pointer mb-1!"
                }
                value="contacted"
              >
                Contacted
              </SelectItem>
              <SelectItem
                className={"bg-yellow-500/15 text-yellow-500 cursor-pointer"}
                value="pending"
              >
                Pending
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      ),
    },
    {
      label: "Action",
      accessor: "action",
      width: "80px",
      formatter: (type: any, record: any) => {
        return (
          <button
            onClick={() => handleEdit(record)}
            className="w-8 h-8 cursor-pointer bg-primaryColor text-white rounded-md flex items-center justify-center  transition-colors"
          >
            <GrEdit size={17} />
          </button>
        );
      },
    },
  ];

  const handleEdit = (record: any) => {
    setIsEdite(true);
    setSelectedEditRecord(record);
  };
  return (
    <section>
      <div className="bg-white shadow p-5 rounded-md">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-2xl font-bold text-gray-800">All Enquiries</h4>
            <Link href="/dashboard/add-enquiry">
              <ButtonReuseable
                title="Add Enquiry"
                icon={<FiPlus className="w-4 h-4" />}
              />
            </Link>
          </div>

          <div className=" md:flex items-center gap-4">
            <div className="flex-1 relative">
              <div className="absolute top-1/2 -translate-y-1/2 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search enquiry"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>

            {/* Filter Dropdowns */}
            <div className="grid grid-cols-2 md:grid-cols-3 items-center gap-3  mt-4 md:mt-0">
              {/* Type Filter */}
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-[140px] h-12! bg-white border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:ring-2 focus:ring-teal-500 focus:border-transparent">
                  <SelectValue placeholder="All Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Type</SelectItem>
                  <SelectItem value="maid">Maid</SelectItem>
                  <SelectItem value="employer">Employer</SelectItem>
                </SelectContent>
              </Select>

              {/* Status Filter */}
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-[140px] h-12! bg-white border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:ring-2 focus:ring-teal-500 focus:border-transparent">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="contacted">Contacted</SelectItem>
                  <SelectItem value="uncontacted">Uncontacted</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>

              {/* Export Button */}
            </div>
          </div>
        </div>
        <DynamicTableTwo
          columns={columns}
          data={demoData || []}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          onPageChange={(page) => setCurrentPage(page)}
          onItemsPerPageChange={(newItemsPerPage) => {
            setItemsPerPage(newItemsPerPage);
            setCurrentPage(1); // Reset to page 1 when items per page changes
          }}
          loading={false}
          totalItems={10}
          totalpage={2}
        />
      </div>
    </section>
  );
}

export default DashboardUserTable;

"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { demoData, statuse } from "@/demoData/DashboardData";
import { useToken } from "@/hooks/useToken";
import { useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BiEditAlt } from "react-icons/bi";
import { FaPlus } from "react-icons/fa6";
import { FiPlus, FiSearch } from "react-icons/fi";
import { HiOutlineFilter } from "react-icons/hi";
import { IoIosArrowDown, IoMdArrowDropdown } from "react-icons/io";
import { LuCalendarRange } from "react-icons/lu";
import DynamicTableTwo from "../common/DynamicTableTwo";
import Search from "../common/Search";
import ClientDashboardFilter from "../filter/ClientDashboardFilter";
import ButtonReuseable from "../reusable/CustomButton";

function DashboardUserTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [statuseSearchTerm, setStatuseSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedEditRecord, setSelectedEditRecord] = useState<any>(null);
  const [isEdite, setIsEdite] = useState(false);
  const [loadingStatusId, setLoadingStatusId] = useState<string | null>(null);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [filteredData, setFilteredData] = useState(false);
  // Column visibility state
  const [visibleColumns, setVisibleColumns] = useState({
    full_name: true,
    email_address: true,
    mobile_number: true,
    createdAt: true,
    status: true,
    action: true,
  });

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

  // Debounce status search term
  useEffect(() => {
    const handler = setTimeout(() => {
      // Handle status search filtering if needed
    }, 300);
    return () => clearTimeout(handler);
  }, [statuseSearchTerm]);

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

  // Toggle column visibility
  const toggleColumnVisibility = (columnAccessor: string) => {
    setVisibleColumns((prev) => ({
      ...prev,
      [columnAccessor]: !prev[columnAccessor],
    }));
  };

  // Select all rows
  const toggleSelectAll = () => {
    if (selectedRows.length === demoData.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(demoData.map((row) => row.id));
    }
  };

  // Toggle individual row selection
  const toggleRowSelection = (rowId: string) => {
    setSelectedRows((prev) =>
      prev.includes(rowId)
        ? prev.filter((id) => id !== rowId)
        : [...prev, rowId]
    );
  };

  const filteredStatus = statuse.filter(
    (s) =>
      s.value.toLowerCase().includes(statuseSearchTerm.toLowerCase()) ||
      s.value === statuseSearchTerm
  );

  const columns = [
    {
      label: (
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={
              selectedRows.length === demoData.length && demoData.length > 0
            }
            onChange={toggleSelectAll}
            className="w-4 h-4 cursor-pointer rounded border-gray-300"
          />
          <span>Name</span>
          <button className="flex flex-col cursor-pointer">
            <IoMdArrowDropdown className=" rotate-180" />
            <IoMdArrowDropdown />
          </button>
        </div>
      ),
      accessor: "full_name",
      width: "250px",
      formatter: (value: string, record: any) => (
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={selectedRows.includes(record.id)}
            onChange={() => toggleRowSelection(record.id)}
            className="w-4 h-4 cursor-pointer rounded border-gray-300"
          />
          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
            <span className="text-xs font-medium text-gray-600">
              {record?.image_name ? (
                <Image
                  src={record?.image_name || `/empty-user.png`}
                  alt="Uploaded Preview"
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                value
                  ?.split(" ")
                  ?.map((n) => n[0])
                  ?.join("")
              )}
            </span>
          </div>
          <span className="text-sm font-medium text-blackColor">{value}</span>
        </div>
      ),
    },
    {
      label: "Email Address",
      accessor: "email_address",
      width: "250px",
      formatter: (value: string) => (
        <span className="text-sm text-blackColor">{value}</span>
      ),
    },
    {
      label: "Phone Number",
      accessor: "mobile_number",
      width: "150px",
      formatter: (value: string) => (
        <span className="text-sm text-blackColor">{value}</span>
      ),
    },
    {
      label: "Registration Date",
      accessor: "createdAt",
      width: "180px",
      formatter: (value: string) => (
        <div className="flex items-center gap-2 text-sm text-blackColor">
          <LuCalendarRange size={16} className="text-gray3Color" />
          {dayjs(value).format("M/D/YY")}
        </div>
      ),
    },
    {
      label: "Status",
      accessor: "status",
      width: "150px",
      formatter: (value: string, record: any) => (
        <div className="change-arrow">
          <Select
            value={value || "Pre Application"}
            disabled={loadingStatusId === record?._id}
          >
            <SelectTrigger className="flex items-center gap-1.5 p-1 !h-9 w-full justify-between">
              <div
                className={`px-2 cursor-pointer flex items-center  py-2.5!  h-full w-full text-xs justify-center focus-visible:ring-0 font-medium rounded-md border-0 ${
                  value === "Applied"
                    ? "bg-purple-500/15 text-purple-600"
                    : value === "Pre Application"
                    ? "bg-green-500/15 text-green-600"
                    : value === "Inactive"
                    ? "bg-red-500/15 text-red-600"
                    : value === "Pending"
                    ? "bg-orange-500/15 text-orange-600"
                    : "bg-gray-500/15 text-gray-600"
                }`}
              >
                <SelectValue />
              </div>
              <div>
                <IoIosArrowDown />
              </div>
            </SelectTrigger>
            <SelectContent className="p-2 ">
              <div className="pb-2">
                <div
                  className="w-full relative"
                  onMouseDown={(e) => e.preventDefault()}
                >
                  <input
                    type="text"
                    name="search"
                    autoComplete="off"
                    autoFocus
                    value={statuseSearchTerm}
                    onChange={(e) => setStatuseSearchTerm(e.target.value)}
                    onKeyDown={(e) => {
                      e.stopPropagation();
                    }}
                    onMouseDown={(e) => e.stopPropagation()}
                    className="w-full text-sm bg-whiteColor border border-borderColor rounded-sm py-2 px-3 pl-8 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    placeholder="Search tags"
                  />
                  <FiSearch
                    className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                    size={16}
                  />
                </div>
              </div>
              <div>
                {filteredStatus.length > 0 ? (
                  filteredStatus.map((status) => (
                    <SelectItem
                      key={status.value}
                      className={`${status.color} cursor-pointer mb-1.5`}
                      value={status.value}
                    >
                      {status.value}
                    </SelectItem>
                  ))
                ) : (
                  <div className="text-center text-sm text-gray-500">
                    No status found
                  </div>
                )}
              </div>
              <div className=" flex justify-end gap-1.5 pt-4 px-2 border-t mt-2">
                <ButtonReuseable
                  icon={<BiEditAlt className="text-black" />}
                  className="px-1.5! py-1.5! bg-gray2Color rounded-sm! border!"
                />
                <ButtonReuseable
                  icon={<FaPlus />}
                  className="px-1.5! py-1.5! rounded-sm!"
                />
              </div>
            </SelectContent>
          </Select>
        </div>
      ),
    },
    {
      label: "Action",
      accessor: "action",
      width: "100px",
      formatter: (type: any, record: any) => {
        return (
          <button
            onClick={() => handleEdit(record)}
            className="px-4 py-2 cursor-pointer bg-white text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors text-sm font-medium"
          >
            View
          </button>
        );
      },
    },
  ];

  // Filter columns based on visibility
  const visibleColumnsArray = columns.filter(
    (col) => visibleColumns[col.accessor as keyof typeof visibleColumns]
  );

  const handleEdit = (record: any) => {
    setIsEdite(true);
    setSelectedEditRecord(record);
  };
  const handleFilter = () => {
    setFilteredData((prev) => !prev);
  };
  return (
    <section>
      <div className="bg-white shadow md:p-5 p-3 rounded-md">
        <div className="mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center md:justify-between gap-4 w-full mb-4">
            <div>
              <h4 className="text-2xl font-bold text-gray-800">Client List</h4>
              <p className="text-base text-secondaryColor mt-0.5">
                List of all current clients and their details.
              </p>
            </div>
            <div className="flex flex-col md:flex-row w-full md:justify-end  md:items-center gap-3 md:gap-2 h-full">
              <Search />
              <div className="flex items-center  gap-3 md:gap-2  ">
                <div>
                  <ButtonReuseable
                    onClick={handleFilter}
                    title="Filter"
                    className="bg-white !text-blackColor border border-gray2Color"
                    icon={<HiOutlineFilter className="w-4 h-4" />}
                  />
                </div>
                <Link href="/dashboard/add-enquiry">
                  <ButtonReuseable
                    title="Add Enquiry"
                    icon={<FiPlus className="w-4 h-4" />}
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div>{filteredData && <ClientDashboardFilter />}</div>
        <DynamicTableTwo
          columns={visibleColumnsArray}
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

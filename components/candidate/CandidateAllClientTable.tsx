"use client";

import { demoData } from "@/demoData/DashboardData";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import DynamicTableTwo from "../common/DynamicTableTwo";
import FilterHeader from "../common/FilterHeader";
import ButtonReuseable from "../reusable/CustomButton";

type ClientJobType = "Short-term Jobs" | "Long-term Jobs";
type ClientStatus = "running" | "completed" | "canceled";

type ClientRow = {
  id: number;
  name: string;
  email: string;
  phone: string;
  jobType: ClientJobType;
  status: ClientStatus;
};

const clientListData: ClientRow[] = [
  {
    id: 1,
    name: "Leslie Alexander",
    email: "felicia.reid@example.com",
    phone: "+1 484 291 8883",
    jobType: "Short-term Jobs",
    status: "running",
  },
  {
    id: 2,
    name: "Devon Lane",
    email: "bill.sanders@example.com",
    phone: "+1 610 295 2240",
    jobType: "Long-term Jobs",
    status: "completed",
  },
  {
    id: 3,
    name: "Eleanor Pena",
    email: "georgia.young@example.com",
    phone: "+1 484 291 8653",
    jobType: "Long-term Jobs",
    status: "canceled",
  },
  {
    id: 4,
    name: "Kathryn Murphy",
    email: "jessica.hanson@example.com",
    phone: "+1 484 460 8341",
    jobType: "Short-term Jobs",
    status: "running",
  },
  {
    id: 5,
    name: "Robert Fox",
    email: "nathan.roberts@example.com",
    phone: "+1 484 263 4465",
    jobType: "Short-term Jobs",
    status: "completed",
  },
  {
    id: 6,
    name: "Ronald Richards",
    email: "tanya.hill@example.com",
    phone: "+1 484 413 5671",
    jobType: "Short-term Jobs",
    status: "completed",
  },
  {
    id: 7,
    name: "Bessie Cooper",
    email: "henry.lawson@example.com",
    phone: "+1 834 303 8346",
    jobType: "Short-term Jobs",
    status: "completed",
  },
  {
    id: 8,
    name: "Cameron Williamson",
    email: "willie.jennings@example.com",
    phone: "+1 484 263 4669",
    jobType: "Short-term Jobs",
    status: "completed",
  },
  {
    id: 9,
    name: "Wade Warren",
    email: "dolores.chambers@example.com",
    phone: "+1 555 282 8653",
    jobType: "Long-term Jobs",
    status: "canceled",
  },
  {
    id: 10,
    name: "Ralph Edwards",
    email: "nevaeh.simmons@example.com",
    phone: "+1 610 244 8965",
    jobType: "Short-term Jobs",
    status: "completed",
  },
  {
    id: 11,
    name: "Marvin McKinney",
    email: "tim.jennings@example.com",
    phone: "+1 813 403 8154",
    jobType: "Short-term Jobs",
    status: "completed",
  },
];



function CandidateAllClientTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedRows, setSelectedRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const toggleSelectAll = () => {
    if (selectedRows.length === clientListData.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(clientListData.map((row) => row.id));
    }
  };

  const toggleRowSelection = (rowId: string) => {
    setSelectedRows((prev) =>
      prev.includes(rowId)
        ? prev.filter((id) => id !== rowId)
        : [...prev, rowId],
    );
  };
  const getStatusClass = (status: ClientStatus) => {
    if (status === "running") {
      return "border-blue-200 bg-blueColor/15 text-blueColor";
    }
    if (status === "completed") {
      return "border-green-200 bg-greenColor/15 text-greenColor";
    }
    return "border-red-200 bg-redColor/15 text-redColor";
  };

  const getStatusLabel = (status: ClientStatus) => {
    if (status === "running") return "Running Job";
    if (status === "completed") return "Completed";
    return "Canceled";
  };

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
      accessor: "name",
      width: "250px",
      formatter: (value: string, record: any) => (
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={selectedRows.includes(record.id)}
            onChange={() => toggleRowSelection(record.id)}
            className="w-4 h-4 cursor-pointer rounded border-gray-300"
          />
          <Link href={`/candidate/my-clients/${record.id}`} className=" flex items-center justify-center gap-2">
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
          </Link>
        </div>
      ),
    },
    {
      label: "Email Address",
      accessor: "email",
      width: "280px",
    },
    {
      label: "Phone Number",
      accessor: "phone",
      width: "180px",
    },
    {
      label: "Job Type",
      accessor: "jobType",
      width: "180px",
      formatter: (value: ClientJobType) => (
        <div className="flex items-center gap-2">
          <span
            className={`h-2.5 w-2.5 rounded-full ${
              value === "Short-term Jobs" ? "bg-greenColor" : "bg-blueColor"
            }`}
          />
          <span>{value}</span>
        </div>
      ),
    },
    {
      label: "Status",
      accessor: "status",
      width: "200px",
      formatter: (value: ClientStatus) => (
        <div className="p-1.5 rounded-lg border border-borderColor">
          <p
            className={` min-w-[120px]  justify-center rounded  px-2.5 py-1 text-xs font-medium ${getStatusClass(value)}`}
          >
            {getStatusLabel(value)}
          </p>
        </div>
      ),
    },
    {
      label: "Actions",
      accessor: "action",
      width: "150px",
      formatter: (value: ClientStatus) => (
        <ButtonReuseable
          title="View"
          className="bg-bgColor! text-blackColor! font-semibold border border-borderColor"
        />
      ),
    },
  ];

  const handleView = (row: ClientRow) => {
    console.log("View client:", row);
    // TODO: Navigate to client detail page
  };

  return (
    <section className="p-3 sm:p-4 lg:p-6 h-full">
      <div className="">
        <div className="mb-4">
          <FilterHeader
            title="Client List"
            filter={false}
            description="List of all current clients and their details."
          />
        </div>

        <DynamicTableTwo
          columns={columns}
          data={clientListData}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          onPageChange={(page) => setCurrentPage(page)}
          totalpage={5}
          totalItems={5}
          border={true}
          noDataMessage="No clients found."
        />
      </div>
    </section>
  );
}

export default CandidateAllClientTable;

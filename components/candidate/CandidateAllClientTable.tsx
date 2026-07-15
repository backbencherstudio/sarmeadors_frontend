"use client";

import { useGetCandidateMyClientsQuery } from "@/feature/slice/candidate/candidate-dashboard/CandidateMyClientsSlice";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
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

function CandidateAllClientTable() {
  const [selectedRows, setSelectedRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchTerm(inputValue);
    }, 500);
    return () => clearTimeout(timer);
  }, [inputValue]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  useEffect(() => {
    setCurrentPage(1);
  }, [perPage]);

  const {
    data: clientsResponse,
    isLoading,
    isError,
  } = useGetCandidateMyClientsQuery(
    {
      search: searchTerm,
      filter_search: searchTerm,
      per_page: perPage,
      page: currentPage,
    },
    {
      skip: false,
      refetchOnMountOrArgChange: true,
    },
  );

  const clientListData =
    clientsResponse?.data?.data?.map((client: any) => ({
      id: client.id,
      name: client.name,
      email: client.email,
      phone: client.mobile,
      jobType: client.job_type,
      status: client.job_status,
      image_url: client.image_url,
    })) || [];

  const pagination = clientsResponse?.data || {
    current_page: 1,
    per_page: 10,
    total: 0,
    last_page: 1,
  };

  const totalItems = pagination.total || 0;
  const totalPages = pagination.last_page || 1;

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
              selectedRows.length === clientListData.length &&
              clientListData.length > 0
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
          <Link
            href={`/candidate/my-clients/${record.id}`}
            className=" flex items-center justify-center gap-2"
          >
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-xs font-medium text-gray-600">
                {record?.image_url ? (
                  <Image
                    src={record?.image_url || `/empty-user.png`}
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
            className={`min-w-30 justify-center rounded  px-2.5 py-1 text-xs font-medium ${getStatusClass(value)}`}
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
      formatter: (_value: any, record: any) => (
        <Link
          href={`/candidate/my-clients/${record.id}`}
          className="inline-block"
        >
          <ButtonReuseable
            title="View"
            className="bg-bgColor! text-blackColor! font-semibold border border-borderColor"
          />
        </Link>
      ),
    },
  ];

  return (
    <section className="p-3 sm:p-4 lg:p-6 h-full">
      <div className="">
        <div className="mb-4">
          <FilterHeader
            title="Client List"
            filter={false}
            description="List of all current clients and their details."
            searchValue={inputValue}
            onSearchChange={setInputValue}
            onSearchSubmit={(val) => {
              setInputValue(val);
              setSearchTerm(val);
            }}
          />
        </div>

        <DynamicTableTwo
          columns={columns}
          data={clientListData}
          currentPage={currentPage}
          itemsPerPage={perPage}
          onPageChange={(page) => setCurrentPage(page)}
          totalpage={totalPages}
          totalItems={totalItems}
          border={true}
          noDataMessage="No clients found."
          onItemsPerPageChange={setPerPage}
          loading={isLoading}
          error={isError ? "Failed to load clients" : undefined}
        />
      </div>
    </section>
  );
}

export default CandidateAllClientTable;

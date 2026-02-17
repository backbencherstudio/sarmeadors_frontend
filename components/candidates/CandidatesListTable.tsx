"use client";

import { candidateListData , candidatesStatuse } from "@/demoData/DashboardData";
import dayjs from "dayjs";
import Link from "next/link";
import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import { HiOutlineFilter } from "react-icons/hi";
import { IoSettingsSharp } from "react-icons/io5";
import { LuCalendarRange } from "react-icons/lu";
import ClientCreateForm from "../allForm/ClientCreateForm";
import StatuseChange from "../clients/AdminTabs/payment/StatuseChange";
import DynamicTableTwo from "../common/DynamicTableTwo";
import Search from "../common/Search";
import TableColAscDsc from "../dashboard/TableColAscDsc";
import ClientDashboardFilter from "../filter/ClientDashboardFilter";
import ButtonReuseable from "../reusable/CustomButton";

function CandidatesListTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState(candidateListData);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [loadingStatusId, setLoadingStatusId] = useState<string | null>(null);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filteredData, setFilteredData] = useState(false);
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState({
    full_name: true,
    email_address: true,
    mobile_number: true,
    position: true,
    last_login: true,
    location: true,
    status: true,
    action: true,
  });
  const toggleSelectAll = () => {
    if (selectedRows.length === data.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(data.map((row) => row.id));
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
            checked={selectedRows.length === data.length && data.length > 0}
            onChange={toggleSelectAll}
            className="w-4 h-4 cursor-pointer rounded border-gray-300"
          />
          <span>Name</span>
          <TableColAscDsc onClick={handleColShort} />
        </div>
      ),
      accessor: "full_name",
      width: "250px",
      formatter: (value: string, record: any) => (
        <Link href="/clients" className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={selectedRows.includes(record.id)}
            onChange={() => toggleRowSelection(record.id)}
            className="w-4 h-4 cursor-pointer rounded border-gray-300"
          />
          <span className="text-sm font-medium text-blackColor">{value}</span>
        </Link>
      ),
    },
    {
      label: "Email Address",
      accessor: "email_address",
      width: "250px",
      formatter: (value: string) => (
        <Link href="/clients" className="text-sm text-blackColor">
          {value}
        </Link>
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
      label: "Position(s) Applying For",
      accessor: "position",
      width: "220px",
      formatter: (value: string) => (
        <span className="text-sm text-blackColor">{value}</span>
      ),
    },
    {
      label: "Last Login",
      accessor: "last_login",
      width: "170px",
      formatter: (value: string) => (
        <div className="flex items-center gap-2 text-sm text-blackColor">
          <LuCalendarRange size={16} className="text-gray3Color" />
          {dayjs(value).format("ddd MMM DD YYYY")}
        </div>
      ),
    },
    {
      label: "Locations",
      accessor: "location",
      width: "220px",
      formatter: (value: string) => (
        <span className="text-sm text-blackColor">{value}</span>
      ),
    },
    {
      label: "Status",
      accessor: "status",
      width: "150px",
      formatter: (value: string, record: any) => (
        <StatuseChange setData={setData} row={record} statuse={candidatesStatuse} />
      ),
    },
    {
      label: (
        <div className="text-right">
          <button className="flex items-center cursor-pointer justify-end gap-2">
            <IoSettingsSharp size={18} />
          </button>
        </div>
      ),
      accessor: "action",
      width: "50px",
    },
  ];

  // Filter columns based on visibility
  const visibleColumnsArray = columns.filter(
    (col) => visibleColumns[col.accessor as keyof typeof visibleColumns],
  );

  const handleFilter = () => {
    setFilteredData((prev) => !prev);
  };

  const handleOpenModal = () => {
    // Logic to open the modal
    setIsModalOpen(true);
  };
  const handleStatuseSetting = () => {
    setFilterModalOpen(true);
  };

  return (
    <section>
      <div className="bg-white shadow md:p-5 p-3 rounded-md">
        <div className="mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center md:justify-between gap-4 w-full mb-4">
            <div>
              <h4 className="text-2xl font-bold text-gray-800">
                Candidate List
              </h4>
              <p className="text-base text-secondaryColor mt-0.5">
                List of all current candidates and their details.
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
                <div>
                  <ButtonReuseable
                    onClick={handleOpenModal}
                    title="Add Client"
                    icon={<FiPlus className="w-4 h-4" />}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>{filteredData && <ClientDashboardFilter />}</div>
        <DynamicTableTwo
          columns={visibleColumnsArray}
          data={data || []}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          onPageChange={(page) => setCurrentPage(page)}
          onItemsPerPageChange={(newItemsPerPage) => {
            setItemsPerPage(newItemsPerPage);
            setCurrentPage(1); // Reset to page 1 when items per page changes
          }}
          loading={false}
          totalItems={data.length}
          totalpage={2}
        />
      </div>
      {isModalOpen && (
        <ClientCreateForm open={isModalOpen} setOpen={setIsModalOpen} />
      )}
    </section>
  );
}

export default CandidatesListTable;

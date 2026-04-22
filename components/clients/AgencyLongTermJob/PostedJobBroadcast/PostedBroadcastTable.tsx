"use client";
import ClientCreateForm from "@/components/allForm/ClientCreateForm";
import DynamicTableTwo from "@/components/common/DynamicTableTwo";
import FilterHeader from "@/components/common/FilterHeader";
import TableColAscDsc from "@/components/dashboard/TableColAscDsc";
import DateIcon from "@/components/icon/DateIcon";
import ButtonReuseable from "@/components/reusable/CustomButton";
import { broadcastListData, candidatesStatuse } from "@/demoData/DashboardData";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import StatuseChange from "../../AdminTabs/payment/StatuseChange";

export default function PostedBroadcastTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState(broadcastListData);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState({
    full_name: true,
    email_address: true,
    mobile_number: true,
    registration_date: true,
    location: true,
    status: true,
    action: true,
    settings: true,
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
        <Link href={`#`} className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={selectedRows.includes(record.id)}
            onChange={() => toggleRowSelection(record.id)}
            className="w-4 h-4 cursor-pointer rounded border-gray-300"
          />
          <div className="flex items-center gap-2">
            <Image
              src={"/profile.png"}
              alt="profile"
              height={100}
              width={100}
              className="h-8 w-8"
            />
            <span className="text-sm font-medium text-blackColor">{value}</span>
          </div>
        </Link>
      ),
    },
    {
      label: "Email Address",
      accessor: "email_address",
      width: "250px",
      formatter: (value: string, record: any) => (
        <Link href={`#`} className="text-sm text-blackColor">
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
      label: "Registration Date",
      accessor: "registration_date",
      width: "220px",
      formatter: (value: string) => (
        <div className="flex items-center gap-2">
          <DateIcon />
          <span className="text-sm text-blackColor">{value}</span>
        </div>
      ),
    },
    {
      label: "Status",
      accessor: "status",
      width: "150px",
      formatter: (value: string, record: any) => (
        <StatuseChange
          setData={setData}
          row={record}
          statuse={candidatesStatuse}
        />
      ),
    },

    {
      label: "Action",
      accessor: "action",
      width: "150px",
      formatter: (value: string, record: any) => (
        <ButtonReuseable
          title="View"
          className="bg-[#F3F4F6]! text-[#111927]! border"
        />
      ),
    },
  ];

  // Filter columns based on visibility
  const visibleColumnsArray = columns.filter(
    (col) => visibleColumns[col.accessor as keyof typeof visibleColumns],
  );

  const handleOpenModal = () => {
    // Logic to open the modal
    setIsModalOpen(true);
  };
  return (
    <section>
      <div className="bg-white shadow md:p-5 p-3 rounded-md">
        <div>
          <FilterHeader
            title="Candidate List"
            description="List of all current candidates and their details."
            handleOpenModal={handleOpenModal}
            buttonTitle="Add Candidates"
          />
        </div>
        <DynamicTableTwo
          columns={visibleColumnsArray}
          data={data || []}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          onPageChange={(page) => setCurrentPage(page)}
          onItemsPerPageChange={(newItemsPerPage) => {
            setItemsPerPage(newItemsPerPage);
            setCurrentPage(1);
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

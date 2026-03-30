"use client";
import DynamicTableTwo from "@/components/common/DynamicTableTwo";
import TableColAscDsc from "@/components/dashboard/TableColAscDsc";
import { applicantsListData } from "@/demoData/DashboardData";
import Link from "next/link";
import { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaRegFileLines } from "react-icons/fa6";

export default function ApplicantsTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState(applicantsListData);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [visibleColumns, setVisibleColumns] = useState({
    full_name: true,
    application_date: true,
    status: true,
    application_message: true,
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
        <Link
          href={`/candidates/${record.id}/admin/list`}
          className="flex items-center gap-3"
        >
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
      label: "Application Date",
      accessor: "application_date",
      width: "250px",
      formatter: (value: string, record: any) => (
        <Link
          href={`/candidates/${record.id}/admin/list`}
          className="text-sm text-blackColor"
        >
          {value}
        </Link>
      ),
    },
    {
      label: "Status",
      accessor: "status",
      width: "150px",
      formatter: (value: string) => (
        <span className="text-sm text-blackColor">{value}</span>
      ),
    },
    {
      label: "Application Message",
      accessor: "application_message",
      width: "220px",
      formatter: (value: string) => (
        <p className="text-sm text-blackColor">{value}</p>
      ),
    },
    {
      label: "Action",
      accessor: "action",
      width: "150px",
      formatter: (value: string) => (
        <div className="flex items-center gap-2">
          <button className="text-sm px-4 py-3 text-[#111927] border rounded-[8px] bg-[#F3F4F6] font-semibold cursor-pointer hover:bg-[#111927] hover:text-white">
            {value}
          </button>
          <button className="px-4 py-3 border rounded-[8px] cursor-pointer">
            <FaRegFileLines />
          </button>
          <button className="px-4 py-3 border rounded-[8px] cursor-pointer">
            <BsThreeDotsVertical />
          </button>
        </div>
      ),
    },
  ];

  // Filter columns based on visibility
  const visibleColumnsArray = columns.filter(
    (col) => visibleColumns[col.accessor as keyof typeof visibleColumns],
  );
  return (
    <section>
      <div className="mt-2.5">
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
    </section>
  );
}

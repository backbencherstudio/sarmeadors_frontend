"use client";
import DynamicTableTwo from "@/components/common/DynamicTableTwo";
import TableColAscDsc from "@/components/dashboard/TableColAscDsc";
import DateIcon from "@/components/icon/DateIcon";
import LinkSquareIcon from "@/components/icon/LinkSquareIcon";
import { advancedInvoiceTableData } from "@/demoData/DashboardData";
import Link from "next/link";
import { useState } from "react";

export default function AdvancedInvoiceTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState(advancedInvoiceTableData);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState({
    invoiceId: true,
    name: true,
    invoiceTotal: true,
    status: true,
    createdAt: true,
    dueDate: true,
    action: true,
  });
  const toggleSelectAll = () => {
    if (selectedRows.length === data.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(data.map((row) => row.invoiceId));
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
          <span>Invoice ID</span>
          <TableColAscDsc onClick={handleColShort} />
        </div>
      ),
      accessor: "invoiceId",
      width: "250px",
      formatter: (value: string, record: any) => (
        <div>
          <span className="text-sm font-medium text-blackColor">{value}</span>
        </div>
      ),
    },
    {
      label: "Name",
      accessor: "name",
      width: "250px",
      formatter: (value: string, record: any) => <div>{value}</div>,
    },
    {
      label: "Invoice Total",
      accessor: "invoiceTotal",
      width: "250px",
      formatter: (value: string, record: any) => <div>{value}</div>,
    },
    {
      label: "Status",
      accessor: "status",
      width: "250px",
      formatter: (value: string, record: any) => (
        <div className="p-1.5 border border-[#E5E7EB] rounded-[8px] w-[100px] text-center">
          {value === "Scheduled" ? (
            <p className="p-1 bg-[#FFFAE5] text-[#A5600D] rounded-[4px]">
              {value}
            </p>
          ) : (
            <p className="p-1 bg-[#EBFEF2] text-[#217D43] rounded-[4px]">
              {value}
            </p>
          )}
        </div>
      ),
    },
    {
      label: "Created At",
      accessor: "createdAt",
      width: "250px",
      formatter: (value: string, record: any) => <div>{value}</div>,
    },
    {
      label: "Due Date",
      accessor: "dueDate",
      width: "250px",
      formatter: (value: string, record: any) => (
        <div className="flex items-center gap-x-1.5">
          <DateIcon />
          <span>{value}</span>
        </div>
      ),
    },

    {
      label: (
        <div>
          <span>Action</span>
        </div>
      ),
      accessor: "action",
      width: "50px",
      formatter: (value: string, record: any) => (
        <Link
          href={`/client/client-payments/advanced-invoice/invoice-details?id=${record?.id}`}
          className="p-3 bg-[#F3F4F6] hover:bg-[#111927] hover:border hover:border-[#384250] hover:text-white border border-[#E5E7EB] rounded-[8px] flex items-center justify-center cursor-pointer"
        >
          <LinkSquareIcon />
        </Link>
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
        <div className="mb-4">
          <h1 className="text-[20px] text-[#111927] leading-[120%] font-semibold text-nowrap">
            Advanced Invoice Manager
          </h1>
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
    </section>
  );
}

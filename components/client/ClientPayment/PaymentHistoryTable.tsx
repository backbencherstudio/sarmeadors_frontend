"use client";
import DynamicTableTwo from "@/components/common/DynamicTableTwo";
import Search from "@/components/common/Search";
import TableColAscDsc from "@/components/dashboard/TableColAscDsc";
import DownloadIcon from "@/components/icon/DownloadIcon";
import { paymentHistoryTableData } from "@/demoData/DashboardData";
import { useState } from "react";

export default function PaymentHistoryTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState(paymentHistoryTableData);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState({
    invoices: true,
    description: true,
    amount: true,
    paymentMethod: true,
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
            className="w-4 h-4 cursor-pointer rounded border-gray-300 accent-gray-900"
          />
          <span>Invoices</span>
          <TableColAscDsc onClick={handleColShort} />
        </div>
      ),
      accessor: "invoices",
      width: "250px",
      formatter: (value: string, record: any) => (
        <div className="flex items-center gap-x-1.5">
          <input
            type="checkbox"
            checked={selectedRows.includes(record.id)}
            onChange={() => toggleRowSelection(record.id)}
            className="w-4 h-4 cursor-pointer rounded border-gray-300 gap-x-1.5 accent-gray-900"
          />
          <span className="text-sm font-medium text-blackColor">{value}</span>
        </div>
      ),
    },
    {
      label: "Description of charge",
      accessor: "description",
      width: "250px",
      formatter: (value: string, record: any) => (
        <div>
          <span className="text-nowrap">{value}</span>
        </div>
      ),
    },
    {
      label: "Amount",
      accessor: "amount",
      width: "250px",
      formatter: (value: string, record: any) => <div>{value}</div>,
    },
    {
      label: "Payment Method",
      accessor: "paymentMethod",
      width: "250px",
      formatter: (value: string, record: any) => <div>{value}</div>,
    },

    {
      label: (
        <div className="">
          <span>Action</span>
        </div>
      ),
      accessor: "action",
      width: "50px",
      formatter: (value: string, record: any) => (
        <div className="p-3 bg-[#F3F4F6] hover:bg-[#111927] hover:border hover:border-[#384250] hover:text-white border border-[#E5E7EB] rounded-[8px] flex items-center justify-center cursor-pointer">
          <DownloadIcon />
        </div>
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
        <div className="mb-4 flex items-center">
          <h1 className="text-[20px] text-[#111927] leading-[120%] font-semibold text-nowrap">
            Payment History
          </h1>
          <div className="flex flex-col md:flex-row w-full md:justify-end  md:items-center gap-3 md:gap-2 h-full">
            <Search />
          </div>
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

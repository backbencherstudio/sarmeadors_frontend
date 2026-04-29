"use client";
import DynamicTableTwo from "@/components/common/DynamicTableTwo";
import Search from "@/components/common/Search";
import TableColAscDsc from "@/components/dashboard/TableColAscDsc";
import DownloadIcon from "@/components/icon/DownloadIcon";
import ButtonReuseable from "@/components/reusable/CustomButton";
import { invoicesData } from "@/demoData/DashboardData";
import { useState } from "react";

export default function PaymentTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState(invoicesData);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [visibleColumns, setVisibleColumns] = useState({
    invoices: true,
    date_time: true,
    price: true,
    payment_method: true,
    actions: true,
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
          <span>Invoices</span>
          <TableColAscDsc onClick={handleColShort} />
        </div>
      ),
      accessor: "invoices",
      width: "250px",
      formatter: (value: string, record: any) => (
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={selectedRows.includes(record.id)}
            onChange={() => toggleRowSelection(record.id)}
            className="w-4 h-4 cursor-pointer rounded border-gray-300"
          />
          <span className="text-sm font-medium text-blackColor">{value}</span>
        </div>
      ),
    },
    {
      label: "Date & Time",
      accessor: "date_time",
      width: "250px",
      formatter: (value: string, record: any) => (
        <span className="text-sm text-blackColor">{value}</span>
      ),
    },
    {
      label: "Price",
      accessor: "price",
      width: "150px",
      formatter: (value: string) => (
        <span className="text-sm text-blackColor">{value}</span>
      ),
    },
    {
      label: "Payment Method",
      accessor: "payment_method",
      width: "220px",
      formatter: (value: string) => (
        <span className="text-sm text-blackColor">{value}</span>
      ),
    },
    {
      label: "Actions",
      accessor: "actions",
      width: "220px",
      formatter: (value: string) => (
        <button className="text-sm text-blackColor bg-[#F3F4F6] px-4 py-3 border rounded-[8px] cursor-pointer">
          <DownloadIcon />
        </button>
      ),
    },
  ];

  // Filter columns based on visibility
  const visibleColumnsArray = columns.filter(
    (col) => visibleColumns[col.accessor as keyof typeof visibleColumns],
  );

  return (
    <div>
      <div className="grid grid-cols-2">
        <h1 className="text-xl text-[#111927] font-bold text-nowrap">
          Payment History
        </h1>
        <div className="flex items-center gap-2 w-full justify-end">
          <Search />
          <ButtonReuseable
            rightIcon={<DownloadIcon />}
            title="Export"
            className="!bg-white border text-[#111927]!"
          />
        </div>
      </div>
      <div className="bg-white shadow md:p-5 p-3 rounded-md mt-4">
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
    </div>
  );
}

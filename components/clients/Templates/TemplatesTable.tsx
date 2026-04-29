"use client";
import DynamicTableTwo from "@/components/common/DynamicTableTwo";
import TableColAscDsc from "@/components/dashboard/TableColAscDsc";
import DownloadIcon from "@/components/icon/DownloadIcon";
import ButtonReuseable from "@/components/reusable/CustomButton";
import { mailTemplateData } from "@/demoData/DashboardData";
import CopyIcon from "@/public/icon/CopyIcon";
import DeleteIcon from "@/public/icon/DeleteIcon";
import EmailIcon from "@/public/icon/EmailIcon";
import { PencilIcon } from "lucide-react";
import { useState } from "react";

export default function TemplatesTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState(mailTemplateData);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState({
    full_name: true,
    user_type: true,
    category: true,
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
      label: "User Type",
      accessor: "user_type",
      width: "50px",
      formatter: (value: string, record: any) => (
        <div className="text-sm text-blackColor">{value}</div>
      ),
    },
    {
      label: "Category",
      accessor: "category",
      width: "170px",
      formatter: (value: string) => (
        <span className="text-sm text-blackColor">{value}</span>
      ),
    },
    {
      label: "Locations",
      accessor: "location",
      width: "120px",
      formatter: (value: string) => (
        <span className="text-sm text-blackColor">{value}</span>
      ),
    },
    {
      label: "Status",
      accessor: "status",
      width: "150px",
      formatter: (value: string, record: any) => (
        <span className="text-sm text-blackColor">{value}</span>
      ),
    },
    {
      label: "Actions",
      accessor: "action",
      width: "250px",
      formatter: (value: string, record: any) => (
        <div className="flex items-center gap-1">
          <ButtonReuseable
            icon={<PencilIcon className="h-4 w-4" />}
            className="bg-[#F3F4F6]! text-black! border!"
          />
          <ButtonReuseable
            icon={<EmailIcon className="h-4 w-4" />}
            className="bg-[#F3F4F6]! text-black! border!"
          />
          <ButtonReuseable
            icon={<DownloadIcon className="h-4 w-4" />}
            className="bg-[#F3F4F6]! text-black! border!"
          />
          <ButtonReuseable
            icon={<CopyIcon className="h-4 w-4" />}
            className="bg-[#F3F4F6]! text-black! border!"
          />
          <ButtonReuseable
            icon={<DeleteIcon className="h-4 w-4" />}
            className="bg-[#F3F4F6]! text-[#CB121D]! border!"
          />
        </div>
      ),
    },
  ];

  // Filter columns based on visibility
  const visibleColumnsArray = columns.filter(
    (col) => visibleColumns[col.accessor as keyof typeof visibleColumns],
  );

  return (
    <div>
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
  );
}

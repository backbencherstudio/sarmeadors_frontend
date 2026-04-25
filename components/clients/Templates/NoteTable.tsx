import DynamicTableTwo from "@/components/common/DynamicTableTwo";
import TableColAscDsc from "@/components/dashboard/TableColAscDsc";
import ButtonReuseable from "@/components/reusable/CustomButton";
import { noteData } from "@/demoData/DashboardData";
import DeleteIcon from "@/public/icon/DeleteIcon";
import { PencilIcon } from "lucide-react";
import { useState } from "react";

export default function NoteTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState(noteData);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState({
    full_name: true,
    type: true,
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
        <div>
          <span>Name</span>
        </div>
      ),
      accessor: "full_name",
      width: "550px",
      formatter: (value: string, record: any) => (
        <div>
          <span className="text-sm font-medium text-blackColor">{value}</span>
        </div>
      ),
    },
    {
      label: "Type",
      accessor: "type",
      width: "250px",
      formatter: (value: string, record: any) => (
        <div className="text-sm text-blackColor">{value}</div>
      ),
    },
    {
      label: "Actions",
      accessor: "action",
      width: "50px",
      formatter: (value: string, record: any) => (
        <div className="flex items-center gap-1">
          <ButtonReuseable
            icon={<PencilIcon className="h-4 w-4" />}
            className="bg-[#F3F4F6]! text-black! border!"
          />
          <ButtonReuseable
            icon={<DeleteIcon className="h-4 w-4 text-[#CB121D]" />}
            className="bg-[#F3F4F6]! text-black! border!"
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
          setCurrentPage(1);
        }}
        loading={false}
        totalItems={data.length}
        totalpage={2}
      />
    </div>
  );
}

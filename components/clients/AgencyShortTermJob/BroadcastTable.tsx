import DynamicTableTwo from "@/components/common/DynamicTableTwo";
import FilterHeader from "@/components/common/FilterHeader";
import TableColAscDsc from "@/components/dashboard/TableColAscDsc";
import { broadcastListData, candidatesStatuse } from "@/demoData/DashboardData";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { IoSettingsSharp } from "react-icons/io5";
import StatuseChange from "../AdminTabs/payment/StatuseChange";

export default function BroadcastTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState(broadcastListData);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [visibleColumns, setVisibleColumns] = useState({
    full_name: true,
    email_address: true,
    mobile_number: true,
    date: true,
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
        <Link href={``} className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={selectedRows.includes(record.id)}
            onChange={() => toggleRowSelection(record.id)}
            className="w-4 h-4 cursor-pointer rounded border-gray-300"
          />
          <div className="flex items-center gap-2">
            <Image
              src={"/candidates/candidates-profile.png"}
              alt="profile-image"
              height={100}
              width={100}
              className="h-6 w-6 rounded-full"
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
        <Link href={``} className="text-sm text-blackColor">
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
      accessor: "date",
      width: "220px",
      formatter: (value: string) => (
        <p className="text-sm text-blackColor">{value}</p>
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
      formatter: (value: string) => (
        <div>
          <Link
            href={
              "/marketplace-view-details/candidate-details/personal-information"
            }
            className="text-sm px-4 py-3 text-[#111927] border rounded-[8px] bg-[#F3F4F6] font-semibold cursor-pointer"
          >
            {value}
          </Link>
        </div>
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
      width: "50px",
    },
  ];

  // Filter columns based on visibility
  const visibleColumnsArray = columns.filter(
    (col) => visibleColumns[col.accessor as keyof typeof visibleColumns],
  );

  return (
    <section>
      <div className="bg-white md:p-5 p-3 rounded-md mt-6 border">
        <div>
          <FilterHeader buttonTitle="Add Candidates" />
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

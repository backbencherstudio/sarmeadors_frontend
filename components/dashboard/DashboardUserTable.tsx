"use client";

import { useGetAgencyClientListQuery } from "@/feature/slice/agency/agencyDashboardSlice";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoSettingsSharp } from "react-icons/io5";
import { LuCalendarRange } from "react-icons/lu";
import ClientCreateForm from "../allForm/ClientCreateForm";
import DynamicTableTwo from "../common/DynamicTableTwo";
import FilterHeader from "../common/FilterHeader";
import ButtonReuseable from "../reusable/CustomButton";
import ClientTableSetting from "./ClientTableSetting";
import DashboardStatuse from "./DashboardStatuse";

function DashboardUserTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [loadingStatusId, setLoadingStatusId] = useState<string | null>(null);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTableOpen, setTableSettingOpen] = useState(false);
  const [filteredData, setFilteredData] = useState(false);
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const { data, isLoading } = useGetAgencyClientListQuery(
    "AgencyClientTableColumns",
  );

  const [visibleColumns, setVisibleColumns] = useState({
    full_name: true,
    email_address: true,
    mobile_number: true,
    createdAt: true,
    status: true,
    action: true,
  });

  const columns = [
    {
      label: (
        <div className="flex items-center gap-3">
          {/* <input
            type="checkbox"
            checked={
              selectedRows.length === demoData.length && demoData.length > 0
            }
            onChange={toggleSelectAll}
            className="w-4 h-4 cursor-pointer rounded border-gray-300"
          /> */}
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
        <Link href="/clients" className="flex items-center gap-3">
          {/* <input
            type="checkbox"
            checked={selectedRows.includes(record.id)}
            onChange={() => toggleRowSelection(record.id)}
            className="w-4 h-4 cursor-pointer rounded border-gray-300"
          /> */}
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
      accessor: "phone_number",
      width: "150px",
      formatter: (value: string) => (
        <span className="text-sm text-blackColor">{value}</span>
      ),
    },
    {
      label: "Position(s) Applying For",
      accessor: "position_applying_for",
      width: "150px",
      formatter: (value: string) => (
        <span className="text-sm text-blackColor">{value}</span>
      ),
    },
    {
      label: "Last Login",
      accessor: "last_login",
      width: "150px",
      formatter: (value: string) => (
        <span className="text-sm text-blackColor">{value}</span>
      ),
    },
    {
      label: "Locations",
      accessor: "locations",
      width: "150px",
      formatter: (value: string) => (
        <span className="text-sm text-blackColor">{value}</span>
      ),
    },
    {
      label: "Registration Date",
      accessor: "registration_date",
      width: "180px",
      formatter: (value: string) => (
        <div className="flex items-center gap-2 text-sm text-blackColor">
          <LuCalendarRange size={16} className="text-gray3Color" />
          {dayjs(value).format("M/D/YY")}
        </div>
      ),
    },
    {
      label: "Status",
      accessor: "status",
      width: "150px",
      formatter: (value: { name: string; color: string }, record: any) => (
        <DashboardStatuse
          value={value}
          record={record}
          loadingStatusId={loadingStatusId}
        />
      ),
    },
    {
      label: "Hear About Us",
      accessor: "hear_about_us",
      width: "150px",
      formatter: (value: string) => (
        <span className="text-sm text-blackColor">{value}</span>
      ),
    },
    {
      label: "Action",
      accessor: "viewed",
      width: "150px",
      formatter: () => (
        <div className="flex justify-end">
          <ButtonReuseable
            title=" View "
            className="text-blackColor! py-2! bg-bgColor! border  font-semibold"
          />
        </div>
      ),
    },
    {
      label: (
        <div className="text-right">
          <button
            onClick={() => setTableSettingOpen(true)}
            className="flex items-center cursor-pointer justify-end gap-2"
          >
            <IoSettingsSharp size={18} />
          </button>
        </div>
      ),
      accessor: "action",
      width: "50px",
    },
  ];
  const filteredColumns = data?.columns
    ? columns.filter(
        (mainCol) =>
          data?.columns?.some((apiCol) => apiCol.key === mainCol.accessor) ||
          mainCol.accessor === "action" ||
          mainCol.accessor === "viewed",
      )
    : columns;

  const handleOpenModal = () => {
    // Logic to open the modal
    setIsModalOpen(true);
  };
  console.log(data?.data);

  return (
    <section>
      <div className="bg-white shadow md:p-5 p-3 rounded-md">
        <div>
          <FilterHeader
            title="Client List"
            description="List of all current clients and their details."
            handleOpenModal={handleOpenModal}
            buttonTitle="Add Client"
          />
        </div>
        <DynamicTableTwo
          columns={isLoading ? columns : filteredColumns}
          data={data?.data || []}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          onPageChange={(page) => setCurrentPage(page)}
          onItemsPerPageChange={(newItemsPerPage) => {
            setItemsPerPage(newItemsPerPage);
            setCurrentPage(1); // Reset to page 1 when items per page changes
          }}
          loading={isLoading}
          totalItems={10}
          totalpage={2}
        />
      </div>
      {isModalOpen && (
        <ClientCreateForm open={isModalOpen} setOpen={setIsModalOpen} />
      )}
      {isTableOpen && (
        <ClientTableSetting open={isTableOpen} setOpen={setTableSettingOpen} />
      )}
    </section>
  );
}

export default DashboardUserTable;

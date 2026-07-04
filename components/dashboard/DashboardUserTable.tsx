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

  const baseColumns = [
    {
      accessor: "name",
      width: "250px",
      formatter: (value: string, record: any) => (
        <Link href="/clients" className="flex items-center gap-3">
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
                  ?.map((n: string) => n[0])
                  ?.join("")
              )}
            </span>
          </div>
          <span className="text-sm font-medium text-blackColor">{value}</span>
        </Link>
      ),
    },
    {
      accessor: "email_address",
      width: "250px",
      formatter: (value: string) => (
        <Link href="/clients" className="text-sm text-blackColor">
          {value}
        </Link>
      ),
    },
    {
      accessor: "phone_number",
      width: "150px",
      formatter: (value: string) => (
        <span className="text-sm text-blackColor">{value}</span>
      ),
    },
    {
      accessor: "position_applying_for",
      width: "150px",
      formatter: (value: string) => (
        <span className="text-sm text-blackColor">{value}</span>
      ),
    },
    {
      accessor: "last_login",
      width: "150px",
      formatter: (value: string) => (
        <span className="text-sm text-blackColor">{value}</span>
      ),
    },
    {
      accessor: "locations",
      width: "150px",
      formatter: (value: string) => (
        <span className="text-sm text-blackColor">{value}</span>
      ),
    },
    {
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
      accessor: "hear_about_us",
      width: "150px",
      formatter: (value: string) => (
        <span className="text-sm text-blackColor">{value}</span>
      ),
    },
    {
      accessor: "payment_status",
      width: "150px",
      formatter: (value: string) => (
        <span className="text-sm text-blackColor">{value}</span>
      ),
    },
  ];

  let filteredColumns: any[] = [];

  if (data?.columns && data.columns.length > 0) {
    filteredColumns = data.columns
      .map((apiCol) => {
        const matchedCol = baseColumns.find((c) => c.accessor === apiCol.key);
        if (!matchedCol) return null;
        let finalLabel: React.ReactNode = apiCol.label;

        if (apiCol.key === "name") {
          finalLabel = (
            <div className="flex items-center gap-3">
              <span>{apiCol.label}</span>
              <button className="flex flex-col cursor-pointer">
                <IoMdArrowDropdown className="rotate-180" />
                <IoMdArrowDropdown />
              </button>
            </div>
          );
        }

        return {
          ...matchedCol,
          label: finalLabel,
        };
      })
      .filter(Boolean);

    filteredColumns.push(
      {
        label: "Action",
        accessor: "viewed",
        width: "150px",
        formatter: () => (
          <div className="flex justify-end">
            <ButtonReuseable
              title=" View "
              className="text-blackColor! py-2! bg-bgColor! border   font-semibold"
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
    );
  } else {
    filteredColumns = baseColumns.map((col) => ({
      ...col,
      label: col.accessor.replace(/_/g, " "),
    }));
  }

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

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
          columns={filteredColumns}
          data={data?.data || []}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          onPageChange={(page) => setCurrentPage(page)}
          onItemsPerPageChange={(newItemsPerPage) => {
            setItemsPerPage(newItemsPerPage);
            setCurrentPage(1);
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

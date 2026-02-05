"use client"

import DynamicTableTwo from '@/components/common/DynamicTableTwo';
import { useState } from 'react'
import { demoData } from "@/demoData/DashboardData";
import Image from 'next/image';
import { IoMdArrowDropdown } from 'react-icons/io';
import Link from 'next/link';
import { LuCalendarRange } from 'react-icons/lu';
import dayjs from 'dayjs';
import DashboardStatuse from '@/components/dashboard/DashboardStatuse';
import { IoSettingsSharp } from 'react-icons/io5';

export default function RelationshipLog() {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [loadingStatusId, setLoadingStatusId] = useState<string | null>(null);
    const [selectedRows, setSelectedRows] = useState<string[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filteredData, setFilteredData] = useState(false);
    const [filterModalOpen, setFilterModalOpen] = useState(false);
    const [visibleColumns, setVisibleColumns] = useState({
        full_name: true,
        email_address: true,
        mobile_number: true,
        createdAt: true,
        status: true,
        action: true,
    });
    const toggleSelectAll = () => {
        if (selectedRows.length === demoData.length) {
            setSelectedRows([]);
        } else {
            setSelectedRows(demoData.map((row) => row.id));
        }
    };

    const toggleRowSelection = (rowId: string) => {
        setSelectedRows((prev) =>
            prev.includes(rowId)
                ? prev.filter((id) => id !== rowId)
                : [...prev, rowId],
        );
    };

    const columns = [
        {
            label: (
                <div className="flex items-center gap-3">
                    <input
                        type="checkbox"
                        checked={
                            selectedRows.length === demoData.length && demoData.length > 0
                        }
                        onChange={toggleSelectAll}
                        className="w-4 h-4 cursor-pointer rounded border-gray-300"
                    />
                    <span>Name</span>
                    <button className="flex flex-col cursor-pointer">
                        <IoMdArrowDropdown className=" rotate-180" />
                        <IoMdArrowDropdown />
                    </button>
                </div>
            ),
            accessor: "full_name",
            width: "250px",
            formatter: (value: string, record: any) => (
                <Link href="/clients" className="flex items-center gap-3">
                    <input
                        type="checkbox"
                        checked={selectedRows.includes(record.id)}
                        onChange={() => toggleRowSelection(record.id)}
                        className="w-4 h-4 cursor-pointer rounded border-gray-300"
                    />
                    <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                        <span className="text-xs font-medium text-gray-600">
                            {record?.image_name ? (
                                <Image
                                    src={record?.image_name || `/empty-user.png`}
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
            accessor: "mobile_number",
            width: "150px",
            formatter: (value: string) => (
                <span className="text-sm text-blackColor">{value}</span>
            ),
        },
        {
            label: "Registration Date",
            accessor: "createdAt",
            width: "180px",
            formatter: (value: string) => (
                <div className="flex items-center gap-2 text-sm text-blackColor">
                    <LuCalendarRange size={16} className="text-gray3Color" />
                    {dayjs(value).format("M/D/YY")}
                </div>
            ),
        },
        // {
        //     label: "Status",
        //     accessor: "status",
        //     width: "150px",
        //     formatter: (value: string, record: any) => (
        //         <DashboardStatuse
        //             value={value}
        //             record={record}
        //             loadingStatusId={loadingStatusId}
        //         />
        //     ),
        // },
        // {
        //     label: (
        //         <div className="text-right">
        //             <button className="flex items-center cursor-pointer justify-end gap-2">
        //                 <IoSettingsSharp size={18} />
        //             </button>
        //         </div>
        //     ),
        //     accessor: "action",
        //     width: "50px",
        // },
    ];

    // Filter columns based on visibility
    const visibleColumnsArray = columns.filter(
        (col) => visibleColumns[col.accessor as keyof typeof visibleColumns],
    );

    const handleFilter = () => {
        setFilteredData((prev) => !prev);
    };

    const handleOpenModal = () => {
        // Logic to open the modal
        setIsModalOpen(true);
    };
    const handleStatuseSetting = () => {
        setFilterModalOpen(true);
    };
    return (
        <div>
            <DynamicTableTwo
                columns={visibleColumnsArray}
                data={demoData || []}
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                onPageChange={(page) => setCurrentPage(page)}
                onItemsPerPageChange={(newItemsPerPage) => {
                    setItemsPerPage(newItemsPerPage);
                    setCurrentPage(1); // Reset to page 1 when items per page changes
                }}
                loading={false}
                totalItems={10}
                totalpage={2}
            />
        </div>
    )
}

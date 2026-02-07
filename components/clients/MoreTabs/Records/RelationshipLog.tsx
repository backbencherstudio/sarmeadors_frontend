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
    const [selectedRows, setSelectedRows] = useState<string[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filteredData, setFilteredData] = useState(false);
    const [filterModalOpen, setFilterModalOpen] = useState(false);
    const [visibleColumns, setVisibleColumns] = useState({
        full_name: true,
        actor: true,
        type: true,
        details: true,
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
            label: "Actor",
            accessor: "actor",
            width: "250px",
            formatter: (value: string) => (
                <span className="text-sm text-blackColor">{value}</span>
            ),
        },
        {
            label: "Timestamp",
            accessor: "createdAt",
            width: "180px",
            formatter: (value: string) => (
                <div className="flex items-center gap-2 text-sm text-blackColor">
                    <LuCalendarRange size={16} className="text-gray3Color" />
                    {dayjs(value).format("M/D/YY")}
                </div>
            ),
        },
        {
            label: "Details",
            accessor: "details",
            width: "400px",
            formatter: (value: string) => (
                <span className="text-sm text-blackColor">{value}</span>
            ),
        },
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

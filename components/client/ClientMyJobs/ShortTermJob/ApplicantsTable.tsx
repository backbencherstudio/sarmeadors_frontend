"use client";

import { useState } from "react";
import Link from "next/link";
import DynamicTableTwo from "@/components/common/DynamicTableTwo";
import TableColAscDsc from "@/components/dashboard/TableColAscDsc";
import { Eye, Video } from "lucide-react";

function ApplicantsTable() {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(8);
    const [selectedRows, setSelectedRows] = useState<string[]>([]);
    const [visibleColumns, setVisibleColumns] = useState({
        full_name: true,
        application_date: true,
        application_message: true,
        action: true,
    });

    // Sample data matching the image
    const [data, setData] = useState([
        {
            id: "1",
            full_name: "Bessie Cooper",
            application_date: "15 May 2020 9:30 am",
            application_message: "Looking for a dedicated Nanny and House Manager to help keep everything running smoothly at home.",
            status: "pending"
        },
        {
            id: "2",
            full_name: "Marvin McKinney",
            application_date: "15 May 2020 9:00 am",
            application_message: "Seeking a caring Baby/Night Nurse to provide support during nighttime hours.",
            status: "pending"
        },
        {
            id: "3",
            full_name: "Brooklyn Simmons",
            application_date: "15 May 2020 9:30 am",
            application_message: "In need of a nurturing Nanny to care for our little ones.",
            status: "pending"
        },
        {
            id: "4",
            full_name: "Courtney Henry",
            application_date: "15 May 2020 9:00 am",
            application_message: "Looking for a skilled Nurse to provide medical care and support.",
            status: "pending"
        },
        {
            id: "5",
            full_name: "Arlene McCoy",
            application_date: "15 May 2020 8:30 am",
            application_message: "Looking for a reliable Nanny to assist with childcare.",
            status: "pending"
        },
        {
            id: "6",
            full_name: "Floyd Miles",
            application_date: "15 May 2020 8:30 am",
            application_message: "Seeking a reliable Nanny to assist with childcare.",
            status: "pending"
        },
        {
            id: "7",
            full_name: "Cody Fisher",
            application_date: "15 May 2020 9:00 am",
            application_message: "Looking for a compassionate Nanny to help with daily activities.",
            status: "pending"
        },
        {
            id: "8",
            full_name: "Jerome Bell",
            application_date: "15 May 2020 9:30 am",
            application_message: "Searching for an experienced Nanny to care for our children.",
            status: "pending"
        },
        {
            id: "9",
            full_name: "Guy Hawkins",
            application_date: "15 May 2020 9:00 am",
            application_message: "Searching for an experienced Nanny to care for our children.",
            status: "pending"
        },
        {
            id: "10",
            full_name: "Kristin Watson",
            application_date: "15 May 2020 8:00 am",
            application_message: "Looking for a Nanny and House Manager, along with a Baby/Night Nurse, to provide comprehensive care.",
            status: "pending"
        },
        {
            id: "11",
            full_name: "Esther Howard",
            application_date: "15 May 2020 8:30 am",
            application_message: "Looking for a Nanny and House Manager, along with a Baby/Night Nurse, to provide comprehensive care.",
            status: "pending"
        }
    ]);

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
            width: "200px",
            formatter: (value: string, record: any) => (
                <Link
                    href={`/candidates/${record.id}/admin/list`}
                    className="flex items-center gap-3"
                >
                    <input
                        type="checkbox"
                        checked={selectedRows.includes(record.id)}
                        onChange={() => toggleRowSelection(record.id)}
                        className="w-4 h-4 cursor-pointer rounded border-gray-300"
                    />
                    <span className="text-sm font-medium text-blackColor">{value}</span>
                </Link>
            ),
        },
        {
            label: "Application Date",
            accessor: "application_date",
            width: "180px",
            formatter: (value: string) => (
                <span className="text-sm text-blackColor">{value}</span>
            ),
        },
        {
            label: "Application Message",
            accessor: "application_message",
            width: "400px",
            formatter: (value: string) => (
                <span className="text-sm text-blackColor line-clamp-2">{value}</span>
            ),
        },
        {
            label: (
                <div className="text-right">
                    <span>Actions</span>
                </div>
            ),
            accessor: "action",
            width: "120px",
            formatter: () => (
                <div className="flex items-center gap-2 justify-end">
                    <div className="p-2 rounded-[10px] border">
                        <Eye />
                    </div>
                    <div className="p-2 rounded-[10px] border">
                        <Video />
                    </div>
                    <button className="bg-[#111927] text-white text-base font-medium px-4 py-2 rounded-[8px] transition-colors cursor-pointer">
                        Hire Candidate
                    </button>
                </div>
            ),
        },
    ];

    // Filter columns based on visibility
    const visibleColumnsArray = columns.filter(
        (col) => visibleColumns[col.accessor as keyof typeof visibleColumns],
    );

    return (
        <section>
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
                totalpage={Math.ceil(data.length / itemsPerPage)}
            />
        </section>
    );
}

export default ApplicantsTable;
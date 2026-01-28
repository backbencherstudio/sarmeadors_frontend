"use client";
import CreateNewInvoiceForm from "@/components/allForm/CreateNewInvoiceForm";
import DynamicTableTwo from "@/components/common/DynamicTableTwo";
import InvoiceIcon from "@/components/icon/InvoiceIcon";
import MessageIcon from "@/components/icon/MessageIcon";
import ButtonReuseable from "@/components/reusable/CustomButton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { BsInfoCircle } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";
import { HiDotsVertical } from "react-icons/hi";

type InvoiceRow = {
  id: string | number;
  name: string;
  total: string;
  status: string;
  createdAt: string;
  dueDate: string;
};

const sampleData: InvoiceRow[] = [
  {
    id: 5833,
    name: "Felicia reid",
    total: "$2018.25",
    status: "not_sent",
    createdAt: "Sat Nov 29 2025 at 14:58:20",
    dueDate: "Tue Dec 30 2025",
  },
  {
    id: 5834,
    name: "Bill sanders",
    total: "$2018.25",
    status: "scheduled",
    createdAt: "Sat Nov 29 2025 at 15:27:14",
    dueDate: "Tue Dec 30 2025",
  },
  {
    id: 5835,
    name: "Georgia young",
    total: "$2018.25",
    status: "paid",
    createdAt: "Sat Nov 29 2025 at 15:27:14",
    dueDate: "Tue Dec 30 2025",
  },
  {
    id: 5836,
    name: "Jessica hanson",
    total: "$2018.25",
    status: "not_sent",
    createdAt: "Sat Nov 29 2025 at 15:27:14",
    dueDate: "Tue Dec 30 2025",
  },
  {
    id: 5837,
    name: "Nathan roberts",
    total: "$2018.25",
    status: "sent",
    createdAt: "Sat Nov 29 2025 at 15:27:14",
    dueDate: "Tue Dec 30 2025",
  },
  {
    id: 5838,
    name: "Tanya hill",
    total: "$2018.25",
    status: "not_sent",
    createdAt: "Sat Nov 29 2025 at 15:27:14",
    dueDate: "Tue Dec 30 2025",
  },
  {
    id: 5839,
    name: "Sample user",
    total: "$100.00",
    status: "paid",
    createdAt: "Mon Jan 05 2026 at 09:12:00",
    dueDate: "Mon Feb 05 2026",
  },
];

export default function InvoiceInfo() {
  const [data, setData] = useState<InvoiceRow[]>(sampleData);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [isOpen, setIsOpen] = useState(false);
  const totalpage = Math.ceil(data.length / itemsPerPage) || 1;

  const columns = [
    { label: "Invoice ID", accessor: "id", width: "124px" },
    { label: "Name", accessor: "name", width: "220px" },
    { label: "Invoice Total", accessor: "total", width: "170px" },
    {
      label: "Status",
      accessor: "status",
      width: "232px",
      formatter: (_value: any, row: InvoiceRow) => {
        return (
          <div className="w-40">
            <Select
              value={row.status}
              onValueChange={(v: string) => {
                setData((prev) =>
                  prev.map((r) => (r.id === row.id ? { ...r, status: v } : r)),
                );
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="not_sent">Not Sent</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="sent">Sent</SelectItem>
              </SelectContent>
            </Select>
          </div>
        );
      },
    },
    {
      label: "Created At",
      accessor: "createdAt",
      width: "260px",
    },
    { label: "Due Date", accessor: "dueDate", width: "180px" },
    {
      label: "Action",
      accessor: "action",
      formatter: (_value: any, row: InvoiceRow) => {
        return (
          <div className="flex gap-4 items-center">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-3 cursor-pointer hover:opacity-90">
                <button
                  onClick={() => handleView(row)}
                  className="text-sm w-8 h-8 rounded-sm border bg-bgColor underline text-headerColor flex items-center justify-center cursor-pointer"
                >
                  <HiDotsVertical />
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                className="min-w-[222px] rounded-lg bg-white shadow-xl p-3"
              >
                <DropdownMenuItem asChild>
                  <button className="flex w-full items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-headerColor hover:bg-blackColor hover:text-whiteColor transition cursor-pointer">
                    <InvoiceIcon />
                    Dashboard
                  </button>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <button className="flex w-full items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-headerColor hover:bg-blackColor hover:text-whiteColor transition cursor-pointer">
                    <MessageIcon />
                    Dashboard
                  </button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
      width: "180px",
    },
  ];

  const HandleCreateInvoice = () => {
    setIsOpen(true);
  };

  const handleView = (row: any) => {
    // placeholder for view action
    alert("View " + row.id);
  };

  const handleDelete = (id: any) => {
    setData((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <div className="mt-6">
      <div>
        <h3 className="text-lg flex items-center gap-2 font-medium md:text-xl text-headerColor">
          Advanced Invoice Manager{" "}
          <span>
            <BsInfoCircle
              className="text-blueColor cursor-pointer"
              title="Show quick invoice button (this auto initializes the invoice and goes straight to adding line items)"
            />
          </span>
        </h3>
        <div className="mt-6">
          <ButtonReuseable
            icon={<FaPlus />}
            onClick={HandleCreateInvoice}
            title="Create Invoice"
            className="bg-blackColor text-whiteColor"
          />
        </div>
      </div>
      <div className="mt-6">
        <DynamicTableTwo
          border={false}
          columns={columns}
          data={data}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          onPageChange={(p) => setCurrentPage(p)}
          totalpage={totalpage}
          totalItems={data.length}
          onItemsPerPageChange={(n) => setItemsPerPage(n)}
        />
      </div>

      {
        isOpen && <CreateNewInvoiceForm open={isOpen} setOpen={setIsOpen} />
      }
    </div>
  );
}

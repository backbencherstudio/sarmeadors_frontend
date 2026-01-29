"use client";

import DynamicTableTwo from "@/components/common/DynamicTableTwo";
import DeleteIcon from "@/components/icon/DeleteIcon";
import DownloadIcon from "@/components/icon/DownloadIcon";
import EditeIcon from "@/components/icon/EditeIcon";
import MessageIcon from "@/components/icon/MessageIcon";
import ReloadIcon from "@/components/icon/ReloadIcon";
import ButtonReuseable from "@/components/reusable/CustomButton";
import { useMemo, useState } from "react";

type ItemRow = {
  id: number;
  item: string;
  rate: number;
  quantity: number;
  discount: string;
  tax: string;
  total: number;
};

const sampleData: ItemRow[] = [
  {
    id: 1,
    item: "Felicia reid",
    rate: 200,
    quantity: 5,
    discount: "$50",
    tax: "15%",
    total: 200 * 5 - 50,
  },
  {
    id: 2,
    item: "Felicia reid",
    rate: 300,
    quantity: 4,
    discount: "$20",
    tax: "20%",
    total: 300 * 4 - 20,
  },
  {
    id: 3,
    item: "Felicia reid",
    rate: 45,
    quantity: 1,
    discount: "$30",
    tax: "33%",
    total: 45 * 1 - 30,
  },
  {
    id: 4,
    item: "Felicia reid",
    rate: 584,
    quantity: 32,
    discount: "$40",
    tax: "40%",
    total: 584 * 32 - 40,
  },
  {
    id: 5,
    item: "Felicia reid",
    rate: 4564,
    quantity: 8,
    discount: "$40",
    tax: "60%",
    total: 4564 * 8 - 40,
  },
  {
    id: 6,
    item: "Felicia reid",
    rate: 455,
    quantity: 6,
    discount: "$80",
    tax: "10%",
    total: 455 * 6 - 80,
  },
];

export default function ManageInvoiceTable() {
  const [data, setData] = useState<ItemRow[]>(sampleData);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);

  const totalpage = 0;

  const currency = useMemo(
    () =>
      new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }),
    [],
  );

  const handleEdit = (row: ItemRow) => {
    // placeholder: open editor
    alert("Edit " + row.id);
  };

  const handleEmail = (row: ItemRow) => {
    alert("Email " + row.id);
  };

  const handleDownload = (row: ItemRow) => {
    alert("Download " + row.id);
  };

  const handleDelete = (id: number) => {
    setData((prev) => prev.filter((r) => r.id !== id));
  };

  const columns = [
    { label: "Item", accessor: "item", width: "30%" },
    { label: "Rate", accessor: "rate", width: "10%" },
    { label: "Quantity", accessor: "quantity", width: "10%" },
    { label: "Discount", accessor: "discount", width: "10%" },
    { label: "Tax", accessor: "tax", width: "10%" },
    {
      label: "Total",
      accessor: "total",
      width: "15%",
      formatter: (value: any) => <span>{currency.format(Number(value))}</span>,
    },
    {
      label: "Actions",
      accessor: "actions",
      width: "15%",
      formatter: (_: any, row: ItemRow) => (
        <div className="flex items-center gap-2 justify-end">
          <button
            onClick={() => handleEdit(row)}
            className="w-8 h-8 rounded-md border bg-white flex items-center justify-center text-sm text-headerColor"
            aria-label="edit"
          >
            <EditeIcon className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => handleEmail(row)}
            className="w-8 h-8 rounded-md border bg-bgColor flex items-center justify-center text-sm text-headerColor"
            aria-label="email"
          >
            <MessageIcon className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleDownload(row)}
            className="w-8 h-8 rounded-md border bg-bgColor flex items-center justify-center text-sm text-headerColor"
            aria-label="download"
          >
            <DownloadIcon className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleDownload(row)}
            className="w-8 h-8 rounded-md border bg-bgColor flex items-center justify-center text-sm text-headerColor"
            aria-label="download"
          >
            <ReloadIcon className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleDelete(row.id)}
            className="w-8 h-8 rounded-md border bg-bgColor flex items-center justify-center text-sm text-red-600"
            aria-label="delete"
          >
            <DeleteIcon className="w-4 h-4 fill-redColor" />
          </button>
        </div>
      ),
    },
  ];

  const grandTotal = data.reduce((s, r) => s + Number(r.total), 0);

  return (
    <div className="mt-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-medium text-headerColor dark:text-whiteColor">
            Invoice Items - saiful
          </h3>
          <p className="text-sm text-muted-foreground">
            List of all current clients and their details.
          </p>
        </div>
        <div>
          <ButtonReuseable
            title="Add Item"
            icon={""}
            className="bg-blackColor text-whiteColor"
          />
        </div>
      </div>

      <div>
        <DynamicTableTwo
          border
          columns={columns}
          data={data}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          onPageChange={(p) => setCurrentPage(p)}
          totalpage={totalpage}
          totalItems={data.length}
          onItemsPerPageChange={(n) => setItemsPerPage(n)}
          renderFooter={(colCount) => {
            return (
              <tr className="border-t border-gray-100 bg-gray-50">
                {Array.from({ length: colCount }).map((_, idx) => {
                  if (idx === 0) {
                    return (
                      <td key={idx} className="px-4 py-3 text-sm font-medium">
                        Total
                      </td>
                    );
                  }
                  if (idx === colCount - 2) {
                    return (
                      <td
                        key={idx}
                        className="px-4 py-3 text-sm font-semibold text-left"
                      >
                        {currency.format(grandTotal)}
                      </td>
                    );
                  }
                  if (idx === colCount - 1) {
                    return (
                      <td key={idx} className="px-4 py-3 text-sm">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            className="w-8 h-8 rounded-md border bg-bgColor flex items-center justify-center text-sm text-headerColor"
                            aria-label="email"
                          >
                            <MessageIcon className="w-4 h-4" />
                          </button>
                          <button
                            className="w-8 h-8 rounded-md border bg-bgColor flex items-center justify-center text-sm text-headerColor"
                            aria-label="download"
                          >
                            <DownloadIcon className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    );
                  }
                  return <td key={idx} className="px-4 py-3" />;
                })}
              </tr>
            );
          }}
        />
      </div>
    </div>
  );
}

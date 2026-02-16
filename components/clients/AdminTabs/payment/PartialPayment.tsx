"use client";

import PartialPaymentForm from "@/components/allForm/PartialPaymentForm";
import DynamicTableTwo from "@/components/common/DynamicTableTwo";
import PageLink from "@/components/common/PageLink";
import DownloadIcon from "@/components/icon/DownloadIcon";
import MessageIcon from "@/components/icon/MessageIcon";
import ButtonReuseable from "@/components/reusable/CustomButton";
import { PlusIcon } from "lucide-react";
import { useMemo, useState } from "react";
import InvoiceAction from "./InvoiceAction";

type ItemRow = {
  id: number;
  item: string;
  rate: number;
  quantity: number;
  discount: string;
  tax: string;
  total: number;
  status?: string;
  due_date?: string;
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
    status: "Paid",
    due_date: "2025-12-10",
  },
  {
    id: 2,
    item: "Felicia reid",
    rate: 300,
    quantity: 4,
    discount: "$20",
    tax: "20%",
    total: 300 * 4 - 20,
    status: "Paid",
    due_date: "2020-05-01",
  },
  {
    id: 3,
    item: "Felicia reid",
    rate: 45,
    quantity: 1,
    discount: "$30",
    tax: "33%",
    total: 45 * 1 - 30,
    status: "Paid",
    due_date: "2020-05-04",
  },
  {
    id: 4,
    item: "Felicia reid",
    rate: 584,
    quantity: 32,
    discount: "$40",
    tax: "40%",
    total: 584 * 32 - 40,
    status: "Paid",
    due_date: "2020-05-02",
  },
  {
    id: 5,
    item: "Felicia reid",
    rate: 4564,
    quantity: 8,
    discount: "$40",
    tax: "60%",
    total: 4564 * 8 - 40,
    status: "Paid",
    due_date: "2020-05-06",
  },
  {
    id: 6,
    item: "Felicia reid",
    rate: 455,
    quantity: 6,
    discount: "$80",
    tax: "10%",
    total: 455 * 6 - 80,
    status: "Paid",
    due_date: "2020-05-03",
  },
];

export default function PartialPayment() {
  const [data, setData] = useState<ItemRow[]>(sampleData);
  const [dialogOpen, setDialogOpen] = useState(false);
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
    { label: "Description", accessor: "item", width: "50%" },
    {
      label: "Amount",
      accessor: "total",
      width: "15%",
      formatter: (value: any) => <span>{currency.format(Number(value))}</span>,
    },
    { label: "Status", accessor: "status", width: "10%" },
    { label: "Due date", accessor: "due_date", width: "15%" },
    {
      label: "Actions",
      accessor: "actions",
      width: "10%",
      formatter: (_: any, row: ItemRow) => (
        <div className="flex items-center gap-2 justify-end">
          <InvoiceAction value={row} />
        </div>
      ),
    },
  ];

  const grandTotal = data.reduce((s, r) => s + Number(r.total), 0);

  return (
    <div className="mt-3">
      <div className="mb-6">
        <PageLink path="/clients" title="Manage Invoice Items" />
      </div>
      <div className="flex items-end justify-between mb-5">
        <div>
          <h3 className="text-lg md:text-xl font-semibold text-headerColor dark:text-whiteColor">
            Total invoice amount: $1,755.00
          </h3>
          <p className="text-sm text-secondaryColor mt-0.5">
            If you add a partial payment item. when the invoice is paid the
            partial payment amount will be charged.
          </p>
          <p className="text-sm text-secondaryColor mt-0.5">
            If you add multiple partial payments, the first time a payment is
            made the first amount will be charged, the second time the second
            amount. etc.
          </p>
        </div>
        <div>
          <ButtonReuseable
            title="Add Item"
            icon={<PlusIcon className="w-4.5 h-4.5" />}
            onClick={() => setDialogOpen(true)}
            className="bg-blackColor text-whiteColor"
          />
        </div>
      </div>

      <div>
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
                  // show grand total under Amount column (index 1)
                  if (idx === 1) {
                    return (
                      <td
                        key={idx}
                        className="px-4 py-3 text-sm font-semibold text-left"
                      >
                        {currency.format(grandTotal)}
                      </td>
                    );
                  }
                  // last column actions placeholder
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
      {dialogOpen && (
        <PartialPaymentForm open={dialogOpen} setOpen={setDialogOpen} />
      )}
    </div>
  );
}

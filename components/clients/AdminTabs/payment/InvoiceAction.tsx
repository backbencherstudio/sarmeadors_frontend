import PartialPaymentForm from "@/components/allForm/PartialPaymentForm";
import RecordPaymentForm from "@/components/allForm/RecorndPymentForm";
import ChargeStripIcon from "@/components/icon/ChargeStripIcon";
import DeleteIcon from "@/components/icon/DeleteIcon";
import EditeIcon from "@/components/icon/EditeIcon";
import RecordIcon from "@/components/icon/RecordIcon";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import DeleteInvoice from "./DeleteInvoice";

function InvoiceAction({ value }: { value: any }) {
  const [isDialogOpen, setDialogIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [recordPaymentOpen, setRecordPaymentOpen] = useState(false);
  const [partialPaymentOpen, setPartialPaymentOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const handleEdit = () => {
    setDropdownOpen(false);
    setTimeout(() => {
      setDialogIsOpen(true);
    }, 10);
  };
  const handleRecordSystem = () => {
    setDropdownOpen(false);
    setTimeout(() => {
      setRecordPaymentOpen(true);
    }, 10);
  };
  const handlePartialSystem = () => {
    setDropdownOpen(false);
    setTimeout(() => {
      setPartialPaymentOpen(true);
    }, 10);
  };
  const handleDelete = () => {
    setDropdownOpen(false);
    setTimeout(() => {
      setDeleteOpen(true);
    }, 10);
  };
  return (
    <div>
      <div>
        <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
          <DropdownMenuTrigger className="flex items-center gap-3 cursor-pointer hover:opacity-90">
            <button className="text-sm w-8 h-8 rounded-sm border bg-bgColor underline text-headerColor flex items-center justify-center cursor-pointer">
              <HiDotsVertical />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="min-w-[222px] rounded-lg bg-white shadow-xl p-3"
          >
            <DropdownMenuItem
              asChild
              className=" group px-3 py-2 rounded-md text-sm font-medium text-headerColor hover:bg-blackColor! hover:text-whiteColor! transition"
            >
              <button
                onClick={handleEdit}
                className="flex w-full items-center gap-2 cursor-pointer "
              >
                <EditeIcon className="group-hover:text-whiteColor group-hover:fill-white" />
                Edit Invoice
              </button>
            </DropdownMenuItem>
            <DropdownMenuItem
              asChild
              className=" group px-3 py-2 rounded-md text-sm font-medium text-headerColor hover:bg-blackColor! hover:text-whiteColor! transition"
            >
              <Link
                href={`/clients/manage-invoice/send-invoice`}
                className="flex w-full items-center gap-2 cursor-pointer "
              >
                <ChargeStripIcon className="group-hover:text-whiteColor w-4! h-4! group-hover:fill-white" />
                Charge Stripe Terminal
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem
              asChild
              className=" group px-3 py-2 rounded-md text-sm font-medium text-headerColor hover:bg-blackColor! hover:text-whiteColor! transition"
            >
              <button
                onClick={handleRecordSystem}
                className="flex w-full items-center gap-2 cursor-pointer "
              >
                <RecordIcon className="group-hover:text-whiteColor group-hover:fill-white" />
                Record System Payment
              </button>
            </DropdownMenuItem>
            <DropdownMenuItem
              asChild
              className=" group px-3 py-2 rounded-md text-sm font-medium text-redColor hover:bg-redColor! hover:text-whiteColor! transition"
            >
              <button
                onClick={handleDelete}
                className="flex w-full items-center gap-2 cursor-pointer "
              >
                <DeleteIcon className="group-hover:text-whiteColor group-hover:fill-white" />
                Delete Invoice
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {isDialogOpen && (
          <PartialPaymentForm open={isDialogOpen} setOpen={setDialogIsOpen} />
        )}
        {recordPaymentOpen && (
          <RecordPaymentForm
            open={recordPaymentOpen}
            setOpen={setRecordPaymentOpen}
          />
        )}
        {deleteOpen && (
          <DeleteInvoice open={deleteOpen} setOpen={setDeleteOpen} />
        )}
      </div>
    </div>
  );
}

export default InvoiceAction;

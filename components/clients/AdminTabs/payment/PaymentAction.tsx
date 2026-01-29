import DeleteIcon from "@/components/icon/DeleteIcon";
import DuplicateIcon from "@/components/icon/DuplicateIcon";
import EditeIcon from "@/components/icon/EditeIcon";
import InvoiceIcon from "@/components/icon/InvoiceIcon";
import MessageIcon from "@/components/icon/MessageIcon";
import RecordIcon from "@/components/icon/RecordIcon";
import ViewInvoiceIcon from "@/components/icon/ViewInvoiceIcon";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { HiDotsVertical } from "react-icons/hi";

function PaymentAction() {
  return (
    <div>
      <DropdownMenu>
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
            className="px-3 py-2 group rounded-md text-sm font-medium text-headerColor hover:bg-blackColor! hover:text-whiteColor! transition "
          >
            <Link
              href="/clients/Manage-invoice"
              className="flex w-full items-center gap-2 cursor-pointer "
            >
              <InvoiceIcon className="group-hover:text-whiteColor group-hover:fill-white" />
              Manage Invoice Items
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className=" group px-3 py-2 rounded-md text-sm font-medium text-headerColor hover:bg-blackColor! hover:text-whiteColor! transition">
            <button className="flex w-full items-center gap-2 cursor-pointer ">
              <MessageIcon className="group-hover:text-whiteColor group-hover:stroke-white" />
              Send Invoice
            </button>
          </DropdownMenuItem>
          <DropdownMenuItem className=" group px-3 py-2 rounded-md text-sm font-medium text-headerColor hover:bg-blackColor! hover:text-whiteColor! transition">
            <button className="flex w-full items-center gap-2 cursor-pointer ">
              <ViewInvoiceIcon className="group-hover:text-whiteColor group-hover:stroke-white" />
              View Invoice Page
            </button>
          </DropdownMenuItem>
          <DropdownMenuItem className=" group px-3 py-2 rounded-md text-sm font-medium text-headerColor hover:bg-blackColor! hover:text-whiteColor! transition">
            <button className="flex w-full items-center gap-2 cursor-pointer ">
              <EditeIcon className="group-hover:text-whiteColor group-hover:fill-white" />
              Edit Invoice
            </button>
          </DropdownMenuItem>
          <DropdownMenuItem className=" group px-3 py-2 rounded-md text-sm font-medium text-headerColor hover:bg-blackColor! hover:text-whiteColor! transition">
            <button className="flex w-full items-center gap-2 cursor-pointer ">
              <DuplicateIcon className="group-hover:text-whiteColor group-hover:stroke-white" />
              Duplicate Invoice
            </button>
          </DropdownMenuItem>
          <DropdownMenuItem className=" group px-3 py-2 rounded-md text-sm font-medium text-headerColor hover:bg-blackColor! hover:text-whiteColor! transition">
            <button className="flex w-full items-center gap-2 cursor-pointer ">
              <RecordIcon className="group-hover:text-whiteColor group-hover:fill-white" />
              Record System Payment
            </button>
          </DropdownMenuItem>
          <DropdownMenuItem className=" group px-3 py-2 rounded-md text-sm font-medium text-redColor hover:bg-redColor! hover:text-whiteColor! transition">
            <button className="flex w-full items-center gap-2 cursor-pointer ">
              <DeleteIcon className="group-hover:text-whiteColor group-hover:fill-white" />
              Delete Invoice
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default PaymentAction;

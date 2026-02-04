import ClientEmail from "@/components/icon/ClientEmail";
import ReloadIcon from "@/components/icon/ReloadIcon";
import ShowIcon from "@/components/icon/ShowIcon";
import ButtonReuseable from "@/components/reusable/CustomButton";
import { useState } from "react";
import MessageView from "./MessageView";

function MessageCard({ value }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border rounded-xl p-4 lg:p-6 bg-white  relative">
      <div className=" gap-4">
        <div className=" justify-between flex items-start">
          <div className="w-11 h-11 rounded-full bg-grayColor1 flex items-center justify-center">
            <ClientEmail className="w-5 h-5 text-headerColor" />
          </div>
          <div className=" flex flex-col items-end gap-2">
            <div
              className={`text-xs px-6 py-1 inline rounded-sm font-semibold ${value.statusClass}`}
            >
              {value.status}
            </div>
            <div className="text-sm text-lightblackColor ">
              Tue Dec 09 2025 at AM
            </div>
          </div>
        </div>
        <div className="flex-1">
          <div className="mt-6 space-y-3 text-base">
            <div>
              <span className="text-secondaryColor">Date: </span>
              <span className="font-medium">{value.dateLabel}</span>
            </div>
            <div>
              <span className="text-secondaryColor">To: </span>
              <span className="font-medium">{value.to}</span>
            </div>
            <div>
              <span className="text-secondaryColor">From: </span>
              <span className="font-medium">{value.from}</span>
            </div>
            <div className="">
              <span className="text-secondaryColor">Subject: </span>
              <span className="font-medium">{value.subject}</span>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <ButtonReuseable
              icon={<ShowIcon className="w-3.5 h-3.5" />}
              onClick={() => setOpen(true)}
              title="View Details"
              className="px-3! py-2! text-sm! font-semibold bg-bgColor! shadow-none! text-headerColor! border!"
            />
            <ButtonReuseable
              icon={<ReloadIcon className="w-3.5 h-3.5" />}
              title="Re-Send"
              className="px-3! py-2! text-sm! font-semibold bg-bgColor! shadow-none! text-headerColor! border!"
            />
          </div>
        </div>
      </div>
      {open && <MessageView data={value} open={open} setOpen={setOpen} />}
    </div>
  );
}

export default MessageCard;

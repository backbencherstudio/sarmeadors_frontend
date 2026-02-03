import ClientEmail from "@/components/icon/ClientEmail";
import ButtonReuseable from "@/components/reusable/CustomButton";

function MessageCard({ value }) {
  return (
    <div className="border rounded-lg p-5 bg-white shadow-sm relative">
      <div className=" gap-4">
        <div className=" justify-between flex items-start">
          <div className="">
            <ClientEmail className="w-5 h-5 text-headerColor" />
          </div>
          <div className=" flex flex-col items-end gap-2">
            <div
              className={`text-xs px-3 py-1 inline rounded-full ${value.statusClass}`}
            >
              {value.status}
            </div>
            <div className="text-sm text-lightblackColor ">
              Tue Dec 09 2025 at AM
            </div>
          </div>
        </div>
        <div className="flex-1">
          <div className="text-sm text-secondaryColor mt-3">
            {value.dateLabel}
          </div>
          <div className="mt-3 text-sm">
            <div>
              <span className="text-secondaryColor">To: </span>
              <span className="font-medium">{value.to}</span>
            </div>
            <div>
              <span className="text-secondaryColor">From: </span>
              <span className="font-medium">{value.from}</span>
            </div>
            <div className="mt-2">
              <span className="text-secondaryColor">Subject: </span>
              <span className="font-medium">{value.subject}</span>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-3">
            <ButtonReuseable
              title="View Details"
              className="px-4 py-2 bg-bgColor border"
            />
            <ButtonReuseable
              title="Re-Send"
              className="px-4 py-2 bg-bgColor border"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MessageCard;

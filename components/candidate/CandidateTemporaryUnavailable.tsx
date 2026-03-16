import { PlusIcon } from "lucide-react";
import { useState } from "react";
import RootDialog from "../common/RootDialog";
import DateIcon from "../icon/DateIcon";
import ButtonReuseable from "../reusable/CustomButton";
import CandidateAvailabilityCreateFrom from "./CandidateAvailabilityCreateFrom";

function CandidateTemporaryUnavailable() {
  const [modalOpen, setModalOpen] = useState(false);
  const [createDateData, setCreateDateData] = useState([
    {
      title: "Checkup at hospital",
      startDate: new Date(),
      endDate: new Date(),
    },
  ]);
  return (
    <div>
      {/* Temporary Unavailable */}
      <div className="space-y-3">
        <h3 className="text-base font-semibold text-blackColor">
          Temporary unavailable?
        </h3>
        <div className="space-y-3">
          {createDateData.map((item: any, index: number) => (
            <div
              key={index}
              className="border border-borderColor rounded-lg p-3 "
            >
              <h3 className="text-base font-semibold">
                {item.title || "Temporary Unavailability"}
              </h3>
              <div className="flex items-center gap-1 mt-1.5">
                <DateIcon />
                <p className="text-xs text-lightblackColor font-medium">
                  {item.startDate.toLocaleDateString()} -{" "}
                  {item.endDate.toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
        <ButtonReuseable
          type="button"
          title="Add dates"
          icon={<PlusIcon size={16} />}
          onClick={() => setModalOpen(true)}
          className=" rounded-md border border-borderColor  bg-white! px-4 py-2 text-sm font-semibold text-blackColor! hover:bg-bgColor!"
        />
      </div>

      {/* Modal */}
      <RootDialog open={modalOpen} setOpen={setModalOpen}>
        <CandidateAvailabilityCreateFrom
          createDateData={createDateData}
          setCreateDateData={setCreateDateData}
          onClose={() => setModalOpen(false)}
        />
      </RootDialog>
    </div>
  );
}

export default CandidateTemporaryUnavailable;

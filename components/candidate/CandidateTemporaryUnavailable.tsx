import { useGetUnAvailablityQuery } from "@/feature/slice/candidate/candidate-dashboard/CandidateMyAvailablity";
import DeleteIcon from "@/public/icon/DeleteIcon";
import { UnavailabilityType } from "@/types";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import DateIcon from "../icon/DateIcon";
import ButtonReuseable from "../reusable/CustomButton";
import { Skeleton } from "../ui/skeleton";
import CandidateAvailabilityCreateFrom from "./CandidateAvailabilityCreateFrom";
import AvailabilityAdditionalDateDelete from "./AvailabilityAdditionalDateDelete";

function CandidateTemporaryUnavailable() {
  const [modalOpen, setModalOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedDocumentKey, setSelectedDocumentKey] = useState<number | null>(null);
  const [createDateData, setCreateDateData] = useState([
    {
      title: "Checkup at hospital",
      startDate: new Date(),
      endDate: new Date(),
    },
  ]);
  const { data, isLoading } = useGetUnAvailablityQuery("unavailability");

  return (
    <div>
      {/* Temporary Unavailable */}
      <div className="space-y-3">
        <h3 className="text-base font-semibold text-blackColor">
          Temporary unavailable?
        </h3>
        <div className="space-y-3">
          {isLoading ? (
            <div>
              <div className="border border-borderColor space-y-4 rounded-lg p-3 ">
                <Skeleton className="w-20 h-5" />
                <Skeleton className="w-40 h-4" />
              </div>
            </div>
          ) : (
            data?.data?.map((item: UnavailabilityType, index: number) => (
              <div
                key={index}
                className="border flex items-center justify-between border-borderColor rounded-lg p-3 "
              >
                <div>
                  <h3 className="text-base font-semibold">
                    {item.title || "Temporary Unavailability"}
                  </h3>
                  <div className="flex items-center gap-1 mt-1.5">
                    <DateIcon />
                    <p className="text-xs text-lightblackColor font-medium">
                      {item.start_date} - {item.end_date}
                    </p>
                  </div>
                </div>
                <div>
                  <ButtonReuseable
                    icon={<DeleteIcon className="w-4 h-4 text-redColor" />}
                    onClick={() => {
                      setSelectedDocumentKey(item.id);
                      setIsDeleteOpen(true);
                    }}
                    className="border-redColor bg-whiteColor! border  px-2! py-2! h-auto! rounded-sm!"
                  />
                </div>
              </div>
            ))
          )}
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
      <CandidateAvailabilityCreateFrom
        createDateData={createDateData}
        setCreateDateData={setCreateDateData}
        onClose={() => setModalOpen(false)}
        open={modalOpen}
      />
      {
        isDeleteOpen && (
          <AvailabilityAdditionalDateDelete
            open={isDeleteOpen}
            setOpen={setIsDeleteOpen}
            documentKey={selectedDocumentKey}
          />
        )
      }
    </div>
  );
}

export default CandidateTemporaryUnavailable;

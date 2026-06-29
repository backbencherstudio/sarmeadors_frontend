import RootDialog from "@/components/common/RootDialog";
import ButtonReuseable from "@/components/reusable/CustomButton";
import { useDeleteCandidateAdditionalDocumentMutation } from "@/feature/slice/candidate/candidate-dashboard/candidateDocumentSlice";
import { toast } from "react-toastify";

function CandidateAdditionalDocDelete({
  open,
  setOpen,
  documentKey,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  documentKey: number | null;
}) {
  const [deleteCandidateAdditionalDocument, { isLoading }] =
    useDeleteCandidateAdditionalDocumentMutation();
  const handleDelete = async () => {
    try {
      const response = await deleteCandidateAdditionalDocument(documentKey).unwrap();
      toast.success(response?.message || "Document deleted successfully");
      setOpen(false);
    } catch (error) {
      toast.error("Failed to delete document. Please try again.");
    }
  };
  return (
    <RootDialog open={open} setOpen={setOpen}>
      <div className="p-4 md:p-6">
        <div className="flex flex-col text-center gap-4">
          <h2 className="text-lg md:text-2xl text-redColor font-semibold">
            Delete Document
          </h2>
          <p className="text-sm text-descriptionColor mb-4">
            Are you sure you want to delete this document? This action cannot be
            undone.
          </p>
          <div className="flex items-center justify-end gap-4 border-t pt-5">
            <ButtonReuseable
              type="button"
              title="Cancel"
              onClick={() => setOpen(false)}
              className="border bg-bgColor! text-blackColor! hover:bg-gray-100!"
            />
            <ButtonReuseable
              type="button"
              title="Delete"
              className="px-6! bg-redColor!"
              sendingMsg="Deleting..."
              loading={isLoading}
              onClick={handleDelete}
            />
          </div>
        </div>
      </div>
    </RootDialog>
  );
}

export default CandidateAdditionalDocDelete;

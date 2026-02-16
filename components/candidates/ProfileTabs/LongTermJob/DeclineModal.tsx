import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type DeclineModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function DeclineModal({ open, onClose }: DeclineModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Admin access denied.
          </DialogTitle>
        </DialogHeader>

        <p className="text-sm text-[#4B5563]">
          As an admin, you can’t apply for this job. To see the candidate
          experience, log out and view the job, or log in as a candidate!
        </p>

        <DialogFooter className="mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md bg-gray-100 text-gray-800 hover:bg-gray-200"
          >
            Cancel
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useCancelShortTermJobMutation } from "@/feature/dashboard/client/myJob";
import { useState } from "react";
import { toast } from "sonner";

export default function CancelModal({ id }: { id: string }) {
  const [cancelJob, { isLoading }] = useCancelShortTermJobMutation();
  const [reason, setReason] = useState("");
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  let cancelTime = true;

  const handleCancel = async () => {
    setError(null);

    if (!reason.trim()) {
      setError("Please provide a reason for cancellation.");
      return;
    }

    try {
      const result = await cancelJob({
        id,
        data: { reason: reason.trim() },
      }).unwrap();

      if (result?.success) {
        toast.success(result?.message || "Job cancelled successfully.");
        setReason("");
        setOpen(false);
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to cancel job.");
      setError(
        "Something went wrong while cancelling this job. Please try again.",
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className="">
        <button className="bg-grayColor1! px-4 rounded-md font-medium tex-sm py-[10.5px]! border border-borderColor text-red-600">
          Cancel Job <span className="text-lg leading-4">●</span>
        </button>
      </DialogTrigger>

      <DialogContent className="w-full max-w-[620px]! p-6">
        <DialogHeader>
          <DialogTitle className="text-xl text-center font-semibold tracking-tight">
            {cancelTime
              ? "Cancellation Time Limit Exceeded"
              : "Are you sure to cancel this job?"}
          </DialogTitle>
          <DialogDescription className="text-base text-muted-foreground  text-center mt-1 ">
            {cancelTime
              ? "Free cancellation is available before 8 hours. This time has passed. A cancellation fee will be charged if you proceed. Would you like to proceed?"
              : " This action cannot be undone, and you'll need to reschedule if you change your mind."}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-2">
          <label
            htmlFor="reason"
            className="text-sm font-medium text-foreground"
          >
            Reason for cancellation
          </label>
          <Textarea
            id="reason"
            value={reason}
            onChange={(event) => setReason(event.target.value)}
            placeholder="Describe what happen..."
            className="min-h-[100px] resize-none bg-background"
          />
          {error && <p className="text-sm text-red-500">{error}</p>}
        </div>

        <DialogFooter className="mt-6 flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            className="px-5 py-5 border-muted-foreground/30 cursor-pointer"
          >
            {cancelTime ? "No, Keep Job" : "Go Back"}
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleCancel}
            disabled={isLoading}
            className="px-5 py-5 bg-[#CB121D] hover:bg-red-700 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isLoading
              ? "Cancelling..."
              : cancelTime
                ? "Yes, Confirm Cancellation"
                : "Cancel"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

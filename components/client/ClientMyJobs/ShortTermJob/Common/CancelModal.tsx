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

export default function CancelModal() {
  let cancelTime = true;

  return (
    <Dialog>
      <DialogTrigger asChild>
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
            placeholder="Describe what happen..."
            className="min-h-[100px] resize-none bg-background"
          />
        </div>

        <DialogFooter className="mt-6 flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            className="px-5 border-muted-foreground/30 cursor-pointer"
          >
            {cancelTime ? "No, Keep Job" : "Go Back"}
          </Button>
          <DialogClose>
            <Button
              type="button"
              variant="destructive"
              className="px-5 bg-red-600 hover:bg-red-700 cursor-pointer"
            >
              {cancelTime ? "Yes, Confirm Cancellation" : "Cancel"}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

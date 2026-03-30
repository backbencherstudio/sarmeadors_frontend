import RootDialog from "@/components/common/RootDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useState } from "react";

export default function AddApplicantModal({ open, setOpen }) {
  const [candidate, setCandidate] = useState("");
  const [status, setStatus] = useState("");
  const [note, setNote] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      candidate,
      status,
      note,
    };

    console.log(payload);
    setOpen(false);
  };

  const handleClearCandidate = () => setCandidate("");
  const handleClearStatus = () => setStatus("");
  return (
    <RootDialog open={open} setOpen={setOpen} className="p-6 rounded-[16px]">
      <DialogTitle className="text-[24px] font-semibold text-[#111927]">
        Add Applicant
      </DialogTitle>

      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <Label className="text-[13px] font-medium text-[#111927]">
              Candidate <span className="text-[#CB121D]">*</span>
            </Label>
            <Input
              value={candidate}
              onChange={(e) => setCandidate(e.target.value)}
              placeholder="Start typing to filter"
              className="mt-2 h-10 rounded-md border-[#E5E7EB] text-sm shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            <button
              type="button"
              onClick={handleClearCandidate}
              className="mt-2 text-[12px] text-[#6B7280] cursor-pointer"
            >
              Clear
            </button>
          </div>

          <div>
            <Label className="text-[13px] font-medium text-[#111927]">
              Status <span className="text-[#CB121D]">*</span>
            </Label>
            <Input
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              placeholder="Start typing to filter"
              className="mt-2 h-10 rounded-md border-[#E5E7EB] text-sm shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            <button
              type="button"
              onClick={handleClearStatus}
              className="mt-2 text-[12px] text-[#6B7280] cursor-pointer"
            >
              Clear
            </button>
          </div>

          <div>
            <Label className="text-[13px] font-medium text-[#111927]">
              Note
            </Label>
            <Textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="mt-2 min-h-[72px] resize-none rounded-md border-[#E5E7EB] text-sm shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>
        </div>

        <div className="mt-5 flex items-center gap-3">
          <Button
            type="submit"
            className="h-10 rounded-md bg-[#111927] px-6 text-white hover:bg-[#111927] cursor-pointer"
          >
            Add
          </Button>

          <Button
            type="button"
            variant="secondary"
            onClick={() => setOpen(false)}
            className="h-10 rounded-md bg-[#F3F4F6] px-6 text-[#111927] hover:bg-[#F3F4F6] cursor-pointer"
          >
            Cancel
          </Button>
        </div>
      </form>
    </RootDialog>
  );
}

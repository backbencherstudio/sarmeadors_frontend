"use client";

import RootDialog from "@/components/common/RootDialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { useState } from "react";

export default function RejectModal({ open, setOpen }: any) {
  const [reason, setReason] = useState("");

  return (
    <RootDialog
      open={open}
      setOpen={setOpen}
      className="max-w-md rounded-xl py-8 px-10 text-center"
    >
      {/* Icon */}
      <div className="flex justify-center mb-3">
        <Image
          src={"/jobs/reject.jpg"}
          alt="jobs"
          height={400}
          width={400}
          className="h-20 w-20"
        />
      </div>

      {/* Title */}
      <h2 className="text-lg font-semibold">
        Are you sure to reject this job?
      </h2>

      {/* Description */}
      <p className="text-sm text-gray-500 mt-1 mb-4">
        Once you reject it, the request will be sent back to the client
        dashboard. Please provide a clear and constructive reason so that the
        client can be properly guided on how to submit the request correctly.
      </p>

      {/* Textarea */}
      <div className="text-left mb-4">
        <label className="text-sm font-medium mb-1 block">
          Reason for rejection
        </label>
        <Textarea
          placeholder="Describe what happen..."
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="min-h-[100px]"
        />
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-2">
        <Button
          variant="outline"
          onClick={() => setOpen(false)}
          className="rounded-md cursor-pointer"
        >
          Go Back
        </Button>

        <Button
          onClick={() => {
            console.log("Rejected reason:", reason);
            setOpen(false);
          }}
          className="bg-[#CB121D] hover:bg-[#CB121D]/90 text-white rounded-md cursor-pointer"
        >
          Confirm
        </Button>
      </div>
    </RootDialog>
  );
}

"use client";

import RootDialog from "@/components/common/RootDialog";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface RejectJobModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (reason: string) => void;
  onGoBack: () => void;
}

export function RejectJobModal({
  open,
  onOpenChange,
  onConfirm,
  onGoBack,
}: RejectJobModalProps) {
  const [reason, setReason] = useState("");

  const handleConfirm = () => {
    onConfirm(reason);
    setReason("");
  };

  const handleGoBack = () => {
    setReason("");
    onGoBack();
  };

  return (
    <RootDialog open={open} setOpen={onOpenChange}>
      <DialogContent
        className="max-w-md w-full rounded-xl p-0 overflow-hidden"
        style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
      >
        <div className="px-8 pt-8 pb-6 flex flex-col items-center text-center">
          {/* Illustration */}
          <div className="mb-5">
            <svg
              width="80"
              height="80"
              viewBox="0 0 80 80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Document */}
              <rect
                x="18"
                y="10"
                width="38"
                height="50"
                rx="3"
                fill="white"
                stroke="#D1D5DB"
                strokeWidth="1.5"
              />
              <line
                x1="26"
                y1="24"
                x2="48"
                y2="24"
                stroke="#D1D5DB"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <line
                x1="26"
                y1="31"
                x2="48"
                y2="31"
                stroke="#D1D5DB"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <line
                x1="26"
                y1="38"
                x2="40"
                y2="38"
                stroke="#D1D5DB"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <line
                x1="26"
                y1="45"
                x2="44"
                y2="45"
                stroke="#D1D5DB"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              {/* Folded corner */}
              <path d="M46 10 L56 20 L46 20 Z" fill="#E5E7EB" />
              <path d="M46 10 L56 20 H46 V10Z" fill="#D1D5DB" />
              {/* Red circle with ban icon */}
              <circle cx="31" cy="46" r="14" fill="#EF4444" />
              <circle
                cx="31"
                cy="46"
                r="12"
                fill="#EF4444"
                stroke="white"
                strokeWidth="1.5"
              />
              {/* Ban slash */}
              <line
                x1="23"
                y1="38"
                x2="39"
                y2="54"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <circle
                cx="31"
                cy="46"
                r="8"
                stroke="white"
                strokeWidth="2"
                fill="none"
              />
              {/* Motion lines */}
              <line
                x1="46"
                y1="18"
                x2="52"
                y2="12"
                stroke="#EF4444"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <line
                x1="50"
                y1="22"
                x2="58"
                y2="18"
                stroke="#EF4444"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <line
                x1="48"
                y1="27"
                x2="56"
                y2="26"
                stroke="#EF4444"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Title */}
          <DialogHeader className="mb-3">
            <DialogTitle className="text-xl font-bold text-gray-900 text-center leading-snug">
              Are you sure to reject this job?
            </DialogTitle>
          </DialogHeader>

          {/* Description */}
          <p className="text-sm text-gray-500 leading-relaxed mb-6">
            Once you reject it, the request will be sent back to the client
            dashboard. Please provide a clear and constructive reason so that
            the client can be properly guided on how to submit the request
            correctly.
          </p>

          {/* Reason textarea */}
          <div className="w-full text-left mb-6">
            <Label className="text-xs font-medium text-gray-700 mb-1.5 block">
              Reason for rejection
            </Label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Describe what happen..."
              rows={4}
              className="w-full p-3 text-sm resize-none border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-gray-300 rounded-md"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 w-full">
            <Button
              type="button"
              variant="outline"
              onClick={handleGoBack}
              className="px-6 py-2 text-sm font-medium text-gray-700 border-gray-300 hover:bg-gray-50 rounded-md cursor-pointer"
            >
              Go Back
            </Button>
            <Button
              type="button"
              onClick={handleConfirm}
              className="px-6 py-2 text-sm font-medium bg-red-600 hover:bg-red-700 text-white rounded-md border-0 cursor-pointer"
            >
              Confirm
            </Button>
          </div>
        </div>
      </DialogContent>
    </RootDialog>
  );
}

"use client";

import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, ChevronLeft } from "lucide-react";
import { useState } from "react";
import ButtonReuseable from "../reusable/CustomButton";
import RootDialog from "../common/RootDialog";

interface CandidateAvailabilityCreateFromProps {
  onClose?: () => void;
  createDateData?: any;
  setCreateDateData?: any;
  open?: boolean;
}

function CandidateAvailabilityCreateFrom({
  onClose,
  createDateData,
  setCreateDateData,
  open
}: CandidateAvailabilityCreateFromProps) {
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [startOpen, setStartOpen] = useState(false);
  const [endOpen, setEndOpen] = useState(false);
  const [title, setTitle] = useState("");

  const handleSelectStartDate = (date: Date | undefined) => {
    setStartDate(date);
    if (endDate && date && endDate < date) {
      setEndDate(undefined);
    }
    setStartOpen(false);
  };

  const handleSelectEndDate = (date: Date | undefined) => {
    setEndDate(date);
    setEndOpen(false);
  };

  const handleCreate = () => {
    console.log({ startDate, endDate, title });
    setCreateDateData((prev: any) => [...prev, { startDate, endDate, title }]);
    onClose?.();
  };

  return (
    <RootDialog open={open} setOpen={onClose}>
    <div className="p-5 space-y-5">
      {/* Header */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onClose}
          className="rounded p-1 hover:bg-bgColor"
        >
          <ChevronLeft className="h-5 w-5 text-blackColor" />
        </button>
        <h3 className="text-lg font-semibold text-blackColor">
          Set temporary unavailability
        </h3>
      </div>

      {/* Date Pickers */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-blackColor">
            Start Date
          </label>
          <Popover modal open={startOpen} onOpenChange={setStartOpen}>
            <PopoverTrigger asChild>
              <button
                type="button"
                className={cn(
                  "flex h-11 w-full items-center justify-between rounded-md border border-borderColor bg-white px-3 text-sm",
                  startDate ? "text-blackColor" : "text-secondaryColor",
                )}
              >
                <span>
                  {startDate ? format(startDate, "PPP") : "Pick a date"}
                </span>
                <CalendarIcon className="h-4 w-4 text-secondaryColor" />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                required
                selected={startDate}
                onSelect={handleSelectStartDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* End Date */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-blackColor">
            End Date
          </label>
          <Popover modal open={endOpen} onOpenChange={setEndOpen}>
            <PopoverTrigger asChild>
              <button
                type="button"
                className={cn(
                  "flex h-11 w-full items-center justify-between rounded-md border border-borderColor bg-white px-3 text-sm",
                  endDate ? "text-blackColor" : "text-secondaryColor",
                )}
              >
                <span>{endDate ? format(endDate, "PPP") : "Pick a date"}</span>
                <CalendarIcon className="h-4 w-4 text-secondaryColor" />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                required
                selected={endDate}
                onSelect={handleSelectEndDate}
                initialFocus
                disabled={(date) => (startDate ? date < startDate : false)}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Title / Description */}
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-blackColor">Title</label>
        <Textarea
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter a description..."
          className="min-h-[120px] resize-none border-borderColor bg-white text-sm text-blackColor placeholder:text-secondaryColor"
        />
      </div>

      {/* Create Button */}
      <div>
        <ButtonReuseable
          type="button"
          onClick={handleCreate}
          title="Create"
          sendingMsg="Creating..."
          className=" px-6! bg-blackColor text-white hover:bg-blackColor/90"
        />
      </div>
    </div>
    </RootDialog>
  );
}

export default CandidateAvailabilityCreateFrom;

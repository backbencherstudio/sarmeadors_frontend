"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ArrowIcon from "@/public/icon/ArrowIcon";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

// Simple custom select for Location, Admins, Category Types
function CustomSelect({ placeholder }: { placeholder: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className="w-full flex items-center justify-between border border-gray-200 rounded-md px-3 py-4 text-sm text-gray-400 bg-white hover:border-gray-300 focus:outline-none"
      >
        {placeholder}
        <ChevronDown
          size={14}
          className={`text-gray-400 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
    </div>
  );
}

export default function Recipients({
  onNext,
  onBack,
}: {
  onNext?: () => void;
  onBack?: () => void;
}) {
  const { handleSubmit, register } = useForm();
  // Control which accordion is open — default is "sender"
  const [openItem, setOpenItem] = useState<string>("sender");

  const onSubmit = (data: any) => {
    console.log(data);
    onNext?.();
  };

  return (
    <div className="mt-8">
      <h1 className="text-gray-900 font-semibold text-2xl">
        Step 2: Sender and Recipients
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-6 flex flex-col gap-4"
      >
        <Accordion
          type="single"
          collapsible
          value={openItem}
          onValueChange={(val) => setOpenItem(val)}
          className="w-full space-y-3"
        >
          {/* ── Accordion 1: Sender ─────────────────────────────────── */}
          <AccordionItem
            value="sender"
            className="border border-gray-200 rounded-lg px-4 py-1"
          >
            <AccordionTrigger className="text-lg font-semibold text-[#111927] cursor-pointer">
              Who does this email tome from, where do replies go. CC/BCC
            </AccordionTrigger>

            <AccordionContent className="pt-2 pb-4">
              {/* Keep Mandatory */}
              <div className="flex items-center gap-2 mb-4">
                <input
                  type="checkbox"
                  id="keepMandatory"
                  {...register("keepMandatory")}
                  className="w-3.5 h-3.5 accent-[#111927] cursor-pointer"
                />
                <label
                  htmlFor="keepMandatory"
                  className="text-base text-[#384250] font-medium cursor-pointer"
                >
                  Keep Mandatory
                </label>
              </div>

              {/* Sender/From Email + Reply To Email */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-base font-medium text-[#111927] mb-1.5">
                    Sender/From Email
                  </label>
                  <textarea
                    {...register("senderEmail")}
                    rows={5}
                    className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-gray-400 resize-none"
                  />
                </div>
                <div>
                  <label className="block text-base font-medium text-[#111927] mb-1.5">
                    Reply To Email
                  </label>
                  <textarea
                    {...register("replyToEmail")}
                    rows={5}
                    className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-gray-400 resize-none"
                  />
                  <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                    If someone replies to an email this is where it will go, if
                    left blank it defaults to the sender/from email
                  </p>
                </div>
              </div>

              {/* CC + BCC */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-base font-medium text-[#111927] mb-1.5">
                    CC
                  </label>
                  <input
                    type="text"
                    {...register("cc")}
                    placeholder="These email addresses will be auto added as CC"
                    className="w-full border border-gray-200 rounded-md px-3 py-4 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-gray-400"
                  />
                  <p className="text-sm text-gray-400 mt-1">
                    Separate multiple emails with; (eg: nannyl@hotmail.com;
                    nanny2@hotmail.com )
                  </p>
                </div>
                <div>
                  <label className="block text-base font-medium text-[#111927] mb-1.5">
                    BCC
                  </label>
                  <input
                    type="text"
                    {...register("bcc")}
                    placeholder="These email addresses will be auto added as BCC"
                    className="w-full border border-gray-200 rounded-md px-3 py-4 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-gray-400"
                  />
                  <p className="text-sm text-gray-400 mt-1">
                    Separate multiple emails with; (eg: nannyl@hotmail.com;
                    nanny2@hotmail.com )
                  </p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* ── Accordion 2: Recipients ──────────────────────────────── */}
          <AccordionItem
            value="recipients"
            className="border border-gray-200 rounded-lg px-4 py-1"
          >
            <AccordionTrigger className="text-lg font-semibold text-[#111927] cursor-pointer">
              Control who receives this emoil
            </AccordionTrigger>

            <AccordionContent className="pt-2 pb-4">
              {/* Location + Select Admin */}
              <div className="grid grid-cols-2 gap-6 mb-1">
                <div>
                  <label className="block text-base font-medium text-[#111927] mb-1.5">
                    Location
                  </label>
                  <CustomSelect placeholder="Select Locations" />
                  <p className="text-sm text-gray-400 mt-1.5 leading-relaxed">
                    If the email template is only applied for particular
                    locations, please select them
                  </p>
                </div>
                <div>
                  <label className="block text-base font-medium text-[#111927] mb-1.5">
                    Select Admin that can send this email
                  </label>
                  <CustomSelect placeholder="Select Admins" />
                  <p className="text-sm text-gray-400 mt-1.5 leading-relaxed">
                    If only particular admins would like to use this email
                    template, please select them
                  </p>
                </div>
              </div>

              {/* Category Types */}
              <div className="mt-3">
                <label className="block text-base font-medium text-[#111927] mb-1.5">
                  Category Types
                </label>
                <CustomSelect placeholder="Select Types" />
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Buttons */}
        <div className="flex justify-between pt-6 border-t mt-6">
          <button
            type="button"
            onClick={onBack}
            className="px-5 py-2 rounded-md border text-sm hover:bg-gray-50 cursor-pointer flex items-center gap-1"
          >
            <ArrowIcon className="h-3 w-3 rotate-180" />
            <span>Back</span>
          </button>
          <div className="flex gap-4">
            <button
              type="button"
              className="px-5 py-2 rounded-md border text-sm hover:bg-gray-50 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-md bg-gray-900 text-white text-sm hover:bg-black flex items-center gap-2 cursor-pointer"
            >
              <span>Next</span>
              <ArrowIcon className="h-3 w-3 rotate-360" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

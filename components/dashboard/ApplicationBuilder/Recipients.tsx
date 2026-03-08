"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { useForm } from "react-hook-form";

export default function Recipients({
  onNext,
  onBack,
}: {
  onNext?: () => void;
  onBack?: () => void;
}) {
  const { handleSubmit } = useForm();

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
        {/* Accordion */}
        <Accordion type="single" collapsible className="w-full space-y-3">
          {/* Sender */}
          <AccordionItem value="sender" className="border rounded-lg px-4 py-1">
            <AccordionTrigger className="text-sm font-medium">
              Who does this email come from, where do replies go. CC/BCC
            </AccordionTrigger>

            <AccordionContent className="pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  placeholder="From Email"
                  className="border rounded-md px-3 py-2 text-sm w-full"
                />

                <input
                  placeholder="Reply To"
                  className="border rounded-md px-3 py-2 text-sm w-full"
                />

                <input
                  placeholder="CC"
                  className="border rounded-md px-3 py-2 text-sm w-full"
                />

                <input
                  placeholder="BCC"
                  className="border rounded-md px-3 py-2 text-sm w-full"
                />
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Recipients */}
          <AccordionItem
            value="recipients"
            className="border rounded-lg px-4 py-1"
          >
            <AccordionTrigger className="text-sm font-medium">
              Control who receives this email
            </AccordionTrigger>

            <AccordionContent className="pt-4">
              <input
                placeholder="Recipient Email"
                className="border rounded-md px-3 py-2 text-sm w-full"
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Buttons */}
        <div className="flex justify-between pt-6 border-t mt-6">
          {/* Back */}
          <button
            type="button"
            onClick={onBack}
            className="px-5 py-2 rounded-md border text-sm hover:bg-gray-50 cursor-pointer"
          >
            ← Back
          </button>

          <div className="flex gap-4">
            {/* Cancel */}
            <button
              type="button"
              className="px-5 py-2 rounded-md border text-sm hover:bg-gray-50 cursor-pointer"
            >
              Cancel
            </button>

            {/* Next */}
            <button
              type="submit"
              className="px-6 py-2 rounded-md bg-[#111827] text-white text-sm hover:bg-black flex items-center gap-2 cursor-pointer"
            >
              Next →
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

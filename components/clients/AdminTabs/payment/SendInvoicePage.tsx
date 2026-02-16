"use client";

import SelecteInputField from "@/components/common/InputFiled/SelecteInputField";
import PageLink from "@/components/common/PageLink";
import ButtonReuseable from "@/components/reusable/CustomButton";
import { RichTextEditor } from "@/components/reusable/Editor";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import InformationIcon from "@/public/icon/InformationIcon";
import React from "react";
import { Controller, useForm } from "react-hook-form";

export default function SendInvoicePage() {
  const [popoverOpen, setPopoverOpen] = React.useState(false);
  const { register, control, handleSubmit } = useForm({
    defaultValues: {
      template: "",
      fromEmail: "",
      replyTo: "",
      subject: "",
      cc: "",
      bcc: "",
      content: "<p>Hello,</p>",
    },
  });

  const templateOptions = [
    { value: "default", label: "Default Template" },
    { value: "reminder", label: "Payment Reminder" },
  ];

  const onSubmit = (data: any) => {
    console.log("SendInvoice payload:", data);
    alert("Send action triggered (check console)");
  };

  return (
    <div className="">
      <PageLink path="/clients" title="Send Invoice" />
      <div className="bg-white rounded-2xl border p-4 md:p-6  mt-6">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="md:space-y-8 space-y-5"
        >
          <div>
            <h3 className="text-lg md:text-xl font-semibold">Send Email</h3>
            <p className="text-sm font-medium mt-4 mb-0.5">
              afsbf.sabrina@gmail.com
            </p>
            <div className="">
              <Controller
                control={control}
                name="template"
                render={({ field }) => (
                  <SelecteInputField
                    options={templateOptions}
                    value={field.value}
                    onValueChange={field.onChange}
                    placeholder="Select Template"
                  />
                )}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm">From Email</Label>
              <Input
                {...register("fromEmail")}
                placeholder="From Email"
                className="mt-2 h-11 md:h-12! bg-bgColor"
              />
            </div>
            <div>
              <Label className="text-sm">Reply To</Label>
              <Input
                {...register("replyTo")}
                placeholder="Reply To"
                className="mt-2 h-11 md:h-12! bg-bgColor"
              />
            </div>
            <div className="md:col-span-2">
              <Label className="text-sm">Subject</Label>
              <Input
                {...register("subject")}
                placeholder="Subject"
                className="mt-2 h-11 md:h-12! bg-bgColor"
              />
            </div>
          </div>

          <div>
            <p className="text-sm text-blueColor">
              Separate multiple emails with ; (eg: nanny1@hotmail.com;
              nanny2@hotmail.com )
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Input
                  {...register("cc")}
                  placeholder="CC"
                  className="mt-2 h-11 md:h-12! bg-bgColor"
                />
              </div>
              <div>
                <Input
                  {...register("bcc")}
                  placeholder="BCC"
                  className="mt-2 h-11 md:h-12! bg-bgColor"
                />
              </div>
            </div>
          </div>

          <div>
            <Label className="text-sm">Message</Label>
            <div className="mt-2">
              <Controller
                control={control}
                name="content"
                render={({ field }) => (
                  <RichTextEditor
                    toolbarClassName="rounded-t-lg bg-bgColor px-2 border-b border-borderColor"
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
            </div>
          </div>

          <div>
            <Label className="text-lg md:text-xl font-medium">
              Attachments
            </Label>
            <p className="text-sm md:text-base text-secondaryColor mt-1">
              The max attachment size is{" "}
              <span className="font-medium text-headerColor">10MB</span>. Emails
              with attachments larger than this will NOT send.
            </p>
            <div className="mt-3 flex items-center gap-3">
              <ButtonReuseable
                type="button"
                title="Add Attachment"
                className="px-3 py-2 bg-blackColor border rounded"
              />
              <InformationIcon className="w-5 h-5 text-blueColor" />
            </div>
          </div>

          <div className="flex items-center gap-3 mt-4">
            <ButtonReuseable
              title="Send"
              className="bg-blackColor text-whiteColor px-6!"
              type="submit"
            />
            <ButtonReuseable
              title="Schedule Send"
              className="bg-bgColor! text-blackColor! border border-borderColor font-semibold"
            />
            <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
              <PopoverTrigger asChild>
                <button
                  onMouseEnter={() => setPopoverOpen(true)}
                  onMouseLeave={() => setPopoverOpen(false)}
                  className="p-1 rounded hover:bg-bgColor"
                  type="button"
                >
                  <InformationIcon className="w-5 h-5 text-blueColor" />
                </button>
              </PopoverTrigger>
              <PopoverContent
                onMouseEnter={() => setPopoverOpen(true)}
                onMouseLeave={() => setPopoverOpen(false)}
                className="w-64"
              >
                <div className="text-sm font-medium">
                  How to schedule an email
                  <br />
                  for another time
                </div>
                <div className="my-2 border-t border-borderColor" />
                <ul className="text-sm space-y-1">
                  <li>Send in 1 hour</li>
                  <li>Send in 2 hours</li>
                  <li>Send in 3 hours</li>
                  <li>Send in 4 hours</li>
                  <li>Send in 6 hours</li>
                  <li>Send in 12 hours</li>
                  <li>Send in 24 hours</li>
                  <li>Send at a specific time</li>
                </ul>
              </PopoverContent>
            </Popover>
          </div>
        </form>
      </div>
    </div>
  );
}

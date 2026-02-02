"use client";
import SelecteInputField from "@/components/common/InputFiled/SelecteInputField";
import ButtonReuseable from "@/components/reusable/CustomButton";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import RootDialog from "../common/RootDialog";

type FormValues = {
  name: string;
  description: string;
  userStatus: string;
  partialPayment: boolean;
  paymentDate: string;
  paymentDays: number | "";
  autoProcess: boolean;
};

function CreateNewInvoiceForm({
  open,
  setOpen,
  data,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  data?: any;
}) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      name: data?.name || "",
      description: data?.description || "",
      userStatus: data?.userStatus || "",
      partialPayment: data?.partialPayment || false,
      paymentDate: data?.paymentDate || "",
      paymentDays: data?.paymentDays || "",
      autoProcess: false,
    },
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = (data: FormValues) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      reset();
      setOpen(false);
    }, 500);
    console.log("Create invoice", data);
  };
  const opts = [
    { value: "pre_application", label: "Pre Application" },
    {
      value: "application_started",
      label: "Application Started",
    },
    { value: "applied", label: "Applied" },
    {
      value: "application_approved",
      label: "Application Approved",
    },
    {
      value: "interview_complete",
      label: "Interview Complete",
    },
    { value: "profile_complete", label: "Profile Complete" },
    { value: "hired", label: "Hired" },
  ];

  return (
    <RootDialog open={open} setOpen={setOpen}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white rounded-lg p-6"
      >
        <div className="flex items-start justify-between">
          <h3 className="text-lg lg:text-2xl text-headerColor font-semibold">
            Create new invoice
          </h3>
        </div>

        <div className="mt-4 space-y-4">
          <div className="space-y-1.5">
            <Label className="text-sm text-headerColor font-medium">
              Name <span className="text-redColor">*</span>
            </Label>
            <Input
              {...register("name", { required: true })}
              placeholder="Enter your name"
              className="h-12 bg-bgColor"
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-sm text-headerColor font-medium">
              Description
            </Label>
            <Textarea
              {...register("description")}
              placeholder="Description of charge (this description will be included on the user's receipt)"
              className="min-h-[80px]"
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-sm text-headerColor font-medium">
              User Status to Update To
            </Label>
            {/* Replace these options with the status list you will provide */}
            {/** Example status options shown below */}
            <Controller
              control={control}
              name="userStatus"
              render={({ field }) => {
                return (
                  <SelecteInputField
                    options={opts}
                    value={field.value}
                    onValueChange={field.onChange}
                    placeholder="Select status"
                  />
                );
              }}
            />
          </div>

          <div className="flex items-center gap-3">
            <Checkbox {...register("partialPayment")} />
            <Label className="text-sm">Partial Payment</Label>
          </div>

          <div className="grid grid-cols-1  gap-4">
            <div className="space-y-1.5">
              <Label className="text-sm text-headerColor font-medium">
                Payment due (Date) <span className="text-redColor">*</span>
              </Label>
              <Input
                {...register("paymentDate", { required: true })}
                type="date"
                className="h-12 bg-bgColor"
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-sm text-headerColor font-medium">
                Payment due (Number of days after sending invoice){" "}
                <span className="text-redColor">*</span>
              </Label>
              <Input
                {...register("paymentDays", { valueAsNumber: true })}
                type="number"
                placeholder="Days"
                className="h-12 bg-bgColor"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Checkbox {...register("autoProcess")} />
            <Label className="text-sm text-headerColor ">
              Automatically try to process payment end of day on the invoice due
              date
            </Label>
          </div>
        </div>

        <div className="flex items-center gap-4 pt-5 border-t mt-6">
          <ButtonReuseable
            type="submit"
            title="Submit"
            sendingMsg="Creating..."
            loading={loading}
            className="bg-black text-white"
          />
          <ButtonReuseable
            type="button"
            title="Cancel"
            onClick={() => setOpen(false)}
            className="bg-bgColor! text-black! border"
          />
        </div>
      </form>
    </RootDialog>
  );
}

export default CreateNewInvoiceForm;

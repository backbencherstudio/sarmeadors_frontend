"use client";
import SelecteInputField from "@/components/common/InputFiled/SelecteInputField";
import ButtonReuseable from "@/components/reusable/CustomButton";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import RootDialog from "../common/RootDialog";

type FormValues = {
  description: string;
  paymentType: string;
};

function RecordPaymentForm({
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
      description: data?.description || "",
      paymentType: data?.paymentType || "",
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
    { value: "Cash", label: "Cash" },
    {
      value: "Check",
      label: "Check",
    },
    { value: "ACH", label: "ACH" },
    {
      value: "Credit Card",
      label: "Credit Card",
    },
  ];

  return (
    <RootDialog open={open} setOpen={setOpen}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white rounded-lg p-6"
      >
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg lg:text-2xl text-headerColor font-semibold">
              Record an off system payment
            </h3>
            <p className="text-secondaryColor text-sm mt-0.5">
              This is for recording a payment on the system that is not tied to
              cn on system payment processer [Cosh, Check etc„,)
            </p>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <div className="space-y-1.5">
            <Label className="text-sm text-headerColor font-medium">
              Payment Type
            </Label>
            {/* Replace these options with the status list you will provide */}
            {/** Example status options shown below */}
            <Controller
              control={control}
              name="paymentType"
              render={({ field }) => {
                return (
                  <SelecteInputField
                    options={opts}
                    value={field.value}
                    onValueChange={field.onChange}
                    placeholder="Select payment type here"
                  />
                );
              }}
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

export default RecordPaymentForm;

"use client";
import SelecteInputField from "@/components/common/InputFiled/SelecteInputField";
import ButtonReuseable from "@/components/reusable/CustomButton";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import ReusableInput from "../common/InputFiled/ReusableInput";
import ReusableTextarea from "../common/InputFiled/TextAreaField";
import RootDialog from "../common/RootDialog";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

type FormValues = {
  description: string;
  paymentType: string;
  amount: number | "";
  due_date: string;
};

function PartialPaymentForm({
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
      amount: data?.amount || "",
      due_date: data?.due_date || "",
    },
  });

  const [paymentMode, setPaymentMode] = useState<string>(
    (data?.paymentMode as string) || "credit_card",
  );

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
              Add new Item
            </h3>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <div>
            <ReusableInput
              label="Amount"
              required={true}
              type="number"
              {...register("amount", { valueAsNumber: true })}
              error={errors.amount ? "Amount is required" : ""}
            />
          </div>
          <div>
            <ReusableInput
              label="Due Date"
              required={true}
              type="date"
              {...register("due_date")}
              error={errors.due_date ? "Due date is required" : ""}
            />
          </div>
          <div>
            <Label className="text-base md:text-lg text-headerColor font-medium mb-2">
              Payment Method
            </Label>
            <RadioGroup value={paymentMode} onValueChange={setPaymentMode}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="credit_card" id="r1" />
                <Label htmlFor="r1">Credit Card</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="record_off_payment"
                  id="r2"
                  className=""
                />
                <Label htmlFor="r2">Record Off Payment</Label>
              </div>
            </RadioGroup>
          </div>

          {paymentMode === "record_off_payment" && (
            <div className="space-y-1.5">
              <Label className="text-sm text-headerColor font-medium">
                Select Payment Type Here
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
                      placeholder="typtng to filter"
                    />
                  );
                }}
              />
            </div>
          )}
          <div className="">
            <ReusableTextarea
              label="Description"
              {...register("description")}
              placeholder="Description of charge (this description will be included on the user's receipt)"
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

export default PartialPaymentForm;

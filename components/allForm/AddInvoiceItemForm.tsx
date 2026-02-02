"use client";

import { useForm } from "react-hook-form";
import ReusableInput from "../common/InputFiled/ReusableInput";
import RootDrawer from "../common/RootDrawer";
import ButtonReuseable from "../reusable/CustomButton";

type FormValues = {
  item: string;
  rate: number | "";
  quantity: number | "";
  discountValue: number | "";
  discountPercent: number | "";
  taxPercent: number | "";
};

export default function AddInvoiceItemForm({
  open,
  onClose,
}: {
  onClose?: (open: boolean) => void;
  open: boolean;
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      item: "",
      rate: "",
      quantity: "",
      discountValue: "",
      discountPercent: "",
      taxPercent: "",
    },
  });

  const submit = (data: FormValues) => {
    reset();
    onClose && onClose(false);
  };

  return (
    <RootDrawer open={open} setOpen={onClose}>
      <form onSubmit={handleSubmit(submit)} className="">
        <h3 className="text-xl md:text-2xl text-headerColor font-semibold mb-4">
          Add new Item
        </h3>

        <div className="space-y-4">
          <div>
            <ReusableInput
              {...register("item", { required: true })}
              label="Item"
              placeholder="Enter item name"
              error={errors.item ? "Item is required" : undefined}
              type="text"
              required={true}
            />
          </div>

          <div>
            <ReusableInput
              placeholder="Enter your rate"
              type="number"
              {...register("rate", { valueAsNumber: true })}
              label="Rate"
              required={true}
              error={errors.rate ? "Rate is required" : undefined}
            />
          </div>

          <div>
            <ReusableInput
              label="Quantity"
              placeholder="Enter quantity"
              required={true}
              type="number"
              {...register("quantity", { valueAsNumber: true })}
              error={errors.quantity ? "Quantity is required" : undefined}
            />
          </div>

          <div>
            <ReusableInput
              label="Discount Value"
              placeholder="Enter discount value"
              type="number"
              {...register("discountValue", { valueAsNumber: true })}
            />
          </div>

          <div>
            <ReusableInput
              placeholder="Enter discount percent"
              label="Discount Percent"
              type="number"
              {...register("discountPercent", { valueAsNumber: true })}
            />
          </div>

          <div>
            <ReusableInput
              placeholder="Enter tax percent"
              label="Tax Percent"
              type="number"
              {...register("taxPercent", { valueAsNumber: true })}
            />
          </div>
        </div>

        <div className="flex items-center gap-4 pt-5 border-t mt-6">
          <ButtonReuseable
            type="submit"
            title="Submit"
            sendingMsg="Creating..."
            className="bg-black text-white"
          />
          <ButtonReuseable
            type="button"
            title="Cancel"
            onClick={() => onClose && onClose(false)}
            className="bg-bgColor! text-black! border"
          />
        </div>
      </form>
    </RootDrawer>
  );
}

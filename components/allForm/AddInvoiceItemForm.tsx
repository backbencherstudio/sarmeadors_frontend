"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import ButtonReuseable from "../reusable/CustomButton";
import { Dialog, DialogContent } from "../ui/dialog";

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
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="p-6 max-w-2xl! w-full">
        <form onSubmit={handleSubmit(submit)} className="">
          <h3 className="text-xl md:text-2xl text-headerColor font-semibold mb-4">
            Add new Item
          </h3>

          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium text-headerColor">
                Item <span className="text-red-500">*</span>
              </Label>
              <Input
                {...register("item", { required: true })}
                className="mt-1 h-11 md:h-12! bg-bgColor"
              />
            </div>

            <div>
              <Label className="text-sm font-medium text-headerColor">
                Rate <span className="text-red-500">*</span>
              </Label>
              <Input
                type="number"
                {...register("rate", { valueAsNumber: true })}
                className="mt-1 h-11 md:h-12! bg-bgColor"
              />
            </div>

            <div>
              <Label className="text-sm font-medium text-headerColor">
                Quantity <span className="text-red-500">*</span>
              </Label>
              <Input
                type="number"
                {...register("quantity", { valueAsNumber: true })}
                className="mt-1 h-11 md:h-12! bg-bgColor"
              />
            </div>

            <div>
              <Label className="text-sm font-medium text-headerColor">
                Discount Value
              </Label>
              <Input
                type="number"
                {...register("discountValue", { valueAsNumber: true })}
                className="mt-1 h-11 md:h-12! bg-bgColor"
              />
            </div>

            <div>
              <Label className="text-sm font-medium text-headerColor">
                Discount Percent
              </Label>
              <Input
                type="number"
                {...register("discountPercent", { valueAsNumber: true })}
                className="mt-1 h-11 md:h-12! bg-bgColor"
              />
            </div>

            <div>
              <Label className="text-sm font-medium text-headerColor">
                Tax Percent
              </Label>
              <Input
                type="number"
                {...register("taxPercent", { valueAsNumber: true })}
                className="mt-1 h-11 md:h-12! bg-bgColor"
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
      </DialogContent>
    </Dialog>
  );
}

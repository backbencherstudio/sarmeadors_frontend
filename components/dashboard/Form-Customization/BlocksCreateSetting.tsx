import ReusableInput from "@/components/common/InputFiled/ReusableInput";
import ReusableTextarea from "@/components/common/InputFiled/TextAreaField";
import RootDrawer from "@/components/common/RootDrawer";
import ButtonReuseable from "@/components/reusable/CustomButton";
import { addBlock } from "@/feature/slice/applicationBuilder/ApplicationFormSlice";
import { PlusIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

function BlocksCreateSetting({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const { handleSubmit, register, reset } = useForm();
  const dispatch = useDispatch();

  const onSubmit = (data: any) => {
    dispatch(
      addBlock({
        id: Date.now().toString(),
        name: data.block_name,
        describe: data.short_description,
      }),
    );
    reset();
    setOpen(false);
  };
  return (
    <RootDrawer open={open} setOpen={setOpen}>
      <div className="p-4 md:p-6">
        <h2 className="text-xl md:text-2xl font-semibold text-headerColor">
          Add A Block
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-6 flex flex-col gap-4"
        >
          <ReusableInput
            label="Block Name"
            required
            placeholder="For example, 'Contact Information'"
            {...register("block_name", { required: "Block name is required" })}
          />
          <ReusableTextarea
            label="Short Description"
            placeholder="Enter a one line short description for  your user to understand the block"
            {...register("short_description")}
          />
          <div className="flex items-center justify-end gap-2">
            <ButtonReuseable
              title="Cancel"
              type="button"
              onClick={() => setOpen(false)}
              className="bg-grayColor1! border border-borderColor text-headerColor!"
            />
            <ButtonReuseable
              title="Add Block"
              type="submit"
              icon={<PlusIcon size={16} />}
              className=" "
            />
          </div>
        </form>
      </div>
    </RootDrawer>
  );
}

export default BlocksCreateSetting;

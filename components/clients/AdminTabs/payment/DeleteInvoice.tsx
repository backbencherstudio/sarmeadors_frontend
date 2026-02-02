import RootDialog from "@/components/common/RootDialog";
import ButtonReuseable from "@/components/reusable/CustomButton";

function DeleteInvoice({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  return (
    <RootDialog open={open} setOpen={setOpen} className="max-w-[664px]!">
      <div className="p-4 md:p-6">
        <h3 className="text-xl pt-10 md:text-2xl lg:text-3xl leading-[38px] max-w-[463px] mx-auto text-center text-headerColor font-semibold mb-4">
          Are you sure you want to delete the invoice hello Saiful?
        </h3>
        <div className="flex gap-2 justify-center items-center mt-10">
          <ButtonReuseable
            type="button"
            title="Delete"
            onClick={() => setOpen(false)}
            className="bg-destructive! font-semibold text-whiteColor! "
          />
          <ButtonReuseable
            type="button"
            title="Cancel"
            onClick={() => setOpen(false)}
            className="bg-bgColor! text-headerColor! font-semibold border border-borderColor "
          />
        </div>
      </div>
    </RootDialog>
  );
}

export default DeleteInvoice;

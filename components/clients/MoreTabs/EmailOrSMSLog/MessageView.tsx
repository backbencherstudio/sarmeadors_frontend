import RootDialog from "@/components/common/RootDialog";
import ReloadIcon from "@/components/icon/ReloadIcon";
import ButtonReuseable from "@/components/reusable/CustomButton";

function MessageView({
  data,
  open,
  setOpen,
}: {
  data: any;
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const body =
    data?.body ||
    `Hello Sabnna.\n\nThank you for contacting us! We would be glad to help you find a Nanny for your family.\n\nThe next step in this process is to access your client dashboard by visiting: Here IS the login page, Your username and password IS your email address, please change your password once you have logged in. Once you have logged in\n\nYou will See an option to Sign our Client Agreement, at which point we Will begin presenting you With nannies!\nPlease dont hesitate to reach out if you have any questions or issues, We are looking forward to working with your family`;

  return (
    <RootDialog open={open} setOpen={setOpen} className="max-w-4xl! w-full">
      <div className="p-6">
        <div className="mt-3 text-base space-y-3">
          <div>
            <span className="text-secondaryColor">Date: </span>
            <span className="font-medium">
              {data?.date || new Date().toString()}
            </span>
          </div>
          <div>
            <span className="text-secondaryColor">To: </span>
            <span className="font-medium">
              {data?.to || "ddellapo@gmail.com"}
            </span>
          </div>
          <div>
            <span className="text-secondaryColor">From: </span>
            <span className="font-medium">
              {data?.from || "sarah@nanniescoasttocoast.com"}
            </span>
          </div>
          <div>
            <span className="text-secondaryColor">Subject: </span>
            <span className="font-medium">
              {data?.subject || "Welcome to Coast to Coast Nannies"}
            </span>
          </div>
        </div>

        <div className="mt-6 pt-6 text-base">
          {body.split("\n\n").map((p: string, idx: number) => (
            <p key={idx} className="mb-4 leading-relaxed">
              {p}
            </p>
          ))}
        </div>

        <div className="mt-6 border-t pt-6">
          <ButtonReuseable
            icon={<ReloadIcon className="w-3.5 h-3.5 stroke-whiteColor" />}
            title="Re-Send"
            className="px-3! py-2! text-sm! font-semibold shadow-none! border!"
          />
        </div>
      </div>
    </RootDialog>
  );
}

export default MessageView;

import RootDialog from "@/components/common/RootDialog";
import { useGetMessageTemplateQuery } from "@/feature/slice/agency/processFlowSlice";

function EmailTemplateSate({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const { data: messageTemplates, isLoading: messageTemplateLoading } =
    useGetMessageTemplateQuery("client");

  console.log(messageTemplates);
  return <RootDialog open={open} setOpen={setOpen}>
     
  </RootDialog>;
}

export default EmailTemplateSate;

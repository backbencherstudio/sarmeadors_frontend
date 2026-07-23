import ReactSearchSelecteInput from "@/components/common/InputFiled/ReactSearchSelecteInput";
import RootDialog from "@/components/common/RootDialog";
import ButtonReuseable from "@/components/reusable/CustomButton";
import { Label } from "@/components/ui/label";
import {
  useCreateTemplateMutation,
  useGetMessageTemplateQuery,
  useUpdateTemplateMutation,
} from "@/feature/slice/agency/processFlowSlice";
import { useState } from "react";

function EmailTemplateSate({
  open,
  setOpen,
  isEditeTemplateOpen,
  selectedTemplateId,
  statusId,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  isEditeTemplateOpen?: boolean;
  selectedTemplateId?: number | null;
  statusId: number | string | null;
}) {
  const { data: messageTemplates, isLoading: messageTemplateLoading } =
    useGetMessageTemplateQuery("client");
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [createTemplate, { isLoading: isCreating }] =
    useCreateTemplateMutation();
  const [updateTemplate, { isLoading: isUpdating }] =
    useUpdateTemplateMutation();
  const templateOptions =
    messageTemplates?.data?.data?.map((template) => ({
      value: String(template.id),
      label: template.name,
    })) || [];

  const selectedData = messageTemplates?.data?.data?.find(
    (t) => String(t.id) === selectedTemplate,
  );
  console.log(selectedData);
  const handleSubmit = async () => {
    console.log(selectedData);
    if (!selectedData) return;
    try {
      if (isEditeTemplateOpen) {
        await updateTemplate({
          TmpId: selectedTemplateId,
          data: {
            status_id: statusId,
            template_id: selectedData.id,
            template_type: "email_template",
          },
        }).unwrap();
      } else {
        await createTemplate({
          status_id: statusId,
          template_id: selectedData.id,
          template_type: "email_template",
        }).unwrap();
      }
      setOpen(false);
    } catch (error) {
      console.error("Failed to save template:", error);
    }
  };

  return (
    <RootDialog open={open} setOpen={setOpen}>
      <div className="p-6 space-y-4">
        <h2 className="text-lg font-semibold">Select Email Template</h2>

        <div className="space-y-1.5 pb-10">
          <Label>Template</Label>
          <ReactSearchSelecteInput
            options={templateOptions}
            value={selectedTemplate}
            onChange={setSelectedTemplate}
            placeholder={
              messageTemplateLoading
                ? "Loading templates..."
                : "Select a template"
            }
            isDisabled={messageTemplateLoading}
          />
        </div>

        {selectedData && (
          <div className="space-y-2 rounded-lg border p-4 bg-gray-50">
            <p className="text-sm">
              <span className="font-medium">Subject:</span>{" "}
              {selectedData.subject}
            </p>
            <p className="text-sm">
              <span className="font-medium">Body:</span> {selectedData.body}
            </p>
          </div>
        )}

        <div className="flex justify-end pt-2">
          <ButtonReuseable
            title={isEditeTemplateOpen ? "Update" : "Submit"}
            onClick={handleSubmit}
            disabled={!selectedData}
            sendingMsg={"Saving..."}
            loading={isCreating || isUpdating}
          />
        </div>
      </div>
    </RootDialog>
  );
}

export default EmailTemplateSate;

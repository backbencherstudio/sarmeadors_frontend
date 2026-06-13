"use client";

import ReusableInput from "@/components/common/InputFiled/ReusableInput";
import ReusableTextarea from "@/components/common/InputFiled/TextAreaField";
import { updateFieldProperties } from "@/feature/slice/applicationBuilder/ApplicationFormSlice";
import { useDispatch } from "react-redux";

type Props = {
  activeBlockId: string;
  activeFieldId: string;
  activeSectionId?: string | null;
  activeField: any;
};

export default function PaymentInformationFieldSettings({
  activeBlockId,
  activeFieldId,
  activeSectionId,
  activeField,
}: Props) {
  const dispatch = useDispatch();

  const handlePropertyChange = (key: string, value: any) => {
    dispatch(
      updateFieldProperties({
        blockId: activeBlockId,
        sectionId: activeSectionId,
        fieldId: activeFieldId,
        key,
        value,
      }),
    );
  };

  return (
    <div className="space-y-3">
      <div className="space-y-4 rounded-lg border bg-white p-3">
        <ReusableInput
          required
          label={"Block Name"}
          value={activeField?.label || ""}
          onChange={(e) => handlePropertyChange("label", e.target.value)}
          className="w-full bg-bgColor text-sm"
        />

        <ReusableTextarea
          label="Short Description"
          value={activeField?.shortDescription || ""}
          onChange={(e) =>
            handlePropertyChange("shortDescription", e.target.value)
          }
          className="w-full bg-bgColor text-sm"
        />

        <label className="flex items-center gap-2 text-xs font-semibold text-gray-700">
          <input
            type="checkbox"
            checked={Boolean(activeField?.billingAddress)}
            onChange={(e) =>
              handlePropertyChange("billingAddress", e.target.checked)
            }
            className="h-4 w-4 rounded accent-blackColor cursor-pointer border-gray-300"
          />
          Billing Address
        </label>

        <label className="flex items-center gap-2 text-xs font-semibold text-gray-700">
          <input
            type="checkbox"
            checked={Boolean(activeField?.additionalNote)}
            onChange={(e) =>
              handlePropertyChange("additionalNote", e.target.checked)
            }
            className="h-4 w-4 rounded accent-blackColor cursor-pointer border-gray-300"
          />
          Add additional note
        </label>
      </div>
    </div>
  );
}

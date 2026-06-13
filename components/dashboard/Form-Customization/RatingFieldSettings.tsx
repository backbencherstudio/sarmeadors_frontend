"use client";

import SelecteInputField from "@/components/common/InputFiled/SelecteInputField";
import { updateFieldProperties } from "@/feature/slice/applicationBuilder/ApplicationFormSlice";
import { useDispatch } from "react-redux";

const ratingOptions = [1, 2, 3, 4, 5].map((v) => ({
  label: `${v} Star`,
  value: String(v),
}));

type Props = {
  activeBlockId: string;
  activeFieldId: string;
  activeSectionId?: string | null;
  activeField: any;
};

export default function RatingFieldSettings({
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
    <div className="space-y-3 border-t pt-3">
      <div>
        <label className="text-xs font-semibold text-gray-700">
          Maximum Rating
        </label>
        <SelecteInputField
          value={String(activeField.maxRating || 5)}
          onValueChange={(value) =>
            handlePropertyChange("maxRating", Number(value))
          }
          options={ratingOptions}
          className="mt-1 bg-bgColor text-sm focus:outline-black"
        />
      </div>
    </div>
  );
}

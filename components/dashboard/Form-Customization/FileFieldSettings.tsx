"use client";

import { updateFieldProperties } from "@/feature/slice/applicationBuilder/ApplicationFormSlice";
import { useDispatch } from "react-redux";

type Props = {
  activeBlockId: string;
  activeFieldId: string;
  activeSectionId?: string | null;
  activeField: any;
};

export default function FileFieldSettings({
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
      <label className="flex items-center gap-2 text-xs font-semibold text-gray-700">
        <input
          type="checkbox"
          checked={Boolean(activeField.listFile)}
          onChange={(e) => handlePropertyChange("listFile", e.target.checked)}
          className="h-4 w-4 rounded border-gray-300"
        />
        List File
      </label>

      {activeField.type === "file_additional" && (
        <label className="flex items-center gap-2 text-xs font-semibold text-gray-700">
          <input
            type="checkbox"
            checked={Boolean(activeField.additionalNote)}
            onChange={(e) =>
              handlePropertyChange("additionalNote", e.target.checked)
            }
            className="h-4 w-4 rounded border-gray-300"
          />
          Additional Note
        </label>
      )}
    </div>
  );
}

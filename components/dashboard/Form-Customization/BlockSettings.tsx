"use client";
import ReusableInput from "@/components/common/InputFiled/ReusableInput";
import { updateFieldProperties } from "@/feature/slice/applicationBuilder/ApplicationFormSlice";
import { useDispatch } from "react-redux";

interface Props {
  block: {
    id: string;
    name: string;
    describe?: string;
  };
}

export default function BlockSettings({ block }: Props) {
  const dispatch = useDispatch();

  const handleChange = (key: string, value: any) => {
    dispatch(
      updateFieldProperties({
        blockId: block.id,
        fieldId: null,
        sectionId: null,
        key: key as any,
        value,
      }),
    );
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-bold text-gray-900">Block Settings</h2>
      </div>

      <div className="space-y-4 p-3 rounded-lg border bg-whiteColor">
        <ReusableInput
          label="Block Name"
          value={block.name || ""}
          onChange={(e) => handleChange("name", e.target.value)}
          className="w-full bg-bgColor text-sm"
        />

        <div>
          <label className="text-xs font-bold text-gray-700">Description</label>
          <textarea
            value={block.describe || ""}
            onChange={(e) => handleChange("describe", e.target.value)}
            rows={3}
            className="w-full p-2 border rounded-md mt-1 bg-bgColor text-sm resize-none"
          />
        </div>
      </div>
    </div>
  );
}

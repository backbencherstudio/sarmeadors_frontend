"use client";

import ReusableInput from "@/components/common/InputFiled/ReusableInput";
import ButtonReuseable from "@/components/reusable/CustomButton";
import { updateFieldProperties } from "@/feature/slice/applicationBuilder/ApplicationFormSlice";
import DeleteIcon from "@/public/icon/DeleteIcon";
import { PlusIcon } from "lucide-react";
import { useDispatch } from "react-redux";

type Props = {
  activeBlockId: string;
  activeFieldId: string;
  activeSectionId?: string | null;
  activeField: any;
};

export default function DropdownFieldSettings({
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

  const items: string[] = activeField.items?.length
    ? activeField.items
    : ["Option 1", "Option 2"];

  const handleItemChange = (index: number, value: string) => {
    const next = [...items];
    next[index] = value;
    handlePropertyChange("items", next);
  };

  const handleAddItem = () => {
    handlePropertyChange("items", [...items, `Option ${items.length + 1}`]);
  };

  const handleDeleteItem = (index: number) => {
    handlePropertyChange(
      "items",
      items.filter((_, i) => i !== index),
    );
  };

  return (
    <div className="space-y-3 border-t pt-3">
      <label className="flex items-center gap-2 text-xs font-semibold text-gray-700">
        <input
          type="checkbox"
          checked={Boolean(activeField.multiSelect)}
          onChange={(e) => handlePropertyChange("multiSelect", e.target.checked)}
          className="h-4 w-4 rounded border-gray-300"
        />
        Select Multiple
      </label>

      <div>
        <p className="text-xs font-semibold text-gray-700 mb-2">Options</p>
        <div className="space-y-2">
          {items.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <ReusableInput
                value={item}
                onChange={(e) => handleItemChange(index, e.target.value)}
                containerClassName="flex-1 min-w-0"
                className="w-full bg-bgColor text-sm"
              />
              <button
                type="button"
                onClick={() => handleDeleteItem(index)}
                className="shrink-0 cursor-pointer text-red-500"
                aria-label={`Delete option ${index + 1}`}
              >
                <DeleteIcon className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>

        <ButtonReuseable
          type="button"
          onClick={handleAddItem}
          icon={<PlusIcon size={14} />}
          title="Add Option"
          className="mt-2 px-3.5! py-2.5! bg-bgColor! text-black! border rounded text-xs!"
        />
      </div>
    </div>
  );
}

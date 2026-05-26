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

export default function ChoiceFieldSettings({
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

  const handleAddItem = (label?: string) => {
    handlePropertyChange("items", [
      ...items,
      label ?? `Option ${items.length + 1}`,
    ]);
  };

  const handleDeleteItem = (index: number) => {
    handlePropertyChange(
      "items",
      items.filter((_, i) => i !== index),
    );
  };

  const layout: "horizontal" | "vertical" = activeField.layout ?? "vertical";

  return (
    <div className="space-y-3 border-t pt-3">
      <div>
        <p className="text-xs font-semibold text-gray-700 mb-2">Layout</p>
        <div className="flex gap-2">
          {(["vertical", "horizontal"] as const).map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => handlePropertyChange("layout", opt)}
              className={`flex-1 rounded border py-1.5 text-xs font-medium capitalize transition-colors ${
                layout === opt
                  ? "border-blackColor bg-blackColor text-whiteColor"
                  : "border-borderColor bg-bgColor text-headerColor"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {activeField.type === "radio" && (
        <label className="flex items-center gap-2 text-xs font-semibold text-gray-700">
          <input
            type="checkbox"
            checked={Boolean(activeField.yesNo)}
            onChange={(e) => handlePropertyChange("yesNo", e.target.checked)}
            className="h-4 w-4 rounded border-gray-300"
          />
          Yes / No Mode
        </label>
      )}

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

        <div className="mt-2 flex flex-wrap gap-2">
          <ButtonReuseable
            type="button"
            onClick={() => handleAddItem()}
            icon={<PlusIcon size={14} />}
            title="Add Option"
            className="px-3.5! py-2.5! bg-bgColor! text-black! border rounded text-xs!"
          />
          <ButtonReuseable
            type="button"
            onClick={() => handleAddItem("Others")}
            icon={<PlusIcon size={14} />}
            title="Add 'Others'"
            className="px-3.5! py-2.5! bg-bgColor! text-black! border rounded text-xs!"
          />
        </div>
      </div>
    </div>
  );
}

"use client";

import ReusableInput from "@/components/common/InputFiled/ReusableInput";
import SelecteInputField from "@/components/common/InputFiled/SelecteInputField";
import ButtonReuseable from "@/components/reusable/CustomButton";
import { updateFieldProperties } from "@/feature/slice/applicationBuilder/ApplicationFormSlice";
import { FORM_ELEMENT_CATEGORIES } from "@/public/custom/CustomFormElement";
import DeleteIcon from "@/public/icon/DeleteIcon";
import { ChevronDown, ChevronUp, PlusIcon } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";

const fieldTypeOptions = FORM_ELEMENT_CATEGORIES.flatMap((category) =>
  category.items
    .filter((item) => item.type !== "section")
    .map((item) => ({
      label: item.label,
      value: item.type,
    })),
);

const ratingOptions = [1, 2, 3, 4, 5].map((value) => ({
  label: `${value} Star`,
  value: String(value),
}));

type RatingGroupSettingsColumnProps = {
  activeBlockId: string;
  activeFieldId: string;
  activeField: any;
  activeSectionId?: string | null;
};

export default function RatingGroupSettingsColumn({
  activeBlockId,
  activeFieldId,
  activeField,
  activeSectionId,
}: RatingGroupSettingsColumnProps) {
  const dispatch = useDispatch();
  const [isItemsOpen, setIsItemsOpen] = useState(true);

  const handlePropertyChange = (key: string, value: any) => {
    dispatch(
      updateFieldProperties({
        blockId: activeBlockId,
        sectionId: activeSectionId,
        fieldId: activeFieldId,
        key: key as any,
        value,
      }),
    );
  };

  const items = activeField.items?.length
    ? activeField.items
    : ["Review 1", "Review 2", "Review 3"];

  const handleItemChange = (index: number, value: string) => {
    const nextItems = [...items];
    nextItems[index] = value;
    handlePropertyChange("items", nextItems);
  };

  const handleAddItem = () => {
    handlePropertyChange("items", [...items, `Review ${items.length + 1}`]);
  };

  const handleDeleteItem = (index: number) => {
    handlePropertyChange(
      "items",
      items.filter((_, itemIndex) => itemIndex !== index),
    );
  };

  return (
    <div className="space-y-3">
      <div>
        <h2 className="text-lg font-bold text-gray-900">Fields</h2>
      </div>

      <div className="space-y-4 rounded-lg border bg-whiteColor p-3">
        <div>
          <h3 className="text-sm font-semibold text-headerColor">
            {activeField.label || "Rating Group"}
          </h3>
        </div>

        <div>
          <label className="text-xs font-semibold text-gray-700">
            Field Type <span className="text-red-500">*</span>
          </label>
          <SelecteInputField
            value={activeField.type || "rating_group"}
            onValueChange={(value) => handlePropertyChange("type", value)}
            options={fieldTypeOptions}
            className="mt-1 bg-bgColor text-sm focus:outline-black"
          />
        </div>

        <ReusableInput
          label={"Field Label"}
          value={activeField.label || ""}
          onChange={(e) => handlePropertyChange("label", e.target.value)}
          className="w-full bg-bgColor text-sm"
        />

        {/* <ReusableInput
          label={"Profile Label"}
          value={activeField.profileLabel || ""}
          onChange={(e) => handlePropertyChange("profileLabel", e.target.value)}
          placeholder="Label that you want to show in profile"
          className="w-full bg-bgColor text-sm"
        /> */}

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

        <label className="flex items-center gap-2 text-xs font-semibold text-gray-700">
          <input
            type="checkbox"
            onChange={(e) => handlePropertyChange("required", e.target.checked)}
            className="h-4 w-4 rounded border-gray-300"
          />
          Keep Mandatory
        </label>

        <div className="border-t pt-3">
          <button
            type="button"
            className="flex w-full items-center justify-between rounded-md px-1 py-1 text-left text-sm font-semibold text-headerColor"
          >
            <span>Items</span>
            {isItemsOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>

          {isItemsOpen && (
            <div className="mt-3 space-y-2">
              {items.map((item: string, index: number) => (
                <div key={index} className="flex w-full items-center gap-2">
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
                    aria-label={`Delete item ${index + 1}`}
                  >
                    <DeleteIcon className="h-4 w-4" />
                  </button>
                </div>
              ))}

              <ButtonReuseable
                type="button"
                onClick={handleAddItem}
                icon={<PlusIcon size={14} />}
                title="Add Another"
                className="px-3.5! py-2.5! bg-bgColor! text-black! border rounded text-xs!"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

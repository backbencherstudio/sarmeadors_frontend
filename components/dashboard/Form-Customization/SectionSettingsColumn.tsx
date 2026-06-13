"use client";

import ReusableInput from "@/components/common/InputFiled/ReusableInput";
import SelecteInputField from "@/components/common/InputFiled/SelecteInputField";
import ButtonReuseable from "@/components/reusable/CustomButton";
import {
  addInputToSection,
  removeSectionInputs,
  setActiveField,
  updateFieldProperties,
} from "@/feature/slice/applicationBuilder/ApplicationFormSlice";
import { FORM_ELEMENT_CATEGORIES } from "@/public/custom/CustomFormElement";
import DeleteIcon from "@/public/icon/DeleteIcon";
import { PlusIcon } from "lucide-react";
import { useDispatch } from "react-redux";

const fieldTypeOptions = FORM_ELEMENT_CATEGORIES.flatMap((category) =>
  category.items
    .filter((item) => item.type !== "section")
    .map((item) => ({
      label: item.label,
      value: item.type,
    })),
);

type SectionSettingsColumnProps = {
  activeBlockId: string;
  activeSectionId: string;
  activeSection: any;
  activeFieldId: string | null;
};

export default function SectionSettingsColumn({
  activeBlockId,
  activeSectionId,
  activeSection,
  activeFieldId,
}: SectionSettingsColumnProps) {
  const dispatch = useDispatch();

  const handleSectionUpdate = (key: string, value: any) => {
    dispatch(
      updateFieldProperties({
        blockId: activeBlockId,
        sectionId: activeSectionId,
        fieldId: null,
        key,
        value,
      }),
    );
  };

  const handleFieldUpdate = (fieldId: string, key: string, value: any) => {
    dispatch(
      updateFieldProperties({
        blockId: activeBlockId,
        sectionId: activeSectionId,
        fieldId,
        key,
        value,
      }),
    );
  };

  const handleAddField = () => {
    const newField = {
      id: `field_${Date.now()}`,
      type: "text",
      label: "New Field",
      placeholder: "",
      required: false,
      width: "1" as const,
    };

    dispatch(
      addInputToSection({
        blockId: activeBlockId,
        sectionId: activeSectionId,
        input: newField,
      }),
    );
    dispatch(
      setActiveField({ sectionId: activeSectionId, fieldId: newField.id }),
    );
  };

  return (
    <div className="space-y-3">
      <div>
        <h2 className="text-lg font-bold text-gray-900">Fields</h2>
      </div>

      <div className="space-y-4  ">
        <div className="border-b pb-4">
          <ReusableInput
            required
            label={"Section Name"}
            value={activeSection?.label || ""}
            onChange={(e) => handleSectionUpdate("label", e.target.value)}
          />
        </div>

        <div className="space-y-3">
          {activeSection?.inputs?.map((input: any) => {
            const isExpanded = activeFieldId === input.id;

            return (
              <div key={input.id} className="rounded-lg border bg-white">
                <div className="flex items-center px-3 py-3 justify-between">
                  <button
                    type="button"
                    onClick={() =>
                      dispatch(
                        setActiveField({
                          sectionId: activeSectionId,
                          fieldId: input.id,
                        }),
                      )
                    }
                    className={`w-full cursor-pointer text-left  text-base font-medium transition-colors text-headerColor`}
                  >
                    {input.label || input.type}
                  </button>
                  <button
                    type="button"
                    className="cursor-pointer"
                    onClick={() =>
                      dispatch(
                        removeSectionInputs({
                          blockId: activeBlockId,
                          sectionId: activeSectionId,
                          inputId: input.id,
                        }),
                      )
                    }
                  >
                    <DeleteIcon className="w-4 h-4 text-redColor" />
                  </button>
                </div>

                {isExpanded && (
                  <div className="space-y-3  bg-white px-3 pb-3">
                    <div>
                      <label className="text-xs font-semibold text-gray-700">
                        Field Type
                      </label>
                      <SelecteInputField
                        value={input.type || "text"}
                        onValueChange={(value) =>
                          handleFieldUpdate(input.id, "type", value)
                        }
                        options={fieldTypeOptions}
                        className="mt-1 bg-bgColor text-sm focus:outline-black"
                      />
                    </div>

                    <ReusableInput
                      label={"Field Label"}
                      value={input.label || ""}
                      onChange={(e) =>
                        handleFieldUpdate(input.id, "label", e.target.value)
                      }
                      className="w-full bg-bgColor text-sm"
                    />

                    <ReusableInput
                      label={"Profile Label"}
                      value={input.profileLabel || ""}
                      onChange={(e) =>
                        handleFieldUpdate(
                          input.id,
                          "profileLabel",
                          e.target.value,
                        )
                      }
                      placeholder="Label shown on profile"
                      className="w-full bg-bgColor text-sm"
                    />

                    {input.type !== "file" &&
                      input.type !== "file_additional" && (
                        <ReusableInput
                          label={"Placeholder"}
                          value={input.placeholder || ""}
                          onChange={(e) =>
                            handleFieldUpdate(
                              input.id,
                              "placeholder",
                              e.target.value,
                            )
                          }
                          className="w-full bg-bgColor text-sm"
                        />
                      )}

                    {input.type !== "section" && (
                      <label className="flex items-center gap-2 text-xs pt-1 font-semibold text-gray-700">
                        <input
                          type="checkbox"
                          checked={Boolean(input.required)}
                          onChange={(e) =>
                            handleFieldUpdate(
                              input.id,
                              "required",
                              e.target.checked,
                            )
                          }
                          className="h-4 w-4 rounded accent-blackColor cursor-pointer border-gray-300"
                        />
                        Keep Mandatory
                      </label>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <ButtonReuseable
          type="button"
          onClick={handleAddField}
          icon={<PlusIcon size={14} />}
          title=" Add"
          className="px-3.5! py-2.5! bg-bgColor! text-black! border rounded text-xs!"
        />
      </div>
    </div>
  );
}

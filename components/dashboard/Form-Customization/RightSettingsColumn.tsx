"use client";
import ReusableInput from "@/components/common/InputFiled/ReusableInput";
import SelecteInputField from "@/components/common/InputFiled/SelecteInputField";
import { updateFieldProperties } from "@/feature/slice/applicationBuilder/ApplicationFormSlice";
import { FORM_ELEMENT_CATEGORIES } from "@/public/custom/CustomFormElement";
import { useDispatch, useSelector } from "react-redux";
import IntroductionSettings from "./Introductionsettings";
import RatingGroupSettingsColumn from "./RatingGroupSettingsColumn";
import SectionSettingsColumn from "./SectionSettingsColumn";

const fieldTypeOptions = FORM_ELEMENT_CATEGORIES.flatMap((category) =>
  category.items
    .filter((item) => item.type !== "section")
    .map((item) => ({
      label: item.label,
      value: item.type,
    })),
);

export default function RightSettingsColumn() {
  const dispatch = useDispatch();
  const activeBlockId = useSelector(
    (state: any) => state.applicationForm.activeBlockId,
  );
  const activeSectionId = useSelector(
    (state: any) => state.applicationForm.activeSectionId,
  );
  const activeFieldId = useSelector(
    (state: any) => state.applicationForm.activeFieldId,
  );
  const activeBlock = useSelector((state: any) =>
    state.applicationForm.blocks.find((b: any) => b.id === activeBlockId),
  );
  const activeSection = activeBlock?.fields.find(
    (f: any) => f.id === activeSectionId,
  );

  const activeField = useSelector((state: any) => {
    const block = state.applicationForm.blocks.find(
      (b: any) => b.id === activeBlockId,
    );
    if (activeSectionId) {
      const section = block?.fields.find((f: any) => f.id === activeSectionId);
      return section?.inputs?.find((i: any) => i.id === activeFieldId);
    }
    return block?.fields.find((f: any) => f.id === activeFieldId);
  });

  const handlePropertyChange = (key: string, value: any) => {
    if (!activeBlockId || !activeFieldId) return;
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

  return (
    <div className="max-w-75  w-full h-full bg-grayColor1 flex flex-col">
      <div className="py-4 px-4 border-b border-borderColor">
        <h2 className="text-lg font-semibold text-headerColor md:text-xl">
          Elements
        </h2>
      </div>

      <div className="p-4 flex-1 overflow-y-auto">
        {activeBlock?.type === "introduction" ||
        activeBlock?.name === "Introduction" ? (
          <IntroductionSettings block={activeBlock} />
        ) : activeField?.type === "rating_group" ? (
          <RatingGroupSettingsColumn
            activeBlockId={activeBlockId}
            activeFieldId={activeFieldId}
            activeField={activeField}
            activeSectionId={activeSectionId}
          />
        ) : activeField ? (
          <div className="space-y-3">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Fields</h2>
            </div>
            <div className="space-y-4 p-3 rounded-lg border bg-whiteColor">
              {activeBlock?.type !== "section" && (
                <div>
                  <label className="text-xs font-semibold text-gray-700">
                    Field Type
                  </label>
                  <SelecteInputField
                    value={activeField.type || "text"}
                    onValueChange={(value) =>
                      handlePropertyChange("type", value)
                    }
                    options={fieldTypeOptions}
                    className="mt-1 bg-bgColor text-sm focus:outline-black"
                  />
                </div>
              )}

              <div>
                <ReusableInput
                  label={"Field Label"}
                  value={activeField.label || ""}
                  onChange={(e) =>
                    handlePropertyChange("label", e.target.value)
                  }
                  className="w-full bg-bgColor text-sm"
                />
              </div>
              {activeField.type !== "section" &&
                activeField.type !== "file" && (
                  <div>
                    <ReusableInput
                      label={"Placeholder"}
                      value={activeField.placeholder || ""}
                      onChange={(e) =>
                        handlePropertyChange("placeholder", e.target.value)
                      }
                      className="w-full bg-bgColor text-sm"
                    />
                  </div>
                )}

              {activeField.type !== "section" && (
                <label className="flex items-center gap-2 text-xs font-semibold text-gray-700">
                  <input
                    type="checkbox"
                    checked={Boolean(activeField.required)}
                    onChange={(e) =>
                      handlePropertyChange("required", e.target.checked)
                    }
                    className="h-4 w-4 rounded border-gray-300"
                  />
                  Keep Mandatory
                </label>
              )}
            </div>
          </div>
        ) : activeSection ? (
          <SectionSettingsColumn
            activeBlockId={activeBlockId}
            activeSectionId={activeSectionId}
            activeSection={activeSection}
            activeFieldId={activeFieldId}
          />
        ) : (
          <div className="text-center py-12 text-gray-400 text-sm">
            Select any input field or section to configure its properties.
          </div>
        )}
      </div>
    </div>
  );
}

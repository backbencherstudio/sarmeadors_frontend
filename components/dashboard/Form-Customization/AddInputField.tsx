"use client";

import RootDialog from "@/components/common/RootDialog";
import {
  addFieldToBlock,
  InputField,
} from "@/feature/slice/applicationBuilder/ApplicationFormSlice";
import {
  ElementItem,
  FORM_ELEMENT_CATEGORIES,
} from "@/public/custom/CustomFormElement";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddInputFieldPreview from "./AddInputFieldPreview";

interface AddInputFieldProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function AddInputField({ open, setOpen }: AddInputFieldProps) {
  const dispatch = useDispatch();
  const activeBlockId = useSelector(
    (state: any) => state.applicationForm.activeBlockId,
  );

  const [selectedElement, setSelectedElement] = useState<ElementItem>(
    FORM_ELEMENT_CATEGORIES[0].items[0],
  );
  const [fieldLabel, setFieldLabel] = useState("");
  const [fieldPlaceholder, setFieldPlaceholder] = useState("");
  const [isMandatory, setIsMandatory] = useState(false);

  useEffect(() => {
    setFieldLabel(selectedElement.label);
    setFieldPlaceholder("Enter placeholder text");
    setIsMandatory(false);
  }, [selectedElement]);

  const handleAddField = () => {
    if (!activeBlockId) return;

    const defaultSectionInputs: InputField[] = [1, 2, 3, 4].map((index) => ({
      id: `title_field_${index}_${Date.now()}`,
      type: "text",
      label: `Title Field ${index}`,
      placeholder: `Enter Title Field ${index}`,
      required: false,
      width: "1/2",
    }));

    if (selectedElement.type === "section") {
      const sectionField = {
        id: `${selectedElement.id}_${Date.now()}`,
        type: "section",
        label: fieldLabel || selectedElement.label,
        isSection: true,
        inputs: defaultSectionInputs,
      };

      dispatch(
        addFieldToBlock({ blockId: activeBlockId, field: sectionField }),
      );
      setOpen(false);
      return;
    }

    const newFieldData: InputField & { options?: string[]; items?: string[] } =
      {
        id: `${selectedElement.id}_${Date.now()}`,
        type: selectedElement.type,
        label: fieldLabel || selectedElement.label,
        placeholder: fieldPlaceholder,
        required: isMandatory,
        width: "1",
        ...(selectedElement.options
          ? { options: selectedElement.options }
          : {}),
        ...(selectedElement.items ? { items: selectedElement.items } : {}),
      };

    dispatch(addFieldToBlock({ blockId: activeBlockId, field: newFieldData }));
    setOpen(false);
  };

  return (
    <RootDialog open={open} setOpen={setOpen}>
      <div className="flex h-[80vh] max-h-[650px] w-full max-w-5xl overflow-hidden rounded-xl bg-white shadow-2xl">
        {/* --- LEFT NAVIGATION PANEL --- */}
        <div className="w-64 border-r border-gray-100 bg-gray-50/60 flex flex-col h-full">
          <div className="p-4 border-b bg-white">
            <h3 className="font-bold text-gray-900 text-sm">Notes</h3>
          </div>

          <div className="flex-1 overflow-y-auto p-2 space-y-4 custom-scrollbar">
            {FORM_ELEMENT_CATEGORIES.map((category) => (
              <div key={category.category} className="space-y-1">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider px-3 block pt-2">
                  {category.category}
                </span>
                {category.items.map((item) => {
                  const isSelected = selectedElement.id === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setSelectedElement(item)}
                      className={`w-full text-left px-3 py-2.5 text-xs font-medium rounded-lg transition-all flex items-center gap-2 ${
                        isSelected
                          ? "bg-headerColor text-white shadow-sm font-semibold"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* --- RIGHT LIVE PREVIEW & INTEGRATED SETTINGS WINDOW --- */}
        <div className="flex-1 flex flex-col h-full bg-white">
          <div className="p-4 border-b">
            <h3 className="font-semibold text-gray-800 text-sm">
              Preview & Settings
            </h3>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-6 flex flex-col justify-between">
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">
                  {selectedElement.label}
                </h2>
                <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">
                  {selectedElement.description}
                </p>
              </div>

              {/* Dynamic Presentation Card Area */}
              <div className="p-4 border border-gray-100 rounded-2xl bg-white shadow-2xs ">
                <AddInputFieldPreview
                  element={selectedElement}
                  label={fieldLabel}
                  placeholder={fieldPlaceholder}
                />
              </div>
            </div>

            {/* Execution Control Footer */}
            <div className="pt-4 border-t border-gray-100 flex items-center justify-between bg-white">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 text-xs font-semibold border rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddField}
                className="px-6 py-2.5 text-xs font-semibold bg-[#111827] text-white rounded-lg hover:bg-black transition-colors"
              >
                {selectedElement.type === "section"
                  ? "+ Add Section"
                  : "+ Add Field"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </RootDialog>
  );
}

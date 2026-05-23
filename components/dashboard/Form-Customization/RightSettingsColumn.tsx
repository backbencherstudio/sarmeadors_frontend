"use client";
import { updateFieldProperties } from "@/feature/slice/applicationBuilder/ApplicationFormSlice";
import { useDispatch, useSelector } from "react-redux";

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
  // বর্তমানে একটিভ বা সিলেক্টেড ফিল্ড অবজেক্ট বের করা
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
  const handleLiveChange = (key: string, value: any) => {
    dispatch(
      updateFieldProperties({
        blockId: activeBlockId,
        fieldId: activeBlockId, 
        key: key as any,
        value,
      }),
    );
  };

  return (
    <div className="max-w-75  w-full h-full bg-grayColor1 flex flex-col">
      <div className="py-4 px-4 border-b border-borderColor">
        <h2 className="text-lg font-semibold text-headerColor md:text-xl">
          Settings
        </h2>
      </div>

      <div className="p-4 flex-1 overflow-y-auto">
        {activeBlock.name === "Introduction" ? (
          <div className="space-y-4 text-sm">
            {/* Logo Section */}
            <div className="p-3 border rounded-lg bg-white flex flex-col items-center gap-2">
              <div className="w-full h-20 border border-dashed rounded flex items-center justify-center text-gray-400 bg-gray-50">
                Logo Preview
              </div>
              <div className="flex justify-between w-full text-xs font-semibold text-gray-500">
                <button className="text-red-500">Delete</button>
                <button className="text-black">Change logo</button>
              </div>
            </div>

            {/* Title Input */}
            <div>
              <label className="text-xs font-bold text-gray-700">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={activeBlock.title || ""}
                onChange={(e) => handleLiveChange("title", e.target.value)}
                className="w-full p-2 border rounded-md mt-1 bg-white text-sm"
              />
            </div>

            {/* Description Input */}
            <div>
              <label className="text-xs font-bold text-gray-700">
                Description
              </label>
              <textarea
                value={activeBlock.description || ""}
                onChange={(e) =>
                  handleLiveChange("description", e.target.value)
                }
                rows={3}
                className="w-full p-2 border rounded-md mt-1 bg-white text-sm resize-none"
              />
            </div>

            {/* Add Button Config Toggle / Section */}
            <div className="border-t pt-3 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-gray-700">
                  Add Button
                </span>
                <button className="text-gray-400">-</button>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500">
                  Label *
                </label>
                <input
                  type="text"
                  value={activeBlock.buttonLabel || ""}
                  onChange={(e) =>
                    handleLiveChange("buttonLabel", e.target.value)
                  }
                  className="w-full p-2 border rounded-md mt-1 bg-white text-xs"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500">
                  Add Link *
                </label>
                <input
                  type="text"
                  value={activeBlock.buttonLink || ""}
                  onChange={(e) =>
                    handleLiveChange("buttonLink", e.target.value)
                  }
                  placeholder="Add a link"
                  className="w-full p-2 border rounded-md mt-1 bg-white text-xs"
                />
              </div>
            </div>
          </div>
        ) : activeField ? (
          <div className="space-y-4">
            <div className="bg-white p-3 rounded-lg border text-xs text-gray-500 font-mono">
              Type:{" "}
              <span className="font-bold uppercase text-black">
                {activeField.type}
              </span>
            </div>

            {/* Field Label Input */}
            <div>
              <label className="text-xs font-semibold text-gray-700">
                Field Label
              </label>
              <input
                type="text"
                value={activeField.label || ""}
                onChange={(e) => handlePropertyChange("label", e.target.value)}
                className="w-full p-2 border rounded-md mt-1 bg-white text-sm focus:outline-black"
              />
            </div>

            {/* Placeholder Input (যদি সেকশন না হয়) */}
            {activeField.type !== "section" && (
              <div>
                <label className="text-xs font-semibold text-gray-700">
                  Placeholder
                </label>
                <input
                  type="text"
                  value={activeField.placeholder || ""}
                  onChange={(e) =>
                    handlePropertyChange("placeholder", e.target.value)
                  }
                  className="w-full p-2 border rounded-md mt-1 bg-white text-sm focus:outline-black"
                />
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-400 text-sm">
            Select any input field or section to configure its properties.
          </div>
        )}
      </div>
    </div>
  );
}

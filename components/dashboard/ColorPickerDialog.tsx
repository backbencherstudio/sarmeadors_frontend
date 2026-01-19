"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { SketchPicker } from "react-color";

interface ColorPickerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (textColor: string, backgroundColor: string) => void;
  initialTextColor: string;
  initialBackgroundColor: string;
}

export default function ColorPickerDialog({
  open,
  onOpenChange,
  onSave,
  initialTextColor,
  initialBackgroundColor,
}: ColorPickerDialogProps) {
  const [activeTab, setActiveTab] = useState<"text" | "background">("text");
  const [textColor, setTextColor] = useState(initialTextColor);
  const [backgroundColor, setBackgroundColor] = useState(
    initialBackgroundColor,
  );

  const currentColor = activeTab === "text" ? textColor : backgroundColor;

  const handleColorChange = (color: any) => {
    const hex = color.hex;
    if (activeTab === "text") {
      setTextColor(hex);
    } else {
      setBackgroundColor(hex);
    }
  };

  if (!open) return null;

  return (
    <div>
      {/* Preview Section */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <div className="text-sm font-medium text-gray-700">Preview</div>
          <div
            className="px-3 py-1 rounded text-xs font-semibold text-white"
            style={{ color: textColor, backgroundColor: backgroundColor }}
          >
            {activeTab === "text" ? "Text Color" : "Background"}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex justify-between  w-full gap-4 mb-6 border-b">
        <button
          onClick={() => setActiveTab("text")}
          className={`pb-2 text-sm font-medium transition relative ${
            activeTab === "text" ? "text-gray-900" : "text-gray-500"
          }`}
        >
          Text Color
          {activeTab === "text" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900" />
          )}
        </button>
        <button
          onClick={() => setActiveTab("background")}
          className={`pb-2 text-sm font-medium transition relative ${
            activeTab === "background" ? "text-gray-900" : "text-gray-500"
          }`}
        >
          Background
          {activeTab === "background" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900" />
          )}
        </button>
      </div>

      {/* Chrome Color Picker */}
      <div className="mb-4 flex w-full justify-center">
        <SketchPicker
          color={currentColor}
          onChange={handleColorChange}
          width="100%"
        />
      </div>

      {/* Buttons */}
      <div className="flex gap-2 justify-end">
        <Button
          variant="outline"
          onClick={() => onOpenChange(false)}
          className="px-6"
        >
          Cancel
        </Button>
        <Button
          onClick={() => onSave(textColor, backgroundColor)}
          className="px-6 bg-gray-900 text-white hover:bg-gray-800"
        >
          OK
        </Button>
      </div>
    </div>
  );
}

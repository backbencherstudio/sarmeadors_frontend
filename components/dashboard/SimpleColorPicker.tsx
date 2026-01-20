"use client";

interface SimpleColorPickerProps {
  status: {
    id: string;
    color: string;
    name: string;
    textColor?: string;
    backgroundColor?: string;
  };
  statusColors: Array<{ name: string; value: string }>;
  onColorChange: (statusId: string, color: string) => void;
  onCustomizeClick: (statusId: string) => void;
  onResetClick: (statusId: string) => void;
}

export default function SimpleColorPicker({
  status,
  statusColors,
  onColorChange,
  onCustomizeClick,
  onResetClick,
}: SimpleColorPickerProps) {
  return (
    <div className="">
      {/* Colors Header */}
      <p className="text-xs font-semibold text-gray-700 mb-4">Colours</p>

      {/* Color Grid */}
      <div className="space-y-3 mb-4">
        {/* Row 1 - First 8 colors */}
        <div className="flex gap-1 flex-wrap justify-start">
          {statusColors.map((colorOption) => (
            <button
              key={colorOption.value}
              onClick={() => onColorChange(status.id, colorOption.value)}
              className="flex cursor-pointer items-center justify-center p-0.5 rounded-full hover:scale-110 transition-transform"
              title={colorOption.name}
            >
              <div
                className={`w-5 h-5 rounded-full border-2 transition ${
                  status.backgroundColor === colorOption.value
                    ? "  rounded-full border border-black shadow-md"
                    : "border-gray-300"
                }`}
                style={{
                  backgroundColor: colorOption.value,
                }}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Customise Button */}
      <div className="flex justify-between items-center gap-2 mb-4">
        <button
          onClick={() => onCustomizeClick(status.id)}
          className="text-sm cursor-pointer text-green-600 hover:text-green-800 font-medium"
        >
          Customise
        </button>
        {/* Customise Color Circle */}
        <div className="w-5 h-5 rounded-full border-2 border-gray-300">
          <div
            className="w-full h-full rounded-full"
            style={{
              background: `conic-gradient(red, yellow, lime, cyan, blue, magenta, red)`,
            }}
          />
        </div>
      </div>

      {/* Reset Button */}
      <button
        onClick={() => onResetClick(status.id)}
        className="w-full text-sm cursor-pointer font-medium text-headerColor  py-2 rounded-lg border border-borderColor hover:bg-gray-100 transition mb-4"
      >
        Reset
      </button>

      {/* Preview Section */}
      <div className="border-t pt-4 flex items-center gap-2">
        <p className="text-sm font-medium text-headerColor ">Preview</p>
        <div
          className="px-1.5 py-0.5 rounded-sm text-xs font-semibold text-white text-center"
          style={{
            backgroundColor: status.backgroundColor || status.color,
            color: status.textColor || "#ffffff",
          }}
        >
          {status.name}
        </div>
      </div>
    </div>
  );
}

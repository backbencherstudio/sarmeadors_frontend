import SelecteInputField from "@/components/common/InputFiled/SelecteInputField";
import { useState } from "react";

export default function SelectRenderer({ field }: { field: any }) {
  const [value, setValue] = useState<string>("");
  const items = field.items?.length ? field.items : ["Option 1", "Option 2"];
  const options = items.map((item: string) => ({ value: item, label: item }));

  return (
    <div className="space-y-1 w-full">
      <label className="block text-xs font-semibold text-headerColor">
        {field.label || "Dropdown"}
        {field.required && " *"}
      </label>
      <SelecteInputField
        value={value}
        onValueChange={setValue}
        options={options}
        placeholder={field.placeholder || "Select Option"}
      />
    </div>
  );
}

"use client";

import ReusableInput from "@/components/common/InputFiled/ReusableInput";
import ButtonReuseable from "@/components/reusable/CustomButton";
import { updateFieldProperties } from "@/feature/slice/applicationBuilder/ApplicationFormSlice";
import DeleteIcon from "@/public/icon/DeleteIcon";
import { ChevronDown, ChevronUp, PlusIcon } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";

type Props = {
  activeBlockId: string;
  activeFieldId: string;
  activeSectionId?: string | null;
  activeField: any;
};

export default function TableFieldSettings({
  activeBlockId,
  activeFieldId,
  activeSectionId,
  activeField,
}: Props) {
  const dispatch = useDispatch();
  const [colsOpen, setColsOpen] = useState(true);
  const [rowsOpen, setRowsOpen] = useState(true);

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

  const columns: string[] = activeField.columns?.length
    ? activeField.columns
    : ["Column 1", "Column 2"];

  const rows: string[] = activeField.rows?.length
    ? activeField.rows
    : ["Row 1", "Row 2"];

  const handleColChange = (index: number, value: string) => {
    const next = [...columns];
    next[index] = value;
    handlePropertyChange("columns", next);
  };

  const handleRowChange = (index: number, value: string) => {
    const next = [...rows];
    next[index] = value;
    handlePropertyChange("rows", next);
  };

  return (
    <div className="space-y-3 border-t pt-3">
      {/* Columns */}
      <div>
        <button
          type="button"
          onClick={() => setColsOpen((p) => !p)}
          className="flex w-full items-center justify-between rounded-md px-1 py-1 text-left text-xs font-semibold text-headerColor"
        >
          <span>Columns</span>
          {colsOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>

        {colsOpen && (
          <div className="mt-2 space-y-2">
            {columns.map((col, index) => (
              <div key={index} className="flex items-center gap-2">
                <ReusableInput
                  value={col}
                  onChange={(e) => handleColChange(index, e.target.value)}
                  containerClassName="flex-1 min-w-0"
                  className="w-full bg-bgColor text-sm"
                />
                <button
                  type="button"
                  onClick={() =>
                    handlePropertyChange(
                      "columns",
                      columns.filter((_, i) => i !== index),
                    )
                  }
                  className="shrink-0 cursor-pointer text-red-500"
                >
                  <DeleteIcon className="h-4 w-4" />
                </button>
              </div>
            ))}
            <ButtonReuseable
              type="button"
              onClick={() =>
                handlePropertyChange("columns", [
                  ...columns,
                  `Column ${columns.length + 1}`,
                ])
              }
              icon={<PlusIcon size={14} />}
              title="Add Column"
              className="px-3.5! py-2.5! bg-bgColor! text-black! border rounded text-xs!"
            />
          </div>
        )}
      </div>

      {/* Rows */}
      <div>
        <button
          type="button"
          onClick={() => setRowsOpen((p) => !p)}
          className="flex w-full items-center justify-between rounded-md px-1 py-1 text-left text-xs font-semibold text-headerColor"
        >
          <span>Rows</span>
          {rowsOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>

        {rowsOpen && (
          <div className="mt-2 space-y-2">
            {rows.map((row, index) => (
              <div key={index} className="flex items-center gap-2">
                <ReusableInput
                  value={row}
                  onChange={(e) => handleRowChange(index, e.target.value)}
                  containerClassName="flex-1 min-w-0"
                  className="w-full bg-bgColor text-sm"
                />
                <button
                  type="button"
                  onClick={() =>
                    handlePropertyChange(
                      "rows",
                      rows.filter((_, i) => i !== index),
                    )
                  }
                  className="shrink-0 cursor-pointer text-red-500"
                >
                  <DeleteIcon className="h-4 w-4" />
                </button>
              </div>
            ))}
            <ButtonReuseable
              type="button"
              onClick={() =>
                handlePropertyChange("rows", [
                  ...rows,
                  `Row ${rows.length + 1}`,
                ])
              }
              icon={<PlusIcon size={14} />}
              title="Add Row"
              className="px-3.5! py-2.5! bg-bgColor! text-black! border rounded text-xs!"
            />
          </div>
        )}
      </div>
    </div>
  );
}

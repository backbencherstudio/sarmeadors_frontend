import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger
} from "@/components/ui/select";
import { IoIosArrowDown } from "react-icons/io";

function StatuseChange({ row, setData, statuse }: any) {
  const currentStatus = statuse.find((item: any) => item.value === row?.status);
  
  return (
    <div className="w-40 change-arrow">
      <Select
        value={row?.status || ""}
        onValueChange={(v: string) => {
          setData((prev) =>
            prev.map((r) => (r.id === row.id ? { ...r, status: v } : r)),
          );
        }}
      >
        <SelectTrigger className="flex items-center gap-1.5 p-1 !h-9 w-full justify-between">
          <div
            className={`px-2 cursor-pointer flex items-center  py-2.5!  h-full w-full text-xs justify-start focus-visible:ring-0 font-medium rounded-sm border-0 bg-borderColor  text-lightblackColor`}
          >
            {currentStatus?.label || "Select status"}
          </div>
          <div>
            <IoIosArrowDown />
          </div>
        </SelectTrigger>
        <SelectContent>
          {statuse.map((item: any) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export default StatuseChange;

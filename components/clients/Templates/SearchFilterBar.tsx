"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import { useState } from "react";

interface SearchFilterBarProps {
  onSearch?: (value: string) => void;
  onFilterUserType?: (value: string) => void;
  onFilterStatus?: (value: string) => void;
  onFilterCategoryType1?: (value: string) => void;
  onFilterCategoryType2?: (value: string) => void;
  userTypeOptions?: { label: string; value: string }[];
  statusOptions?: { label: string; value: string }[];
  categoryType1Options?: { label: string; value: string }[];
  categoryType2Options?: { label: string; value: string }[];
}

const triggerClass =
  "w-full bg-white text-sm text-gray-400 focus-visible:!border-none shadow-none !focus-visible:ring-0 !focus-visible:outline-none focus-visible:ring-gray-200 cursor-pointer !h-12";

export default function SearchFilterBar({
  onSearch,
  onFilterUserType,
  onFilterStatus,
  onFilterCategoryType1,
  onFilterCategoryType2,
  userTypeOptions = [],
  statusOptions = [],
  categoryType1Options = [],
  categoryType2Options = [],
}: SearchFilterBarProps) {
  const [searchValue, setSearchValue] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch?.(searchValue);
    }
  };

  return (
    <div className="p-4 border border-gray-200 rounded-lg mt-4 bg-white space-y-3">
      {/* Search Input */}
      <div className="flex items-center border border-gray-200 rounded-lg gap-3 bg-white pr-4">
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search for keyword/phrase anywhere on user profile. hit Enter to apply search"
          className="flex-1 text-sm text-gray-500 placeholder-gray-400 focus:outline-none bg-transparent px-3 py-4"
        />
        <Search size={16} className="text-gray-400 flex-shrink-0" />
      </div>

      {/* Filter Dropdowns */}
      <div className="grid grid-cols-4 gap-3">
        {/* User Type */}
        <div>
          <Select
            onValueChange={(value) =>
              onFilterUserType?.(value === "all" ? "" : value)
            }
          >
            <SelectTrigger className={`${triggerClass}`}>
              <SelectValue placeholder="Filter by User Type" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">Filter by User Type</SelectItem>

              {userTypeOptions?.map((opt) => (
                <SelectItem key={opt?.value} value={opt?.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Status */}
        <div>
          <Select
            onValueChange={(value) =>
              onFilterStatus?.(value === "all" ? "" : value)
            }
          >
            <SelectTrigger className={triggerClass}>
              <SelectValue placeholder="Filter by Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Filter by Status</SelectItem>
              {statusOptions.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Category Type 1 */}
        <div>
          <Select
            onValueChange={(value) =>
              onFilterCategoryType1?.(value === "all" ? "" : value)
            }
          >
            <SelectTrigger className={triggerClass}>
              <SelectValue placeholder="Filter by Category Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Filter by Category Type</SelectItem>
              {categoryType1Options.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Category Type 2 */}
        <div>
          <Select
            onValueChange={(value) =>
              onFilterCategoryType2?.(value === "all" ? "" : value)
            }
          >
            <SelectTrigger className={triggerClass}>
              <SelectValue placeholder="Filter by Category Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Filter by Category Type</SelectItem>
              {categoryType2Options.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}

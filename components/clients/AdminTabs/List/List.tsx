"use client";

import { useState } from "react";
import { Search, Pencil, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ClientTypesModal } from "./ClientTypesModal";
import { ChecklistModal } from "./ChecklistModal";
import { LocationsModal } from "./LocationsModal";
import { UpdateLocationModal } from "./UpdateLocationModal";
import { TagsModal } from "./TagsModal";
import { UpdateTagsModal } from "./UpdateTagsModal";
import { UpdateTypesModal } from "./UpdateTypesModal";
import {
  useGetTagsQuery,
  useUpdateTagStatusMutation,
  useGetLocationsQuery,
  useUpdateLocationStatusMutation,
  useGetTypesQuery,
  usePostTypeStoreMutation,
  useDeleteTypeMutation,
  useUpdateTypeStatusMutation,
} from "@/feature/slice/settings/candidates/CandidateSettingsSlice";

interface FilterItem {
  id: string;
  label: string;
  checked: boolean;
}

interface FilterCard {
  title: string;
  items: FilterItem[];
  placeholder?: string;
}

interface ListProps {
  type?: string;
}

export default function List({ type }: ListProps) {
  const { data: tagsData, isLoading: isLoadingTags } = useGetTagsQuery(
    type || "candidate",
  );

  const { data: locationsData, isLoading: isLoadingLocations } =
    useGetLocationsQuery(type || "candidate");

  const { data: typesData, isLoading: isLoadingTypes } = useGetTypesQuery(
    type || "client",
  );

  const locationItems: FilterItem[] = isLoadingLocations
    ? [{ id: "loading", label: "Loading...", checked: false }]
    : (locationsData?.data || []).map((loc: any) => ({
        id: String(loc.id),
        label: loc.location || loc,
        checked: loc.status === 1,
      }));

  const typeItems: FilterItem[] = isLoadingTypes
    ? [{ id: "loading", label: "Loading...", checked: false }]
    : (typesData?.data || []).map((t: any) => ({
        id: String(t.id),
        label: t.name || t,
        checked: t.status === 1,
      }));

  const [updateTagStatus] = useUpdateTagStatusMutation();
  const [updateLocationStatus] = useUpdateLocationStatusMutation();
  const [postTypeStore, { isLoading: isSavingType }] =
    usePostTypeStoreMutation();
  const [deleteType, { isLoading: isDeletingType }] = useDeleteTypeMutation();
  const [updateTypeStatus] = useUpdateTypeStatusMutation();

  const [filters, setFilters] = useState<FilterCard[]>([
    {
      title: "Types",
      placeholder: "Search by tag",
      items: [],
    },
    {
      title: "Checklist",
      placeholder: "Search by tag",
      items: [
        { id: "1", label: "qwqe", checked: false },
        { id: "2", label: "wqregre", checked: false },
      ],
    },
    {
      title: "Locations",
      placeholder: "Search by tag",
      items: [],
    },
    {
      title: "Tags",
      placeholder: "Search by tag",
      items: [],
    },
  ]);

  const [searchTerms, setSearchTerms] = useState<{ [key: string]: string }>({
    Types: "",
    Checklist: "",
    Locations: "",
    Tags: "",
  });

  const tagItems: FilterItem[] = isLoadingTags
    ? [{ id: "loading", label: "Loading...", checked: false }]
    : (tagsData?.data || []).map((tag: any) => ({
        id: String(tag.id),
        label: tag.name || tag,
        checked: tag.status === 1,
      }));
  const handleCheckboxChange = (cardTitle: string, itemId: string) => {
    if (cardTitle === "Tags") {
      const tag = tagItems.find((t) => t.id === itemId);
      if (tag) {
        const newStatus = tag.checked ? 0 : 1;
        updateTagStatus({ id: Number(itemId), status: newStatus });
      }
    }
    if (cardTitle === "Locations") {
      const loc = locationItems.find((l) => l.id === itemId);
      if (loc) {
        const newStatus = loc.checked ? 0 : 1;
        updateLocationStatus({ id: Number(itemId), status: newStatus });
      }
    }
    if (cardTitle === "Types") {
      const t = typeItems.find((item) => item.id === itemId);
      if (t) {
        const newStatus = t.checked ? 0 : 1;
        updateTypeStatus({ id: Number(itemId), status: newStatus });
      }
    }
    setFilters((prevFilters) =>
      prevFilters.map((card) =>
        card.title === cardTitle
          ? {
              ...card,
              items: card.items.map((item) =>
                item.id === itemId ? { ...item, checked: !item.checked } : item,
              ),
            }
          : card,
      ),
    );
  };
  const handleSearchChange = (cardTitle: string, value: string) => {
    setSearchTerms((prev) => ({
      ...prev,
      [cardTitle]: value,
    }));
  };

  const getFilteredItems = (card: FilterCard, items: FilterItem[]) => {
    const searchTerm = searchTerms[card.title]?.toLowerCase() || "";
    if (!searchTerm) return items;
    return items.filter((item) =>
      item.label.toLowerCase().includes(searchTerm),
    );
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-4">
        {filters.map((card) => {
          const items =
            card.title === "Tags"
              ? tagItems
              : card.title === "Locations"
                ? locationItems
                : card.title === "Types"
                  ? typeItems
                  : card.items;
          const filteredItems = getFilteredItems(card, items);
          return (
            <div
              key={card.title}
              className="bg-white flex flex-col h-[400px] relative"
            >
              {/* Title */}
              <h3 className="text-base font-semibold text-gray-900 mb-3">
                {card.title}
              </h3>

              <div className="border border-gray-200 p-4 rounded-xl h-full flex flex-col">
                {/* Search Bar */}
                <div className="relative mb-3">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder={card.placeholder || "Search by tag"}
                    value={searchTerms[card.title] || ""}
                    onChange={(e) =>
                      handleSearchChange(card.title, e.target.value)
                    }
                    className="pl-9 h-9 text-sm border-gray-200"
                  />
                </div>

                {/* Content Area with Scroll */}
                <div className="flex-1 overflow-y-auto mb-3 pr-1">
                  {filteredItems.length > 0 ? (
                    <div className="space-y-2">
                      {filteredItems.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center gap-2 py-1"
                        >
                          <Checkbox
                            checked={item.checked}
                            onCheckedChange={() =>
                              handleCheckboxChange(card.title, item.id)
                            }
                          />
                          <label className="text-sm text-gray-700 cursor-pointer flex-1">
                            {item.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-sm text-gray-400 text-center py-4">
                      {items.length === 0 ? "No items" : "No items found"}
                    </div>
                  )}
                </div>

                <hr className="mb-2" />

                {/* Action Buttons */}
                <div className="flex justify-end gap-2 mt-auto pt-2">
                  {/* <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 bg-gray-100 hover:bg-gray-200 border-0"
                  >
                    <Pencil className="w-4 h-4 text-gray-600" />
                  </Button> */}

                  {card.title === "Types" && (
                    <>
                      <UpdateTypesModal typeItems={typeItems} />
                      <ClientTypesModal type={type} typeItems={typeItems} />
                    </>
                  )}
                  {card.title === "Checklist" && <ChecklistModal />}
                  {card.title === "Locations" && (
                    <>
                      <UpdateLocationModal locationItems={locationItems} />
                      <LocationsModal
                        type={type}
                        locationItems={locationItems}
                      />
                    </>
                  )}
                  {card.title === "Tags" && (
                    <>
                      <UpdateTagsModal tagItems={tagItems} />
                      <TagsModal type={type} tagItems={tagItems} />
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

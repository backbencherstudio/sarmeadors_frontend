"use client"

import { useState } from "react"
import { Search, Pencil, Plus } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { ClientTypesModal } from "./ClientTypesModal"
import { ChecklistModal } from "./ChecklistModal"
import { LocationsModal } from "./LocationsModal"
import { TagsModal } from "./TagsModal"

interface FilterItem {
    id: string
    label: string
    checked: boolean
}

interface FilterCard {
    title: string
    items: FilterItem[]
    placeholder?: string
}

export default function List() {
    const [filters, setFilters] = useState<FilterCard[]>([
        {
            title: "Types",
            placeholder: "Search by tag",
            items: [
                { id: "1", label: "Midwest Elite Nannies", checked: false }
            ]
        },
        {
            title: "Checklist",
            placeholder: "Search by tag",
            items: [
                { id: "1", label: "qwqe", checked: false },
                { id: "2", label: "wqregre", checked: false }
            ]
        },
        {
            title: "Locations",
            placeholder: "Search by tag",
            items: [
                { id: "1", label: "Chicago", checked: true },
                { id: "2", label: "DC Metro Area", checked: false },
                { id: "3", label: "New York", checked: false },
                { id: "4", label: "Miami", checked: true },
                { id: "5", label: "Iowa", checked: false },
                { id: "6", label: "Other Locations", checked: false }
            ]
        },
        {
            title: "Tags",
            placeholder: "Search by tag",
            items: []
        }
    ])

    const [searchTerms, setSearchTerms] = useState<{ [key: string]: string }>({
        Types: "",
        Checklist: "",
        Locations: "",
        Tags: ""
    })

    const handleCheckboxChange = (cardTitle: string, itemId: string) => {
        setFilters(prevFilters =>
            prevFilters.map(card =>
                card.title === cardTitle
                    ? {
                        ...card,
                        items: card.items.map(item =>
                            item.id === itemId
                                ? { ...item, checked: !item.checked }
                                : item
                        )
                    }
                    : card
            )
        )
    }

    const handleSearchChange = (cardTitle: string, value: string) => {
        setSearchTerms(prev => ({
            ...prev,
            [cardTitle]: value
        }))
    }

    const getFilteredItems = (card: FilterCard) => {
        const searchTerm = searchTerms[card.title]?.toLowerCase() || ""
        if (!searchTerm) return card.items
        return card.items.filter(item =>
            item.label.toLowerCase().includes(searchTerm)
        )
    }

    return (
        <div className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {filters.map((card) => {
                    const filteredItems = getFilteredItems(card)
                    return (
                        <div
                            key={card.title}
                            className="bg-white flex flex-col h-[450px] relative"
                        >


                            {/* Title */}
                            <h3 className="text-base font-semibold text-gray-900 mb-3">
                                {card.title}
                            </h3>

                            <div className="border border-gray-200 p-4 rounded-lg h-full flex flex-col">
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
                                                            handleCheckboxChange(
                                                                card.title,
                                                                item.id
                                                            )
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
                                            {card.items.length === 0
                                                ? "No items"
                                                : "No items found"}
                                        </div>
                                    )}
                                </div>

                                <hr className="mb-2" />

                                {/* Action Buttons */}
                                <div className="flex justify-end gap-2 mt-auto pt-2">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-8 w-8 p-0 bg-gray-100 hover:bg-gray-200 border-0"
                                    >
                                        <Pencil className="w-4 h-4 text-gray-600" />
                                    </Button>

                                    {
                                        card.title === "Types" && <ClientTypesModal />
                                    }
                                    {
                                        card.title === "Checklist" && <ChecklistModal />
                                    }
                                    {
                                        card.title === "Locations" && <LocationsModal />
                                    }
                                    {
                                        card.title === "Tags" && <TagsModal />
                                    }
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

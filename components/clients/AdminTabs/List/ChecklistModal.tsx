"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Plus, Trash2 } from "lucide-react"
import ButtonReuseable from "@/components/reusable/CustomButton"

interface ClientType {
    id: string
    value: string
}

export function ChecklistModal() {
    const [clientTypes, setClientTypes] = useState<ClientType[]>([
        { id: "1", value: "Midwest Elite Nannies" },
        { id: "2", value: "Admin" },
        { id: "3", value: "User" },
    ])

    const handleAddItem = () => {
        const newId = Date.now().toString()
        setClientTypes([...clientTypes, { id: newId, value: "" }])
    }

    const handleDeleteItem = (id: string) => {
        setClientTypes(clientTypes.filter((item) => item.id !== id))
    }

    const handleInputChange = (id: string, value: string) => {
        setClientTypes(
            clientTypes.map((item) =>
                item.id === id ? { ...item, value } : item
            )
        )
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Handle form submission here
        console.log("Client Types:", clientTypes)
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 bg-gray-800 hover:bg-gray-900 border-0 cursor-pointer"
                >
                    <Plus className="w-4 h-4 text-white" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[850px]! max-h-[80vh] overflow-y-auto">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle className="text-xl font-semibold">
                            Client Admin Checklist
                        </DialogTitle>
                        <DialogDescription className="text-sm text-gray-600 pt-2">
                            A checklist for tracking client items will be available in the admin tab. You can drag and drop items to reorder them.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="space-y-3">
                            {clientTypes.map((item, index) => (
                                <div
                                    key={item.id}
                                    className="flex items-center gap-2"
                                >
                                    <Input
                                        value={item.value}
                                        onChange={(e) =>
                                            handleInputChange(
                                                item.id,
                                                e.target.value
                                            )
                                        }
                                        placeholder="Enter client type"
                                        className="flex-1 h-12"
                                    // autoFocus={index === clientTypes.length - 1 && item.value === ""}
                                    />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => handleDeleteItem(item.id)}
                                        className="h-9 w-9 p-0 text-red-500 hover:text-red-600 hover:bg-red-50"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                        <div className="w-fit">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={handleAddItem}
                                className="w-full border p-3 cursor-pointer"
                            >
                                Add another item
                            </Button>
                        </div>
                        <hr />
                        <div className="flex justify-start gap-2">
                            <ButtonReuseable title="Submit" type="submit" className="bg-[#111927] text-white cursor-pointer md:px-8 md:py-[17px] px-4 py-2 rounded-[12px]" />


                            <DialogClose asChild>
                                <ButtonReuseable title="Cancel" type="button" className="bg-[#F3F4F6]! text-[#111927]! cursor-pointer md:px-8 md:py-[17px] px-4 py-2 rounded-[12px]" />

                            </DialogClose>
                        </div>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}

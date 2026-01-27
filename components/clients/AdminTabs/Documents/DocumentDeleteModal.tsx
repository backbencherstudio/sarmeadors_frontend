"use client"

import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Trash2 } from 'lucide-react'



export default function DocumentDeleteModal() {


    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 bg-gray-100 hover:bg-[#CB121D] text-gray-600 hover:text-white transition-colors duration-400 cursor-pointer border-0"
                >
                    <Trash2 className="w-4 h-4 " />
                </Button>
            </DialogTrigger>
            <DialogContent className="w-full sm:max-w-[665px]">
                <DialogDescription className="text-center text-xl md:text-3xl font-semibold py-4 text-[#111927]">
                    Are you sure you want to delete the document Client Agency Agreement Midwest Nannies?
                </DialogDescription>
                <div className="flex gap-3 justify-center pb-2">
                    <DialogClose asChild>
                        <Button
                            variant="destructive"
                            // onClick={handleDelete}
                            className="flex-1 bg-[#CB121D] hover:bg-red-700 text-white cursor-pointer w-fit"
                        >
                            Delete Document
                        </Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button
                            variant="secondary"
                            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 cursor-pointer w-fit"
                        >
                            Cancel
                        </Button>
                    </DialogClose>
                </div>
            </DialogContent>
        </Dialog>
    )
}

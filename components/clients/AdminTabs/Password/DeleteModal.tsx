import ButtonReuseable from "@/components/reusable/CustomButton";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import DeleteIcon from "@/public/icon/DeleteIcon";
import { Trash2 } from "lucide-react";

export default function DeleteModal() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <DeleteIcon />
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px]">
                <DialogHeader>
                    <DialogTitle className="text-base lg:text-2xl font-semibold ">
                        Are you sure you want to delete this secondary login mollahsaiful@gmail.com ?
                    </DialogTitle>
                </DialogHeader>
                <hr className="border-[#E5E7EB] my-4" />
                <div className="flex items-center gap-3">
                    <ButtonReuseable
                        title="Delete"
                        className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg"
                        type="button"
                    />
                    <ButtonReuseable
                        title="Cancel"
                        className="bg-gray-100! hover:bg-gray-200 text-[#111927]! px-6 py-2 rounded-lg border-gray-300"
                    />
                </div>
            </DialogContent>
        </Dialog>
    )
}

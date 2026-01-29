"use client";

import ButtonReuseable from "@/components/reusable/CustomButton";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import EditIcon from "@/public/icon/EditIcon";

interface EditModalProps {
    email?: string;
}

export default function EditModal({ email = "email_username" }: EditModalProps) {
    return (
        <Dialog>
            <DialogTrigger asChild className="cursor-pointer">
                <EditIcon />
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px]">
                <DialogHeader>
                    <DialogTitle className="text-base lg:text-2xl font-semibold">
                        Password reset
                    </DialogTitle>
                </DialogHeader>
                <div className="space-y-2">
                    <p className="text-lg font-medium">{email}</p>
                    <div className="flex items-start gap-2">
                        <span className="text-gray-600 mt-1">•</span>
                        <p className="text-base text-[#384250]">
                            user with this email username already exists.
                        </p>
                    </div>
                </div>
                <hr className="border-[#E5E7EB] my-4" />
                <div className="flex items-center justify-start">
                    <ButtonReuseable
                        title="Close"
                        className="bg-gray-100!  text-[#111927]! px-6 py-2 rounded-lg border-gray-300"
                    />
                </div>
            </DialogContent>
        </Dialog>
    );
}

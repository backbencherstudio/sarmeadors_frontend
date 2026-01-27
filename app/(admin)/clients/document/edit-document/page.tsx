"use client"

import { RichTextEditor } from "@/components/reusable/Editor";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ArrowLeftIcon from "@/public/icon/ArrowLeftIcon";

interface DocumentFormData {
    name: string;
    body: string;
}

export default function EditDocumentPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const documentId = searchParams.get("id");
    const [editorKey] = useState(0);

    const { register, watch, setValue, handleSubmit } = useForm<DocumentFormData>({
        defaultValues: {
            name: "",
            body: "",
        },
    });


    const onSubmit = async (data: DocumentFormData) => {
        console.log("Form submitted:", data);
        // Add your save logic here
    };

    const handleCancel = () => {
        router.back();
    };

    return (
        <div className="mx-auto">
            {/* Header with Back Button */}
            <div className="flex items-center gap-3 mb-6">
                <div onClick={router.back} className="flex items-center gap-3 cursor-pointer">
                    <ArrowLeftIcon />
                    <h1 className="font-semibold leading-[160%]" >Edit Document</h1>
                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 border border-gray-200 rounded-lg p-4">
                {/* Name Field */}
                <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-medium text-gray-900">
                        Name<span className="text-red-500 ml-1">*</span>
                    </Label>
                    <Input
                        id="name"
                        {...register("name", { required: true })}
                        className="w-full"
                        placeholder="Enter document name"
                    />
                </div>

                {/* Body Field */}
                <div className="space-y-2">
                    <RichTextEditor
                        key={`body-${editorKey}`}
                        value={watch("body")}
                        onChange={(v) => setValue("body", v)}
                    />
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-4 pt-4">
                    <Button
                        type="submit"
                        className="bg-[#111927] text-white hover:bg-[#111927]/90 px-6"
                    >
                        Submit
                    </Button>
                    <Button
                        type="button"
                        variant="outline"
                        onClick={handleCancel}
                        className="px-6"
                    >
                        Cancel
                    </Button>
                </div>
            </form>
        </div>
    );
}

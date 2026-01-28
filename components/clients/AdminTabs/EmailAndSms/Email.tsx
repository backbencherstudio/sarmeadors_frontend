import { RichTextEditor } from "@/components/reusable/Editor";
import HoverInfo from "@/components/reusable/HoverInfo";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import InformationIcon from "@/public/icon/InformationIcon";

import { Trash2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface ClientType {
    id: string
    value: string
}

interface TermsConditionFormData {
    explanation: string;
}

export default function Email() {

    const [editorKey] = useState(0);

    const [clientTypes, setClientTypes] = useState<ClientType[]>([
        { id: "1", value: "pexels-vantrangho-4747157.jpg" },
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



    const { watch, setValue, handleSubmit } = useForm<TermsConditionFormData>({
        defaultValues: {
            explanation: "",
        },
    });

    const onSubmit = async (data: TermsConditionFormData) => {
        console.log("Form submitted:", data);
        // Add your save logic here
    };
    return (
        <div className="w-full max-w-4xl bg-white border border-[#E5E7EB] rounded-2xl p-6">
            {/* Header */}
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Send Email
            </h2>

            {/* To Email */}
            <p className="text-sm text-gray-700 mb-3">
                afsbf.sabrina@gmail.com
            </p>

            {/* Template Select */}
            <div className="mb-5">
                <Select>
                    <SelectTrigger className="w-full h-12!">
                        <SelectValue placeholder="Theme" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="light">Select Template</SelectItem>
                        <SelectItem value="dark">Welcome Email</SelectItem>
                        <SelectItem value="system">Approval Email</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* From & Reply */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                <div>
                    <label className="text-sm text-gray-700 mb-2 block">
                        From Email
                    </label>
                    <Input
                        type="email"
                        placeholder="From Email"
                        // defaultValue="sarah@nanniescoasttocoast.com"
                        className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm h-12"
                    />
                </div>

                <div>
                    <label className="text-sm text-gray-700 mb-2 block">
                        Reply To
                    </label>
                    <Input
                        type="email"
                        placeholder="Reply To"
                        // defaultValue="sarah@nanniescoasttocoast.com"
                        className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm h-12"
                    />
                </div>
            </div>

            {/* Subject */}
            <div className="mb-4">
                <label className="text-sm text-gray-700 mb-2 block">
                    Subject
                </label>
                <Input
                    type="text"
                    placeholder="Subject"
                    className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm h-12"
                />
            </div>

            {/* Helper Text */}
            <p className="text-xs text-[#2B7FFF] mb-4">
                Separate multiple emails with ; (eg: nanny1@hotmail.com; nanny2@hotmail.com)
            </p>

            {/* CC */}
            <div className="mb-4">
                <Input
                    type="text"
                    placeholder="CC"
                    className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm h-12"
                />
            </div>

            {/* BCC */}
            <div>
                <Input
                    type="text"
                    placeholder="BCC"
                    className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm h-12"
                />
            </div>

            {/* Text Editor */}
            <div className="w-full">
                <RichTextEditor
                    key={`explanation-${editorKey}`}
                    value={watch("explanation")}
                    onChange={(v) => setValue("explanation", v)}
                    onUpdate={handleSubmit(onSubmit)}
                />
            </div>

            {/* Button */}
            <div className="mt-6">
                <h2 className="text-xl font-medium mb-1.5">Attachments</h2>
                <p className="text-base text-[#778593]">The max attachment size is <span className="text-[#111927]">10MB.</span> Emails with attachments large than this will NOT send!</p>

                {/* Input fild */}
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
                                    placeholder="Enter Attachment"
                                    className="flex-1 border-0 shadow-none focus-visible:ring-0"
                                    autoFocus={index === clientTypes.length - 1 && item.value === ""}
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
                </div>

                <div className="flex items-center gap-2 mt-6 mb-8">
                    <button onClick={handleAddItem} className=" flex items-center gap-1.5 bg-[#111927] text-white cursor-pointer  md:px-4 md:py-[17px] px-4 py-2 rounded-[12px]">
                        Add Attachment
                    </button>
                    {/* Information Icon */}
                    <HoverInfo side="left-0 bottom-7" info="  How to send candidates individual documents to a Client" />
                </div>
                <div className="space-x-2 mb-2">
                    <Checkbox />
                    <span>Log email as note</span>
                </div>
                <div className="flex items-center gap-2">
                    <button className="flex items-center gap-1.5 bg-[#111927] text-white cursor-pointer  md:px-12 md:py-[17px] px-4 py-2 rounded-[12px]">
                        Send
                    </button>
                    <button className="flex items-center gap-1.5 bg-[#F3F4F6] cursor-pointer  md:px-4 md:py-[17px] px-4 py-2 rounded-[12px]">
                        Schedule Send
                    </button>

                    {/* Information Icon */}
                    <HoverInfo side="left-0 bottom-7" info=" How to schedule an email for another time" />

                </div>
            </div>
        </div>
    );
}

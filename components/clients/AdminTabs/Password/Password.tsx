"use client";

import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import HoverInfo from '@/components/reusable/HoverInfo';
import { Trash2 } from 'lucide-react';
import { useForm } from 'react-hook-form';

interface ClientType {
    id: string
    value: string
}

interface TermsConditionFormData {
    explanation: string;
}

export default function Password() {
    const [password, setPassword] = useState("");
    const [userId] = useState("20");

    const [editorKey] = useState(0);

    const [clientTypes, setClientTypes] = useState<ClientType[]>([
    ])

    const handleAddSecondaryLogin = () => {
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

    const handleUpdatePassword = () => {
        // Add password update logic here
        console.log("Updating password:", password);
    };

    const resetPasswordLink = `https://nanniescoasttocoast.enginehire.io/reset-password-request/${userId}`;

    return (
        <div className="w-full bg-white border border-[#E5E7EB] rounded-2xl p-6">
            {/* Title */}
            <h2 className="text-xl font-medium mb-6">
                Create password
            </h2>

            {/* Manual Password Reset Section */}
            <div className="mb-6">
                <p className="text-base font-medium whitespace-nowrap mb-2">
                    You can manually reset the user's password here:
                </p>
                <div className="flex items-center gap-3 flex-wrap">
                    <div className="flex items-center gap-2 flex-1 min-w-[300px]">
                        <Input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter new password"
                            className="flex-1 rounded-lg border border-gray-200 px-4 py-3 text-sm h-12"
                        />
                        <Button
                            onClick={handleUpdatePassword}
                            className="bg-[#111927] text-white hover:bg-[#111927]/90 px-4 py-3 rounded-lg whitespace-nowrap"
                        >
                            Update Password
                        </Button>
                        {/* Information Icon */}
                        <HoverInfo side="right-0 bottom-7" info="Reset a Password for Client or Candidate" />
                    </div>
                </div>
            </div>

            {/* Reset Password Link Section */}
            <div className="mb-6 flex  gap-2">
                <p className="text-sm text-gray-700 mb-2">
                    Reset Password Link:
                </p>
                <a
                    href={resetPasswordLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[#2B7FFF] hover:underline"
                >
                    {resetPasswordLink}
                </a>
            </div>

            {/* List Secondary Logins Section */}
            <div className="mb-6">
                {/* Text Title */}
                <h2 className="text-xl font-medium whitespace-nowrap mb-2">List Secondary Logins</h2>

                {/* Input fild */}
                <div className="grid gap-4 ">
                    <div className="space-y-2">
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
                                    placeholder="Enter Secondary Login"
                                    className="flex-1 border-0 shadow-none focus-visible:ring-0 px-0"
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
                </div>
            </div>

            {/* Add Secondary Logins Button */}
            <div className="">
                <Button
                    onClick={handleAddSecondaryLogin}
                    variant="outline"
                    className="bg-[#F3F4F6] text-gray-900 hover:bg-[#E5E7EB] border-gray-200 px-6 py-3 rounded-lg"
                >
                    Add Secondary Logins
                </Button>
            </div>
        </div>
    );
}

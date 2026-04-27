"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

interface CommonAccordionProps {
    title: string;
    children?: React.ReactNode;
}

export default function CommonAccordion({ title, children }: CommonAccordionProps) {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className="w-full rounded-lg flex items-start justify-center">
            <div className="w-full bg-[#F9FAFB] rounded-[16px] overflow-hidden">
                {/* Header */}
                <button
                    onClick={() => setIsOpen((v) => !v)}
                    className="w-full flex items-center gap-3 px-6 py-4 border-b border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer"
                >
                    <div className="w-7 h-7 rounded-md bg-gray-800 flex items-center justify-center flex-shrink-0">
                        {isOpen ? (
                            <ChevronUp size={14} className="text-white" />
                        ) : (
                            <ChevronDown size={14} className="text-white" />
                        )}
                    </div>
                    <span className="text-xl font-medium">{title}</span>
                </button>

                {isOpen && (
                    <div className="px-6 py-6 flex flex-col gap-6">
                        {children}
                    </div>
                )}
            </div>
        </div>
    );
}
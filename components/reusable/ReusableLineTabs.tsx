"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Tabs = { label: string; link: string; }[]

function ReusableLineTabs({
    tabs,
    currentPath
}: { tabs: Tabs, currentPath?: string }) {
    const path = usePathname();
    const isActive = (href: string): boolean => {
        if (href === currentPath) {
            return path === currentPath;
        }

        return path.startsWith(href);
    };

    return (
        <div>
            <div className="w-full">
                <div className="w-full border-b border-gray-200">
                    <div className="bg-transparent h-auto p-0 gap-5 rounded-none flex justify-start items-center whitespace-nowrap">
                        {tabs.map((tab, index) => (
                            <Link
                                key={index}
                                href={tab.link}
                                className={`flex items-center gap-2 px-4 py-3 rounded-none border-b-2 ${isActive(tab.link) ? "border-gray-800 text-gray-900 font-semibold" : "border-transparent text-gray-700"} hover:text-gray-900 cursor-pointer`}
                            >
                                <span>{tab.label}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ReusableLineTabs;
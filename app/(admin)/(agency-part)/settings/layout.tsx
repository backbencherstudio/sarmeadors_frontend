"use client";

import Link from 'next/link';
import React from 'react';
import { usePathname } from 'next/navigation';

export const routes = [
    { name: "Agency Details", path: "/settings/agency-details" },
    { name: "Candidates", path: "/settings/candidates" },
    { name: "Clients", path: "/settings/clients" },
    { name: "Jobs", path: "/settings/jobs" },
    // { name: "Price & Payment", path: "/settings/price-and-payment" },
];

export default function Layout({ children }: { children: React.ReactNode }) {

    const pathname = usePathname();

    return (
        <div className='p-6 space-y-6'>
            <h1 className="text-lg font-semibold">Global setting</h1>

            <div className='flex h-full border border-[#F3F4F6] rounded-lg overflow-hidden'>
                <div className='w-[261px] bg-[#F3F4F6] border-r h-auto flex flex-col gap-1'>

                    <h1 className='p-4 font-semibold text-xl'>Content List</h1>
                    <hr />
                    <div className='p-4 flex flex-col gap-1'>
                        {routes.map((route, index) => {

                            const isActive = pathname === route.path;

                            return (
                                <Link
                                    key={index}
                                    href={route.path}
                                    className={`text-sm font-medium px-3 py-2.5 rounded-[8px] transition
            ${isActive
                                            ? "bg-[#111927] text-white"
                                            : "text-black hover:bg-gray-200"
                                        }`}
                                >
                                    {route.name}
                                </Link>
                            );
                        })}
                    </div>

                </div>

                <div className='w-full p-6'>
                    <div className=''>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
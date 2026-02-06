"use client"

import ProfileInfo from '@/components/clients/ProfileInfo/ProfileInfo'
import { Select, SelectContent, SelectTrigger } from '@/components/ui/select'
import ArrowLeftIcon from '@/public/icon/ArrowLeftIcon'
import EmailAndSMSIcon from '@/public/icon/EmailAndSMSIcon'
import JobsIcon from '@/public/icon/JobsIcon'
import ListIcon from '@/public/icon/ListIcon'
import MoreIcon from '@/public/icon/MoreIcon'
import UserIcon from '@/public/icon/UserIcon'
import UserSettingsIcon from '@/public/icon/UserSettingsIcon'
import { Settings } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    const path = usePathname()
    const isActive = (href: string) => {
        if (!path) return false
        return path === href || path.startsWith(`${href}/`)
    }
    return (
        <div >
            <div className="border grid grid-cols-1 lg:grid-cols-12">
                <div className="lg:col-span-3 2xl:col-span-2">
                    <ProfileInfo />
                </div>
                <div className=" bg-white lg:col-span-9 2xl:col-span-10 p-4 lg:p-6">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3 cursor-pointer">
                            <ArrowLeftIcon />
                            <h1 className="font-semibold leading-[160%]" >Client details</h1>
                        </div>
                        <button className=" flex items-center gap-1.5 bg-[#111927] text-white cursor-pointer  md:px-4 md:py-[17px] px-4 py-2 rounded-[12px]">
                            <Settings />  Setting
                        </button>
                    </div>
                    <div className="w-full">
                        <div className="w-full border-b border-gray-200">
                            <div className="bg-transparent h-auto p-0 gap-5 rounded-none flex justify-start items-center whitespace-nowrap">
                                <Link
                                    href="/clients/admin"
                                    className={`flex items-center gap-2 px-4 py-3 rounded-none border-b-2 ${isActive('/clients/admin') ? 'border-gray-800 text-gray-900 font-semibold' : 'border-transparent text-gray-700'} hover:text-gray-900 cursor-pointer`}
                                >
                                    <UserSettingsIcon />
                                    <span>Admin</span>
                                </Link>
                                <Link
                                    href="/clients/profile"
                                    className={`flex items-center gap-2 px-4 py-3 rounded-none border-b-2 ${isActive('/clients/profile') ? 'border-gray-800 text-gray-900 font-semibold' : 'border-transparent text-gray-700'} hover:text-gray-900 cursor-pointer`}
                                >
                                    <UserIcon />
                                    <span>Profile</span>
                                </Link>
                                <div>
                                    <Select>
                                        <SelectTrigger
                                            className={`flex items-center gap-2 px-4 py-6 rounded-none ${isActive('/clients/more/jobs') ||
                                                isActive('/clients/more/email_sms_log') ||
                                                isActive('/clients/more/records')
                                                ? 'border-x-0 border-t-0 border-b-2 border-gray-800 font-semibold'
                                                : 'border-transparent'
                                                } cursor-pointer focus-visible:ring-0 focus-visible:ring-offset-0  shadow-none`}
                                        >
                                            <MoreIcon />
                                            <span className='text-[#111927]'>More</span>
                                        </SelectTrigger>

                                        <SelectContent className="space-y-1 p-1.5">
                                            <Link
                                                href="/clients/more/jobs"
                                                className={`flex items-center gap-2 px-4 py-2 rounded-[8px] text-sm cursor-pointer ${isActive('/clients/more/jobs')
                                                    ? 'bg-[#111927] text-white'
                                                    : 'text-{#111927} hover:bg-gray-100'
                                                    }`}
                                            >
                                                <JobsIcon />
                                                <span>Jobs</span>
                                            </Link>

                                            <Link
                                                href="/clients/more/email_sms_log"
                                                className={`flex items-center gap-2 px-4 py-2 rounded-[8px] text-sm cursor-pointer ${isActive('/clients/more/email_sms_log')
                                                    ? 'bg-[#111927] text-white'
                                                    : 'text-{#111927} hover:bg-gray-100'
                                                    }`}
                                            >
                                                <EmailAndSMSIcon />
                                                <span>Email/SMS Log</span>
                                            </Link>

                                            <Link
                                                href="/clients/more/records"
                                                className={`flex items-center gap-2 px-4 py-2 rounded-[8px] text-sm cursor-pointer ${isActive('/clients/more/records')
                                                    ? 'bg-[#111927] text-white'
                                                    : 'text-{#111927} hover:bg-gray-100'
                                                    }`}
                                            >
                                                <ListIcon />
                                                <span>Records</span>
                                            </Link>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* children */}
                    <div className='py-4'>
                        {children}
                    </div>
                </div>
            </div>

        </div>
    )
}

"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Eye, Pencil } from 'lucide-react'
import RootDrawer from '@/components/common/RootDrawer'
import EditContactInfo from './EditContactInfo'

interface InfoFieldProps {
    label: string
    value: string
}

function InfoField({ label, value }: InfoFieldProps) {

    return (
        <div className="space-y-1">
            <div className="flex items-center gap-1.5">
                <span className="text-sm text-[#778593]">{label}</span>
                <Eye className="w-3.5 h-3.5 text-gray-400" />
            </div>
            <p className="text-base text-[#384250]">{value}</p>
        </div>
    )
}

export default function ContactAndAddress() {
    const [open, setOpen] = useState(false)
    return (
        <div className="w-full space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Contact & Address</h2>

                <Button
                    onClick={() => setOpen(true)}
                    variant="outline"
                    className="flex items-center gap-2"
                >
                    <Pencil className="w-4 h-4" />
                    Edit Information
                </Button>

            </div>

            {/* Contact & Address Section */}
            <Card className="shadow-none border-gray-200">
                <CardHeader>
                    <CardTitle className="text-lg font-medium">
                        First Parent (Primary Contact)
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Primary Contact */}
                    <div className="space-y-4">

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <InfoField label="Name" value="Kristin Ben" />
                            <InfoField label="Phone Number" value="+14842918883" />
                            <InfoField label="Email Address" value="binhan628@gmail.com" />
                        </div>
                    </div>

                    {/* Alternate Contact */}
                    <div className="space-y-4 pt-4 ">
                        <h3 className="text-sm font-medium text-gray-700">Alternate Contact</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <InfoField label="Names" value="Colleen James" />
                            <InfoField label="Phone Number" value="+18143008398" />
                            <InfoField label="Email Address" value="tranthuy.nute@gmail.com" />
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Address Section */}
            <Card className="shadow-none border-gray-200">
                <CardHeader>
                    <CardTitle className="text-lg font-medium">
                        Address
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <InfoField label="Street Address" value="26 Berkshire Ave." />
                        <InfoField label="City" value="Atlantic City" />
                        <InfoField label="Province/State" value="NJ" />
                        <InfoField label="Postal Code" value="08401" />
                        <InfoField label="Country" value="USA" />
                    </div>
                </CardContent>
            </Card>

            {
                open && (
                    <EditContactInfo open={open} setOpen={setOpen} />
                )
            }
        </div>
    )
}

"use client"

import RootDrawer from '@/components/common/RootDrawer'
import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import ButtonReuseable from '@/components/reusable/CustomButton'
import EditsIcon from '@/public/icon/EditsIcon'

export default function EditContactInfo({ open, setOpen }: { open: boolean, setOpen: (open: boolean) => void }) {
    const [formData, setFormData] = useState({
        // First Parent (Primary Contact)
        firstParentFirstName: 'Kristin',
        firstParentLastName: 'Ben',
        firstParentEmail: 'binhan628@gmail.com',
        firstParentPhone: '+14842918883',
        // Second Parent (Alternate Contact)
        secondParentFirstName: 'Colleen',
        secondParentLastName: 'James',
        secondParentPhone: '+18143008398',
        secondParentEmail: 'tranthuy.nute@gmail.com',
        // Address
        streetAddress: '26 Berkshire Ave.',
        city: 'Atlantic City',
        postalCode: '08401',
        provinceState: 'NJ',
        country: 'USA'
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Handle form submission here
        console.log('Form submitted:', formData)
        setOpen(false)
    }

    return (
        <RootDrawer open={open} setOpen={setOpen}>
            <div className="p-6 space-y-6">
                {/* Header */}
                <div className="flex items-center gap-2">
                    <h2 className="text-xl font-semibold text-gray-900">Contact & Address</h2>
                    <EditsIcon />
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* First Parent (Primary Contact) Section */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-medium text-gray-900">First Parent (Primary Contact)</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="firstParentFirstName" className="text-sm font-medium">
                                    First Names <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="firstParentFirstName"
                                    name="firstParentFirstName"
                                    value={formData.firstParentFirstName}
                                    onChange={handleChange}
                                    className="h-10"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="firstParentLastName" className="text-sm font-medium">
                                    Last Name <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="firstParentLastName"
                                    name="firstParentLastName"
                                    value={formData.firstParentLastName}
                                    onChange={handleChange}
                                    className="h-10"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="firstParentEmail" className="text-sm font-medium">
                                    Email Address <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="firstParentEmail"
                                    name="firstParentEmail"
                                    type="email"
                                    value={formData.firstParentEmail}
                                    onChange={handleChange}
                                    className="h-10"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="firstParentPhone" className="text-sm font-medium">
                                    Phone Number <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="firstParentPhone"
                                    name="firstParentPhone"
                                    type="tel"
                                    value={formData.firstParentPhone}
                                    onChange={handleChange}
                                    className="h-10"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Second Parent (Alternate Contact) Section */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-medium text-gray-900">Second Parent (Alternate Contact)</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="secondParentFirstName" className="text-sm font-medium">
                                    First Names
                                </Label>
                                <Input
                                    id="secondParentFirstName"
                                    name="secondParentFirstName"
                                    value={formData.secondParentFirstName}
                                    onChange={handleChange}
                                    className="h-10"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="secondParentLastName" className="text-sm font-medium">
                                    Last Name
                                </Label>
                                <Input
                                    id="secondParentLastName"
                                    name="secondParentLastName"
                                    value={formData.secondParentLastName}
                                    onChange={handleChange}
                                    className="h-10"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="secondParentPhone" className="text-sm font-medium">
                                    Phone Number
                                </Label>
                                <Input
                                    id="secondParentPhone"
                                    name="secondParentPhone"
                                    type="tel"
                                    value={formData.secondParentPhone}
                                    onChange={handleChange}
                                    className="h-10"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="secondParentEmail" className="text-sm font-medium">
                                    Email Address
                                </Label>
                                <Input
                                    id="secondParentEmail"
                                    name="secondParentEmail"
                                    type="email"
                                    value={formData.secondParentEmail}
                                    onChange={handleChange}
                                    className="h-10"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Address Section */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-medium text-gray-900">Address</h3>
                        <div className="space-y-2">
                            <Label htmlFor="streetAddress" className="text-sm font-medium">
                                Street Address <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="streetAddress"
                                name="streetAddress"
                                value={formData.streetAddress}
                                onChange={handleChange}
                                className="h-10"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                            <div className="space-y-2">
                                <Label htmlFor="city" className="text-sm font-medium">
                                    City <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="city"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    className="h-10"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="postalCode" className="text-sm font-medium">
                                    Postal Code <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="postalCode"
                                    name="postalCode"
                                    value={formData.postalCode}
                                    onChange={handleChange}
                                    className="h-10"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="provinceState" className="text-sm font-medium">
                                    Province/State <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="provinceState"
                                    name="provinceState"
                                    value={formData.provinceState}
                                    onChange={handleChange}
                                    className="h-10"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="country" className="text-sm font-medium">
                                    Country <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="country"
                                    name="country"
                                    value={formData.country}
                                    onChange={handleChange}
                                    className="h-10"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-end gap-4 pt-4 border-t">
                        <ButtonReuseable
                            title="Update Details"
                            type="submit"
                            className="px-6 bg-gray-900 hover:bg-gray-800"
                        />
                        <ButtonReuseable
                            title="Cancel"
                            type="button"
                            onClick={() => setOpen(false)}
                            className="px-6 bg-[#F3F4F6]! text-[#111927]!"
                        />

                    </div>
                </form>
            </div>
        </RootDrawer>
    )
}

"use client"

import React, { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Eye, Pencil } from 'lucide-react'
import CheckMarkIcon from '@/public/icon/CheckMarkIcon'
import EditRequirements from './EditRequirementsInfo'

interface RequirementItem {
    text: string
    hasEyeIcon?: boolean
    hasAdditionalIcon?: boolean
}

interface RequirementsProps {
    name?: string
    requirements?: RequirementItem[]
}

function RequirementListItem({ requirement }: { requirement: RequirementItem }) {
    return (
        <div className="flex items-start gap-3">
            <CheckMarkIcon />
            <div className="flex items-center gap-2 flex-1">
                <span className="flex gap-3 items-center text-base text-[#384250] flex-1">
                    {requirement.text}
                    {requirement.hasEyeIcon && (
                        <Eye className="w-3.5 h-3.5 text-gray-400" />
                    )}
                </span>
            </div>
        </div>
    )
}

export default function Requirements({
    name = "Theresa Webb",
    requirements
}: RequirementsProps) {
    const [open, setOpen] = useState(false)
    // Default requirements matching the image
    const defaultRequirements: RequirementItem[] = [
        {
            text: "Open to candidates through Midwest Elite Nannies (Iowa)",
            hasEyeIcon: true,
            hasAdditionalIcon: true
        },
        {
            text: "Able to support a child with special needs or medical conditions",
            hasEyeIcon: true
        },
        {
            text: "Can drive the child to after-school activities",
            hasEyeIcon: true
        },
        {
            text: "Comfortable helping with light child-related household tasks",
            hasEyeIcon: true
        },
        {
            text: "Able to prepare meals for the child",
            hasEyeIcon: true
        },
        {
            text: "Willing to travel with the family when needed",
            hasEyeIcon: true
        },
        {
            text: "Receives paid vacation and holidays",
            hasEyeIcon: true
        },
        {
            text: "Comfortable working in a home where parents may be present",
            hasEyeIcon: true
        },
        {
            text: "Must have their own car (or meets the stated transportation requirement)",
            hasEyeIcon: true
        }
    ]

    const requirementsList = requirements || defaultRequirements

    return (
        <div className="w-full space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Requirements</h2>
                <Button
                    variant="outline"
                    onClick={() => setOpen(true)}
                    className="flex items-center gap-2"
                >
                    <Pencil className="w-4 h-4" />
                    Edit Information
                </Button>
            </div>

            {/* Requirements Card */}
            <Card className="shadow-none border-gray-200">
                <CardContent className="pt-6 space-y-4">
                    {/* Name */}
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">{name}</h3>

                    {/* Requirements List */}
                    <div className="space-y-3">
                        {requirementsList.map((requirement, index) => (
                            <RequirementListItem key={index} requirement={requirement} />
                        ))}
                    </div>
                </CardContent>
            </Card>
            {
                open && (
                    <EditRequirements open={open} setOpen={setOpen} />
                )
            }
        </div>
    )
}

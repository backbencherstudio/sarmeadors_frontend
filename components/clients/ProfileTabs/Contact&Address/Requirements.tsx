"use client"

import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Eye, Pencil } from 'lucide-react'

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
            <Checkbox checked={true} className="mt-0.5" disabled />
            <div className="flex items-center gap-2 flex-1">
                <span className="text-sm font-medium text-gray-900 flex-1">
                    {requirement.text}
                </span>
                {requirement.hasAdditionalIcon && (
                    <div className="w-4 h-4 flex items-center justify-center">
                        <Eye className="w-3.5 h-3.5 text-gray-400" />
                    </div>
                )}
                {requirement.hasEyeIcon && (
                    <Eye className="w-3.5 h-3.5 text-gray-400" />
                )}
            </div>
        </div>
    )
}

export default function Requirements({
    name = "Theresa Webb",
    requirements
}: RequirementsProps) {
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
        </div>
    )
}

"use client"

import React, { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Eye, Pencil } from 'lucide-react'
import EditChildrenInformation from './EditChildrenInfo'

interface ChildData {
    name: string
    dateOfBirth: string
    gender: string
    likesDislikes: string
    allergies: string
}

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

function ChildCard({ child }: { child: ChildData }) {
    return (
        <Card className="shadow-none border-gray-200">
            <CardContent className="pt-6 space-y-4">
                {/* Name */}
                <h3 className="text-lg font-medium ">{child.name}</h3>

                {/* Date of Birth, Gender, and Likes/Dislikes in a grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4">
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:col-span-4'>
                        <InfoField label="Date of Birth" value={child.dateOfBirth} />
                        <InfoField label="Gender" value={child.gender} />
                    </div>
                    <div className="lg:col-span-8 space-y-4">
                        <InfoField
                            label="Likes, dislikes, and interests."
                            value={child.likesDislikes}
                        />
                        {/* Allergies */}
                        <InfoField
                            label="Allergies or special needs we need to be made aware of."
                            value={child.allergies}
                        />
                    </div>
                </div>

            </CardContent>
        </Card>
    )
}

export default function ChildrenInformation() {
    const [open, setOpen] = useState(false)
    // Sample data matching the image
    const children: ChildData[] = [
        {
            name: "Savannah Nguyen",
            dateOfBirth: "1 Feb, 2020",
            gender: "Female",
            likesDislikes: "Loves outdoor activities, especially riding a scooter and playing at the park. They enjoy drawing, building with LEGO, and listening to storybooks.",
            allergies: "Has a mild allergy to peanuts, which causes hives if ingested. We carry an antihistamine as advised by our doctor. They also wear glasses for reading. No other medical conditions or special needs at this time."
        },
        {
            name: "Courtney Henry",
            dateOfBirth: "1 Feb, 2020",
            gender: "Female",
            likesDislikes: "Loves outdoor activities, especially riding a scooter and playing at the park. They enjoy drawing, building with LEGO, and listening to storybooks.",
            allergies: "Has a mild allergy to peanuts, which causes hives if ingested. We carry an antihistamine as advised by our doctor. They also wear glasses for reading. No other medical conditions or special needs at this time."
        },
        {
            name: "Darlene Robertson",
            dateOfBirth: "1 Feb, 2020",
            gender: "Male",
            likesDislikes: "Loves outdoor activities, especially riding a scooter and playing at the park. They enjoy drawing, building with LEGO, and listening to storybooks.",
            allergies: "Has a mild allergy to peanuts, which causes hives if ingested. We carry an antihistamine as advised by our doctor. They also wear glasses for reading. No other medical conditions or special needs at this time."
        }
    ]

    return (
        <div className="w-full space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold ">Children Information</h2>
                <Button
                    variant="outline"
                    onClick={() => setOpen(true)}
                    className="flex items-center gap-2"
                >
                    <Pencil className="w-4 h-4" />
                    Edit Information
                </Button>
            </div>

            {/* Children Cards */}
            <div className="space-y-4">
                {children.map((child, index) => (
                    <ChildCard key={index} child={child} />
                ))}
            </div>
            {
                open && (
                    <EditChildrenInformation open={open} setOpen={setOpen} />
                )
            }
        </div>
    )
}

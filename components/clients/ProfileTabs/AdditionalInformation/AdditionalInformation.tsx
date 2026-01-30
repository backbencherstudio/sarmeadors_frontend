"use client"

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Pencil, Info, Eye } from 'lucide-react'
import { useState } from 'react'
import EditAdditionalInformation from './EditAdditionalInfo'

interface AdditionalInfoItem {
    title: string
    content: string
}

export default function AdditionalInformation() {
    const [open, setOpen] = useState(false)
    // Sample data matching the image
    const additionalInfo: AdditionalInfoItem[] = [
        {
            title: "Please describe your family schedule.",
            content: "We follow a structured weekly routine with consistent school hours, after-school activities, and predictable evening wind-down time. Weekends are generally relaxed with family outings or activities planned in advance."
        },
        {
            title: "Please describe an household tasks our nanny will be expected to perform",
            content: ""
        },
        {
            title: "Please describe your family philosophies regarding childcare. discipline, etc.",
            content: ""
        },
        {
            title: "Do you encourage play dates? If so, in your home or away.",
            content: ""
        },
        {
            title: "Please explain any special privileges given to the nanny",
            content: ""
        },
        {
            title: "Describe your home",
            content: ""
        },
        {
            title: "Describe your neighborhood",
            content: ""
        },
        {
            title: "Describe your overall experience with nannies",
            content: ""
        },
        {
            title: "If family has had a previous nanny. please explain how long each nanny was with your family",
            content: ""
        },
        {
            title: "Do you have pets? If so, please describe them",
            content: ""
        }
    ]

    return (
        <div className="w-full space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Additional Information</h2>
                <Button
                    variant="outline"
                    onClick={() => setOpen(true)}
                    className="flex items-center gap-2"
                >
                    <Pencil className="w-4 h-4" />
                    Edit Information
                </Button>
            </div>

            {/* Additional Information Card */}
            <Card className="shadow-none border-gray-200">
                <CardContent className="pt-6">
                    {/* Name */}
                    <h3 className="text-lg font-semibold text-gray-900 mb-6">Theresa Webb</h3>

                    {/* Accordion Sections */}
                    <Accordion type="single" defaultValue="item-0" collapsible className="w-full">
                        {additionalInfo.map((item, index) => (
                            <AccordionItem key={index} value={`item-${index}`} className="border-b border-gray-200">
                                <AccordionTrigger className="hover:no-underline">
                                    <div className="flex items-center gap-2 flex-1 text-left">
                                        <span className="text-base font-medium text-[#384250]">{item.title}</span>
                                        <Eye className="w-4 h-4 text-gray-400 shrink-0" />
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent>
                                    <p className="text-sm text-[#778593] pt-2">
                                        {item.content || "No information provided."}
                                    </p>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </CardContent>
            </Card>
            {
                open && (
                    <EditAdditionalInformation open={open} setOpen={setOpen} />
                )
            }
        </div>
    )
}

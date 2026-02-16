"use client"

import * as React from "react"
import Image from "next/image"
import { Star } from "lucide-react"

import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import ReviewCard from "./ReviewCard"

type Review = {
    id: string
    name: string
    role: string
    message: string
    rating: number
    date: string
    avatarUrl?: string
}

const demoReviews: Review[] = [
    {
        id: "1",
        name: "Muhammad",
        role: "Chef cooking",
        message:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa, lectus elementum consectetur morbi diam curabitur phasellus.",
        rating: 5.0,
        date: "04 March 2021",
        avatarUrl: "/profile.png",
    },
    {
        id: "2",
        name: "Muhammad",
        role: "Nanny, House Manager",
        message:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa, lectus elementum consectetur morbi diam curabitur phasellus.",
        rating: 5.0,
        date: "04 March 2021",
        avatarUrl: "/profile.png",
    },
    {
        id: "3",
        name: "Muhammad",
        role: "Chef cooking",
        message:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa, lectus elementum consectetur morbi diam curabitur phasellus.",
        rating: 5.0,
        date: "04 March 2021",
        avatarUrl: "/profile.png",
    },
]



export default function Reviews() {
    const [show, setShow] = React.useState(false)
    const checkboxId = React.useId()

    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <h2 className="text-base font-semibold">Reviews</h2>

                <div className="flex items-center gap-2">
                    <Checkbox
                        id={checkboxId}
                        checked={show}
                        onCheckedChange={(v) => setShow(Boolean(v))}
                    />
                    <Label htmlFor={checkboxId} className="text-sm text-muted-foreground">
                        Display the feedback provided by this user.
                    </Label>
                </div>
            </div>

           <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {demoReviews.map((r) => (
                       <ReviewCard item={r} key={r.id}/> 
                    ))}
                </div>
        </div>
    )
}

"use client"

import * as React from "react"
import Image from "next/image"
import { Star } from "lucide-react"

import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"

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

function Rating({ value }: { value: number }) {
    return (
        <div className="flex items-center gap-2 text-sm">
            <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
            <span className="text-base">({value.toFixed(1)})</span>
        </div>
    )
}

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

            {!show ? (
                <p className="text-sm text-muted-foreground">
                    Check the box to display review details.
                </p>
            ) : (
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {demoReviews.map((r) => (
                        <Card key={r.id} className="py-4">
                            <CardContent className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border bg-muted">
                                        {r.avatarUrl ? (
                                            <Image
                                                src={r.avatarUrl}
                                                alt={r.name}
                                                fill
                                                className="object-cover"
                                                sizes="40px"
                                            />
                                        ) : null}
                                    </div>

                                    <div className="min-w-0">
                                        <div className="truncate text-base font-semibold">{r.name}</div>
                                        <div className="truncate text-sm text-muted-foreground">
                                            {r.role}
                                        </div>
                                    </div>
                                </div>

                                <p className="text-sm text-muted-foreground pb-4">{r.message}</p>

                                <div className="flex items-center justify-between">
                                    <Rating value={r.rating} />
                                    <span className="text-base">{r.date}</span>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    )
}

"use client"

import RootDrawer from "@/components/common/RootDrawer";
import ButtonReuseable from "@/components/reusable/CustomButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import EditsIcon from "@/public/icon/EditsIcon";
import { useState } from "react";

interface ChildFormData {
    firstName: string;
    lastName: string;
    dateOfBirth: Date | undefined;
    gender: string;
    likesDislikes: string;
    allergies: string;
}

export default function EditChildrenInformation({ open, setOpen }: { open: boolean, setOpen: (open: boolean) => void }) {
    const [children, setChildren] = useState<ChildFormData[]>([
        {
            firstName: "",
            lastName: "",
            dateOfBirth: undefined,
            gender: "Female",
            likesDislikes: "Loves outdoor activities, especially riding a scooter and playing at the park. They enjoy drawing, building with LEGO, and listening to storybooks.",
            allergies: "Has a mild allergy to peanuts, which causes hives if ingested. We carry an antihistamine as advised by our doctor. They also wear glasses for reading. No other medical conditions or special needs at this time."
        },
        {
            firstName: "",
            lastName: "",
            dateOfBirth: undefined,
            gender: "Female",
            likesDislikes: "",
            allergies: ""
        }
    ]);

    const handleChildChange = (index: number, field: keyof ChildFormData, value: string | Date | undefined) => {
        setChildren(prev => {
            const updated = [...prev];
            updated[index] = {
                ...updated[index],
                [field]: value
            };
            return updated;
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission here
        console.log('Form submitted:', children);
        setOpen(false);
    };

    return (
        <RootDrawer open={open} setOpen={setOpen}>
            <div className="p-6 space-y-6">
                {/* Header */}
                <div className="flex items-center gap-2">
                    <h2 className="text-xl font-semibold text-gray-900">Children Information</h2>
                    <EditsIcon />
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {children.map((child, index) => (
                        <div key={index} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor={`child-${index}-firstName`} className="text-sm font-medium">
                                        First Names <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id={`child-${index}-firstName`}
                                        value={child.firstName}
                                        onChange={(e) => handleChildChange(index, 'firstName', e.target.value)}
                                        className="h-10"
                                        placeholder="Input area"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor={`child-${index}-lastName`} className="text-sm font-medium">
                                        Last Name <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id={`child-${index}-lastName`}
                                        value={child.lastName}
                                        onChange={(e) => handleChildChange(index, 'lastName', e.target.value)}
                                        className="h-10"
                                        placeholder="Input area"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor={`child-${index}-dateOfBirth`} className="text-sm font-medium">
                                    Date of Birth <span className="text-red-500">*</span>
                                </Label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            className={cn(
                                                "w-full h-10 justify-start text-left font-normal",
                                                !child.dateOfBirth && "text-muted-foreground"
                                            )}
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {child.dateOfBirth ? format(child.dateOfBirth, "MM/dd/yyyy") : "MM/DD/YYYY"}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={child.dateOfBirth}
                                            onSelect={(date) => handleChildChange(index, 'dateOfBirth', date)}
                                        // initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>
                            <div className="flex items-center gap-2 my-5">
                                <Label className="text-sm font-medium">
                                    Gender <span className="text-red-500">*</span>
                                </Label>
                                <RadioGroup
                                    value={child.gender}
                                    onValueChange={(value) => handleChildChange(index, 'gender', value)}
                                    className="flex gap-6"
                                >
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="Male" id={`child-${index}-male`} />
                                        <Label htmlFor={`child-${index}-male`} className="font-normal cursor-pointer">
                                            Male
                                        </Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="Female" id={`child-${index}-female`} />
                                        <Label htmlFor={`child-${index}-female`} className="font-normal cursor-pointer">
                                            Female
                                        </Label>
                                    </div>
                                </RadioGroup>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor={`child-${index}-likesDislikes`} className="text-sm font-medium">
                                    Please tell us about your child's likes, dislikes, and interests.
                                </Label>
                                <Textarea
                                    id={`child-${index}-likesDislikes`}
                                    value={child.likesDislikes}
                                    onChange={(e) => handleChildChange(index, 'likesDislikes', e.target.value)}
                                    className="min-h-24"
                                    placeholder="Input area"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor={`child-${index}-allergies`} className="text-sm font-medium">
                                    Please describe any of your child's allergies or special needs we need to be made aware of.
                                </Label>
                                <Textarea
                                    id={`child-${index}-allergies`}
                                    value={child.allergies}
                                    onChange={(e) => handleChildChange(index, 'allergies', e.target.value)}
                                    className="min-h-24"
                                    placeholder="Input area"
                                />
                            </div>
                        </div>
                    ))}

                    {/* Action Buttons */}
                    <div className="flex items-center justify-end gap-4 pt-4 ">
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

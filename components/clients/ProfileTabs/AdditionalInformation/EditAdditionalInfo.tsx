"use client"

import RootDrawer from "@/components/common/RootDrawer";
import ButtonReuseable from "@/components/reusable/CustomButton";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import EditsIcon from "@/public/icon/EditsIcon";
import { useState } from "react";

interface AdditionalInfoFormData {
    familySchedule: string;
    householdTasks: string;
    familyPhilosophies: string;
    playDates: string;
    specialPrivileges: string;
    describeHome: string;
    describeNeighborhood: string;
}

export default function EditAdditionalInfo({ open, setOpen }: { open: boolean, setOpen: (open: boolean) => void }) {
    const [formData, setFormData] = useState<AdditionalInfoFormData>({
        familySchedule: "We follow a structured weekly routine with consistent school hours, after-school activities, and predictable evening wind-down times. Weekends are generally relaxed with family outings or activities planned in advance.",
        householdTasks: "",
        familyPhilosophies: "",
        playDates: "",
        specialPrivileges: "",
        describeHome: "",
        describeNeighborhood: ""
    });

    const handleChange = (field: keyof AdditionalInfoFormData, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission here
        console.log('Form submitted:', formData);
        setOpen(false);
    };

    const placeholderText = "A little about the company and the team that you'll be working with.";

    return (
        <RootDrawer open={open} setOpen={setOpen}>
            <div className="p-6 space-y-6">
                {/* Header */}
                <div className="flex items-center gap-2">
                    <h2 className="text-xl font-semibold text-gray-900">Additional Information</h2>
                    <EditsIcon />
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Family Schedule */}
                    <div className="space-y-2">
                        <Label htmlFor="familySchedule" className="text-sm font-medium">
                            Please describe your family schedule. <span className="text-red-500">*</span>
                        </Label>
                        <Textarea
                            id="familySchedule"
                            value={formData.familySchedule}
                            onChange={(e) => handleChange('familySchedule', e.target.value)}
                            className="min-h-24"
                            placeholder={placeholderText}
                            required
                        />
                    </div>

                    {/* Household Tasks */}
                    <div className="space-y-2">
                        <Label htmlFor="householdTasks" className="text-sm font-medium">
                            Please describe an household tasks our nanny will be expected to perform. <span className="text-red-500">*</span>
                        </Label>
                        <Textarea
                            id="householdTasks"
                            value={formData.householdTasks}
                            onChange={(e) => handleChange('householdTasks', e.target.value)}
                            className="min-h-24"
                            placeholder={placeholderText}
                            required
                        />
                    </div>

                    {/* Family Philosophies */}
                    <div className="space-y-2">
                        <Label htmlFor="familyPhilosophies" className="text-sm font-medium">
                            Please describe your family philosophies regarding childcare, discipline, etc. <span className="text-red-500">*</span>
                        </Label>
                        <Textarea
                            id="familyPhilosophies"
                            value={formData.familyPhilosophies}
                            onChange={(e) => handleChange('familyPhilosophies', e.target.value)}
                            className="min-h-24"
                            placeholder={placeholderText}
                            required
                        />
                    </div>

                    {/* Play Dates */}
                    <div className="space-y-2">
                        <Label htmlFor="playDates" className="text-sm font-medium">
                            Do you encourage play dates? If so, in your home or away. <span className="text-red-500">*</span>
                        </Label>
                        <Textarea
                            id="playDates"
                            value={formData.playDates}
                            onChange={(e) => handleChange('playDates', e.target.value)}
                            className="min-h-24"
                            placeholder={placeholderText}
                            required
                        />
                    </div>

                    {/* Special Privileges */}
                    <div className="space-y-2">
                        <Label htmlFor="specialPrivileges" className="text-sm font-medium">
                            Please explain any special privileges given to the nanny. <span className="text-red-500">*</span>
                        </Label>
                        <Textarea
                            id="specialPrivileges"
                            value={formData.specialPrivileges}
                            onChange={(e) => handleChange('specialPrivileges', e.target.value)}
                            className="min-h-24"
                            placeholder={placeholderText}
                            required
                        />
                    </div>

                    {/* Describe Home */}
                    <div className="space-y-2">
                        <Label htmlFor="describeHome" className="text-sm font-medium">
                            Describe your home. <span className="text-red-500">*</span>
                        </Label>
                        <Textarea
                            id="describeHome"
                            value={formData.describeHome}
                            onChange={(e) => handleChange('describeHome', e.target.value)}
                            className="min-h-24"
                            placeholder={placeholderText}
                            required
                        />
                    </div>

                    {/* Describe Neighborhood */}
                    <div className="space-y-2">
                        <Label htmlFor="describeNeighborhood" className="text-sm font-medium">
                            Describe your neighborhood. <span className="text-red-500">*</span>
                        </Label>
                        <Textarea
                            id="describeNeighborhood"
                            value={formData.describeNeighborhood}
                            onChange={(e) => handleChange('describeNeighborhood', e.target.value)}
                            className="min-h-24"
                            placeholder={placeholderText}
                            required
                        />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-end gap-4 pt-4">
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

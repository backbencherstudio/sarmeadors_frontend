"use client"

import RootDrawer from "@/components/common/RootDrawer";
import ButtonReuseable from "@/components/reusable/CustomButton";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import EditsIcon from "@/public/icon/EditsIcon";
import { useState } from "react";

interface RequirementsFormData {
    midwestEliteNannies: string;
    specialNeeds: string;
    afterSchoolActivity: string;
    housekeeper: string;
    prepareMeals: string;
    travelWithFamily: string;
    vacationHolidays: string;
    workFromHome: string;
}

export default function EditRequirementsInfo({ open, setOpen }: { open: boolean, setOpen: (open: boolean) => void }) {
    const [formData, setFormData] = useState<RequirementsFormData>({
        midwestEliteNannies: "Yes",
        specialNeeds: "No",
        afterSchoolActivity: "Yes",
        housekeeper: "Yes",
        prepareMeals: "Yes",
        travelWithFamily: "No",
        vacationHolidays: "Vacation",
        workFromHome: "yes. I do"
    });

    const handleChange = (field: keyof RequirementsFormData, value: string) => {
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

    return (
        <RootDrawer open={open} setOpen={setOpen}>
            <div className="p-6 space-y-6">
                {/* Header */}
                <div className="flex items-center gap-2">
                    <h2 className="text-xl font-semibold text-gray-900">Requirements</h2>
                    <EditsIcon />
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Question 1: Midwest Elite Nannies */}
                    <div className="space-y-2">
                        <Label className="text-sm font-medium">
                            Are you interested in Midwest Elite Nannies (Iowa location)? <span className="text-red-500">*</span>
                        </Label>
                        <RadioGroup
                            value={formData.midwestEliteNannies}
                            onValueChange={(value) => handleChange('midwestEliteNannies', value)}
                            className="flex gap-6"
                        >
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="Yes" id="midwest-yes" />
                                <Label htmlFor="midwest-yes" className="font-normal cursor-pointer">
                                    Yes
                                </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="No" id="midwest-no" />
                                <Label htmlFor="midwest-no" className="font-normal cursor-pointer">
                                    No
                                </Label>
                            </div>
                        </RadioGroup>
                    </div>

                    {/* Question 2: Special Needs */}
                    <div className="space-y-2">
                        <Label className="text-sm font-medium">
                            Does your child have any special needs or medical conditions? <span className="text-red-500">*</span>
                        </Label>
                        <RadioGroup
                            value={formData.specialNeeds}
                            onValueChange={(value) => handleChange('specialNeeds', value)}
                            className="flex gap-6"
                        >
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="Yes" id="special-needs-yes" />
                                <Label htmlFor="special-needs-yes" className="font-normal cursor-pointer">
                                    Yes
                                </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="No" id="special-needs-no" />
                                <Label htmlFor="special-needs-no" className="font-normal cursor-pointer">
                                    No
                                </Label>
                            </div>
                        </RadioGroup>
                    </div>

                    {/* Question 3: After School Activity */}
                    <div className="space-y-2">
                        <Label className="text-sm font-medium">
                            Does your child need to be taken to after school activity? <span className="text-red-500">*</span>
                        </Label>
                        <RadioGroup
                            value={formData.afterSchoolActivity}
                            onValueChange={(value) => handleChange('afterSchoolActivity', value)}
                            className="flex gap-6"
                        >
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="Yes" id="after-school-yes" />
                                <Label htmlFor="after-school-yes" className="font-normal cursor-pointer">
                                    Yes
                                </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="No" id="after-school-no" />
                                <Label htmlFor="after-school-no" className="font-normal cursor-pointer">
                                    No
                                </Label>
                            </div>
                        </RadioGroup>
                    </div>

                    {/* Question 4: Housekeeper */}
                    <div className="space-y-2">
                        <Label className="text-sm font-medium">
                            Do you have a housekeeper? <span className="text-red-500">*</span>
                        </Label>
                        <RadioGroup
                            value={formData.housekeeper}
                            onValueChange={(value) => handleChange('housekeeper', value)}
                            className="flex gap-6"
                        >
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="Yes" id="housekeeper-yes" />
                                <Label htmlFor="housekeeper-yes" className="font-normal cursor-pointer">
                                    Yes
                                </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="No" id="housekeeper-no" />
                                <Label htmlFor="housekeeper-no" className="font-normal cursor-pointer">
                                    No
                                </Label>
                            </div>
                        </RadioGroup>
                    </div>

                    {/* Question 5: Prepare Meals */}
                    <div className="space-y-2">
                        <Label className="text-sm font-medium">
                            Will your nanny be expected to prepare meals? <span className="text-red-500">*</span>
                        </Label>
                        <RadioGroup
                            value={formData.prepareMeals}
                            onValueChange={(value) => handleChange('prepareMeals', value)}
                            className="flex gap-6"
                        >
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="Yes" id="meals-yes" />
                                <Label htmlFor="meals-yes" className="font-normal cursor-pointer">
                                    Yes
                                </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="No" id="meals-no" />
                                <Label htmlFor="meals-no" className="font-normal cursor-pointer">
                                    No
                                </Label>
                            </div>
                        </RadioGroup>
                    </div>

                    {/* Question 6: Travel with Family */}
                    <div className="space-y-2">
                        <Label className="text-sm font-medium">
                            Will your nanny required to travel with the family? <span className="text-red-500">*</span>
                        </Label>
                        <RadioGroup
                            value={formData.travelWithFamily}
                            onValueChange={(value) => handleChange('travelWithFamily', value)}
                            className="flex gap-6"
                        >
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="Yes" id="travel-yes" />
                                <Label htmlFor="travel-yes" className="font-normal cursor-pointer">
                                    Yes
                                </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="No" id="travel-no" />
                                <Label htmlFor="travel-no" className="font-normal cursor-pointer">
                                    No
                                </Label>
                            </div>
                        </RadioGroup>
                    </div>

                    {/* Question 7: Vacation/Holidays */}
                    <div className="space-y-2">
                        <Label className="text-sm font-medium">
                            Will you provide paid vacation or holidays for your nanny? <span className="text-red-500">*</span>
                        </Label>
                        <RadioGroup
                            value={formData.vacationHolidays}
                            onValueChange={(value) => handleChange('vacationHolidays', value)}
                            className="flex flex-col gap-3"
                        >
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="Vacation" id="vacation-only" />
                                <Label htmlFor="vacation-only" className="font-normal cursor-pointer">
                                    Vacation
                                </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="Holidays" id="holidays-only" />
                                <Label htmlFor="holidays-only" className="font-normal cursor-pointer">
                                    Holidays
                                </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="Vacation and Holidays" id="vacation-holidays" />
                                <Label htmlFor="vacation-holidays" className="font-normal cursor-pointer">
                                    Vacation and Holidays
                                </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="None" id="none" />
                                <Label htmlFor="none" className="font-normal cursor-pointer">
                                    None
                                </Label>
                            </div>
                        </RadioGroup>
                    </div>

                    {/* Question 8: Work from Home */}
                    <div className="space-y-2">
                        <Label className="text-sm font-medium">
                            Do you or your spouse work from home? <span className="text-red-500">*</span>
                        </Label>
                        <RadioGroup
                            value={formData.workFromHome}
                            onValueChange={(value) => handleChange('workFromHome', value)}
                            className="flex flex-col gap-3"
                        >
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="yes. I do" id="work-home-me" />
                                <Label htmlFor="work-home-me" className="font-normal cursor-pointer">
                                    yes. I do
                                </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="Yes, my spouse does" id="work-home-spouse" />
                                <Label htmlFor="work-home-spouse" className="font-normal cursor-pointer">
                                    Yes, my spouse does
                                </Label>
                            </div>
                        </RadioGroup>
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

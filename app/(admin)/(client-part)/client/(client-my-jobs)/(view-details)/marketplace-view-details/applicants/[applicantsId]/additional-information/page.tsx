"use client"

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"

export default function Page() {
    return (
        <div className=" flex justify-center">
            <div className="w-full  rounded-lg shadow-sm border p-8 space-y-8">

                {/* Question 1 */}
                <FormSection
                    title="Are you interested in Midwest Elite Nannies (Iowa location)?"
                    required
                >
                    <RadioGroup defaultValue="yes" className="space-y-2">
                        <RadioItem value="yes" label="Yes" />
                        {/* <RadioItem value="no" label="No" /> */}
                    </RadioGroup>
                </FormSection>

                {/* Experience */}
                <FormSection
                    title="Years of Experience (Must have at least 2 years of relevant experience)"
                    required
                >
                    <RadioGroup defaultValue="5-10" className="space-y-2">
                        {/* <RadioItem value="2-4" label="2-4 years" /> */}
                        <RadioItem value="5-10" label="5-10 years" />
                        {/* <RadioItem value="10+" label="10+ years" /> */}
                    </RadioGroup>
                </FormSection>

                {/* Commitment */}
                <FormSection title="Commitment" required>
                    <RadioGroup defaultValue="long-term" className="space-y-2">
                        {/* <RadioItem value="short-term" label="Short Term (less than 1 year)" /> */}
                        <RadioItem value="long-term" label="Long Term (longer than 1 year)" />
                    </RadioGroup>
                </FormSection>

                {/* Available for */}
                <FormSection title="Available for" required>
                    <div className="space-y-3">
                        {/* <CheckboxItem label="Full Time" /> */}
                        <CheckboxItem label="Part Time" />
                        <CheckboxItem label="Live In" />
                    </div>
                </FormSection>

                {/* Driver License */}
                <FormSection title="Do you have a valid Driver’s License and Car?" required>
                    <RadioGroup defaultValue="license-only" className="space-y-2">
                        {/* <RadioItem value="both" label="Driver’s License and Car" /> */}
                        <RadioItem value="license-only" label="Driver’s License only" />
                        {/* <RadioItem value="none" label="No" /> */}
                    </RadioGroup>
                </FormSection>

                {/* CPR */}
                <FormSection title="Are you CPR and First Aid certified?" required>
                    <RadioGroup defaultValue="willing" className="space-y-2">
                        {/* <RadioItem value="yes" label="Yes" />
                        <RadioItem value="no" label="No" /> */}
                        <RadioItem value="willing" label="Willing to get certified" />
                    </RadioGroup>
                </FormSection>

                {/* Vaccinations */}
                <FormSection title="Are you up to date on vaccinations?" required>
                    <RadioGroup defaultValue="yes" className="space-y-2">
                        <RadioItem value="yes" label="Yes" />
                        {/* <RadioItem value="no" label="No" /> */}
                    </RadioGroup>
                </FormSection>

                {/* Pets */}
                <FormSection title="OK with pets in the home?" required>
                    <RadioGroup defaultValue="cat" className="space-y-2">
                        {/* <RadioItem value="none" label="No Pets" /> */}
                        <RadioItem value="cat" label="Cat" />
                        {/* <RadioItem value="dog" label="Dog" />
                        <RadioItem value="both" label="Both" /> */}
                    </RadioGroup>
                </FormSection>

                {/* Travel */}
                <FormSection title="Ok with travel?" required>
                    <RadioGroup defaultValue="international" className="space-y-2">
                        {/* <RadioItem value="no" label="No" />
                        <RadioItem value="domestic" label="Domestic" /> */}
                        <RadioItem value="international" label="International" />
                    </RadioGroup>
                </FormSection>

                {/* Work Authorization */}
                <FormSection title="Are you legally able to work in the United States?" required>
                    <RadioGroup defaultValue="yes" className="space-y-2">
                        <RadioItem value="yes" label="Yes" />
                        {/* <RadioItem value="no" label="No" /> */}
                    </RadioGroup>
                </FormSection>

                {/* Paid legally */}
                <FormSection title="Are you comfortable being paid legally?" required>
                    <RadioGroup defaultValue="yes" className="space-y-2">
                        <RadioItem value="yes" label="Yes" />
                        {/* <RadioItem value="no" label="No" /> */}
                    </RadioGroup>
                </FormSection>

                {/* SSN */}
                <FormSection title="Do you have a valid Social Security Number?" required>
                    <RadioGroup defaultValue="yes" className="space-y-2">
                        <RadioItem value="yes" label="Yes" />
                        {/* <RadioItem value="no" label="No" /> */}
                    </RadioGroup>
                </FormSection>

                {/* How did you hear */}
                <FormSection title="How did you hear about us?" required>
                    <RadioGroup defaultValue="google" className="space-y-2">
                        <RadioItem value="google" label="Google" />
                        {/* <RadioItem value="facebook" label="Facebook" />
                        <RadioItem value="referral" label="Referral" /> */}
                    </RadioGroup>
                </FormSection>

            </div>
        </div>
    )
}

/* ---------- Reusable Components ---------- */

function FormSection({
    title,
    required,
    children,
}: {
    title: string
    required?: boolean
    children: React.ReactNode
}) {
    return (
        <div className="space-y-3">
            <h2 className="font-medium text-sm">
                {title}
                {required && <span className="text-red-500 ml-1">*</span>}
            </h2>
            {children}
        </div>
    )
}

function RadioItem({ value, label }: { value: string; label: string }) {
    return (
        <div className="flex items-center space-x-2">
            <RadioGroupItem value={value} id={value} />
            <Label htmlFor={value} className="text-sm font-normal">
                {label}
            </Label>
        </div>
    )
}

function CheckboxItem({ label }: { label: string }) {
    return (
        <div className="flex items-center space-x-2">
            <Checkbox id={label} />
            <Label htmlFor={label} className="text-sm font-normal">
                {label}
            </Label>
        </div>
    )
}
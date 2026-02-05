import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import ButtonReuseable from "@/components/reusable/CustomButton"
import { Upload } from "lucide-react"

export default function JobDetails() {
    return (
        <div>
            {/* Form */}
            <div className="pb-6 space-y-6">
                <div className="space-y-2">
                    <Label>Status</Label>
                    <Input placeholder="Select Status" className="h-12" />
                </div>

                <div className="space-y-2">
                    <Label>Manager</Label>
                    <Input className="h-12" placeholder="Enter your email" />
                    <div className="flex items-center gap-2 pt-1">
                        <Checkbox id="notify" />
                        <Label htmlFor="notify" className="text-sm">Notify Manager</Label>
                    </div>
                </div>

                <div className="space-y-2">
                    <Label>Job Title *</Label>
                    <Input className="h-12" placeholder="Enter job title" />
                </div>

                <div className="space-y-2">
                    <Label>Select child for whom you need this job *</Label>
                    <Input className="h-12" placeholder="Augustin Miquel, Johanie Jack" />
                </div>

                <div className="space-y-2">
                    <Label>Description *</Label>
                    <Textarea className="h-20" placeholder="Enter a description..." rows={4} />
                </div>

                <div className="space-y-2">
                    <Label>Upload Cover Picture</Label>

                    {/* Hidden file input */}
                    <Input
                        id="cover-upload"
                        type="file"
                        className="hidden"
                    />

                    {/* Clickable area */}
                    <label
                        htmlFor="cover-upload"
                        className="flex cursor-pointer flex-col items-center justify-center border border-dashed rounded-lg p-6 text-sm text-muted-foreground hover:bg-muted/50 transition"
                    >
                        <Upload className="w-5 h-5 mb-2" />
                        <span>Select your file</span>
                        <span className="text-xs">Maximum 500 MB file size</span>
                    </label>
                </div>
            </div>

            {/* Footer */}
            <div className="flex justify-between border-t  py-4">
                <ButtonReuseable title="< Back" type="button" className="bg-[#F3F4F6]! text-[#111927]! cursor-pointer md:py-[17px] px-4 py-2 rounded-[12px]" />
                <ButtonReuseable title="Next >" type="button" className="bg-[#111927]! text-white! cursor-pointer  md:py-[17px] px-4 py-2 rounded-[12px]" />
            </div>
        </div>
    )
}

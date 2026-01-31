import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Plus, Upload } from "lucide-react"
import ButtonReuseable from "@/components/reusable/CustomButton"

export default function CreateJobModal() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="bg-[#111927] text-white hover:bg-[#111927]/90 h-12 px-4">
                    <Plus className="w-4 h-4 mr-2" />
                    Post Job
                </Button>
            </DialogTrigger>

            <DialogContent className="max-w-[1000px]! h-[90vh] overflow-y-auto p-0">
                {/* Header */}
                <DialogHeader className="px-6 pt-6">
                    <DialogTitle className="text-xl font-semibold">Create job</DialogTitle>
                    <p className="text-sm text-muted-foreground">
                        List of all current clients and their details.
                    </p>
                </DialogHeader>

                {/* Steps */}
                <div className="flex items-center gap-6 border-b px-6 py-4 text-sm">
                    <span className="font-medium text-primary">1 Job Details</span>
                    <span className="text-muted-foreground">2 Job Address</span>
                    <span className="text-muted-foreground">3 Date & Time</span>
                    <span className="text-muted-foreground">4 Set Budget</span>
                </div>

                {/* Form */}
                <div className="px-6 py-6 space-y-6">
                    <div className="space-y-2">
                        <Label>Status</Label>
                        <Input value="Application Approved" className="h-12" />
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
                        <div className="flex flex-col items-center justify-center border border-dashed rounded-lg p-6 text-sm text-muted-foreground">
                            <Upload className="w-5 h-5 mb-2" />
                            <span>Select your file</span>
                            <span className="text-xs">Maximum 500 MB file size</span>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex justify-between border-t px-6 py-4">
                    <ButtonReuseable title="< Back" type="button" className="bg-[#F3F4F6]! text-[#111927]! cursor-pointer md:py-[17px] px-4 py-2 rounded-[12px]" />
                    <ButtonReuseable title="Next >" type="button" className="bg-[#111927]! text-white! cursor-pointer  md:py-[17px] px-4 py-2 rounded-[12px]" />
                </div>
            </DialogContent>
        </Dialog>
    )
}

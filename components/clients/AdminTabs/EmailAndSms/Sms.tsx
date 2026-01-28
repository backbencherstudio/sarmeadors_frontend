import ButtonReuseable from "@/components/reusable/CustomButton";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export default function Sms() {
    return (
        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-2xl p-6">
            {/* Title */}
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
                Send SMS
            </h2>

            {/* Phone Number */}
            <p className="text-sm text-gray-700 mb-4">
                +8801816524119
            </p>

            {/* Template Select */}
            <div className="mb-4">
                <Select>
                    <SelectTrigger className="w-full h-12!">
                        <SelectValue placeholder="Theme" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="light">Select Template</SelectItem>
                        <SelectItem value="dark">Welcome SMS</SelectItem>
                        <SelectItem value="system">Verification Code</SelectItem>
                    </SelectContent>
                </Select>
                {/* <select className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    <option>Select Template</option>
                    <option>Welcome SMS</option>
                    <option>Verification Code</option>
                </select> */}
            </div>

            {/* Message Box */}
            <div className="mb-4">
                <Textarea
                    rows={4}
                    placeholder="Enter a description..."
                    className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm resize-none h-32!"
                />
            </div>

            {/* Checkbox */}
            <div className="flex items-center gap-2 mb-5">
                <Checkbox />
                <label htmlFor="log" className="text-sm text-gray-700">
                    Log email as note
                </label>
            </div>

            {/* Send Button */}
            <ButtonReuseable title="Send" type="button" className="w-full rounded-xl py-3 text-sm font-medium hover:bg-black transition" />

        </div>
    );
}

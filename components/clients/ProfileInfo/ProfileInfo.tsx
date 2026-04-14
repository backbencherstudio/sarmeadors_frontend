import Image from "next/image";
import avatar from "@/public/profile.png";
import { Trash2Icon } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import EmailIcon from "@/public/icon/EmailIcon";
import CallIcon from "@/public/icon/CallIcon";
import CalandarIcon from "@/public/icon/CalandarIcon";

export default function ProfileInfo() {
    return (
        <div className="flex flex-col justify-between w-full mx-auto bg-white border-r border-gray-200 p-5 lg:h-full lg:min-h-screen">
            <div>
                {/* Avatar */}
                <div className="flex flex-col items-center text-center">
                    <div className="w-24 h-24 rounded-full overflow-hidden mb-3">
                        <Image
                            src={avatar}
                            alt="Pristia Candra"
                            width={96}
                            height={96}
                            className="object-cover"
                        />
                    </div>

                    <h2 className="text-lg font-semibold text-gray-900">
                        Pristia Candra
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                        In status since 19 Nov 2025 <br />
                        (2 hours, 44 minutes)
                    </p>
                </div>

                {/* Status Dropdown */}
                <div className="mt-5">
                    <Select>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Theme" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="light">Approved</SelectItem>
                            <SelectItem value="dark">Pending</SelectItem>
                            <SelectItem value="system">Rejected</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Info */}
                <div className="mt-6 space-y-4 text-sm text-gray-700">
                    <div className="flex items-center gap-3">
                        <EmailIcon />
                        <span>lincoln@gmail.com</span>
                    </div>

                    <div className="flex items-center gap-3">
                        <CallIcon />
                        <span>+17036258009</span>
                    </div>

                    <div className="flex items-center gap-3">
                        <CalandarIcon />
                        <span>Wed Nov 19 2025</span>
                    </div>
                </div>
            </div>

            {/* Delete Button */}
            <div className="mt-8">
                <button className="w-full flex items-center justify-center gap-2 rounded-xl border border-red-500 text-red-500 py-3 font-medium hover:bg-red-50 transition cursor-pointer">
                    <Trash2Icon className="w-5 h-5" /> Delete Client
                </button>
            </div>
        </div>
    );
}

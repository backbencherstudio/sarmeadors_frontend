"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
    HiOutlineMenu,
    HiOutlineDocumentText,
    HiOutlineLockClosed,
    HiOutlineCreditCard,
    HiOutlineDocument,
    HiOutlineUserGroup
} from "react-icons/hi"
import { MdSms } from "react-icons/md"
import { FaTrophy } from "react-icons/fa"
import List from "./List/List"
import Notes from "./Notes/Notes"
import EmailAndSms from "./EmailAndSms/EmailAndSms"
import PaymentPage from "./payment/PaymentPage";
import Events from "./Events/Events";
import Password from "./Password/Password";
import Documents from "./Documents/Documents";


// interface TermsConditionFormData {
//     explanation: string;
// }

export function AdminTabs() {
    // const [editorKey] = useState(0);

    // const { watch, setValue, handleSubmit } = useForm<TermsConditionFormData>({
    //     defaultValues: {
    //         explanation: "",
    //     },
    // });

    return (
        <div>
            <Tabs defaultValue="lists" className="w-full">
                <TabsList className="bg-transparent border border-gray-200 p-0.5 h-auto  gap-0 rounded-lg w-full justify-start overflow-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    <TabsTrigger
                        value="lists"
                        className="flex items-center gap-2 px-4 py-2.5 rounded-lg border-0 data-[state=active]:bg-[#111927] data-[state=active]:text-white data-[state=active]:shadow-none text-gray-400 font-normal hover:text-gray-600 transition-colors [&_svg]:text-current cursor-pointer"
                    >
                        <HiOutlineMenu className="w-5 h-5" />
                        <span>Lists</span>
                    </TabsTrigger>
                    <TabsTrigger
                        value="notes"
                        className="flex items-center gap-2 px-4 py-2.5 rounded-lg border-0 data-[state=active]:bg-[#111927] data-[state=active]:text-white data-[state=active]:shadow-none text-gray-400 font-normal hover:text-gray-600 transition-colors [&_svg]:text-current cursor-pointer"
                    >
                        <HiOutlineDocumentText className="w-5 h-5" />
                        <span>Notes</span>
                    </TabsTrigger>
                    <TabsTrigger
                        value="email-sms"
                        className="flex items-center gap-2 px-4 py-2.5 rounded-lg border-0 data-[state=active]:bg-[#111927] data-[state=active]:text-white data-[state=active]:shadow-none text-gray-400 font-normal hover:text-gray-600 transition-colors [&_svg]:text-current cursor-pointer"
                    >
                        <div className="flex items-center gap-1">
                            {/* <MdEmail className="w-4 h-4" /> */}
                            <MdSms className="w-4 h-4" />
                        </div>
                        <span>Email/SMS</span>
                    </TabsTrigger>
                    <TabsTrigger
                        value="events"
                        className="flex items-center gap-2 px-4 py-2.5 rounded-lg border-0 data-[state=active]:bg-[#111927] data-[state=active]:text-white data-[state=active]:shadow-none text-gray-400 font-normal hover:text-gray-600 transition-colors [&_svg]:text-current cursor-pointer"
                    >
                        <FaTrophy className="w-5 h-5" />
                        <span>Events</span>
                    </TabsTrigger>
                    <TabsTrigger
                        value="password"
                        className="flex items-center gap-2 px-4 py-2.5 rounded-lg border-0 data-[state=active]:bg-[#111927] data-[state=active]:text-white data-[state=active]:shadow-none text-gray-400 font-normal hover:text-gray-600 transition-colors [&_svg]:text-current cursor-pointer"
                    >
                        <HiOutlineLockClosed className="w-5 h-5" />
                        <span>Password</span>
                    </TabsTrigger>
                    <TabsTrigger
                        value="payments"
                        className="flex items-center gap-2 px-4 py-2.5 rounded-lg border-0 data-[state=active]:bg-[#111927] data-[state=active]:text-white data-[state=active]:shadow-none text-gray-400 font-normal hover:text-gray-600 transition-colors [&_svg]:text-current cursor-pointer"
                    >
                        <HiOutlineCreditCard className="w-5 h-5" />
                        <span>Payments</span>
                    </TabsTrigger>
                    <TabsTrigger
                        value="documents"
                        className="flex items-center gap-2 px-4 py-2.5 rounded-lg border-0 data-[state=active]:bg-[#111927] data-[state=active]:text-white data-[state=active]:shadow-none text-gray-400 font-normal hover:text-gray-600 transition-colors [&_svg]:text-current cursor-pointer"
                    >
                        <HiOutlineDocument className="w-5 h-5" />
                        <span>Documents</span>
                    </TabsTrigger>
                    <TabsTrigger
                        value="matches"
                        className="flex items-center gap-2 px-4 py-2.5 rounded-lg border-0 data-[state=active]:bg-[#111927] data-[state=active]:text-white data-[state=active]:shadow-none text-gray-400 font-normal hover:text-gray-600 transition-colors [&_svg]:text-current cursor-pointer"
                    >
                        <HiOutlineUserGroup className="w-5 h-5" />
                        <span>Matches</span>
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="lists" className="mt-4">
                    <List />
                </TabsContent>
                <TabsContent value="notes" className="mt-4">
                    <Notes />
                </TabsContent>
                <TabsContent value="email-sms" className="mt-4">
                    <EmailAndSms />
                </TabsContent>
                <TabsContent value="events" className="mt-4">
                    <Events />
                </TabsContent>
                <TabsContent value="password" className="mt-4">
                    <Password />
                </TabsContent>
                <TabsContent value="payments" className="mt-4">
                    <PaymentPage />
                </TabsContent>
                <TabsContent value="documents" className="mt-4">
                    <Documents />
                </TabsContent>
                <TabsContent value="matches" className="mt-4">
                    <div className="text-gray-600">Matches content here</div>
                </TabsContent>
            </Tabs>
        </div>
    )
}

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function EmailOrSmsLog() {
    return (
        <div className="space-y-6">
            <h1 className="text-xl font-semibold">Email/SMS Log</h1>
            <div className="space-y-4">
                <div className="space-y-1.5">
                    <Label htmlFor="CommunicationChannel">Communication channel</Label>
                    <Select>
                        <SelectTrigger className="w-full h-12!">
                            <SelectValue placeholder="Select Communication Channel" />
                        </SelectTrigger>
                        <SelectContent className="">
                            <SelectItem value="email">Email</SelectItem>
                            <SelectItem value="sms">SMS</SelectItem>
                        </SelectContent>
                    </Select>
                    <span className="text-sm text-gray-500 cursor-pointer">Clear</span>
                </div>
                <hr />
                <div className="space-y-4">
                    <h1 className="text-lg font-medium">Email Log</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4">
                        <div className="space-y-1.5">
                            <Label htmlFor="LoggedAfter">Logged After</Label>
                            <Input className="w-full h-12" placeholder="Select Date" type="text" id="LoggedAfter" />
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="LoggedUpTo">Logged Up To</Label>
                            <Input className="w-full h-12" placeholder="Select Date" type="text" id="LoggedUpTo" />
                        </div>
                    </div>
                    <div className="space-y-1.5">
                        <Label htmlFor="FilterByStatus">Filter by Status</Label>
                        <Select>
                            <SelectTrigger className="w-full h-12!">
                                <SelectValue placeholder="Filter by Status" />
                            </SelectTrigger>
                            <SelectContent className="">
                                <SelectItem value="email">Email</SelectItem>
                                <SelectItem value="sms">SMS</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>
            <hr />
            <div className="">
                <Tabs defaultValue="email" className="bg-transparent ">
                    <TabsList className="flex max-w-[360px] border border-borderColor w-full px-1 gap-1 items-center bg-transparent h-13.5!">
                        <TabsTrigger
                            value="email"
                            className={`lg:px-3 !h-11 hover:bg-grayColor1 border border-transparent hover:border duration-200 data-[state=active]:border data-[state=active]:bg-grayColor1 cursor-pointer rounded-sm text-[13px] md:text-sm font-semibold transition `}
                        >
                            Email

                        </TabsTrigger>

                        <TabsTrigger
                            value="sms"
                            className={`lg:px-3 !h-11 hover:bg-grayColor1 border border-transparent hover:border duration-200 cursor-pointer data-[state=active]:border data-[state=active]:bg-grayColor1 rounded-sm text-[13px] md:text-sm font-semibold transition `}
                        >
                            SMS
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="email" className="">
                        <div className="">
                            {/* <ManualPayments /> */}
                        </div>
                        fsdafasdf
                    </TabsContent>
                    <TabsContent value="sms" className="bg-transparent">
                        <div className="">
                            {/* <InvoiceInfo /> */}
                        </div>
                        sdfasdfasd
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}

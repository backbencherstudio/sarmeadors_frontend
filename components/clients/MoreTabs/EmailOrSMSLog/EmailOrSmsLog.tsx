import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Email from "../../AdminTabs/EmailAndSms/Email";
import EmailorMessagesent from "./EmailorMessagesent";

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
              <Input
                className="w-full h-12"
                placeholder="Select Date"
                type="text"
                id="LoggedAfter"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="LoggedUpTo">Logged Up To</Label>
              <Input
                className="w-full h-12"
                placeholder="Select Date"
                type="text"
                id="LoggedUpTo"
              />
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
        <EmailorMessagesent />
      </div>
    </div>
  );
}

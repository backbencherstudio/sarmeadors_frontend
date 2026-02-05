import ClientEmail from "@/components/icon/ClientEmail";
import ClientMessageIcon from "@/components/icon/ClientMessageIcon";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EmailInfo from "./EmailInfo";
function EmailorMessagesent() {
  return (
    <div>
      <Tabs defaultValue="email" className="bg-transparent ">
        <div className="flex items-center justify-between">
          <p className="text-lg md:text-xl font-semibold">
            Total Email/ SMS Log
          </p>
          <TabsList className="flex max-w-[174px] border border-borderColor w-full px-1 gap-1 items-center bg-transparent h-12.5!">
            <TabsTrigger
              value="email"
              className={`lg:px-2.5 !h-10 hover:bg-grayColor1 border border-transparent hover:border duration-200 data-[state=active]:border  data-[state=active]:bg-grayColor1 cursor-pointer rounded-sm text-[13px] md:text-sm font-semibold transition `}
            >
              <ClientEmail /> Email
            </TabsTrigger>

            <TabsTrigger
              value="sms"
              className={`lg:px-2.5 !h-10 hover:bg-grayColor1 border border-transparent hover:border duration-200 cursor-pointer data-[state=active]:border data-[state=active]:bg-grayColor1 rounded-sm text-[13px] md:text-sm font-semibold transition `}
            >
              <ClientMessageIcon /> SMS
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="email" className="">
          <div className="">
            <EmailInfo isShow={true} />
          </div>
        </TabsContent>
        <TabsContent value="sms" className="bg-transparent">
          <div className=""><EmailInfo /></div>

        </TabsContent>
      </Tabs>
    </div>
  );
}

export default EmailorMessagesent;

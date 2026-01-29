import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";


export default function ReusableTabs({ tabs }: { tabs: { label: string, value: string, icon?: React.ReactNode, component?: React.ReactNode }[] }) {
    return (
        <div>
            <Tabs defaultValue={tabs[0].value} className="w-full">
                <TabsList className="bg-transparent border border-gray-200 p-0.5 h-auto  gap-0 rounded-lg w-full justify-start overflow-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">

                    {tabs.map((tab) => (
                        <TabsTrigger
                            key={tab.value}
                            value={tab.value}
                            className="flex items-center gap-2 px-4 py-2.5 rounded-lg border-0 data-[state=active]:bg-[#111927] data-[state=active]:text-white data-[state=active]:shadow-none text-gray-400 font-normal hover:text-gray-600 transition-colors [&_svg]:text-current cursor-pointer"
                        >
                            {tab?.icon}
                            <span>{tab.label}</span>
                        </TabsTrigger>
                    ))}
                </TabsList>
                {tabs.map((tab) => (
                    <TabsContent key={tab.value} value={tab.value} className="mt-4">
                        {tab?.component}
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    )
}

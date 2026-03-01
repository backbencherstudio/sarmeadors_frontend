import BroadcastRequestModal from "@/components/client/ClientMyJobs/ShortTermJob/Marketplace/Applicants/BroadcastRequestModal"
import ReusableLineTabs from "@/components/reusable/ReusableLineTabs"
import { Edit } from "lucide-react"

export default function PendingViewDetailsLayout({ children }) {
    const TabsData = [
        { label: "Job Description", link: "/client/marketplace-view-details/job-description" },
        { label: "Applicants (0)", link: "/client/marketplace-view-details/applicants" }
    ]
    return (
        <div className="p-6">
            {/* Job Details */}
            <div className="flex justify-between items-center">
                <div className="">
                    <h1 className="font-semibold capitalize leading-[160%]">
                        Job Details
                    </h1>
                </div>
                {/* Broadcast Request Modal */}
                <BroadcastRequestModal />
            </div>
            {/* Reusable Line Tabs */}
            <ReusableLineTabs tabs={TabsData} />
            {/* Children */}
            <div className='pt-5'>
                {children}
            </div>
        </div>
    )
}

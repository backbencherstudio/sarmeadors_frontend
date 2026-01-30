import ReusableTabs from "@/components/reusable/ReusableTabs"
import ContactAndAddress from "./Contact&Address/ContactAndAddress"
import ChildrenInformation from "./ChildrenInformation/ChildrenInformation"
import Requirements from "./Requirements/Requirements"
import AdditionalInformation from "./AdditionalInformation/AdditionalInformation"

export default function ProfileTabs() {
    const tabs = [
        {
            label: "Contact & Address",
            value: "Contact & Address",
            component: <ContactAndAddress />
        },
        {
            label: "Children Information",
            value: "Children Information",
            component: <ChildrenInformation />
        },
        {
            label: "Requirements",
            value: "Requirements",
            component: <Requirements />
        },
        {
            label: "Additional Information",
            value: "Additional Information",
            component: <AdditionalInformation />
        },
    ]
    return (
        <div>
            <ReusableTabs tabs={tabs} />
        </div>
    )
}

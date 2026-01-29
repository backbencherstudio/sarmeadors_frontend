import ReusableTabs from "@/components/reusable/ReusableTabs"
import ContactAndAddress from "./Contact&Address/ContactAndAddress"
import ChildrenInformation from "./Contact&Address/ChildrenInformation"
import Requirements from "./Contact&Address/Requirements"
import AdditionalInformation from "./Contact&Address/AdditionalInformation"

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

import ReusableTabs from "@/components/reusable/ReusableTabs"
import ContactAndAddress from "./Contact&Address/ContactAndAddress"
import ChildrenInformation from "./ChildrenInformation/ChildrenInformation"
import Requirements from "./Requirements/Requirements"
import AdditionalInformation from "./AdditionalInformation/AdditionalInformation"

export default function ProfileTabs() {
    const tabs = [
        {
            label: "Contact & Address",
            link: "/clients/profile/contact-and-address",
        },
        {
            label: "Children Information",
            link: "/clients/profile/children-information",
        },
        {
            label: "Requirements",
            link: "/clients/profile/requirements",
        },
        {
            label: "Additional Information",
            link: "/clients/profile/additional-information",
        },
    ]
    return (
        <div>
            <ReusableTabs tabs={tabs} />
        </div>
    )
}

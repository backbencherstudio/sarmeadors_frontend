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
            component: <ContactAndAddress />
        },
        {
            label: "Children Information",
            link: "/clients/profile/children-information",
            component: <ChildrenInformation />
        },
        {
            label: "Requirements",
            link: "/clients/profile/requirements",
            component: <Requirements />
        },
        {
            label: "Additional Information",
            link: "/clients/profile/additional-information",
            component: <AdditionalInformation />
        },
    ]
    return (
        <div>
            <ReusableTabs tabs={tabs} />
        </div>
    )
}

"use client"

import ProfileAndReview from '@/components/client/ClientMyJobs/ShortTermJob/Marketplace/Applicants/(view-details)/ProfileAndReview'
import ReusableTabs from '@/components/reusable/ReusableTabs'

export default function SingleAplicantsLayout({ children }) {

    // const { applicantsId } = useParams()

    const tabs = [
        {
            label: "Personal Information",
            link: `/client/running-view-details/candidate-profile/personal-information`,
        },
        {
            label: "Professional Information",
            link: `/client/running-view-details/candidate-profile/professional-information`,
        },
        {
            label: "Documents",
            link: `/client/running-view-details/candidate-profile/documents`,
        },
        {
            label: "Additional Information",
            link: `/client/running-view-details/candidate-profile/additional-information`,
        },
    ]

    return (
        <div className='space-y-4'>
            <ProfileAndReview />
            <ReusableTabs tabs={tabs} initialPath='' />
            {children}
        </div>
    )
}

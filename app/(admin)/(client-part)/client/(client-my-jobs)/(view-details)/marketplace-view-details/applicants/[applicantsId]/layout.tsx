"use client"

import ProfileAndReview from '@/components/client/ClientMyJobs/ShortTermJob/Marketplace/Applicants/(view-details)/ProfileAndReview'
import ReusableTabs from '@/components/reusable/ReusableTabs'
import { useParams } from 'next/navigation'

export default function SingleAplicantsLayout({ children }) {

    const { applicantsId } = useParams()

    const tabs = [
        {
            label: "Personal Information",
            link: `/client/marketplace-view-details/applicants/${applicantsId}/personal-information`,
        },
        {
            label: "Professional Information",
            link: `/client/marketplace-view-details/applicants/${applicantsId}/professional-information`,
        },
        {
            label: "Documents",
            link: `/client/marketplace-view-details/applicants/${applicantsId}/documents`,
        },
        {
            label: "Additional Information",
            link: `/client/marketplace-view-details/applicants/${applicantsId}/additional-information`,
        },
    ]
    return (
        <div className='space-y-4'>
            <ProfileAndReview />
            <ReusableTabs tabs={tabs} />
            {children}
        </div>
    )
}

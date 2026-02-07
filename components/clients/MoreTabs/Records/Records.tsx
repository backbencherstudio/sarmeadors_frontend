import ReusableTabs from '@/components/reusable/ReusableTabs'
import React from 'react'
import Reviews from './Reviews'
import StatusChanges from './StatusChanges'
import ActivityLog from './ActivityLog'
import RelationshipLog from './RelationshipLog'
import JobApplicationLog from './JobApplicationLog'
import PaymentLog from './PaymentLog'

export default function Records() {
    const tabs = [
        {
            label: "Reviews",
            link: "/clients/more/records/reviews",
            component: <Reviews />
        },
        {
            label: "Status Changes",
            link: "/clients/more/records/status-changes",
            component: <StatusChanges />
        },
        {
            label: "Activity Log",
            link: "/clients/more/records/activity-log",
            component: <ActivityLog />
        },
        {
            label: "Relationship Log",
            link: "/clients/more/records/relationship-log",
            component: <RelationshipLog />
        },
        {
            label: "Job Application Log",
            link: "/clients/more/records/job-application-log",
            component: <JobApplicationLog />
        },
        {
            label: "Payment Log",
            link: "/clients/more/records/payment-log",
            component: <PaymentLog />
        },
    ]
    return (
        <div>
            <ReusableTabs tabs={tabs} />
        </div>
    )
}

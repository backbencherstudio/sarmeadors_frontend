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
            value: "Reviews",
            component: <Reviews />
        },
        {
            label: "Status Changes",
            value: "Status Changes",
            component: <StatusChanges />
        },
        {
            label: "Activity Log",
            value: "Activity Log",
            component: <ActivityLog />
        },
        {
            label: "Relationship Log",
            value: "Relationship Log",
            component: <RelationshipLog />
        },
        {
            label: "Job Application Log",
            value: "Job Application Log",
            component: <JobApplicationLog />
        },
        {
            label: "Payment Log",
            value: "Payment Log",
            component: <PaymentLog />
        },
    ]
    return (
        <div>
            <ReusableTabs tabs={tabs} />
        </div>
    )
}

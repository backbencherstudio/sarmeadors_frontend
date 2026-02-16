import ReusableTabs from '@/components/reusable/ReusableTabs'

export default function Records() {
    const tabs = [
        {
            label: "Reviews",
            link: "/clients/more/records/reviews",
        },
        {
            label: "Status Changes",
            link: "/clients/more/records/status-changes",
        },
        {
            label: "Activity Log",
            link: "/clients/more/records/activity-log",
        },
        {
            label: "Relationship Log",
            link: "/clients/more/records/relationship-log",
        },
        {
            label: "Job Application Log",
            link: "/clients/more/records/job-application-log",
        },
        {
            label: "Payment Log",
            link: "/clients/more/records/payment-log",
        },
    ]
    return (
        <div>
            <ReusableTabs tabs={tabs} />
        </div>
    )
}

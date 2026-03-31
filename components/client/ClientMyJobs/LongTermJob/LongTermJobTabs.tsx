"use client";
import ReusableTabs from "@/components/reusable/ReusableTabs";

export function LognTermJobTabs() {
    const tabs = [
        {
            label: "Running (1)",
            link: "/client/client-my-jobs/long-term-job",
        },
        {
            label: "Pending (0) ",
            link: "/client/client-my-jobs/long-term-job/pending",
        },
        {
            label: "Marketplace (1)",
            link: "/client/client-my-jobs/long-term-job/marketplace",
        },
        {
            label: "Completed (9)",
            link: "/client/client-my-jobs/long-term-job/completed",
        },
        {
            label: "Canceled (1)",
            link: "/client/client-my-jobs/long-term-job/canceled",
        },
        {
            label: "Rejected (1)",
            link: "/client/client-my-jobs/long-term-job/rejected",
        },
    ];

    return (
        <div>
            <ReusableTabs tabs={tabs} initialPath="" />
        </div>
    );
}

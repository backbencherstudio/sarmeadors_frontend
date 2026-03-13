
import { LognTermJobTabs } from '@/components/client/ClientMyJobs/LongTermJob/LongTermJobTabs'
import React from 'react'

export default function MyJobsLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className='mt-4 space-y-4'>
            <LognTermJobTabs />
            {children}
        </div>
    )
}
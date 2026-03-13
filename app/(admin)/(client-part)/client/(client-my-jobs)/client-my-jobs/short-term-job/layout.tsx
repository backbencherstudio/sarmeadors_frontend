import { ShortTermJobTabs } from '@/components/client/ClientMyJobs/ShortTermJob/ShortTermJobTabs'
import React from 'react'

export default function MyJobsLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className='mt-4 space-y-4'>
            <ShortTermJobTabs />
            {children}
        </div>
    )
}

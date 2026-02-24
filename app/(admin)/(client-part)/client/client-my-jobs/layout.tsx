
import MyJobTopMenu from '@/components/client/ClientMyJobs/LongTermJob/MyJobTabs'
import React from 'react'

export default function MyJobsLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className='p-6'>
            <MyJobTopMenu />
            {children}
        </div>
    )
}

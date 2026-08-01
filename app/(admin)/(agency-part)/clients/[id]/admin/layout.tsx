
import { AdminTabs } from '@/components/clients/AdminTabs/AdminTabs'
import React from 'react'

export default function AdminLayout({ children }: { children: React.ReactNode }) {

    return (
        <div className='space-y-4 lg:space-y-6'>
            <AdminTabs />
            {children}
        </div>
    )
}

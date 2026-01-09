
import { cookies } from 'next/headers'
import Link from 'next/link'
import DashboardUserTable from './DashboardUserTable'
import StatCards from './StatCards'
import { TiFlowMerge } from "react-icons/ti";
import { TbNotes } from 'react-icons/tb';

async function DashboardPage() {
  const cookieStore = await cookies()
  const token = cookieStore?.get("jobtoken")?.value;
 
  if (token) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Link href="/login" className="text-xl underline text-primaryColor text-center">Please log in to view the dashboard</Link>
      </div>
    );
  }

  try {
  
    return (
      <div className='flex flex-col justify-between h-full'>
        <div>
         <div className='flex items-center justify-between mb-4'>
           <h3 className='text-lg md:text-xl font-semibold text-blackColor'>Status Statistics</h3>
           <div className='flex gap-4 items-center' >
            <button className='flex items-center px-4 py-3 cursor-pointer rounded-md gap-2 border border-gray2Color '><TiFlowMerge/> Process Flow</button>
            <button className='flex items-center px-4 py-3 cursor-pointer rounded-md gap-2 border border-gray2Color '><TbNotes /> View Application Form</button>
           </div>
         </div>

        <StatCards />
        </div>

        <div className='mt-10'>
          <DashboardUserTable/>
        </div>
      </div>
    )
  } catch (error: any) {
    if (error?.response?.status === 403) {
      return (
        <div className="flex justify-center items-center h-screen">
          <p className="text-xl text-red-500">Access forbidden. Please log in again or check your permissions.</p>
        </div>
      );
    }
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl text-red-500">Error: {error?.message || "Something went wrong."}</p>
      </div>
    );
  }
}

export default DashboardPage

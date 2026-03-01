import ApplicantsTable from '@/components/client/ClientMyJobs/ShortTermJob/Pending/ViewDetails/Applicants/ApplicantsTable'

export default function page() {
    const isData = true
    return (
        <div>
            {
                isData ?
                    <ApplicantsTable />
                    :
                    <div className="max-w-full  bg-gray-50 font-sans p-8 border border-dashed border-gray-200 rounded-lg text-center">
                        <h2 className="text-2xl font-bold text-gray-900 mb-3">No Applicants Founded</h2>

                        <p className="text-base text-gray-600">
                            Your job post is currently under review. Once it is approved by the admin, it will go live and candidates will be able to apply.
                        </p>
                    </div>
            }

        </div>
    )
}

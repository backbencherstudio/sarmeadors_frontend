"use client";

export default function ProfessionalInformationCardPage() {
    return (
        <div className="space-y-8">

            {/*  Work Info Card  */}
            <div className=" border border-gray-200 rounded-2xl p-8 text-sm text-gray-700">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-16">

                    <Info label="How many hours you would like?" value="Kristin" />
                    <Info label="Fluent in an other languages?" value="Ben" />

                    <Info label="Pay range per hour" value="12/12/2025" />
                    <Info label="Start Date" value="Americans" />

                    <Info label="Why did our last position end?" value="Americans" />

                </div>
            </div>

            {/* Reference Card */}
            <div className=" border border-gray-200 rounded-2xl p-8 text-sm text-gray-700">

                <h2 className="text-lg font-semibold text-black mb-6">
                    Reference
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-16">

                    <Info label="First Names" value="Kristin" />
                    <Info label="Last Name" value="Ben" />

                    <Info label="Phone no" value="12/12/2025" />
                    <Info label="Email" value="Americans" />

                    <Info label="Relation" value="Americans" />
                    <Info label="Describe your experience with reference" value="Americans" />

                </div>
            </div>

        </div>
    );
}


/* Reusable Info Row */
function Info({ label, value }: { label: string; value: string }) {
    return (
        <div>
            <p className="text-gray-400 text-xs mb-1">{label}</p>
            <p className="font-medium text-gray-800">{value}</p>
        </div>
    );
}
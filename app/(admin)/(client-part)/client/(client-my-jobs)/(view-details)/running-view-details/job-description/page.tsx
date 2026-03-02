
export default function Page() {
    return (
        <div className="max-w-full mx-auto bg-white font-sans">
            {/* Customer Information */}
            <div className="mb-4">
                <h1 className="text-2xl font-bold mb-4">Darlene Robertson</h1>

                <div className="space-y-2">
                    <div className="flex gap-2 ">
                        <span className="font-bold">Service Type:</span>
                        <span className="text-[#384250]">House Manager</span>
                        |
                        <span className="text-[#384250]">Baby/Night Nurse</span>
                    </div>
                    <div className="space-y-1">
                        <span className="font-bold">Job Description</span>
                        <p className="text-[#384250]">Two loving, hands-on parents are looking for a warm and attentive ROTA nanny to join their fully-staffed home to help care for their extremely bright and energetic 4 year old son and sweet and active 11 month old daughter. The ideal candidate is a positive, energetic, and intelligent person with excellent communication skills, who can demonstrate continuing interest and education in Early Childhood Education. The family will be homeschooling their children, and are looking for a nanny who ideally has a teaching background to assist in homeschooling.

                            The work schedule can be flexible for the ideal candidate – the nanny may choose to work 40-72 hours/week every other week on the ROTA schedule (for example, Monday-Friday every other week or Monday-Saturday every other week). There are currently two nannies, and the family is looking to add a third: the current ROTA nanny works 6am-6pm (7 days on, 7 days off), and the current second nanny works Mondays-Fridays (full-time, flexible schedule). Living-in during the on-duty weeks is a possible option for the right candidate... See more</p>
                    </div>

                </div>
            </div>

            <h1 className="text-xl font-semibold mb-3 text-[#111927]">Children Information</h1>

            <div className="mb-4 font-sans p-6 border border-gray-200 rounded-[16px]">
                {/* First Child */}
                <div className="mb-4">
                    <div className="space-y-4">
                        <div>
                            <span className="text-base  text-[#778593]">Name</span>
                            <div className="text-lg  mt-1 text-[#111927]">Savannah Nguyen</div>
                        </div>

                        <div>
                            <span className="text-base  text-[#778593]">Date of Birth</span>
                            <div className="text-lg  mt-1 text-[#111927]">1 Feb, 2020</div>
                        </div>

                        <div>
                            <span className="text-base  text-[#778593]">Gender</span>
                            <div className="text-lg  mt-1 text-[#111927]">Female</div>
                        </div>

                        <div>
                            <span className="text-base  text-[#778593]">Likes, dislikes, and interests.</span>
                            <div className="text-lg  mt-1 text-[#111927]">Loves outdoor activities, especially riding a scooter and playing at the park. They enjoy drawing, building with LEGO, and listening to storybooks.</div>
                        </div>

                        <div>
                            <span className="text-base  text-[#778593]">Allergies or special needs we need to be made aware of.</span>

                            <div className="text-lg  mt-1 text-[#111927]">Has a mild allergy to peanuts, which causes hives if ingested. We carry an antihistamine as advised by our doctor. They also wear glasses for reading. No other medical conditions or special needs at this time.</div>
                        </div>
                    </div>
                </div>
            </div>

            <h1 className="text-xl font-semibold mb-3 text-[#111927]">Booking Date & Time</h1>
            <div className=" font-sans ">
                {/* Booking Date & Time */}
                <section className="mb-4 p-6 border border-gray-200 rounded-[16px]">

                    <div className="flex justify-between">
                        <div>
                            <span className="text-base  text-[#778593]">Booking Date & Time</span>
                            <div className="text-lg  mt-1 text-[#111927]">12/02/2025 (8:45 AM - 6:00 PM)</div>
                        </div>

                        <div>
                            <span className="text-base  text-[#778593]">Additional Dates & Time</span>
                            <div className="text-lg  mt-1 text-[#111927]">03/12/2025 (8:45 AM - 6:00 PM)</div>
                            <div className="text-lg  mt-1 text-[#111927]">02/12/2025 (8:45 AM - 6:00 PM)</div>
                        </div>
                    </div>
                </section>


                <h1 className="text-xl font-semibold mb-3 text-[#111927]">Job Address</h1>
                {/* Job Address */}
                <section className="mb-4 p-6 border border-gray-200 rounded-[16px]">

                    <div className="flex justify-between">
                        <div>
                            <span className="text-base  text-[#778593]">Street Address</span>
                            <div className="text-lg mt-1 text-[#111927]">26 Berkshire Ave.</div>
                        </div>

                        <div>
                            <span className="text-base  text-[#778593]">City</span>
                            <div className="text-lg mt-1 text-[#111927]">Atlantic City</div>
                        </div>

                        <div>
                            <span className="text-base  text-[#778593]">Province/State</span>
                            <div className="text-lg mt-1 text-[#111927]">NJ</div>
                        </div>

                        <div>
                            <span className="text-base  text-[#778593]">Postal Code</span>
                            <div className="text-lg mt-1 text-[#111927]">08401</div>
                        </div>

                        <div>
                            <span className="text-base  text-[#778593]">Country</span>
                            <div className="text-lg mt-1 text-[#111927]">USA</div>
                        </div>
                    </div>
                </section>


                <h1 className="text-xl font-semibold mb-3 text-[#111927]">Set Budget</h1>
                {/* Set Budget */}
                <section className="mb-4 p-6 border border-gray-200 rounded-[16px]">

                    <div>
                        <span className="text-base  text-[#778593]">Budget</span>
                        <div className="text-lg mt-1 text-[#111927]">$40/Hr</div>
                    </div>
                </section>

                <hr />

                <div className="flex justify-between pt-5">
                    <div>
                        <h3 className="text-xl font-semibold">
                            Delete Post Permanently
                        </h3>
                        <p className="text-base  text-[#778593]">This action is irreversible; we cannot recover your data after account deletion.</p>
                    </div>
                    <button className="text-red-600 font-medium cursor-pointer">Delete Job Post </button>
                </div>

            </div>
        </div>
    )
}
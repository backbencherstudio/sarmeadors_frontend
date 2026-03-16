function page() {
  return (
    <div className="space-y-8 text-blackColor">
      <section className="space-y-2">
        <h2 className="text-lg font-medium">Booking Date & Time</h2>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          <div>
            <p className="text-sm text-secondaryColor">Booking Date</p>
            <p className="text-base text-lightblackColor">9/18/16</p>
          </div>
          <div>
            <p className="text-sm text-secondaryColor">Booking Date</p>
            <p className="text-base text-lightblackColor">9/18/16</p>
          </div>
          <div>
            <p className="text-sm text-secondaryColor">Start Time</p>
            <p className="text-base text-lightblackColor">5:45 AM</p>
          </div>
          <div>
            <p className="text-sm text-secondaryColor">End Time</p>
            <p className="text-base text-lightblackColor">5: 40 PM</p>
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-medium">Job Description</h2>
        <div>
          <p className="text-sm text-secondaryColor">Job Title</p>
          <p className="text-base text-lightblackColor">After School Nanny</p>
        </div>
        <div>
          <p className="text-sm text-secondaryColor">Description</p>
          <p className="text-base leading-7 text-lightblackColor">
            Assist two bright school-aged kids with their homework in a
            supportive and uplifting environment. Create a space where they feel
            encouraged to ask questions and explore their subjects. Use positive
            reinforcement to build their confidence and motivate them to achieve
            their academic goals. Engage them with fun learning activities that
            make studying enjoyable. By fostering a nurturing atmosphere, you
            can inspire them to not only complete their assignments but also
            develop a love for learning that will benefit them in the long run.
          </p>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-medium">Address</h2>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-5">
          <div>
            <p className="text-sm text-secondaryColor">Street Address</p>
            <p className="text-base text-lightblackColor">26 Berkshire Ave.</p>
          </div>
          <div>
            <p className="text-sm text-secondaryColor">City</p>
            <p className="text-base text-lightblackColor">Atlantic City</p>
          </div>
          <div>
            <p className="text-sm text-secondaryColor">Province/State</p>
            <p className="text-base text-lightblackColor">NJ</p>
          </div>
          <div>
            <p className="text-sm text-secondaryColor">Postal Code</p>
            <p className="text-base text-lightblackColor">08401</p>
          </div>
          <div>
            <p className="text-sm text-secondaryColor">Country</p>
            <p className="text-base text-lightblackColor">USA</p>
          </div>
        </div>
      </section>

      <section className="space-y-2 mb-10">
        <h2 className="text-lg font-medium">Budget</h2>
        <div>
          <p className="text-sm text-secondaryColor">Compensation</p>
          <p className="text-base text-lightblackColor">$35 per hour</p>
        </div>
      </section>
    </div>
  );
}

export default page;

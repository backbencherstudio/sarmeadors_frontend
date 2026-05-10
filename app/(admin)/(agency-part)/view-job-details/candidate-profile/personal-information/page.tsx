export default function page() {
  return (
    <div className="p-6 border rounded-[16px]">
      <h1 className="text-xl text-[#202734] font-semibold">
        Personal Information
      </h1>
      <div className="grid grid-cols-2">
        <div className="mt-2">
          <div>
            <p className="text-[#AAB3BB] text-sm">First Name</p>
            <p className="text-[#384250] text-base">Kristin</p>
          </div>
          <div className="mt-4">
            <p className="text-[#AAB3BB] text-sm">Email Address</p>
            <p className="text-[#384250] text-base">binhan628@gmail.com</p>
          </div>
          <div className="mt-4">
            <p className="text-[#AAB3BB] text-sm">Nationality</p>
            <p className="text-[#384250] text-base">Americans</p>
          </div>
        </div>
        <div className="mt-2">
          <div>
            <p className="text-[#AAB3BB] text-sm">Last Name</p>
            <p className="text-[#384250] text-base">Ben</p>
          </div>
          <div className="mt-4">
            <p className="text-[#AAB3BB] text-sm">Date of Birth</p>
            <p className="text-[#384250] text-base">12/12/27</p>
          </div>
          <div className="mt-4">
            <p className="text-[#AAB3BB] text-sm">Phone Number</p>
            <p className="text-[#384250] text-base">+14842918883</p>
          </div>
        </div>
      </div>
      <div>
        <h1 className="text-xl text-[#202734] font-semibold">Address</h1>
        <div className="grid grid-cols-5 mt-4">
          <div>
            <p className="text-[#AAB3BB] text-sm">Street Address</p>
            <p className="text-[#384250] text-base">26 Berkshire Ave.</p>
          </div>
          <div>
            <p className="text-[#AAB3BB] text-sm">City</p>
            <p className="text-[#384250] text-base">Atlantic City</p>
          </div>
          <div>
            <p className="text-[#AAB3BB] text-sm">Province/State</p>
            <p className="text-[#384250] text-base">NJ</p>
          </div>
          <div>
            <p className="text-[#AAB3BB] text-sm">Postal Code </p>
            <p className="text-[#384250] text-base">088401</p>
          </div>
          <div>
            <p className="text-[#AAB3BB] text-sm">Country</p>
            <p className="text-[#384250] text-base">USA</p>
          </div>
        </div>
      </div>
    </div>
  );
}

interface ProfessionalField {
  key: string;
  label: string;
  value: string;
}

function ProfileProfessionalInformation() {
  const professionalInfoColumns: ProfessionalField[][] = [
    [
      {
        key: "houses",
        label: "How many house you would like?",
        value: "Kristin",
      },
      { key: "payRange", label: "Pay range per hour", value: "12/12/25" },
      {
        key: "lastPosition",
        label: "Why did our last position end?",
        value: "Americans",
      },
    ],
    [
      { key: "languages", label: "Fluent in another languages?", value: "Ben" },
      { key: "startDate", label: "Start Date", value: "Americans" },
    ],
  ];

  const referenceFields: ProfessionalField[][] = [
    [
      { key: "refFirstName", label: "First Name", value: "Kristin" },
      { key: "refEmail", label: "Email Address", value: "binhan628@gmail.com" },
      { key: "refNationality", label: "Nationality", value: "Americans" },
    ],
    [
      { key: "refLastName", label: "Last Name", value: "Ben" },
      { key: "refDob", label: "Date of Birth", value: "12/12/2025" },
      { key: "refPhone", label: "Phone Number", value: "+14842918883" },
    ],
  ];

  return (
    <div>
      <div className="p-4 sm:p-5 md:p-6 border border-borderColor rounded-[20px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {professionalInfoColumns.map((column, columnIndex) => (
            <div key={columnIndex} className="mt-3 space-y-4">
              {column.map((field) => (
                <div key={field.key}>
                  <p className="text-secondaryColor text-sm leading-[142.857%]">
                    {field.label}
                  </p>
                  <p className="text-lightblackColor text-[16px] leading-[137.5%] font-medium">
                    {field.value}
                  </p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <h2 className="mb-4 text-headerColor text-xl font-semibold">
          Reference
        </h2>
        <div className="p-4 sm:p-5 md:p-6 border border-borderColor rounded-[20px]">
          <h3 className="text-lg text-headerColor font-semibold leading-[111.111%] mb-4">
            First Parent (Primary Contact)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {referenceFields.map((column, columnIndex) => (
              <div key={columnIndex} className="mt-3 space-y-4">
                {column.map((field) => (
                  <div key={field.key}>
                    <p className="text-secondaryColor text-sm leading-[142.857%]">
                      {field.label}
                    </p>
                    <p className="text-lightblackColor text-[16px] leading-[137.5%] font-medium">
                      {field.value}
                    </p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileProfessionalInformation;

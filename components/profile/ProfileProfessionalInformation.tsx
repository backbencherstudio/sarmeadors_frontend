"use client";

import { useGetSingleClientMyCandidateQuery } from "@/feature/dashboard/client/myCandidate";
import { useParams } from "next/navigation";

interface ProfessionalField {
  key: string;
  label: string;
  value: string;
}

function ProfileProfessionalInformation() {
  const { id } = useParams();

  const { data } = useGetSingleClientMyCandidateQuery(id);

  const professionalInfo = data?.data?.candidate?.professional_information;
  const reference = data?.data?.candidate?.reference;

  const professionalInfoColumns: ProfessionalField[][] = [
    [
      {
        key: "hoursPerWeek",
        label: "How many hours you would like?",
        value: professionalInfo?.hours_per_week || "-",
      },
      {
        key: "payRange",
        label: "Pay range per hour",
        value: professionalInfo?.pay_range_per_hour || "-",
      },
      {
        key: "lastPosition",
        label: "Why did our last position end?",
        value: professionalInfo?.last_position_end_reason || "-",
      },
    ],
    [
      {
        key: "languages",
        label: "Fluent in another languages?",
        value: professionalInfo?.bilingual || "-",
      },
      {
        key: "startDate",
        label: "Start Date",
        value: professionalInfo?.start_date || "-",
      },
    ],
  ];

  const referenceFields: ProfessionalField[][] = [
    [
      {
        key: "refFirstName",
        label: "First Name",
        value: reference?.first_name || "-",
      },
      {
        key: "refEmail",
        label: "Email Address",
        value: reference?.email || "-",
      },
      {
        key: "refRelation",
        label: "Relation",
        value: reference?.relation || "-",
      },
    ],
    [
      {
        key: "refLastName",
        label: "Last Name",
        value: reference?.last_name || "-",
      },
      {
        key: "refPhone",
        label: "Phone Number",
        value: reference?.phone || "-",
      },
      {
        key: "refDescription",
        label: "Description",
        value: reference?.description || "-",
      },
    ],
  ];

  return (
    <div>
      <div className="p-4 sm:p-5 md:p-6 border border-borderColor rounded-[20px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {professionalInfoColumns?.map((column, columnIndex) => (
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
            {referenceFields?.map((column, columnIndex) => (
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

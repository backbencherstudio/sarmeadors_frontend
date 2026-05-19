"use client";

import { useSelector } from "react-redux";

function page() {
  const applicationForm = useSelector(
    (state: { applicationForm: any }) => state.applicationForm,
  );
  console.log(applicationForm);

  return (
    <div>
      <h1 className="text-2xl font-semibold text-headerColor mb-4">
        Custom Form Builder
      </h1>
    </div>
  );
}

export default page;

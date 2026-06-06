"use client";
import ButtonReuseable from "@/components/reusable/CustomButton";
import { useState } from "react";
import CreateCustomBuilderSidbar from "./CreateCustomBuilderSidbar";

function InitialFormCreate() {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpenClick = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="border border-gray-300 rounded-lg p-8 border-dashed">
      <div className="text-center ">
        <h2 className="text-headerColor font-semibold text-xl md:text-2xl">
          Create Your Custom Form
        </h2>
        <p className="text-base text-descriptionColor">
          Customize your application form to fit your specific needs.
        </p>
      </div>
      <div className="mt-6 flex justify-center">
        <ButtonReuseable title="Create Form" onClick={handleOpenClick} />
      </div>

      {isOpen && (
        <CreateCustomBuilderSidbar open={isOpen} setOpen={setIsOpen} />
      )}
    </div>
  );
}

export default InitialFormCreate;

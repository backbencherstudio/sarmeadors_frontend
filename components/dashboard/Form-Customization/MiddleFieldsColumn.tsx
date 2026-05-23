"use client";
import InputIcon from "@/components/icon/InputIcon";
import SectionIcon from "@/components/icon/SectionIcon";
import ButtonReuseable from "@/components/reusable/CustomButton";
import { PlusIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useSelector } from "react-redux";
import BlocksCreateSetting from "./BlocksCreateSetting";

export default function MiddleFieldsColumn() {
  const [isBlockAdded, setIsBlockAdded] = useState(false);
  const activeBlockId = useSelector(
    (state: any) => state.applicationForm.activeBlockId,
  );

  const activeBlock = useSelector((state: any) =>
    state.applicationForm.blocks.find((b: any) => b.id === activeBlockId),
  );
  const onAddBlockClick = () => {
    setIsBlockAdded(true);
  };

  if (!activeBlock)
    return <div className="p-4 text-center text-gray-400">Select a block</div>;

  if (activeBlock.name === "Introduction") {
    return (
      <div className="w-full bg-white h-full flex flex-col flex-1 overflow-y-auto border-borderColor">
        <div className="py-2 px-4 flex items-center justify-between border-b border-borderColor">
          <div>
            <h2 className="text-lg font-semibold text-headerColor">
              {activeBlock.name}
            </h2>
            <p className="text-xs text-gray-400">{activeBlock.describe}</p>
          </div>
          <ButtonReuseable
            icon={<PlusIcon size={16} />}
            title="Reset"
            className="bg-grayColor1! border border-borderColor text-headerColor! py-2.75! font-semibold text-sm!"
          />
        </div>

        <div className="max-w-xl mx-auto text-center mt-12 space-y-6">
          {activeBlock.logoUrl && (
            <div className="flex justify-center mb-4">
              <Image
                src={activeBlock.logoUrl}
                alt="Form Logo"
                width={240}
                height={60}
                className="object-contain"
                unoptimized
              />
            </div>
          )}
          <h1 className="text-3xl font-bold text-headerColor">
            {activeBlock.title || "Untitled Form"}
          </h1>
          <p className="text-sm text-gray-500">{activeBlock.description}</p>

          {activeBlock.buttonLabel && (
            <div className="pt-4">
              <button className="px-6 py-3 bg-[#111827] text-white font-medium rounded-xl shadow-sm text-sm">
                {activeBlock.buttonLabel}
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white h-full flex flex-col flex-1 overflow-y-auto  ">
      <div className="py-2 px-4 flex items-center justify-between border-b border-borderColor">
        <div>
          <h2 className="text-lg font-semibold text-headerColor">
            {activeBlock.name}
          </h2>
          <p className="text-xs text-gray-400">{activeBlock.describe}</p>
        </div>
        <ButtonReuseable
          icon={<PlusIcon size={16} />}
          title="Reset"
          className="bg-grayColor1! border border-borderColor text-headerColor! py-2.75! font-semibold text-sm!"
        />
      </div>
      <div className="p-6  w-full space-y-4">
        {activeBlock?.fields.length > 0 ? (
          activeBlock.fields?.map((field: any) => (
            <div
              key={field.id}
              className="p-4 border rounded-xl bg-white shadow-xs relative"
            >
              <label className="block text-xs font-bold text-gray-700 mb-1">
                {field.label}
              </label>
              <input
                type={field.type}
                placeholder={field.placeholder}
                disabled
                className="w-full p-2.5 border rounded-lg bg-gray-50 text-sm"
              />
            </div>
          ))
        ) : (
          <div className=" text-gray-400">
            <div>
              <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-headerColor">
                {activeBlock.name}
              </h2>
              <p className="text-base  text-gray-400">{activeBlock.describe}</p>
            </div>
            <div className="flex items-center mt-3 gap-2">
              <ButtonReuseable
                icon={<SectionIcon className="" />}
                title="Add Section"
                onClick={onAddBlockClick}
                className="bg-blackColor  py-2.75! text-sm! text-whiteColor"
              />
              <ButtonReuseable
                icon={<InputIcon className="" />}
                title="Add Input"
                onClick={onAddBlockClick}
                className="bg-white! border border-borderColor text-headerColor! py-2.75! font-semibold text-sm!"
              />
            </div>
          </div>
        )}
      </div>
      {isBlockAdded && (
        <BlocksCreateSetting open={isBlockAdded} setOpen={setIsBlockAdded} />
      )}
    </div>
  );
}

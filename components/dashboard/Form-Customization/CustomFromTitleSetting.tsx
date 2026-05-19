"use client";
import ButtonReuseable from "@/components/reusable/CustomButton";
import { GripVertical, PlusIcon } from "lucide-react";
import { useSelector } from "react-redux";

function CustomFromTitleSetting() {
  const blocks = useSelector((state: any) => state.applicationForm.blocks);
  return (
    <div className="flex  mt-4 h-full ">
      <div className="max-w-75 w-full h-full border rounded-tl-lg border-borderColor  bg-grayColor1">
        <div className="py-3.5 px-4  border-b border-borderColor flex items-center justify-between">
          <h2 className="text-lg font-semibold text-headerColor md:text-xl">
            Blocks
          </h2>
          <ButtonReuseable
            icon={<PlusIcon size={16} />}
            className="bg-blackColor px-2! py-2! rounded-sm! text-whiteColor "
          />
        </div>
        <div className="p-4">
          {blocks.map((block) => (
            <div key={block.id} className="flex items-center gap-1.5 ">
              <div className="">
                <button className="cursor-pointer">
                  {" "}
                  <GripVertical className="md:w-5 w-4 h-4 md:h-5 text-secondaryColor" />
                </button>
              </div>
              <div className="px-4 py-2 flex-1 rounded-sm bg-bgColor border border-borderColor ">
                <h3 className="text-headerColor text-sm font-medium">
                  {block.name}
                </h3>
                <p className="text-secondaryColor line-clamp-1 text-xs">
                  {block.describe}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full border-y border-borderColor  h-full">
        <div className="py-2 px-4 flex items-center justify-between ">
          <h2 className="text-lg font-semibold text-headerColor ">
            Introduction
          </h2>
          <ButtonReuseable
            icon={<PlusIcon size={16} />}
            title="Reset"
            className="bg-grayColor1! border border-borderColor text-headerColor! py-2.75! font-semibold text-sm! "
          />
        </div>
      </div>
      <div className="max-w-75  border rounded-tr-lg border-borderColor w-full h-full bg-grayColor1">
        <div className="py-4 px-4  border-borderColor ">
          <h2 className="text-lg font-semibold text-headerColor md:text-xl">
            Elements
          </h2>
        </div>
      </div>
    </div>
  );
}

export default CustomFromTitleSetting;

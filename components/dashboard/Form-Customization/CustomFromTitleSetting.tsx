"use client";
import ButtonReuseable from "@/components/reusable/CustomButton";
import { useDraggableList } from "@/hooks/useDraggableList";
import { PlusIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import BlocksCreateSetting from "./BlocksCreateSetting";
import BlocksList from "./BlocksList";

function CustomFromTitleSetting() {
  const data = useSelector((state: any) => state.applicationForm.blocks);
  const [isBlockAdded, setIsBlockAdded] = useState(false);
  const handleBlocks = (id: string) => {
    // Handle block move logic here
    console.log("Move block with id:", id);
  };
  const {
    items: blocks,
    setItems: setBlocks,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
  } = useDraggableList(data);

  useEffect(() => {
    setBlocks(data);
  }, [data]);
  return (
    <div className="flex  mt-4 h-full ">
      <div className="max-w-75 w-full h-full border rounded-tl-lg border-borderColor  bg-grayColor1">
        <div className="py-3.5 px-4  border-b border-borderColor flex items-center justify-between">
          <h2 className="text-lg font-semibold text-headerColor md:text-xl">
            Blocks
          </h2>
          <ButtonReuseable
            icon={<PlusIcon size={16} />}
            onClick={() => setIsBlockAdded(true)}
            className="bg-blackColor px-2! py-2! rounded-sm! text-whiteColor "
          />
        </div>
        <div className="p-4 space-y-3">
          {blocks.map((block) => (
            <div
              draggable
              onDragStart={(e) => handleDragStart(e, block.id)}
              onDragOver={(e) => handleDragOver(e, block.id)}
              onDragEnd={handleDragEnd}
              key={block.id}
              className="cursor-move"
            >
              <BlocksList
                block={block}
                handleMove={() => handleBlocks(block?.id)}
              />
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
      {isBlockAdded && (
        <BlocksCreateSetting open={isBlockAdded} setOpen={setIsBlockAdded} />
      )}
    </div>
  );
}

export default CustomFromTitleSetting;

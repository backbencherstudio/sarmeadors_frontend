"use client";
import { useState } from "react";
import BlocksCreateSetting from "./BlocksCreateSetting";
import LeftBlocksColumn from "./LeftBlocksColumn";
import MiddleFieldsColumn from "./MiddleFieldsColumn";
import RightSettingsColumn from "./RightSettingsColumn";

function CustomFromTitleSetting() {
  const [isBlockAdded, setIsBlockAdded] = useState(false);

  return (
    <div className="flex h-[calc(100vh-100px)] min-h-[500px] mt-4 items-start ">
      <div className="sticky top-0 max-w-75 w-full h-full border rounded-tl-lg border-borderColor bg-grayColor1 self-start ">
        {/* <div className="py-3.5 px-4  border-b border-borderColor flex items-center justify-between">
          <h2 className="text-lg font-semibold text-headerColor md:text-xl">
            Blocks
          </h2>
          <ButtonReuseable
            icon={<PlusIcon size={16} />}
            onClick={() => setIsBlockAdded(true)}
            className="bg-blackColor px-2! py-2! rounded-sm! text-whiteColor "
          />
        </div> */}
        {/* <div className="p-4 space-y-3">
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
        </div> */}
        <div>
          <LeftBlocksColumn onAddBlockClick={() => setIsBlockAdded(true)} />
        </div>
      </div>
      <div className="w-full border-y border-borderColor h-full min-h-0 overflow-y-auto scrollbar-hide flex-1">
        {/* <div className="py-2 px-4 flex items-center border-b border-borderColor justify-between ">
          <h2 className="text-lg font-semibold text-headerColor ">
            Introduction
          </h2>
          <ButtonReuseable
            icon={<PlusIcon size={16} />}
            title="Reset"
            className="bg-grayColor1! border border-borderColor text-headerColor! py-2.75! font-semibold text-sm! "
          />
        </div> */}
        <div>
          <MiddleFieldsColumn />
        </div>
      </div>
      <div className="sticky top-0 max-w-75 border rounded-tr-lg border-borderColor w-full h-full bg-grayColor1 ">
        {/* <div className="py-4 px-4  border-b border-borderColor  ">
          <h2 className="text-lg font-semibold text-headerColor md:text-xl">
            Elements
          </h2>
        </div> */}
        <div>
          <RightSettingsColumn />
        </div>
      </div>
      {isBlockAdded && (
        <BlocksCreateSetting open={isBlockAdded} setOpen={setIsBlockAdded} />
      )}
    </div>
  );
}

export default CustomFromTitleSetting;

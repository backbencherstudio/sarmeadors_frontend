"use client";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { PlusIcon } from "lucide-react";
import ButtonReuseable from "@/components/reusable/CustomButton";
import { useDraggableList } from "@/hooks/useDraggableList";

import BlocksList from "./BlocksList";
import { reorderBlocks, setActiveBlock } from "@/feature/slice/applicationBuilder/ApplicationFormSlice";

export default function LeftBlocksColumn({ onAddBlockClick }: { onAddBlockClick: () => void }) {
  const dispatch = useDispatch();
  const data = useSelector((state: any) => state.applicationForm.blocks);
  const activeBlockId = useSelector((state: any) => state.applicationForm.activeBlockId);

  const {
    items: blocks,
    setItems: setBlocks,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
  } = useDraggableList(data);

  useEffect(() => {
    setBlocks(data);
  }, [data, setBlocks]);


  const handleOnDragEnd = () => {
    handleDragEnd();
    dispatch(reorderBlocks(blocks));
  };

  return (
    <div className="max-w-75  w-full h-full  flex flex-col">
      <div className="py-3.5 px-4 border-b border-borderColor flex items-center justify-between">
        <h2 className="text-lg font-semibold text-headerColor md:text-xl">Blocks</h2>
        <ButtonReuseable
          icon={<PlusIcon size={16} />}
          onClick={onAddBlockClick}
          className="bg-blackColor px-2! py-2! rounded-sm! text-whiteColor"
        />
      </div>
      
      <div className="p-4 space-y-3 overflow-y-auto flex-1">
        {blocks.map((block) => (
          <div
            key={block.id}
            draggable
            onDragStart={(e) => handleDragStart(e, block.id)}
            onDragOver={(e) => handleDragOver(e, block.id)}
            onDragEnd={handleOnDragEnd}
            onClick={() => dispatch(setActiveBlock(block.id))}
            className={`cursor-move rounded-lg transition-all ${
              activeBlockId === block.id ? "ring-2 ring-primaryColor" : ""
            }`}
          >
            <BlocksList block={block} handleMove={() => {}} />
          </div>
        ))}
      </div>
    </div>
  );
}
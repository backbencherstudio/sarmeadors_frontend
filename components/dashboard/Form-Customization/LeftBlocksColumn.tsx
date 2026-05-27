"use client";
import ButtonReuseable from "@/components/reusable/CustomButton";
import { useDraggableList } from "@/hooks/useDraggableList";
import { PlusIcon } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  reorderBlocks,
  setActiveBlock,
} from "@/feature/slice/applicationBuilder/ApplicationFormSlice";
import BlocksList from "./BlocksList";

export default function LeftBlocksColumn({
  onAddBlockClick,
}: {
  onAddBlockClick: () => void;
}) {
  const dispatch = useDispatch();
  const data = useSelector((state: any) => state.applicationForm.blocks);
  const activeBlockId = useSelector(
    (state: any) => state.applicationForm.activeBlockId,
  );

  const introBlock = data.find((b: any) => b.type === "introduction");

  const { items, setItems, handleDragStart, handleDragOver, handleDragEnd } =
    useDraggableList(data.filter((b: any) => b.type !== "introduction"));

  useEffect(() => {
    setItems(data.filter((b: any) => b.type !== "introduction"));
  }, [data, setItems]);

  const handleOnDragEnd = () => {
    handleDragEnd();
    const allBlocks = introBlock ? [introBlock, ...items] : [...items];
    dispatch(reorderBlocks(allBlocks));
  };

  return (
    <div className="max-w-75 w-full h-full flex flex-col">
      <div className="py-3.5 px-4 border-b border-borderColor flex items-center justify-between">
        <h2 className="text-lg font-semibold text-headerColor md:text-xl">
          Blocks
        </h2>
        <ButtonReuseable
          icon={<PlusIcon size={16} />}
          onClick={onAddBlockClick}
          className="bg-blackColor px-2! py-2! rounded-sm! text-whiteColor"
        />
      </div>

      <div className="p-4 space-y-3 overflow-y-auto scrollbar-hide flex-1">
        {/* Introduction — always first, non-draggable */}
        {introBlock && (
          <div
            key={introBlock.id}
            onClick={() => dispatch(setActiveBlock(introBlock.id))}
            className={`cursor-pointer rounded-lg transition-all ${
              activeBlockId === introBlock.id ? "ring-2 ring-primaryColor" : ""
            }`}
          >
            <BlocksList block={introBlock} handleMove={() => {}} isFixed />
          </div>
        )}

        {/* Dynamic blocks — draggable */}
        {items.map((block) => (
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

"use client";

import DeleteIcon from "@/components/icon/DeleteIcon";
import InputIcon from "@/components/icon/InputIcon";
import SectionIcon from "@/components/icon/SectionIcon";
import ButtonReuseable from "@/components/reusable/CustomButton";
import {
  deleteBlock,
  deleteField,
  reorderBlockFields,
  reorderSectionInputs,
  setActiveField,
} from "@/feature/slice/applicationBuilder/ApplicationFormSlice";
import { useDraggableList } from "@/hooks/useDraggableList";
import { GripVertical, Lock, PlusIcon, Trash2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddInputField from "./AddInputField";
import FieldRenderer from "./FieldRenderer";

// ── Section sub-component with per-section drag-and-drop ──────────────────────
function SectionWithDrag({
  section,
  blockId,
}: {
  section: any;
  blockId: string;
}) {
  const dispatch = useDispatch();
  const activeFieldId = useSelector(
    (state: any) => state.applicationForm.activeFieldId,
  );
  const activeSectionId = useSelector(
    (state: any) => state.applicationForm.activeSectionId,
  );
  const isDragging = useRef(false);

  const {
    items,
    setItems,
    handleDragStart,
    handleDragOver,
    handleDragEnd: _dragEnd,
    draggedItemId,
  } = useDraggableList(section.inputs ?? []);

  useEffect(() => {
    if (!isDragging.current) {
      setItems(section.inputs ?? []);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [section.inputs]);

  const onDragStart = (e: React.DragEvent, id: string) => {
    isDragging.current = true;
    handleDragStart(e, id);
  };

  const onDragEnd = () => {
    isDragging.current = false;
    _dragEnd();
    dispatch(
      reorderSectionInputs({ blockId, sectionId: section.id, inputs: items }),
    );
  };

  return (
    <div className="flex flex-wrap items-start gap-3">
      {items.map((input: any) => {
        const widthClass =
          input.width === "1/2"
            ? "w-[calc(50%-0.75rem)]"
            : input.width === "3/4"
              ? "w-[calc(75%-0.75rem)]"
              : input.width === "1/4"
                ? "w-[calc(25%-0.75rem)]"
                : "w-full";
        return (
          <div
            key={input.id}
            draggable={!input.isFixed}
            onDragStart={(e) => !input.isFixed && onDragStart(e, input.id)}
            onDragOver={(e) => handleDragOver(e, input.id)}
            onDragEnd={onDragEnd}
            className={`${widthClass} relative flex items-start gap-1 rounded-lg transition-opacity ${
              draggedItemId === input.id ? "opacity-40" : ""
            }`}
          >
            <div className="mt-6 shrink-0 w-5 flex items-center justify-center">
              {input.isFixed ? (
                <Lock size={10} className="text-amber-500" />
              ) : (
                <GripVertical
                  size={14}
                  className="text-secondaryColor cursor-grab"
                />
              )}
            </div>
            <div
              className={`flex-1 min-w-0 cursor-pointer rounded-md p-1 transition-all `}
              onClick={(e) => {
                e.stopPropagation();
                dispatch(
                  setActiveField({ sectionId: section.id, fieldId: input.id }),
                );
              }}
            >
              <FieldRenderer
                field={input}
                activeBlockId={blockId}
                activeSectionId={section.id}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────
export default function MiddleFieldsColumn() {
  const [addFieldOpen, setAddFieldOpen] = useState(false);
  const [addFieldInitialType, setAddFieldInitialType] = useState<
    string | undefined
  >(undefined);

  const dispatch = useDispatch();
  const activeBlockId = useSelector(
    (state: any) => state.applicationForm.activeBlockId,
  );
  const active = useSelector(
    (state: any) => state.applicationForm,
  );
  const activeBlock = useSelector((state: any) =>
    state.applicationForm.blocks.find((b: any) => b.id === activeBlockId),
  );
  console.log(active, "applicationForm");

  const isDraggingBlock = useRef(false);
  const {
    items: blockFields,
    setItems: setBlockFields,
    handleDragStart: blockDragStart,
    handleDragOver: blockDragOver,
    handleDragEnd: _blockDragEnd,
    draggedItemId: blockDraggedId,
  } = useDraggableList(activeBlock?.fields ?? []);

  useEffect(() => {
    if (!isDraggingBlock.current) {
      setBlockFields(activeBlock?.fields ?? []);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeBlock?.fields, activeBlockId]);

  const onBlockDragStart = (e: React.DragEvent, id: string) => {
    isDraggingBlock.current = true;
    blockDragStart(e, id);
  };

  const onBlockDragEnd = () => {
    isDraggingBlock.current = false;
    _blockDragEnd();
    dispatch(
      reorderBlockFields({ blockId: activeBlockId, fields: blockFields }),
    );
  };
  const handleCreateCustomForm = () => {
    // Implement your form submission logic here
    console.log("Form submitted!");
  };

  const selectField = (sectionId: string | null, fieldId: string | null) => {
    dispatch(setActiveField({ sectionId, fieldId }));
  };

  const openAddSection = () => {
    dispatch(setActiveField({ sectionId: null, fieldId: null }));
    setAddFieldInitialType("section");
    setAddFieldOpen(true);
  };

  const openAddInput = () => {
    dispatch(setActiveField({ sectionId: null, fieldId: null }));
    setAddFieldInitialType(undefined);
    setAddFieldOpen(true);
  };

  const handleDeleteBlock = () => {
    dispatch(deleteBlock(activeBlockId));
  };

  const handleDeleteBlockField = (
    e: React.MouseEvent<HTMLButtonElement>,
    fieldId: string,
  ) => {
    e.stopPropagation();
    dispatch(deleteField({ blockId: activeBlockId, sectionId: null, fieldId }));
  };

  if (!activeBlock)
    return <div className="p-4 text-center text-gray-400">Select a block</div>;

  // ── Introduction block preview ─────────────────────────────────────────────

  if (
    activeBlock.type === "introduction" ||
    activeBlock.name === "Introduction"
  ) {
    return (
      <div className="w-full bg-white h-full flex flex-col flex-1 overflow-y-auto scrollbar-hide border-borderColor">
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

        <div className="max-w-xl mx-auto text-center mt-12 space-y-6 px-4">
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
              <button className="px-6 py-3 bg-blackColor text-white font-medium rounded-xl shadow-sm text-sm">
                {activeBlock.buttonLabel}
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
  // ── Dynamic block ──────────────────────────────────────────────────────────
  return (
    <div className="w-full bg-white h-full flex flex-col flex-1">
      <div className="py-2 px-4 flex items-center justify-between border-b border-borderColor">
        <div>
          <h2 className="text-lg font-semibold text-headerColor">
            {activeBlock.name}
          </h2>
          <p className="text-xs text-gray-400">{activeBlock.describe}</p>
        </div>
        <div className="flex items-center gap-2">
          <ButtonReuseable
            icon={<SectionIcon className="" />}
            title="Add Section"
            onClick={openAddSection}
            className="bg-blackColor py-2.75! text-sm! text-whiteColor"
          />
          <ButtonReuseable
            icon={<InputIcon className="" />}
            title="Add Input"
            onClick={openAddInput}
            className="bg-white! border border-borderColor text-headerColor! py-2.75! font-semibold text-sm!"
          />
          <button
            type="button"
            title="Delete block"
            onClick={handleDeleteBlock}
            className="p-2 rounded border border-borderColor bg-grayColor1 text-redColor hover:bg-red-50 transition-colors"
          >
            <Trash2 size={15} />
          </button>
        </div>
      </div>

      <div className="p-6 w-full flex-1 min-h-screen overflow-y-auto scrollbar-hide">
        {blockFields.length > 0 ? (
          <div className="flex flex-wrap items-start gap-4">
            {blockFields.map((field: any) => {
              const widthClass =
                field.width === "1/2"
                  ? "w-[calc(50%-0.5rem)]"
                  : field.width === "3/4"
                    ? "w-[calc(75%-0.5rem)]"
                    : field.width === "1/4"
                      ? "w-[calc(25%-0.5rem)]"
                      : "w-full";
              return (
                <div
                  key={field.id}
                  draggable={field.type !== "section" && !field.isFixed}
                  onDragStart={(e) =>
                    field.type !== "section" &&
                    !field.isFixed &&
                    onBlockDragStart(e, field.id)
                  }
                  onDragOver={(e) =>
                    field.type !== "section" && blockDragOver(e, field.id)
                  }
                  onDragEnd={
                    field.type !== "section" ? onBlockDragEnd : undefined
                  }
                  className={`${widthClass} transition-opacity ${
                    blockDraggedId === field.id ? "opacity-40" : ""
                  }`}
                >
                  {field.type === "section" ? (
                    // ── Section row ────────────────────────────────────────────
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => selectField(field.id, null)}
                          className={`text-left flex-1 min-w-0 rounded-md px-1 py-0.5 transition-all`}
                        >
                          <h3 className="text-base lg:text-lg font-semibold text-headerColor">
                            {field.label}
                          </h3>
                        </button>
                        {!field.isFixed && (
                          <button
                            type="button"
                            title="Delete field"
                            aria-label={`Delete ${field.label}`}
                            draggable={false}
                            onDragStart={(e) => e.stopPropagation()}
                            onClick={(e) => handleDeleteBlockField(e, field.id)}
                            className="shrink-0 p-2 rounded border border-borderColor bg-grayColor1 text-redColor hover:bg-red-50 transition-colors"
                          >
                            <DeleteIcon />
                          </button>
                        )}
                      </div>

                      <SectionWithDrag
                        section={field}
                        blockId={activeBlockId}
                      />
                    </div>
                  ) : (
                    // ── Regular field row ───────────────────────────────────────
                    <div className="flex gap-1.5">
                      {!field.isFixed && (
                        <div className="w-5 flex  justify-center">
                          <GripVertical
                            size={18}
                            className="text-secondaryColor cursor-grab"
                          />
                        </div>
                      )}
                      <div
                        className={`flex-1 min-w-0 cursor-pointer rounded-md  transition-all`}
                        onClick={() => selectField(null, field.id)}
                      >
                        <FieldRenderer
                          field={field}
                          activeBlockId={activeBlockId}
                          activeSectionId={null}
                        />
                      </div>
                      {!field.isFixed && (
                        <div className="flex items-end">
                          <button
                            type="button"
                            title="Delete field"
                            aria-label={`Delete ${field.label}`}
                            draggable={false}
                            onDragStart={(e) => e.stopPropagation()}
                            onClick={(e) => handleDeleteBlockField(e, field.id)}
                            className=" p-3.75 cursor-pointer rounded-md border border-borderColor bg-grayColor1 text-redColor hover:bg-red-50 transition-colors"
                          >
                            <DeleteIcon />
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-gray-400">
            <div>
              <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-headerColor">
                {activeBlock.name}
              </h2>
              <p className="text-base text-gray-400">{activeBlock.describe}</p>
            </div>
            <div className="flex items-center mt-3 gap-2">
              <ButtonReuseable
                icon={<SectionIcon className="" />}
                title="Add Section"
                onClick={openAddSection}
                className="bg-blackColor py-2.75! text-sm! text-whiteColor"
              />
              <ButtonReuseable
                icon={<InputIcon className="" />}
                title="Add Input"
                onClick={openAddInput}
                className="bg-white! border border-borderColor text-headerColor! py-2.75! font-semibold text-sm!"
              />
            </div>
          </div>
        )}
        <div className="mt-4 flex justify-end">
          <ButtonReuseable title="submit" onClick={handleCreateCustomForm} />
        </div>
      </div>

      {addFieldOpen && (
        <AddInputField
          open={addFieldOpen}
          setOpen={setAddFieldOpen}
          initialType={addFieldInitialType}
        />
      )}
    </div>
  );
}

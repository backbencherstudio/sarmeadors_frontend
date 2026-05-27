"use client";

import InputIcon from "@/components/icon/InputIcon";
import SectionIcon from "@/components/icon/SectionIcon";
import ButtonReuseable from "@/components/reusable/CustomButton";
import {
  deleteBlock,
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
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {items.map((input: any) => (
        <div
          key={input.id}
          draggable={!input.isFixed}
          onDragStart={(e) => !input.isFixed && onDragStart(e, input.id)}
          onDragOver={(e) => handleDragOver(e, input.id)}
          onDragEnd={onDragEnd}
          className={`relative flex items-start gap-1 rounded-lg transition-opacity ${
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
            className={`flex-1 min-w-0 cursor-pointer rounded-md p-1 transition-all ${
              activeSectionId === section.id && activeFieldId === input.id
                ? "ring-2 ring-blackColor ring-offset-1"
                : "hover:ring-1 hover:ring-borderColor hover:bg-bgColor"
            }`}
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
      ))}
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
  const activeBlock = useSelector((state: any) =>
    state.applicationForm.blocks.find((b: any) => b.id === activeBlockId),
  );
  const activeSectionId = useSelector(
    (state: any) => state.applicationForm.activeSectionId,
  );
  const activeFieldId = useSelector(
    (state: any) => state.applicationForm.activeFieldId,
  );

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

  const openAddInputToSection = (sectionId: string) => {
    dispatch(setActiveField({ sectionId, fieldId: null }));
    setAddFieldInitialType(undefined);
    setAddFieldOpen(true);
  };

  const handleDeleteBlock = () => {
    dispatch(deleteBlock(activeBlockId));
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
    <div className="w-full bg-white h-full flex flex-col flex-1 overflow-y-auto scrollbar-hide">
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

      <div className="p-6 w-full space-y-5">
        {blockFields.length > 0 ? (
          blockFields.map((field: any) => (
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
              onDragEnd={field.type !== "section" ? onBlockDragEnd : undefined}
              className={`transition-opacity ${
                blockDraggedId === field.id ? "opacity-40" : ""
              }`}
            >
              {field.type === "section" ? (
                // ── Section row ────────────────────────────────────────────
                <div className="space-y-3">
                  <button
                    type="button"
                    onClick={() => selectField(field.id, null)}
                    className={`text-left w-full rounded-md px-1 py-0.5 transition-all ${
                      activeSectionId === field.id && !activeFieldId
                        ? "ring-2 ring-blackColor"
                        : "hover:ring-1 hover:ring-borderColor"
                    }`}
                  >
                    <h3 className="text-base lg:text-lg font-semibold text-headerColor">
                      {field.label}
                    </h3>
                  </button>

                  <SectionWithDrag section={field} blockId={activeBlockId} />

                  <div className="pt-1">
                    <ButtonReuseable
                      icon={<PlusIcon size={13} />}
                      title="Add Input"
                      onClick={() => {
                        dispatch(
                          setActiveField({
                            sectionId: field.id,
                            fieldId: null,
                          }),
                        );
                        openAddInput();
                      }}
                      className="bg-white! border border-borderColor text-headerColor! py-2! text-xs! font-medium"
                    />
                  </div>
                </div>
              ) : (
                // ── Regular field row ───────────────────────────────────────
                <div className="flex items-start gap-1">
                  <div className="mt-6 shrink-0 w-5 flex items-center justify-center">
                    {field.isFixed ? (
                      <Lock size={11} className="text-amber-500" />
                    ) : (
                      <GripVertical
                        size={15}
                        className="text-secondaryColor cursor-grab"
                      />
                    )}
                  </div>
                  <div
                    className={`flex-1 min-w-0 cursor-pointer rounded-md p-1 transition-all ${
                      !activeSectionId && activeFieldId === field.id
                        ? "ring-2 ring-blackColor ring-offset-1"
                        : "hover:ring-1 hover:ring-borderColor hover:bg-bgColor"
                    }`}
                    onClick={() => selectField(null, field.id)}
                  >
                    <FieldRenderer
                      field={field}
                      activeBlockId={activeBlockId}
                      activeSectionId={null}
                    />
                  </div>
                </div>
              )}
            </div>
          ))
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

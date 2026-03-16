"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import TextAlign from "@tiptap/extension-text-align";
import { TextStyle } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-text-style/color";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Bold, Italic } from "lucide-react";
import { useState } from "react";
import { BiAlignMiddle } from "react-icons/bi";
import { FiAlignJustify, FiUnderline } from "react-icons/fi";
import { MdFormatAlignLeft, MdFormatAlignRight } from "react-icons/md";

export default function ClientNoteModal({ open, setOpen }) {
  const [selectedColor, setSelectedColor] = useState("#000000");

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle,
      Color,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Underline,
    ],
    content: `<p>Coast to Coast Nannies will refer All Applicants to the Client...</p>`,
    immediatelyRender: false,
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="min-w-4xl">
        <DialogHeader>
          <DialogTitle>Add Client Note</DialogTitle>
        </DialogHeader>

        <div className="flex flex-wrap items-center gap-2 border rounded-md p-2 mb-3 bg-gray-50">
          <button
            type="button"
            onClick={() => editor?.chain().focus().toggleBold().run()}
            className="p-2 rounded hover:bg-gray-200 cursor-pointer"
          >
            <Bold size={16} />
          </button>

          <button
            type="button"
            onClick={() => editor?.chain().focus().toggleItalic().run()}
            className="p-2 rounded hover:bg-gray-200 cursor-pointer"
          >
            <Italic size={16} />
          </button>

          <button
            type="button"
            onClick={() => editor?.chain().focus().toggleUnderline().run()}
            className={`p-2 rounded hover:bg-gray-200 cursor-pointer ${
              editor?.isActive("underline") ? "bg-gray-300" : ""
            }`}
          >
            <FiUnderline size={18} />
          </button>

          <div className="h-6 border-l mx-2" />

          <input
            type="color"
            value={selectedColor}
            onChange={(e) => {
              const color = e.target.value;
              setSelectedColor(color);
              editor?.chain().focus().setColor(color).run();
            }}
            className="w-10 h-10 cursor-pointer border rounded"
          />

          <div className="h-6 border-l mx-2" />

          <button
            type="button"
            onClick={() => editor?.chain().focus().setTextAlign("left").run()}
            className={`p-2 rounded hover:bg-gray-200 ${
              editor?.isActive({ textAlign: "left" }) ? "bg-gray-300" : ""
            }`}
          >
            <MdFormatAlignLeft size={18} />
          </button>

          <button
            type="button"
            onClick={() => editor?.chain().focus().setTextAlign("center").run()}
            className={`p-2 rounded hover:bg-gray-200 ${
              editor?.isActive({ textAlign: "center" }) ? "bg-gray-300" : ""
            }`}
          >
            <BiAlignMiddle size={18} />
          </button>

          <button
            type="button"
            onClick={() => editor?.chain().focus().setTextAlign("right").run()}
            className={`p-2 rounded hover:bg-gray-200 ${
              editor?.isActive({ textAlign: "right" }) ? "bg-gray-300" : ""
            }`}
          >
            <MdFormatAlignRight size={18} />
          </button>

          <button
            type="button"
            onClick={() =>
              editor?.chain().focus().setTextAlign("justify").run()
            }
            className={`p-2 rounded hover:bg-gray-200 ${
              editor?.isActive({ textAlign: "justify" }) ? "bg-gray-300" : ""
            }`}
          >
            <FiAlignJustify size={18} />
          </button>
        </div>

        <EditorContent
          editor={editor}
          className="
            border rounded-md p-4 max-h-[350px] overflow-y-auto
            [&_.ProseMirror]:min-h-[250px]
            [&_.ProseMirror]:outline-none
          "
        />

        <div className="flex gap-3 mt-4">
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="px-4 py-2 rounded-lg border bg-gray-100"
          >
            Cancel
          </button>

          <button
            type="button"
            className="px-4 py-2 rounded-lg bg-[#111927] text-white"
          >
            Submit
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

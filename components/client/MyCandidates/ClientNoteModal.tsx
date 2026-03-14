"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Bold, Italic } from "lucide-react";
import { BiAlignMiddle } from "react-icons/bi";
import { FiAlignJustify, FiUnderline } from "react-icons/fi";
import { MdFormatAlignLeft, MdFormatAlignRight } from "react-icons/md";

export default function ClientNoteModal({ open, setOpen }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Underline,
    ],
    content: `<p>
    Coast to Coast Nannies will refer All Applicants to the Client...
    </p>`,
    immediatelyRender: false,
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="min-w-4xl">
        <DialogHeader>
          <DialogTitle>Add Client Note</DialogTitle>
        </DialogHeader>

        {/* Toolbar */}
        <div className="flex gap-2 border rounded-md p-2 mb-3 bg-gray-50">
          <button
            onClick={() => editor?.chain().focus().toggleBold().run()}
            className="p-2 rounded hover:bg-gray-200"
          >
            <Bold size={16} />
          </button>

          <button
            onClick={() => editor?.chain().focus().toggleItalic().run()}
            className="p-2 rounded hover:bg-gray-200"
          >
            <Italic size={16} />
          </button>

          <button
            onClick={() => editor?.chain().focus().toggleUnderline().run()}
            className={`p-2 rounded hover:bg-gray-200 ${
              editor?.isActive("underline") ? "bg-gray-300" : ""
            }`}
          >
            <FiUnderline size={18} />
          </button>

          <button
            onClick={() => editor?.chain().focus().setTextAlign("left").run()}
            className={`p-2 rounded hover:bg-gray-200 ${
              editor?.isActive({ textAlign: "left" }) ? "bg-gray-300" : ""
            }`}
          >
            <MdFormatAlignLeft size={18} />
          </button>
          <button
            onClick={() => editor?.chain().focus().setTextAlign("center").run()}
            className={`p-2 rounded hover:bg-gray-200 ${
              editor?.isActive({ textAlign: "center" }) ? "bg-gray-300" : ""
            }`}
          >
            <BiAlignMiddle size={18} />
          </button>
          <button
            onClick={() => editor?.chain().focus().setTextAlign("right").run()}
            className={`p-2 rounded hover:bg-gray-200 ${
              editor?.isActive({ textAlign: "right" }) ? "bg-gray-300" : ""
            }`}
          >
            <MdFormatAlignRight size={18} />
          </button>
          <button
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

        {/* Editor */}
        <div>
          <EditorContent
            editor={editor}
            className="
  border
  rounded-md
  p-4
  max-h-[350px]
  overflow-y-auto

  [&_.ProseMirror]:min-h-[250px]
  [&_.ProseMirror]:outline-none
  [&_.ProseMirror]:text-[15px]
  [&_.ProseMirror]:leading-relaxed

  [&_.ProseMirror_p]:mb-3
  [&_.ProseMirror_ul]:list-disc
  [&_.ProseMirror_ol]:list-decimal
  [&_.ProseMirror_ul]:pl-6
  [&_.ProseMirror_ol]:pl-6

  [&_.ProseMirror_h1]:text-2xl
  [&_.ProseMirror_h1]:font-bold
"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-3 mt-4">
          <button
            onClick={() => setOpen(false)}
            className="px-4 py-2 rounded-lg border bg-gray-100"
          >
            Cancel
          </button>

          <button className="px-4 py-2 rounded-lg bg-[#111927] text-white">
            Submit
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

"use client";

import LinkIcon from "@/components/icon/LinkIcon";
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
import { FiUnderline } from "react-icons/fi";
import { IoIosList } from "react-icons/io";
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

  const handleSetLink = () => {
    if (!editor) return;

    const previousUrl = editor.getAttributes("link").href || "";
    const url = window.prompt("Enter URL", previousUrl);

    if (url === null) return;

    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({
        href: url,
        title: url,
      })
      .run();
  };

  const handleSubmit = () => {
    const html = editor?.getHTML();
    console.log("Editor HTML:", html);
  };

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
            className={`p-2 rounded hover:bg-gray-200 cursor-pointer ${
              editor?.isActive("bold") ? "bg-gray-300" : ""
            }`}
          >
            <Bold size={16} />
          </button>

          <button
            type="button"
            onClick={() => editor?.chain().focus().toggleItalic().run()}
            className={`p-2 rounded hover:bg-gray-200 cursor-pointer ${
              editor?.isActive("italic") ? "bg-gray-300" : ""
            }`}
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

          <div className="w-7 h-7 rounded-full overflow-hidden border border-gray-300 cursor-pointer">
            <input
              type="color"
              value={selectedColor}
              onChange={(e) => {
                const color = e.target.value;
                setSelectedColor(color);
                editor?.chain().focus().setColor(color).run();
              }}
              className="w-9 h-9 -m-1 p-0 border-0 cursor-pointer bg-transparent [&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:border-0 [&::-webkit-color-swatch]:rounded-full [&::-moz-color-swatch]:border-0"
            />
          </div>

          <div className="h-6 border-l mx-2" />

          <button
            type="button"
            onClick={() => editor?.chain().focus().setTextAlign("left").run()}
            className={`p-2 rounded hover:bg-gray-200 cursor-pointer ${
              editor?.isActive({ textAlign: "left" }) ? "bg-gray-300" : ""
            }`}
          >
            <MdFormatAlignLeft size={18} />
          </button>

          <button
            type="button"
            onClick={() => editor?.chain().focus().setTextAlign("center").run()}
            className={`p-2 rounded hover:bg-gray-200 cursor-pointer ${
              editor?.isActive({ textAlign: "center" }) ? "bg-gray-300" : ""
            }`}
          >
            <BiAlignMiddle size={18} />
          </button>

          <button
            type="button"
            onClick={() => editor?.chain().focus().setTextAlign("right").run()}
            className={`p-2 rounded hover:bg-gray-200 cursor-pointer ${
              editor?.isActive({ textAlign: "right" }) ? "bg-gray-300" : ""
            }`}
          >
            <MdFormatAlignRight size={18} />
          </button>

          <button
            type="button"
            onClick={() => editor?.chain().focus().toggleBulletList().run()}
            className={`p-2 rounded hover:bg-gray-200 cursor-pointer ${
              editor?.isActive("bulletList") ? "bg-gray-300" : ""
            }`}
          >
            <IoIosList size={18} />
          </button>
          <div className="h-6 border-l mx-2" />
          <button
            type="button"
            onClick={handleSetLink}
            className={`p-2 rounded hover:bg-gray-200 cursor-pointer ${
              editor?.isActive("link") ? "bg-gray-300" : ""
            }`}
          >
            <LinkIcon />
          </button>
        </div>

        <EditorContent
          editor={editor}
          className="
            border rounded-md p-4 max-h-[350px] overflow-y-auto
            [&_.ProseMirror]:min-h-[250px]
            [&_.ProseMirror]:outline-none
            [&_.ProseMirror]:text-[15px]
            [&_.ProseMirror]:leading-relaxed
            [&_.ProseMirror_p]:mb-3
            [&_.ProseMirror_ul]:list-disc
            [&_.ProseMirror_ul]:pl-6
            [&_.ProseMirror_ol]:list-decimal
            [&_.ProseMirror_ol]:pl-6
            [&_.ProseMirror_li]:mb-1
          "
        />

        <div className="flex gap-3 mt-4">
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="px-4 py-2 rounded-lg border bg-gray-100 cursor-pointer"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            className="px-4 py-2 rounded-lg bg-[#111927] text-white cursor-pointer"
          >
            Submit
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

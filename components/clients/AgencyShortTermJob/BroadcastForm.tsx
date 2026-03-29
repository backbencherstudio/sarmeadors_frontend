"use client";

import LinkIcon from "@/components/icon/LinkIcon";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import { TextStyle } from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-text-style/color";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Bold, Eye, Info, Italic, Trash2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { BiAlignMiddle } from "react-icons/bi";
import { FiUnderline } from "react-icons/fi";
import { IoIosList } from "react-icons/io";
import { MdFormatAlignLeft, MdFormatAlignRight } from "react-icons/md";

interface BroadcastFormData {
  from: string;
  replyTo: string;
  subject: string;
  message: string;
}

export default function BroadcastForm() {
  const { register, handleSubmit } = useForm<BroadcastFormData>({
    defaultValues: {
      from: "sarah@nanniescoasttocoast.com",
      replyTo: "sarah@nanniescoasttocoast.com",
      subject: "New Opportunity - Full Time Nanny In River North",
      message: "",
    },
  });

  const [selectedColor, setSelectedColor] = useState("#000000");

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle,
      Color,
      Underline,
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: "https",
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
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
        target: "_blank",
        rel: "noopener noreferrer",
      })
      .run();
  };
  const attachments = [
    "pexels-vantrangho-4747157.jpg",
    "c23bbf_137209094bbe4845872f621a1b38f696~mv2.jpg",
  ];

  const onSubmit = (data: BroadcastFormData) => {
    const payload = {
      ...data,
      message: editor?.getHTML() || "",
    };

    console.log("Form submitted:", payload);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-12 rounded-lg border p-6"
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label
            htmlFor="from"
            className="mb-1.5 block text-sm font-medium text-gray-700"
          >
            From
          </label>
          <input
            id="from"
            type="email"
            {...register("from")}
            className="w-full rounded-md border bg-[#F9FAFB] px-4 py-3 text-gray-900 placeholder-gray-500 transition focus:outline-none focus:ring-0"
          />
        </div>

        <div>
          <label
            htmlFor="replyTo"
            className="mb-1.5 block text-sm font-medium text-gray-700"
          >
            Reply To
          </label>
          <input
            id="replyTo"
            type="email"
            {...register("replyTo")}
            className="w-full rounded-md border bg-[#F9FAFB] px-4 py-3 text-gray-900 placeholder-gray-500 transition focus:outline-none focus:ring-0"
          />
        </div>
      </div>

      <div className="my-4">
        <label
          htmlFor="subject"
          className="mb-1.5 block text-sm font-medium text-gray-700"
        >
          Broadcast Subject
        </label>
        <input
          id="subject"
          type="text"
          {...register("subject")}
          className="w-full rounded-md border bg-[#F9FAFB] px-4 py-3 text-gray-900 placeholder-gray-500 transition focus:outline-none focus:ring-0"
        />
      </div>

      <div>
        <div className="mb-3 flex flex-wrap items-center gap-2 rounded-md border bg-gray-50 p-2">
          <button
            type="button"
            onClick={() => editor?.chain().focus().toggleBold().run()}
            className={`cursor-pointer rounded p-2 hover:bg-gray-200 ${
              editor?.isActive("bold") ? "bg-gray-300" : ""
            }`}
          >
            <Bold size={16} />
          </button>

          <button
            type="button"
            onClick={() => editor?.chain().focus().toggleItalic().run()}
            className={`cursor-pointer rounded p-2 hover:bg-gray-200 ${
              editor?.isActive("italic") ? "bg-gray-300" : ""
            }`}
          >
            <Italic size={16} />
          </button>

          <button
            type="button"
            onClick={() => editor?.chain().focus().toggleUnderline().run()}
            className={`cursor-pointer rounded p-2 hover:bg-gray-200 ${
              editor?.isActive("underline") ? "bg-gray-300" : ""
            }`}
          >
            <FiUnderline size={18} />
          </button>

          <div className="mx-2 h-6 border-l" />

          <div className="h-7 w-7 cursor-pointer overflow-hidden rounded-full border border-gray-300">
            <input
              type="color"
              value={selectedColor}
              onChange={(e) => {
                const color = e.target.value;
                setSelectedColor(color);
                editor?.chain().focus().setColor(color).run();
              }}
              className="m-[-4px] h-9 w-9 cursor-pointer border-0 bg-transparent p-0
              [&::-webkit-color-swatch-wrapper]:p-0
              [&::-webkit-color-swatch]:rounded-full
              [&::-webkit-color-swatch]:border-0
              [&::-moz-color-swatch]:border-0"
            />
          </div>

          <div className="mx-2 h-6 border-l" />

          <button
            type="button"
            onClick={() => editor?.chain().focus().setTextAlign("left").run()}
            className={`cursor-pointer rounded p-2 hover:bg-gray-200 ${
              editor?.isActive({ textAlign: "left" }) ? "bg-gray-300" : ""
            }`}
          >
            <MdFormatAlignLeft size={18} />
          </button>

          <button
            type="button"
            onClick={() => editor?.chain().focus().setTextAlign("center").run()}
            className={`cursor-pointer rounded p-2 hover:bg-gray-200 ${
              editor?.isActive({ textAlign: "center" }) ? "bg-gray-300" : ""
            }`}
          >
            <BiAlignMiddle size={18} />
          </button>

          <button
            type="button"
            onClick={() => editor?.chain().focus().setTextAlign("right").run()}
            className={`cursor-pointer rounded p-2 hover:bg-gray-200 ${
              editor?.isActive({ textAlign: "right" }) ? "bg-gray-300" : ""
            }`}
          >
            <MdFormatAlignRight size={18} />
          </button>

          <button
            type="button"
            onClick={() => editor?.chain().focus().toggleBulletList().run()}
            className={`cursor-pointer rounded p-2 hover:bg-gray-200 ${
              editor?.isActive("bulletList") ? "bg-gray-300" : ""
            }`}
          >
            <IoIosList size={18} />
          </button>

          <div className="mx-2 h-6 border-l" />

          <button
            type="button"
            onClick={handleSetLink}
            className={`cursor-pointer rounded p-2 hover:bg-gray-200 ${
              editor?.isActive("link") ? "bg-gray-300" : ""
            }`}
          >
            <LinkIcon />
          </button>
        </div>

        <EditorContent
          editor={editor}
          className="
            max-h-[350px] overflow-y-auto rounded-md border p-4
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
      </div>

      <div className="w-full mt-4">
        <div className="space-y-6">
          <div>
            <button
              type="button"
              className="rounded-[12px] border bg-[#F3F4F6] px-5 py-3 text-sm font-semibold text-[#111927] shadow cursor-pointer"
            >
              Edit the Email Broadcast Template
            </button>

            <div className="mt-4 space-y-3 text-sm sm:text-base text-[#111827]">
              <p>Use [[fname]] for first name.</p>
              <p>Use [[lname]] for last name</p>
              <p className="break-all">
                Job link: https://nanniescoasttocoastenginehiren/job/10776089
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-[#111827]">
              Attachments
            </h2>
            <p className="mt-1 text-sm sm:text-base text-[#7A8699]">
              The max attachment size is 10MB. Emails with attachments large
              than this will NOT send!
            </p>

            <div className="mt-6 space-y-4">
              {attachments.map((file, index) => (
                <div
                  key={index}
                  className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
                >
                  <p className="break-all text-sm sm:text-base text-[#374151]">
                    {file}
                  </p>

                  <div className="flex items-center gap-4 self-end sm:self-auto">
                    <button
                      type="button"
                      className="text-[#111827] transition hover:opacity-70 cursor-pointer"
                    >
                      <Eye className="h-5 w-5" />
                    </button>

                    <button
                      type="button"
                      className="text-[#ef4444] transition hover:opacity-70 cursor-pointer"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-1.5 sm:flex-row sm:items-center">
              <button
                type="button"
                className="inline-flex w-full items-center justify-center rounded-[12px] border bg-[#F3F4F6] px-6 py-4 text-base font-semibold text-[#111827] shadow-sm transition hover:bg-[#e7e9ee] sm:w-auto cursor-pointer"
              >
                Add Attachment
              </button>

              <button
                type="button"
                className="inline-flex h-6 w-6 items-center justify-center text-[#3b82f6]"
              >
                <Info className="h-6 w-6" />
              </button>
            </div>
          </div>

          <div>
            <button
              type="button"
              className="inline-flex w-full items-center justify-center rounded-xl bg-[#0f172a] px-6 py-4 text-base font-semibold text-white shadow-md transition hover:bg-[#111c34] sm:w-auto cursor-pointer"
            >
              Broadcast Email
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

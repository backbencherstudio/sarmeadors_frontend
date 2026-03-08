"use client";

import { Eye, Info, Trash2 } from "lucide-react";
import { useForm } from "react-hook-form";

type FormValues = {
  subject: string;
  content: string;
};

export default function ContentStep({ onBack }: { onBack?: () => void }) {
  const { register, handleSubmit } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  const attachments = [
    "pexels-vantrangho-4747157.jpg",
    "c23bbf_137209094bbe4845872f621a1b38f696-mv2.jpg",
  ];

  return (
    <div className="mt-8">
      <h1 className="text-gray-900 font-semibold text-2xl">Step 3: Content</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-6 flex flex-col gap-6"
      >
        {/* Subject */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Subject</label>

          <div className="flex gap-3">
            <input
              {...register("subject")}
              placeholder="Hello"
              className="flex-1 border rounded-md px-4 py-2 text-sm"
            />

            <button
              type="button"
              className="px-4 py-2 rounded-md border text-sm hover:bg-gray-50"
            >
              Add Tag
            </button>
          </div>
        </div>

        {/* Editor Toolbar */}
        <div className="border rounded-md bg-gray-50 p-2 flex flex-wrap gap-2 text-sm">
          <button className="px-3 py-1 rounded bg-gray-900 text-white text-xs cursor-pointer">
            Insert Profile Fields
          </button>

          <button className="px-2 py-1 border rounded cursor-pointer">T</button>
          <button className="px-2 py-1 border rounded cursor-pointer">
            Inter
          </button>
          <button className="px-2 py-1 border rounded cursor-pointer">
            16px
          </button>

          <button className="px-2 py-1 border rounded font-bold cursor-pointer">
            B
          </button>
          <button className="px-2 py-1 border rounded italic cursor-pointer">
            I
          </button>
          <button className="px-2 py-1 border rounded underline cursor-pointer">
            U
          </button>
        </div>

        {/* Content Editor */}
        <textarea
          {...register("content")}
          rows={10}
          className="border rounded-md p-4 text-sm w-full"
          defaultValue={`Hello mst,

Thank you for contacting us! We would be glad to help you find a Nanny for your family.

The next step in this process is to access your client dashboard by visiting: Here is the login page.
Your username and password is your email address.

Thank you,
The Coast to Coast Nannies Team`}
        />

        {/* Attachments */}
        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-semibold">Attachments</h3>

          <p className="text-xs text-gray-500">
            The max attachment size is 10MB. Emails with attachments larger than
            this will NOT send!
          </p>

          {attachments.map((file) => (
            <div key={file} className="grid grid-cols-2">
              <h1 className="text-sm">{file}</h1>

              <div className="flex items-center gap-3">
                <Eye size={16} className="cursor-pointer text-gray-500" />
                <Trash2 size={16} className="cursor-pointer text-red-500" />
              </div>
            </div>
          ))}

          <div className="flex items-center gap-3 mt-2">
            <button
              type="button"
              className="px-4 py-2 bg-gray-900 text-white rounded-md text-sm cursor-pointer"
            >
              Add Attachment
            </button>

            <Info size={16} className="text-blue-500" />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-between pt-6 border-t mt-6">
          <button
            type="button"
            onClick={onBack}
            className="px-5 py-2 rounded-md border text-sm hover:bg-gray-50 cursor-pointer"
          >
            ← Back
          </button>

          <div className="flex gap-4">
            <button
              type="button"
              className="px-5 py-2 rounded-md border text-sm hover:bg-gray-50 cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-2 rounded-md bg-[#111827] text-white text-sm hover:bg-black cursor-pointer"
            >
              Create Now
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

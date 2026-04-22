"use client";
import LinkIcon from "@/components/icon/LinkIcon";
import LocationIcon from "@/components/icon/LocationIcon";
import ButtonReuseable from "@/components/reusable/CustomButton";
import LinkReuseable from "@/components/reusable/CustomLink";
import {
  ChevronDown,
  ChevronUp,
  Copy,
  HomeIcon,
  PencilIcon,
  Settings,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface PostedJobCardProps {
  id: string;
  title: string;
  manager: string;
  managerImage?: string;
  status: "Broadcasted" | "Filled" | "Posted" | "Draft" | "Closed";
  image?: string;
  start?: string;
  locations?: string;
  address?: string;
  compensation?: string;
  schedule?: string;
  children?: string;
  jobId?: string;
  createdDate?: string;
  notes?: string[];
}

const statusStyles: Record<string, string> = {
  Broadcasted: "bg-[#E6F0FF] text-[#0065FF]",
  Filled: "bg-[#F8EBFF] text-[#AD0AFD]",
  Closed: "bg-[#FFEDEC] text-[#CB121D]",
};

export default function PostedJobCard({
  title,
  manager,
  managerImage,
  status,
  image,
  start,
  locations,
  address,
  compensation,
  schedule,
  children,
  jobId,
  createdDate,
  notes = [],
}: PostedJobCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [notesList, setNotesList] = useState<string[]>(notes);
  const [showNoteInput, setShowNoteInput] = useState(false);
  const [newNote, setNewNote] = useState("");

  const addNote = () => {
    if (newNote.trim()) {
      setNotesList((prev) => [...prev, newNote.trim()]);
      setNewNote("");
      setShowNoteInput(false);
    }
  };

  const InfoRow = ({ label, value }: { label: string; value?: string }) =>
    value ? (
      <div className="flex gap-4 py-2">
        <span className="text-base font-semibold text-[#384250] w-32 flex-shrink-0">
          {label}
        </span>
        <span className="text-base font-bold text-gray-800">{value}</span>
      </div>
    ) : null;
  return (
    <div
      className="bg-[#F9FAFB] border border-gray-200 rounded-lg overflow-hidden"
      style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
    >
      {/* Header row — always visible */}
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3 min-w-0">
          {/* Expand/Collapse toggle */}
          <button
            type="button"
            onClick={() => setExpanded((p) => !p)}
            className="text-gray-500 p-2 bg-[#F3F4F6] rounded-md border cursor-pointer hover:text-gray-800 flex-shrink-0 transition-colors"
          >
            {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>

          {/* Title */}
          <h2 className="text-lg font-semibold text-[#2F3542] truncate">
            {title}
          </h2>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2 flex-shrink-0 ml-4">
          <ButtonReuseable
            icon={<Trash2 size={15} />}
            className="text-[#CB121D]! bg-white border border-gray2Color transition-colors"
          />
          <div>
            <ButtonReuseable
              icon={<PencilIcon size={15} />}
              className="bg-white !text-blackColor border border-gray2Color"
            />
          </div>
          <div>
            <ButtonReuseable
              icon={<Settings size={15} />}
              className="bg-white !text-blackColor border border-gray2Color"
            />
          </div>
          <div>
            <ButtonReuseable
              title={status}
              icon={<Settings size={15} />}
              className="bg-white !text-blackColor border border-gray2Color"
            />
          </div>
        </div>
      </div>

      {/* Manager row — always visible */}
      <div className="flex items-center gap-2 px-10 pb-3">
        {managerImage ? (
          <Image
            src={managerImage}
            alt={manager}
            className="w-6 h-6 rounded-full object-cover"
            height={100}
            width={100}
          />
        ) : (
          <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center text-xs text-gray-600 font-medium">
            {manager.charAt(0)}
          </div>
        )}
        <span className="text-base text-gray-600">{manager}</span>
        <span
          className={`text-sm px-4 py-2 rounded-md font-medium ${statusStyles[status]}`}
        >
          {status}
        </span>
      </div>

      {/* Expanded content */}
      {expanded && (
        <div className="border-t border-gray-100">
          <div className="flex gap-0">
            {/* Left: Details */}
            <div className="flex-1 px-6 py-4 border-r border-gray-100">
              {/* Image row */}
              {image && (
                <div className="flex gap-4 py-2">
                  <span className="text-sm text-gray-500 w-32 flex-shrink-0">
                    Image
                  </span>
                  <Image
                    src={image}
                    alt="job"
                    className="w-8 h-8 rounded object-cover"
                    height={100}
                    width={100}
                  />
                </div>
              )}
              <InfoRow label="Start" value={start} />
              <InfoRow label="Locations" value={locations} />
              <InfoRow label="Address" value={address} />
              <InfoRow label="Compensation" value={compensation} />
              <InfoRow label="Schedule" value={schedule} />
              <InfoRow label="Children" value={children} />
              <InfoRow label="ID" value={jobId} />
              <InfoRow label="Created Date" value={createdDate} />

              {/* Bottom action buttons */}
              <div className="flex items-center gap-4 mt-4 pt-3 border-t border-gray-100">
                <div>
                  <LinkReuseable
                    href="/posted/posted-job-broadcast"
                    className="md:px-4 md:py-3 py-2.5 px-3 rounded-md md:rounded-lg cursor-pointer bg-blackColor text-white h-full hover:scale-105 transition-all duration-200"
                    title="Broadcast"
                  />
                </div>
                <div>
                  <LinkReuseable
                    href="/posted/applicants"
                    title="View Applications"
                    className="md:px-4 md:py-3 py-2.5 px-3 rounded-md md:rounded-lg cursor-pointer !bg-white !text-blackColor border border-gray2Color h-full hover:scale-105 transition-all duration-200"
                  />
                </div>
                <div>
                  <ButtonReuseable
                    icon={<LinkIcon className="h-5 w-5" />}
                    className="bg-white !text-blackColor border border-gray2Color"
                  />
                </div>
                <div>
                  <ButtonReuseable
                    icon={<LocationIcon className="h-5 w-5" />}
                    className="bg-white !text-blackColor border border-gray2Color"
                  />
                </div>
                <div>
                  <ButtonReuseable
                    icon={<Copy className="h-5 w-5" />}
                    className="bg-white !text-blackColor border border-gray2Color"
                  />
                </div>
                <div>
                  <ButtonReuseable
                    icon={<HomeIcon className="h-5 w-5" />}
                    className="bg-white !text-blackColor border border-gray2Color"
                  />
                </div>
              </div>
            </div>

            {/* Right: Notes */}
            <div className="px-5 py-4 flex-shrink-0">
              <p className="text-base font-medium text-[#111927] mb-1">Notes</p>
              <p className="text-sm text-gray-400 mb-3 leading-relaxed">
                Notes are taken here for internal admin use only, not visible to
                users.
              </p>

              {notesList.length > 0 && (
                <ul className="mb-3 space-y-1.5">
                  {notesList.map((note, i) => (
                    <li
                      key={i}
                      className="text-xs text-gray-600 bg-gray-50 rounded px-2 py-1.5 border border-gray-100"
                    >
                      {note}
                    </li>
                  ))}
                </ul>
              )}

              {showNoteInput ? (
                <div className="space-y-1.5">
                  <textarea
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder="Write a note..."
                    rows={3}
                    className="w-full text-xs border border-gray-300 rounded px-2 py-1.5 resize-none focus:outline-none focus:border-gray-400"
                  />
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={addNote}
                      className="px-4 py-2 bg-gray-900 text-white text-xs rounded hover:bg-gray-700 transition-colors cursor-pointer"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowNoteInput(false);
                        setNewNote("");
                      }}
                      className="px-4 py-2 border border-gray-300 text-xs text-gray-600 rounded hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowNoteInput(true)}
                  className="px-3 py-1.5 border border-gray-300 text-xs text-gray-700 rounded hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  Add Note
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

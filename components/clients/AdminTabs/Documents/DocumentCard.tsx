"use client";

import { Card } from "@/components/ui/card";
import ListBlackIcon from "@/public/icon/ListBlackIcon";
import ListGreenIcon from "@/public/icon/ListGreenIcon";
import Link from "next/link";

interface DocumentCardProps {
  id: string;
  title: string;
  addedDate?: string;
  isSigned: boolean;
  linkText: string;
  link: string;
  fileUrl?: string;
  onAction?: (id: string) => void;
}

export default function DocumentCard({
  id,
  title,
  addedDate,
  isSigned,
  link,
  fileUrl,
  onAction,
  linkText,
}: DocumentCardProps) {
  return (
    <Card className="relative p-6 gap-0 bg-white border border-gray-200 shadow-sm">
      {/* Icon */}
      <div className="flex justify-center mb-6 mt-2">
        {!isSigned ? <ListGreenIcon /> : <ListBlackIcon />}
      </div>

      {/* Title */}
      <h3 className="text-base font-semibold text-gray-900 text-center px-4">
        {title}
      </h3>

      {/* Date */}
      {addedDate && (
        <div className="space-y-1 text-center">
          <p className="text-sm text-gray-600">Added: {addedDate}</p>
        </div>
      )}

      {/* Button */}
      <div className="flex justify-center gap-2 mt-4">
        {fileUrl ? (
          <Link
            href={fileUrl}
            onClick={() => onAction?.(id)}
            className="inline-flex items-center justify-center rounded-[12px] bg-black text-white px-4 py-3.5 border-0 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
          >
            View
          </Link>
        ) : (
          <Link
            href={link}
            onClick={() => onAction?.(id)}
            className="inline-flex items-center justify-center rounded-[12px] bg-black text-white px-4 py-3.5 border-0 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
          >
            {linkText}
          </Link>
        )}
      </div>
    </Card>
  );
}

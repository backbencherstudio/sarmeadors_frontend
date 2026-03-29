import ShortTermJobMenu from "@/components/clients/ShortTermJob/AgencyShortTermJobMenu";
import React from "react";

export default function ShortTermJobLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="md:p-6 p-4 ">
      <div className="mb-3">
        <ShortTermJobMenu />
      </div>
      {children}
    </div>
  );
}

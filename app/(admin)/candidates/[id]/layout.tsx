import AdminTopMenu from "@/components/clients/AdminMenu";
import ProfileInfo from "@/components/clients/ProfileInfo/ProfileInfo";

import React from "react";
interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{
    id: string;
  }>;
}

export default async function ApartmentDetailsLayout({
  children,
  params,
}: LayoutProps) {
  const resolvedParams = await params;

  const { id } = resolvedParams;

  console.log("Slug from layout:", id);
  return (
    <div>
      <div className="border grid grid-cols-1 lg:grid-cols-12">
        <div className="lg:col-span-3 2xl:col-span-2">
          <ProfileInfo />
        </div>
        <div className=" bg-white lg:col-span-9 2xl:col-span-10 p-4 lg:p-6">
          <div>
            <AdminTopMenu title="candidates" id={id} />
          </div>
          {/* children */}
          <div className="py-4">{children}</div>
        </div>
      </div>
    </div>
  );
}

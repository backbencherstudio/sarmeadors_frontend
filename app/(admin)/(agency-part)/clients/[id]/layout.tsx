import AdminTopMenu from "@/components/clients/AdminMenu";
import ProfileInfo from "@/components/clients/ProfileInfo/ProfileInfo";

import React from "react";

export default async function ClientLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  const { id } = await params;

  return (
    <div>
      <div className="border grid grid-cols-1 lg:grid-cols-12">
        <div className="lg:col-span-3 2xl:col-span-2">
          <ProfileInfo />
        </div>
        <div className=" bg-white lg:col-span-9 2xl:col-span-10 p-4 lg:p-6">
          <div>
            <AdminTopMenu title="clients" id={id} />
          </div>
          {/* children */}
          <div className="py-4">{children}</div>
        </div>
      </div>
    </div>
  );
}

"use client";
import BusinessDetails from "@/components/agency/globalSetting/agencyDetails/BusinessDetails";
import CommunicationSettings from "@/components/agency/globalSetting/agencyDetails/CommunicationSettings";
import LanguageAndLocations from "@/components/agency/globalSetting/agencyDetails/LanguageAndLocations";
import NameLogosColorsAndFont from "@/components/agency/globalSetting/agencyDetails/NameLogosColorsAndFont";
import { useGetAgencyInfoQuery } from "@/feature/slice/settings/agencyDetails/AgencyDetailsSettingsSlice";

export default function AgencyDetailsPage() {
  const { data, isLoading, error } = useGetAgencyInfoQuery();

  return (
    <div className="space-y-4">
      <NameLogosColorsAndFont
        agencyData={data}
        isLoading={isLoading}
        error={error}
      />
      <LanguageAndLocations />
      <BusinessDetails />
      <CommunicationSettings />
    </div>
  );
}

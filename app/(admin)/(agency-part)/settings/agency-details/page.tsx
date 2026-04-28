import BusinessDetails from "@/components/agency/globalSetting/agencyDetails/BusinessDetails";
import LanguageAndLocations from "@/components/agency/globalSetting/agencyDetails/LanguageAndLocations";
import NameLogosColorsAndFont from "@/components/agency/globalSetting/agencyDetails/NameLogosColorsAndFont";

export default function AgencyDetailsPage() {
    return (
        <div className="space-y-4">
            <NameLogosColorsAndFont />
            <LanguageAndLocations />
            <BusinessDetails />
        </div>
    )
}

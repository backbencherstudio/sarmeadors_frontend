import CustomFromTitleSetting from "@/components/dashboard/Form-Customization/CustomFromTitleSetting";
import EyeIcon from "@/components/icon/EyeIcon";
import LinkReuseable from "@/components/reusable/CustomLink";
import ArrowLeftIcon from "@/public/icon/ArrowLeftIcon";

import Link from "next/link";

function page() {
  return (
    <div className="p-4 md:p-6">
      <div className="flex justify-between items-start w-full">
        <Link
          href="/application-builder"
          className="text-base md:text-lg flex items-center gap-2 font-semibold text-headerColor "
        >
          <ArrowLeftIcon /> Application Builder
        </Link>
        <LinkReuseable
          href="/application-builder"
          title="Preview"
          icon={<EyeIcon className="w-4.5 h-4.5" />}
          className="text-base  bg-black flex items-center gap-2 font-semibold text-whiteColor px-5 py-2 md:py-3 rounded-md"
        />
      </div>
      <div>
        <CustomFromTitleSetting />
      </div>
    </div>
  );
}

export default page;

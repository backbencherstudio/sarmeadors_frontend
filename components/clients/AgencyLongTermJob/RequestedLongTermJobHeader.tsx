import Search from "@/components/common/Search";
import DownloadIcon from "@/components/icon/DownloadIcon";
import FilterIcon from "@/components/icon/FilterIcon";
import ButtonReuseable from "@/components/reusable/CustomButton";
import { Plus, Share2 } from "lucide-react";

export default function RequestedLongTermJobHeader({
  title,
  description,
  buttonTitle = "Post Jobs",
}) {
  return (
    <div>
      <div className="mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center md:justify-between gap-4 w-full mb-4">
          <div className="max-w-xs w-full">
            <h4 className="text-2xl font-bold text-gray-800 text-nowrap">
              {title}
            </h4>
            <p className="text-base text-secondaryColor mt-0.5 text-nowrap">
              {description}
            </p>
          </div>
          <div className="flex flex-col md:flex-row w-full md:justify-end  md:items-center gap-3 md:gap-2 h-full">
            <Search />
            {
              <div className="flex items-center  gap-3 md:gap-2  ">
                <div>
                  <ButtonReuseable
                    icon={<DownloadIcon className="h-5 w-5" />}
                    className="bg-white !text-blackColor border border-gray2Color"
                  />
                </div>
                <div>
                  <ButtonReuseable
                    icon={<Share2 className="h-5 w-5" />}
                    className="bg-white !text-blackColor border border-gray2Color"
                  />
                </div>
                <div>
                  <ButtonReuseable
                    icon={<FilterIcon className="h-5 w-5" />}
                    className="bg-white !text-blackColor border border-gray2Color"
                  />
                </div>
                <div>
                  <ButtonReuseable title={buttonTitle} icon={<Plus />} />
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  );
}

import Search from "@/components/common/Search";
import DownloadIcon from "@/components/icon/DownloadIcon";
import FilterIcon from "@/components/icon/FilterIcon";
import ButtonReuseable from "@/components/reusable/CustomButton";

function RecordFilter() {
  return (
    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3">
      <div className="flex items-center">
        <div>
          <h1 className="text-lg md:text-xl font-semibold">All Status</h1>
          <p className="text-sm text-secondaryColor mt-1">
            List of all current clients and their details.
          </p>
        </div>
        <div className="flex gap-2 md:hidden items-center">
          <ButtonReuseable
            title="Filter"
            className="bg-white border border-borderColor text-headerColor! hover:bg-gray-50 "
            icon={<FilterIcon className="w-4 h-4" />}
          />
          <ButtonReuseable
            title="Export"
            className="bg-black border border-borderColor text-white hover:bg-gray-800 "
            icon={<DownloadIcon className="w-4 h-4" />}
          />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Search />
        <div className=" gap-2 items-center hidden md:flex ">
          <ButtonReuseable
            title="Filter"
            className="bg-white border border-borderColor text-headerColor! hover:bg-gray-50 "
            icon={<FilterIcon className="w-4 h-4" />}
          />
          <ButtonReuseable
            title="Export"
            className="bg-black border border-borderColor text-white hover:bg-gray-800 "
            icon={<DownloadIcon className="w-4 h-4" />}
          />
        </div>
      </div>
    </div>
  );
}

export default RecordFilter;

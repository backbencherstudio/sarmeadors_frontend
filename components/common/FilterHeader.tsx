"use client";
import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import { HiOutlineFilter } from "react-icons/hi";
import ClientDashboardFilter from "../filter/ClientDashboardFilter";
import ButtonReuseable from "../reusable/CustomButton";
import Search from "./Search";

interface FilterHeaderProps {
  title?: string;
  description?: string;
  handleOpenModal?: () => void;
  buttonTitle?: string;
  filter?: boolean;
}

function FilterHeader({
  title,
  description,
  filter = true,
  handleOpenModal,
  buttonTitle = "Add Client",
}: FilterHeaderProps) {
  const [filteredDataState, setFilteredDataState] = useState(false);
  const handleFilter = () => {
    setFilteredDataState(!filteredDataState);
  };
  return (
    <div>
      <div className="mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center md:justify-between gap-4 w-full mb-4">
          <div className="max-w-xs w-full">
            <h4 className="text-2xl font-bold text-gray-800">{title}</h4>
            <p className="text-base text-secondaryColor mt-0.5">
              {description}
            </p>
          </div>
          <div className="flex flex-col md:flex-row w-full md:justify-end  md:items-center gap-3 md:gap-2 h-full">
            <Search />
            {filter && (
              <div className="flex items-center  gap-3 md:gap-2  ">
                <div>
                  <ButtonReuseable
                    onClick={handleFilter}
                    title="Filter"
                    className="bg-white !text-blackColor border border-gray2Color"
                    icon={<HiOutlineFilter className="w-4 h-4" />}
                  />
                </div>
                <div>
                  <ButtonReuseable
                    onClick={handleOpenModal}
                    title={buttonTitle}
                    icon={<FiPlus className="w-4 h-4" />}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div>{filteredDataState && <ClientDashboardFilter />}</div>
    </div>
  );
}

export default FilterHeader;

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
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  onSearchSubmit?: (value: string) => void;
}

function FilterHeader({
  title,
  description,
  filter = true,
  handleOpenModal,
  buttonTitle = "Add Client",
  searchValue,
  onSearchChange,
  onSearchSubmit,
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
            {onSearchChange ? (
              <div className="relative">
                <input
                  type="text"
                  value={searchValue}
                  onChange={(e) => onSearchChange(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") onSearchSubmit?.(searchValue || "");
                  }}
                  placeholder="Search by Name, Email or Phone Number"
                  className="w-full text-sm bg-whiteColor border border-gray2Color rounded-md md:rounded-lg py-3 md:py-3.5 px-4 pl-10 focus:outline-none focus:border-dark-500"
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                  >
                    <path
                      d="M14.197 13.1363C13.9041 12.8434 13.4292 12.8434 13.1363 13.1363C12.8434 13.4292 12.8434 13.9041 13.1363 14.197L13.6667 13.6667L14.197 13.1363ZM13.6667 13.6667L13.1363 14.197L16.8863 17.947L17.4167 17.4167L17.947 16.8863L14.197 13.1363L13.6667 13.6667ZM15.75 8.25H16.5C16.5 3.69365 12.8063 0 8.25 0V0.75V1.5C11.9779 1.5 15 4.52208 15 8.25H15.75ZM8.25 0.75V0C3.69365 0 0 3.69365 0 8.25H0.75H1.5C1.5 4.52208 4.52208 1.5 8.25 1.5V0.75ZM0.75 8.25H0C0 12.8063 3.69365 16.5 8.25 16.5V15.75V15C4.52208 15 1.5 11.9779 1.5 8.25H0.75ZM8.25 15.75V16.5C12.8063 16.5 16.5 12.8063 16.5 8.25H15.75H15C15 11.9779 11.9779 15 8.25 15V15.75Z"
                      fill="#111927"
                    />
                  </svg>
                </span>
              </div>
            ) : (
              <Search />
            )}
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

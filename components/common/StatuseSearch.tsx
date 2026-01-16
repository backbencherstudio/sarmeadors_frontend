import React from "react";
import { FiSearch } from "react-icons/fi";

function StatuseSearch({
  statuseSearchTerm,
  setStatuseSearchTerm,
}: {
  statuseSearchTerm: string;
  setStatuseSearchTerm: (value: string) => void;
}) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStatuseSearchTerm(e.target.value);
  };
  return (
    <div>
      <div className="w-full lg:w-44 relative">
        <input
          type="text"
          name="search"
          value={statuseSearchTerm}
          onChange={handleChange}
          className="w-full text-sm  bg-whiteColor border border-borderColor rounded-sm py-1 md:py-1.5 px-3 pl-6 focus:outline-none focus:border-dark-500"
          placeholder="Search tags"
        />
        <button className="absolute left-1.5 top-1/2 -translate-y-1/2 text-2xl">
          <FiSearch size={16} />
        </button>
      </div>
    </div>
  );
}

export default StatuseSearch;

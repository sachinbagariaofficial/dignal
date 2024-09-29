import React from "react";

type SearchSectionProps = {
  searchTerm: string;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBackClick: () => void;
  filteredCount: number;
  totalCount: number;
  validationMessage: string | null;
};

// This is component for search section

const SearchSection: React.FC<SearchSectionProps> = ({
  searchTerm,
  handleSearchChange,
  handleBackClick,
  filteredCount,
  totalCount,
  validationMessage,
}) => {
  return (
    <div className="flex flex-col w-full gap-4">
      <div className="flex items-center gap-5 justify-between">
        <div className="flex-none">
          <img
            src="/assets/images/Back.png"
            alt="Back"
            className="w-6 h-6 cursor-pointer"
            onClick={handleBackClick}
          />
        </div>

        <div className="flex-grow max-w-[400px]">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search movies"
            className="w-full p-2 text-black rounded"
          />
        </div>

        <div className="flex-none min-w-[50px]">
          <span>
            {filteredCount} / {totalCount}
          </span>
        </div>
      </div>

      {validationMessage && (
        <p className="ml-2 text-red-600 text-center">{validationMessage}</p>
      )}
    </div>
  );
};

export default SearchSection;

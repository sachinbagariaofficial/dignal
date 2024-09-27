import React from "react";

interface NavBarProps {
  onSearch: () => void; // Prop to toggle search visibility
  searchVisible: boolean; // Prop to track if search bar is visible
}

const NavBar: React.FC<NavBarProps> = ({ onSearch, searchVisible }) => {
  const handleBack = () => {
    // Handle back functionality (optional)
  };

  return (
    <nav className="flex items-center justify-between p-4 bg-black text-white">
      <img
        src="/assets/images/Back.png"
        alt="Back"
        className="w-6 h-6 cursor-pointer"
        onClick={handleBack}
      />
      <h1 className="text-xl">Romantic Comedy</h1>
      <img
        src={
          searchVisible
            ? "/assets/images/close.png" // Show close icon when search bar is visible
            : "/assets/images/search.png" // Show search icon when search bar is hidden
        }
        alt={searchVisible ? "Close" : "Search"}
        className="w-6 h-6 cursor-pointer"
        onClick={onSearch} // Toggle search bar on click
      />
    </nav>
  );
};

export default NavBar;

import React from "react";

const NavBar = () => {
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
        src={"../../public/assets/images/search.png"}
        alt={"Search"}
        className="w-6 h-6 cursor-pointer"
        onClick={handleBack} // Toggle search bar on click
      />
    </nav>
  );
};

export default NavBar;

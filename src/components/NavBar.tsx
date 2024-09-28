import React, { useState } from "react";
import { useMovieContext } from "../context/MovieContext";

type NavBarProps = {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  setFilterModal: any;
};

const NavBar: React.FC<NavBarProps> = ({
  searchTerm,
  setSearchTerm,
  setFilterModal,
}) => {
  const [isSearching, setIsSearching] = useState(false); // Track if search is active
  const { state, dispatch } = useMovieContext();
  const [validationMessage, setValidationMessage] = useState<string | null>(
    null
  ); // State for validation message

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);

    // Validate the search term length
    if (newSearchTerm.length < 1) {
      setValidationMessage("Please enter at least 1 character.");
      dispatch({ type: "SET_FILTERED_MOVIES", payload: "" });
    } else if (newSearchTerm.length > 15) {
      setValidationMessage("Please enter a max. of 15 characters.");
    } else {
      setValidationMessage(null); // Clear message if valid
      dispatch({ type: "SET_FILTERED_MOVIES", payload: newSearchTerm });
    }
  };

  const handleSearchIconClick = () => {
    setFilterModal(true);
    setIsSearching(true);
    dispatch({ type: "SET_FILTERED_MOVIES", payload: "" }); // Set filteredMovies to empty when searching
  };

  const handleBackClick = () => {
    setFilterModal(false);
    setIsSearching(false);
    setSearchTerm(""); // Clear the search term
    dispatch({ type: "SET_FILTERED_MOVIES", payload: "" }); // Reset filtered movies
    setValidationMessage(null); // Clear any validation message
  };

  return (
    <nav className="sticky-navbar flex items-center justify-between p-4 text-white">
      {isSearching ? (
        <>
          <div className="flex flex-col w-full gap-4">
            <div className="flex items-center gap-5 justify-between">
              <div className="flex-none">
                <img
                  src="../../public/assets/images/Back.png"
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
                  {state.filteredMovies.length} / {state.movies.length}
                </span>
              </div>
            </div>

            {validationMessage && (
              <p className="ml-2 text-red-600 text-center">
                {validationMessage}
              </p>
            )}
          </div>
        </>
      ) : (
        <>
          <h1 className="text-2xl">Romantic Comedy</h1>
          <img
            src="../../public/assets/images/search.png"
            alt="Search"
            className="w-6 h-6 cursor-pointer"
            onClick={handleSearchIconClick}
          />
        </>
      )}
    </nav>
  );
};

export default NavBar;

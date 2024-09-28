import React, { useState } from "react";
import { useMovieContext } from "../context/MovieContext";

type NavBarProps = {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
};

const NavBar: React.FC<NavBarProps> = ({ searchTerm, setSearchTerm }) => {
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
    } else if (newSearchTerm.length > 15) {
      setValidationMessage("Please enter a max. of 15 characters.");
    } else {
      setValidationMessage(null); // Clear message if valid
      dispatch({ type: "SET_FILTERED_MOVIES", payload: newSearchTerm });
    }
  };

  const handleSearchIconClick = () => {
    setIsSearching(true);
    dispatch({ type: "SET_FILTERED_MOVIES", payload: "" }); // Set filteredMovies to empty when searching
  };

  const handleBackClick = () => {
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
            <div className="flex justify-between gap-5">
              <img
                src="../../public/assets/images/Back.png"
                alt="Back"
                className="w-6 h-6 cursor-pointer"
                onClick={handleBackClick}
              />
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search movies"
                className="ml-2 p-1 text-black"
              />

              <span className="ml-4">
                {state.filteredMovies.length} / {state.movies.length}
              </span>
            </div>

            {validationMessage && (
              <p className="ml-2 text-red-600 text-center">
                {validationMessage}
              </p> // Display validation message
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

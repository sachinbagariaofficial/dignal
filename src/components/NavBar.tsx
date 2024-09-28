import React, { useState } from "react";
import { useMovieContext } from "../context/MovieContext";

type NavBarProps = {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
};

const NavBar: React.FC<NavBarProps> = ({ searchTerm, setSearchTerm }) => {
  const [isSearching, setIsSearching] = useState(false); // Track if search is active
  const { state, dispatch } = useMovieContext();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    // You can also add logic here to update the filtered movies based on searchTerm
    dispatch({ type: "SET_FILTERED_MOVIES", payload: newSearchTerm });
  };
  const handleSearchIconClick = () => {
    setIsSearching(true);
  };

  const handleBackClick = () => {
    setIsSearching(false);
    setSearchTerm(""); // Clear the search term
    dispatch({ type: "SET_FILTERED_MOVIES", payload: "" }); // Reset filtered movies
  };
  return (
    <nav className="sticky-navbar flex items-center justify-between p-4 text-white">
      {isSearching ? (
        <>
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
        </>
      ) : (
        <>
          <h1 className="text-xl">Romantic Comedy</h1>
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

import React, { useState } from "react";
import { useMovieContext } from "../context/MovieContext";

const NavBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false); // Track if search is active
  const { state, dispatch } = useMovieContext();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    dispatch({ type: "SET_FILTERED_MOVIES", payload: e.target.value });
  };

  const handleSearchIconClick = () => {
    setIsSearching(true);
  };

  const handleBackClick = () => {
    setIsSearching(false);
    setSearchTerm(""); // Clear the search term
    dispatch({ type: "SET_FILTERED_MOVIES", payload: "" }); // Reset filtered movies
  };

  console.log("state", state.movies.length);

  return (
    <nav className="flex items-center justify-between p-4 bg-black text-white">
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
            Results: {state.filteredMovies.length} / {state.movies.length}
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

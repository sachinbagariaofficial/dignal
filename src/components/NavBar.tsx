import React, { useState } from "react";
import { useMovieContext } from "../context/MovieContext";
import SearchSection from "./SearchSection"; // Import the new component

type NavBarProps = {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  setFilterModal: (value: boolean) => void;
};

// This component for navbar of page
const NavBar: React.FC<NavBarProps> = ({
  searchTerm,
  setSearchTerm,
  setFilterModal,
}) => {
  const [isSearching, setIsSearching] = useState(false);
  const { state, dispatch } = useMovieContext();
  const [validationMessage, setValidationMessage] = useState<string | null>(
    null
  );

  // This function is for validation of search input
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);

    switch (true) {
      // If there is no movie data in context
      case !state.movies.length:
        setValidationMessage("Sorry not able to search now");
        return;
      // If search input text length is less then 1
      case newSearchTerm.length < 1:
        setValidationMessage("Please enter at least 1 character.");
        dispatch({ type: "SET_FILTERED_MOVIES", payload: "" });
        break;
      // If search input text length is greater then 15
      case newSearchTerm.length > 15:
        setValidationMessage("Please enter a max. of 15 characters.");
        break;
      default:
        setValidationMessage(null);
        dispatch({ type: "SET_FILTERED_MOVIES", payload: newSearchTerm });
        break;
    }
  };

  // This function is for search icon
  const handleSearchIconClick = () => {
    setFilterModal(true);
    setIsSearching(true);
    dispatch({ type: "SET_FILTERED_MOVIES", payload: "" });
  };

  // This function is for back button icon
  const handleBackClick = () => {
    setFilterModal(false);
    setIsSearching(false);
    setSearchTerm("");
    dispatch({ type: "SET_FILTERED_MOVIES", payload: "" });
    setValidationMessage(null);
  };

  return (
    <nav className="sticky-navbar flex items-center justify-between p-4 text-white">
      {isSearching ? (
        <SearchSection
          searchTerm={searchTerm}
          handleSearchChange={handleSearchChange}
          handleBackClick={handleBackClick}
          filteredCount={state.filteredMovies.length}
          totalCount={state.movies.length}
          validationMessage={validationMessage}
        />
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

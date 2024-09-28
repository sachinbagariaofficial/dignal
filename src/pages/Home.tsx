import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component"; // Import the library
import MovieCard from "../components/MovieCard";
import NavBar from "../components/NavBar";
import { useMovieContext } from "../context/MovieContext";
import { fetchMovies } from "../services/movieService";

const Home: React.FC = () => {
  const { state, dispatch } = useMovieContext();
  const { filteredMovies, loading, error, page, hasMore } = state; // Assuming `page` and `hasMore` are in your state

  const [searchTerm, setSearchTerm] = useState(""); // State for tracking the search term

  // Load initial movies on mount
  useEffect(() => {
    const loadMovies = async () => {
      try {
        const newMovies = await fetchMovies(1);
        dispatch({ type: "SET_MOVIES", payload: newMovies });
        dispatch({ type: "SET_PAGE", payload: 1 }); // Set initial page to 1
      } catch {
        dispatch({ type: "SET_ERROR", payload: "Failed to load movies 🥲." });
      }
    };

    loadMovies();
  }, []);

  // Function to load more movies when the user scrolls
  const loadMoreMovies = async () => {
    if (!loading && hasMore) {
      try {
        const nextPage = page + 1; // Increment page number
        const newMovies = await fetchMovies(nextPage);
        dispatch({ type: "SET_MOVIES", payload: newMovies });
        dispatch({ type: "SET_PAGE", payload: nextPage });
      } catch {
        dispatch({
          type: "SET_ERROR",
          payload: "Failed to load more movies 🥲.",
        });
      }
    }
  };

  return (
    <div className="min-h-screen">
      {/* Pass searchTerm and setSearchTerm to NavBar */}
      <NavBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className="p-4">
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && filteredMovies.length === 0 && (
          <p>No results found 😕. </p>
        )}
        {!error && ( // Only show InfiniteScroll if there's no error
          <InfiniteScroll
            dataLength={filteredMovies.length} // The length of the movies currently displayed
            next={loadMoreMovies} // Function to call for loading more movies
            hasMore={hasMore} // Whether there are more movies to load
            loader={<p>Loading more movies...</p>} // Loader displayed while loading more movies
            endMessage={
              <p className="text-center mt-2">No more movies to load!</p>
            } // Message displayed when no more movies
          >
            <div className="grid grid-cols-3 gap-4">
              {filteredMovies.map((movie, index) => (
                <MovieCard key={index} movie={movie} searchTerm={searchTerm} />
              ))}
            </div>
          </InfiniteScroll>
        )}
      </div>
    </div>
  );
};

export default Home;

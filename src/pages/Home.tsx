import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import MovieCard from "../components/MovieCard";
import NavBar from "../components/NavBar";
import { useMovieContext } from "../context/MovieContext";
import { fetchMovies } from "../services/movieService";

const Home: React.FC = () => {
  const { state, dispatch } = useMovieContext();
  const { filteredMovies, loading, error, page, hasMore, movies } = state;

  const [searchTerm, setSearchTerm] = useState("");

  // Helper to handle errors and clear errors
  const handleError = (errorMessage: string | null) => {
    dispatch({ type: "SET_ERROR", payload: errorMessage });
  };

  const loadMovies = async (page: number) => {
    try {
      const newMovies = await fetchMovies(page);
      return newMovies; // Return the movies
    } catch (error) {
      handleError(`Failed to load movies: ${error.message} 🥲.`);
      return []; // Return an empty array to avoid crash
    }
  };

  useEffect(() => {
    const fetchInitialMovies = async () => {
      const initialMovies = await loadMovies(1); // Load the first page
      dispatch({ type: "SET_MOVIES", payload: initialMovies });
    };

    fetchInitialMovies();
  }, []);

  const loadMoreMovies = async () => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      const newMovies = await loadMovies(nextPage);

      if (newMovies.length === 0) {
        dispatch({ type: "SET_HAS_MORE", payload: false }); // Stop fetching more data
        return;
      }

      dispatch({ type: "SET_MOVIES", payload: newMovies });
      dispatch({ type: "SET_PAGE", payload: nextPage });
    }
  };

  const [filterModal, setFilterModal] = useState(false);

  console.log("hasMore", hasMore);

  return (
    <div className="min-h-screen">
      <NavBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        setFilterModal={setFilterModal}
      />
      <div className="p-4">
        {/* Display error if there is one */}
        {error && <p className="text-red-500">{error}</p>}

        {/* Show "No results found" only if there's no error and no filteredMovies */}
        {!loading && !error && filteredMovies.length === 0 && (
          <p>No results found 😕.</p>
        )}

        {/* Display InfiniteScroll when no error exists */}
        {!error && !filterModal ? (
          <InfiniteScroll
            dataLength={movies.length}
            next={loadMoreMovies}
            hasMore={hasMore}
            loader={<p>Loading movies...</p>}
            endMessage={
              <p className="text-center mt-2">No more movies to load!</p>
            }
          >
            <div className="grid grid-cols-3 gap-4">
              {movies.map((movie, index) => (
                <MovieCard key={index} movie={movie} searchTerm={searchTerm} />
              ))}
            </div>
          </InfiniteScroll>
        ) : (
          <div className="grid grid-cols-3 gap-4">
            {filteredMovies.map((movie, index) => (
              <MovieCard key={index} movie={movie} searchTerm={searchTerm} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;

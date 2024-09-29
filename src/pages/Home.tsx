import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import MovieCard from "../components/MovieCard";
import NavBar from "../components/NavBar";
import { useMovieContext } from "../context/MovieContext";
import { fetchMovies } from "../services/movieService";

const Home: React.FC = () => {
  const { state, dispatch } = useMovieContext();
  const { filteredMovies, loading, error, page, hasMore, movies } = state;
  const [filterModal, setFilterModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // This function is used for handling the errors
  const handleError = (errorMessage: string | null) => {
    dispatch({ type: "SET_ERROR", payload: errorMessage });
  };

  // To get new movies form api
  const loadMovies = async (page: number) => {
    try {
      const newMovies = await fetchMovies(page);
      return newMovies;
    } catch (error) {
      if (error instanceof Error) {
        handleError(`Failed to load movies: ${error.message} 🥲.`);
      } else {
        handleError("An unknown error occurred 🥲.");
      }
      return [];
    }
  };

  useEffect(() => {
    const fetchInitialMovies = async () => {
      const initialMovies = await loadMovies(1);
      dispatch({ type: "SET_MOVIES", payload: initialMovies });
    };

    fetchInitialMovies();
  }, []);

  const loadMoreMovies = async () => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      const newMovies = await loadMovies(nextPage);

      if (newMovies.length === 0) {
        dispatch({ type: "SET_HAS_MORE", payload: false });
        return;
      }

      dispatch({ type: "SET_MOVIES", payload: newMovies });
      dispatch({ type: "SET_PAGE", payload: nextPage });
    }
  };

  console.log("hasMore", hasMore);

  return (
    <div className="min-h-screen">
      <NavBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        setFilterModal={setFilterModal}
      />
      <div className="p-4">
        {error && <p className="text-red-500 text-center">{error}</p>}

        {!loading && !error && filteredMovies.length === 0 && (
          <p className="text-center">No results found 😕</p>
        )}

        {!error && !filterModal ? (
          <InfiniteScroll
            dataLength={movies.length}
            next={loadMoreMovies}
            hasMore={hasMore}
            loader={<p className="text-center">Loading movies...</p>}
            endMessage={
              <p className="text-center mt-2">No more movies to load!</p>
            }
          >
            <div className="grid grid-cols-3 gap-3 sm:gap-6">
              {movies.map((movie, index) => (
                <MovieCard key={index} movie={movie} searchTerm={searchTerm} />
              ))}
            </div>
          </InfiniteScroll>
        ) : (
          <div className="grid grid-cols-3 gap-3 sm:gap-6">
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

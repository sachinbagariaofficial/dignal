import React, { useEffect } from "react";
import MovieCard from "../components/MovieCard";

import NavBar from "../components/NavBar";
import { useMovieContext } from "../context/MovieContext";
import { fetchMovies } from "../services/movieService";

const Home: React.FC = () => {
  const { state, dispatch } = useMovieContext();
  const { movies, filteredMovies, loading, error, hasMore } = state;

  const loadMovies = async (page: number) => {
    try {
      const newMovies = await fetchMovies(page); // Adjust this to your API response

      console.log("newMovies", newMovies);

      if (newMovies.length === 0) {
        dispatch({ type: "SET_ERROR", payload: "No data available." });
      } else {
        dispatch({
          type: "SET_MOVIES",
          payload: newMovies,
        });
      }
    } catch (err) {
      dispatch({ type: "SET_ERROR", payload: "Failed to load movies." });
    }
  };

  console.log("movies", movies);

  useEffect(() => {
    loadMovies(1);
  }, []);

  return (
    <div className="min-h-screen">
      <div className="sticky-navbar">
        <NavBar />
      </div>

      <div className="p-4">
        {loading && <p>Loading movies...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {movies.length === 0 && !loading && !error && (
          <p>No movies available.</p>
        )}
        <div className="grid grid-cols-3 gap-4">
          {movies.map((movie, index) => (
            <MovieCard key={`${movie.name + index}`} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;

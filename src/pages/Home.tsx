import React, { useEffect } from "react";
import MovieCard from "../components/MovieCard";
import NavBar from "../components/NavBar";
import { useMovieContext } from "../context/MovieContext";
import { fetchMovies } from "../services/movieService";

const Home: React.FC = () => {
  const { state, dispatch } = useMovieContext();
  const { movies, filteredMovies, loading, error } = state;

  // Load movies on initial mount
  useEffect(() => {
    const loadMovies = async () => {
      try {
        const newMovies = await fetchMovies(1);
        dispatch({ type: "SET_MOVIES", payload: newMovies });
      } catch {
        dispatch({ type: "SET_ERROR", payload: "Failed to load movies." });
      }
    };

    loadMovies();
  }, [dispatch]);

  return (
    <div className="min-h-screen">
      <NavBar />
      <div className="p-4">
        {loading && <p>Loading movies...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && filteredMovies.length === 0 && (
          <p>No results found. Try a different search term.</p>
        )}
        <div className="grid grid-cols-3 gap-4">
          {filteredMovies.map((movie, index) => (
            <MovieCard key={index} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;

import React, { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import NavBar from "../components/NavBar";
import { useMovieContext } from "../context/MovieContext";
import { fetchMovies } from "../services/movieService";

const Home: React.FC = () => {
  const { state, dispatch } = useMovieContext();
  const { filteredMovies, loading, error } = state;

  const [searchTerm, setSearchTerm] = useState(""); // State for tracking the search term

  // Load movies on initial mount
  useEffect(() => {
    const loadMovies = async () => {
      try {
        const newMovies = await fetchMovies(1);
        dispatch({ type: "SET_MOVIES", payload: newMovies });
      } catch {
        dispatch({ type: "SET_ERROR", payload: "Failed to load movies 🥲." });
      }
    };

    loadMovies();
  }, [dispatch]);

  return (
    <div className="min-h-screen">
      {/* Pass searchTerm and setSearchTerm to NavBar */}
      <NavBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className="p-4">
        {loading && <p>Loading movies...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && filteredMovies.length === 0 && (
          <p>No results found 😕. Try using different words </p>
        )}
        <div className="grid grid-cols-3 gap-4">
          {filteredMovies.map((movie, index) => (
            // Pass the searchTerm to MovieCard
            <MovieCard key={index} movie={movie} searchTerm={searchTerm} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;

import React, { useState, useEffect, useCallback } from "react";
import MovieCard from "../components/MovieCard";
import SearchBar from "../components/SearchBar";
import NavBar from "../components/NavBar";
import { Movie } from "../types/Movie";
import { fetchMovies } from "../services/movieService";

const Home: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchVisible, setSearchVisible] = useState(false); // State to track search visibility

  const loadMovies = async (page: number) => {
    try {
      const newMovies = await fetchMovies(page);
      if (newMovies.length === 0) {
        setHasMore(false);
        setError("No data available.");
      } else {
        setMovies((prev) => [...prev, ...newMovies]);
        setFilteredMovies((prev) => [...prev, ...newMovies]);
        setPage((prev) => prev + 1);
      }
    } catch (err) {
      setError("Failed to load movies.");
    } finally {
      setLoading(false);
    }
  };

  const loadMoreMovies = useCallback(async () => {
    if (hasMore) {
      await loadMovies(page);
    }
  }, [page, hasMore]);

  useEffect(() => {
    loadMovies(1);
  }, []);

  // Toggle the search bar visibility
  const toggleSearchBar = () => {
    setSearchVisible((prev) => !prev); // Toggle between true and false
  };

  // Handle search functionality
  const handleSearch = (query: string) => {
    const filtered = movies.filter((movie) =>
      movie.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredMovies(filtered);
  };

  return (
    <div className=" min-h-screen">
      {/* NavBar with search toggle */}
      <div className="sticky-navbar">
        <NavBar onSearch={toggleSearchBar} searchVisible={searchVisible} />
        {searchVisible && <SearchBar onSearch={handleSearch} />}
      </div>

      <div className="p-4">
        {loading && <p>Loading movies...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {filteredMovies.length === 0 && !loading && !error && (
          <p>No movies available.</p>
        )}
        <div className="grid grid-cols-3 gap-4">
          {filteredMovies.map((movie, index) => (
            <MovieCard key={`${movie.name + index}`} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;

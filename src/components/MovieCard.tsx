import React from "react";
import { Movie } from "../types/Movie";

type MovieCardProps = {
  movie: Movie;
  searchTerm?: string;
};

const highlightMatch = (text: string, searchTerm: string) => {
  console.log("search", searchTerm);

  if (!searchTerm) return text;
  const parts = text.split(new RegExp(`(${searchTerm})`, "gi"));
  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === searchTerm.toLowerCase() ? (
          <mark key={i} className="bg-yellow-300">
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </>
  );
};

const MovieCard: React.FC<MovieCardProps> = ({ movie, searchTerm = "" }) => {
  return (
    <div className="w-full p-1">
      <div className="relative w-full pb-[150%]">
        <img
          className="absolute inset-0 w-full h-full object-cover"
          src={
            movie.posterUrl ||
            "../../public/assets/images/placeholder_for_missing_posters.png"
          }
          alt={movie.name || "Movie name"}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src =
              "../../public/assets/images/placeholder_for_missing_posters.png";
          }}
        />
      </div>
      <p className="text-start text-white mt-2 text-[14px] sm:text-base truncate">
        {highlightMatch(movie.name, searchTerm)}
      </p>
    </div>
  );
};

export default MovieCard;

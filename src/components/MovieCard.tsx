import React from "react";
import { MovieType } from "../types/Movie";
import fallbackImage from "/assets/images/placeholder_for_missing_posters.png";

type MovieCardProps = {
  movie: MovieType;
  searchTerm?: string;
};

// This function is for highlight the text pf matching movie with search result
const highlightMatch = (text: string, searchTerm: string) => {
  if (!searchTerm) return text;

  const regex = new RegExp(`(${searchTerm})`, "gi");
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, index) =>
        part.toLowerCase() === searchTerm.toLowerCase() ? (
          <mark key={index} className="bg-yellow-300">
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </>
  );
};

// MovieCard component
const MovieCard: React.FC<MovieCardProps> = ({ movie, searchTerm = "" }) => {
  return (
    <div className="w-full p-1 mb-2">
      <div className="relative w-full pb-[150%]">
        <img
          className="absolute inset-0 w-full h-full object-cover rounded"
          src={movie?.posterUrl || ""}
          alt={movie?.name || "Romantic comedy Movie"}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = fallbackImage;
          }}
        />
      </div>
      <p className="text-start text-white mt-2 text-[14px] sm:text-xl truncate">
        {highlightMatch(movie.name, searchTerm)}
      </p>
    </div>
  );
};

export default MovieCard;

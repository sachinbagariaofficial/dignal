import React from "react";
import { Movie } from "../types/Movie";
import fallbackImage from "../../public/assets/images/placeholder_for_missing_posters.png";

type MovieCardProps = {
  movie: Movie;
  searchTerm?: string;
};

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

const MovieCard: React.FC<MovieCardProps> = ({ movie, searchTerm = "" }) => {
  return (
    <div className="w-full p-1">
      <div className="relative w-full pb-[150%]">
        <img
          className="absolute inset-0 w-full h-full object-cover rounded"
          src={movie?.posterUrl}
          alt={movie?.name || "Movie name"}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = fallbackImage;
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

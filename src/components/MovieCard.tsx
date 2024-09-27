import React from "react";
import { Movie } from "../types/Movie";

type MovieCardProps = {
  movie: Movie;
};

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <div className="w-full p-1">
      <div className="relative w-full pb-[150%]">
        <img
          className="absolute inset-0 w-full h-full object-cover"
          src={movie.posterUrl}
          alt={movie.name}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src =
              "/assets/images/placeholder_for_missing_posters.png";
          }}
        />
      </div>
      <p className="text-start text-white mt-2 text-[14px] sm:text-base">
        {movie.name}
      </p>
    </div>
  );
};

export default MovieCard;

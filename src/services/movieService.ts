import axios from "axios";
import { APIResponseMovieType } from "../types/Movie";
import { API_BASE_URL } from "../constants/api";

// This is fetching function for movies
export const fetchMovies = async (page: number) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/data/page${page}.json`);

    // Adding posterUrl to each movie with there assigned url
    const moviesList = response.data?.page["content-items"]?.content?.map(
      (movie: APIResponseMovieType) => ({
        name: movie.name,
        posterUrl: `${API_BASE_URL}/images/${movie["poster-image"]}`,
      })
    );
    if (!moviesList?.length) {
      throw new Error("No movies data")
    }
    console.log("movies", moviesList);

    return moviesList;
  } catch (error) {
    // If we get 403 status code when we call the api
    if (axios.isAxiosError(error) && error.response?.status === 403) {
      console.log("No more data to load");
      return [];
    } else {
      console.error("Error fetching movies:", error);
      throw error;
    }
  }
};

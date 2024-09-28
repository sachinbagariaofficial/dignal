import axios from "axios";

// Example Base URL
const API_BASE_URL = "https://test.create.diagnal.com";

// Fetch movies function with pagination
export const fetchMovies = async (page: number) => {
  try {
    // Fetch the movie data from the API
    const response = await axios.get(`${API_BASE_URL}/data/page${page}.json`);

    console.log("response", response);

    // Extracting the content items from the response
    const movies = response.data.page["content-items"].content.map(
      (movie: any) => ({
        name: movie.name,
        posterUrl: `${API_BASE_URL}/images/${movie["poster-image"]}`, // Construct full image URL
      })
    );

    console.log("movies", movies);

    return movies; // Return the array of movies
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
};

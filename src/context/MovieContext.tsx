import { createContext, useContext, useReducer } from "react";
import { Movie } from "../types/Movie"; // Assuming you have a Movie type

// Define the type for the context state
type MovieState = {
  movies: Movie[];
  filteredMovies: Movie[];
  loading: boolean;
  error: string | null; // Allow both null and string for error
  hasMore: boolean;
  page: number;
};

// Define the actions
type Action =
  | { type: "SET_MOVIES"; payload: Movie[] }
  | { type: "SET_FILTERED_MOVIES"; payload: string } // Search term is a string
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null } // Allow setting error to null
  | { type: "SET_PAGE"; payload: number }
  | { type: "SET_HAS_MORE"; payload: boolean }; // <-- Add this action to handle `hasMore`

// Initial state
const initialState: MovieState = {
  movies: [], // Set movies as an empty array, not never[]
  filteredMovies: [], // Same for filteredMovies
  loading: true,
  error: null, // Initialize error as null
  hasMore: true,
  page: 1,
};

// Create context
const MovieContext = createContext<{
  state: MovieState;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => undefined,
});

// Reducer function
const movieReducer = (state: MovieState, action: Action): MovieState => {
  switch (action.type) {
    case "SET_MOVIES":
      return {
        ...state,
        movies: [...state.movies, ...action.payload], // Append new movies to the list
        filteredMovies: [...state.movies, ...action.payload], // Same for filtered movies initially
        loading: false,
        hasMore: action.payload.length > 0, // Check if more movies are loaded
      };

    case "SET_FILTERED_MOVIES": {
      const searchTerm = action.payload.toLowerCase(); // Payload is a string
      const filtered = state.movies.filter((movie) =>
        movie.name.toLowerCase().includes(searchTerm)
      );
      return {
        ...state,
        filteredMovies: filtered,
      };
    }

    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };

    case "SET_ERROR":
      return {
        ...state,
        error: action.payload, // Error can be a string or null
        loading: false,
      };

    case "SET_PAGE":
      return {
        ...state,
        page: action.payload,
      };

    case "SET_HAS_MORE": // <-- Add the new case for setting `hasMore`
      return {
        ...state,
        hasMore: action.payload,
      };

    default:
      return state;
  }
};

// MovieProvider component
export const MovieProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(movieReducer, initialState);

  return (
    <MovieContext.Provider value={{ state, dispatch }}>
      {children}
    </MovieContext.Provider>
  );
};

// Custom hook to use the context
export const useMovieContext = () => useContext(MovieContext);

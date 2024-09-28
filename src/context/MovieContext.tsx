import React, { createContext, useReducer, useContext, ReactNode } from "react";
import { Movie } from "../types/Movie"; // Assuming you have a Movie type

// Define the type for the context state
type MovieState = {
  movies: Movie[];
  filteredMovies: Movie[];
  loading: boolean;
  error: string | null;
  hasMore: boolean; // Add hasMore here
  page: number; // Assuming you are tracking the current page
};

// Define the actions
type Action =
  | { type: "SET_MOVIES"; payload: Movie[]; hasMore?: boolean }
  | { type: "SET_FILTERED_MOVIES"; payload: Movie[] }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "SET_PAGE"; payload: number }; // Action for setting the page

// Initial state
const initialState: MovieState = {
  movies: [],
  filteredMovies: [],
  loading: true,
  error: null,
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
        movies: [...state.movies, ...action.payload],
        filteredMovies: [...state.filteredMovies, ...action.payload],
        loading: false,
        hasMore: action.hasMore !== undefined ? action.hasMore : true, // Update hasMore based on action
      };
    case "SET_FILTERED_MOVIES":
      return {
        ...state,
        filteredMovies: action.payload,
      };
    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };
    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case "SET_PAGE":
      return {
        ...state,
        page: action.payload,
      };
    default:
      return state;
  }
};

// MovieProvider component
export const MovieProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(movieReducer, initialState);

  return (
    <MovieContext.Provider value={{ state, dispatch }}>
      {children}
    </MovieContext.Provider>
  );
};

// Custom hook to use the context
export const useMovieContext = () => useContext(MovieContext);

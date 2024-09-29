import { createContext, useContext, useReducer } from "react";
import { MovieType } from "../types/Movie"; // Assuming you have a Movie type

type MovieState = {
  movies: MovieType[];
  filteredMovies: MovieType[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  page: number;
};

type Action =
  | { type: "SET_MOVIES"; payload: MovieType[] }
  | { type: "SET_FILTERED_MOVIES"; payload: string }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "SET_PAGE"; payload: number }
  | { type: "SET_HAS_MORE"; payload: boolean };

// Initial state for movie list
const initialState: MovieState = {
  movies: [],
  filteredMovies: [],
  loading: true,
  error: null,
  hasMore: true,
  page: 1,
};

// Create a context for movie list
const MovieContext = createContext<{
  state: MovieState;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => undefined,
});

// Reducer for movie store
const movieReducer = (state: MovieState, action: Action): MovieState => {
  switch (action.type) {
    case "SET_MOVIES": //This case is for storing the movies
      return {
        ...state,
        movies: [...state.movies, ...action.payload],
        filteredMovies: [...state.movies, ...action.payload],
        loading: false,
        hasMore: action.payload.length > 0,
      };

    case "SET_FILTERED_MOVIES": { //This case is for storing the  filter movies
      const searchTerm = action.payload.toLowerCase();
      const filtered = state.movies.filter((movie) =>
        movie.name.toLowerCase().includes(searchTerm)
      );
      return {
        ...state,
        filteredMovies: filtered,
      };
    }

    case "SET_LOADING": //This case is for loading the movies
      return {
        ...state,
        loading: action.payload,
      };

    case "SET_ERROR": //This case is for errors that occurs while loading the movie api
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case "SET_PAGE": //This case is for storing the pages
      return {
        ...state,
        page: action.payload,
      };

    case "SET_HAS_MORE": //This case is for checking that there is more api to call or not
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

export const useMovieContext = () => useContext(MovieContext);

import Home from "./pages/Home";
import "./App.css";
import { MovieProvider } from "./context/MovieContext";
function App() {
  return (
    <>
      <MovieProvider>
        <Home />
      </MovieProvider>
    </>
  );
}

export default App;

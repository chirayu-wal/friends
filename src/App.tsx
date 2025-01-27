import { Route, Routes } from "react-router-dom";
import Home from "@/pages";
import Profile from "./pages/profile";
import ProtectedRoute from "./components/common/protectedRoute";
import Search from "./pages/search";
import History from "./pages/history";
import Watchlist from "./pages/watchlist";
import Layover from "./components/search/layover";
import PlayerPage from "./pages/player";
import TypeLanding from "./pages/typeLanding";

function App() {
  return (
    <>
      <Layover />
      <Routes>
        {/* profile routes */}
        <Route element={<Profile />} path="/select-profile" />
        <Route
          element={
            <ProtectedRoute>
              <PlayerPage />
            </ProtectedRoute>
          }
          path="/details/:type/:id"
        />
        {/* landing page */}
        <Route
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
          path="/"
        />
        {/* search page */}
        <Route
          element={
            <ProtectedRoute>
              <Search />
            </ProtectedRoute>
          }
          path="/search"
        />
        {/* movie/tv explore page  */}
        <Route
          element={
            <ProtectedRoute>
              <TypeLanding />
            </ProtectedRoute>
          }
          path="/:type"
        />
        {/* history and watchlist pages */}
        <Route
          element={
            <ProtectedRoute>
              <History />
            </ProtectedRoute>
          }
          path="/history"
        />
        {/* Watchlist */}
        <Route
          element={
            <ProtectedRoute>
              <Watchlist />
            </ProtectedRoute>
          }
          path="/watchlist"
        />
      </Routes>
    </>
  );
}

export default App;

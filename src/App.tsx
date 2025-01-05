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

        <Route
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
          path="/"
        />
        <Route
          element={
            <ProtectedRoute>
              <Search />
            </ProtectedRoute>
          }
          path="/search"
        />
        <Route
          element={
            <ProtectedRoute>
              <TypeLanding />
            </ProtectedRoute>
          }
          path="/:type"
        />

        <Route
          element={
            <ProtectedRoute>
              <History />
            </ProtectedRoute>
          }
          path="/history"
        />
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

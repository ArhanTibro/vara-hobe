import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { useEffect, useState } from "react";
import LoginPage from "./Pages/login";
import SignupPage from "./Pages/signupPage";
import Home from "./Pages/Home";
import Search from "./Pages/Search";
import AddList from "./Pages/AddList";
import Profile from "./Pages/Profile";
import ChatPage from "./Pages/ChatPage";
import Navbar from "./Components/Navbar";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); //  Start as logged out
  const location = useLocation();

  //  Check localStorage only after the component mounts
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsLoggedIn(!!token); // Set state after checking storage
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setIsLoggedIn(false);
  };

  return (
    <>
      {/* Show Navbar only if NOT on login or signup page */}
      {location.pathname !== "/login" && location.pathname !== "/signUp" && (
        <div className="fixed top-0 left-0 w-full z-50 shadow-md bg-[#3F4651]">
          <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        </div>
      )}

      {/* Page Content - Ensures content is visible below navbar */}
      <div
        className={
          location.pathname !== "/login" && location.pathname !== "/signUp"
            ? "mt-16"
            : ""
        }
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route
            path="/addList"
            element={isLoggedIn ? <AddList /> : <Navigate to="/login" />}
          />
          <Route
            path="/chatPage"
            element={isLoggedIn ? <ChatPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/profile"
            element={isLoggedIn ? <Profile /> : <Navigate to="/login" />}
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signUp" element={<SignupPage />} />
        </Routes>
      </div>
    </>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;

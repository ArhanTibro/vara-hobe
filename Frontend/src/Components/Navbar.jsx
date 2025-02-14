import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpg";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    setIsLoggedIn(!!localStorage.getItem("accessToken"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setIsLoggedIn(false);
    navigate("/login"); // Redirect to login
  };

  return (
    <div className="bg-[#3F4651] p-4">
      <nav className="flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-4">
          <img src={logo} alt="Logo" className="h-10 w-10 object-contain" />
          <span className="text-[#C0BCB5] text-lg font-bold">Vara-Hobe</span>
        </div>

        {/* Hamburger Menu for Mobile */}
        <button
          className="sm:hidden text-[#C0BCB5] text-2xl focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          &#9776;
        </button>

        {/* Desktop Navigation Links */}
        <ul className="hidden sm:flex space-x-6 text-[#C0BCB5] font-bold text-lg">
          <li>
            <Link to="/" className="hover:text-white">
              Home
            </Link>
          </li>
          <li>
            <Link to="/search" className="hover:text-white">
              Search
            </Link>
          </li>
          <li>
            <Link
              to={isLoggedIn ? "/addList" : "/login"}
              className="hover:text-white"
            >
              Add List
            </Link>
          </li>
          <li>
            <Link
              to={isLoggedIn ? "/chatPage" : "/login"}
              className="hover:text-white"
            >
              Messenger
            </Link>
          </li>
          <li>
            <Link
              to={isLoggedIn ? "/profile" : "/login"}
              className="hover:text-white"
            >
              Profile
            </Link>
          </li>
        </ul>

        {/* Login / Logout Buttons */}
        <div className="hidden sm:flex space-x-4">
          {isLoggedIn ? (
            <button
              className="bg-[#C0BCB5] text-[#3F4651] px-4 py-2 rounded hover:bg-white"
              onClick={handleLogout}
            >
              Logout
            </button>
          ) : (
            <>
              <Link to="/login">
                <button className="bg-[#C0BCB5] text-[#3F4651] px-4 py-2 rounded hover:bg-white">
                  Login
                </button>
              </Link>
              <Link to="/signUp">
                <button className="bg-[#EBECED] text-[#3F4651] px-4 py-2 rounded hover:bg-white">
                  Sign Up
                </button>
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="sm:hidden mt-4">
          <ul className="space-y-4 text-[#C0BCB5] font-bold text-lg">
            <li>
              <Link
                to="/"
                className="block hover:text-white"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/search"
                className="block hover:text-white"
                onClick={() => setIsOpen(false)}
              >
                Search
              </Link>
            </li>
            <li>
              <Link
                to={isLoggedIn ? "/addList" : "/login"}
                className="block hover:text-white"
                onClick={() => setIsOpen(false)}
              >
                Add List
              </Link>
            </li>
            <li>
              <Link
                to={isLoggedIn ? "/chatPage" : "/login"}
                className="block hover:text-white"
                onClick={() => setIsOpen(false)}
              >
                Messenger
              </Link>
            </li>
            <li>
              <Link
                to={isLoggedIn ? "/profile" : "/login"}
                className="block hover:text-white"
                onClick={() => setIsOpen(false)}
              >
                Profile
              </Link>
            </li>
            {isLoggedIn ? (
              <li>
                <button
                  className="bg-[#C0BCB5] text-[#3F4651] px-4 py-2 rounded hover:bg-white w-full"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            ) : (
              <>
                <li>
                  <Link to="/login">
                    <button
                      className="bg-[#C0BCB5] text-[#3F4651] px-4 py-2 rounded hover:bg-white w-full"
                      onClick={() => setIsOpen(false)}
                    >
                      Login
                    </button>
                  </Link>
                </li>
                <li>
                  <Link to="/signUp">
                    <button
                      className="bg-[#EBECED] text-[#3F4651] px-4 py-2 rounded hover:bg-white w-full"
                      onClick={() => setIsOpen(false)}
                    >
                      Sign Up
                    </button>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;

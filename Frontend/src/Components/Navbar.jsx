import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.jpg";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // State to toggle the mobile menu

  return (
    <div className="bg-[#3F4651] p-4">
      <nav className="flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center space-x-4">
          <img
            src={logo}
            alt="Logo"
            className="h-10 w-10 object-contain" // Adjust as needed
          />
          <span className="text-[#C0BCB5] text-lg font-bold">Vara-Hobe</span>
        </div>

        {/* Hamburger Icon (Visible only on small screens) */}
        <button
          className="sm:hidden text-[#C0BCB5] text-2xl focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          &#9776; {/* Hamburger Icon */}
        </button>

        {/* Navigation Links (Desktop) */}
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
            <Link to="/addList" className="hover:text-white">
              Add List
            </Link>
          </li>
          <li>
            <Link to="/chatPage" className="hover:text-white">
              Messenger
            </Link>
          </li>
          <li>
            <Link to="/profile" className="hover:text-white">
              Profile
            </Link>
          </li>
        </ul>

        {/* Buttons Section (Desktop) */}
        <div className="hidden sm:flex space-x-4">
          <Link to="/login">
            <button className="bg-[#C0BCB5] text-[#3F4651] px-4 py-2 rounded-full hover:bg-white transition duration-300">
              Login
            </button>
          </Link>
          <Link to="/signUp">
            <button className="bg-[#EBECED] text-[#3F4651] px-4 py-2 rounded-full hover:bg-white">
              Sign Up
            </button>
          </Link>
        </div>
      </nav>

      {/* Mobile Menu (Toggled with State) */}
      {isOpen && (
        <div className="sm:hidden mt-4">
          <ul className="space-y-4 text-[#C0BCB5] font-bold text-lg">
            <li>
              <Link
                to="/"
                className="block hover:text-white"
                onClick={() => setIsOpen(false)} // Close menu on click
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/search"
                className="block hover:text-white"
                onClick={() => setIsOpen(false)} // Close menu on click
              >
                Search
              </Link>
            </li>
            <li>
              <Link
                to="/addList"
                className="block hover:text-white"
                onClick={() => setIsOpen(false)} // Close menu on click
              >
                Add List
              </Link>
            </li>
            <li>
              <Link
                to="/profile"
                className="block hover:text-white"
                onClick={() => setIsOpen(false)} // Close menu on click
              >
                Profile
              </Link>
            </li>
            <li>
              <Link to="/login">
                <button
                  className="bg-[#C0BCB5] text-[#3F4651] px-4 py-2 rounded hover:bg-white w-full"
                  onClick={() => setIsOpen(false)} // Close menu on click
                >
                  Login
                </button>
              </Link>
            </li>
            <li>
              <Link to="/signUp">
                <button
                  className="bg-[#EBECED] text-[#3F4651] px-4 py-2 rounded hover:bg-white w-full"
                  onClick={() => setIsOpen(false)} // Close menu on click
                >
                  Sign Up
                </button>
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;

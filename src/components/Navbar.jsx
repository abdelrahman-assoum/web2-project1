import { Link } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="text-white text-xl font-bold">
          HealthTrack
        </Link>
        <div className="hidden md:flex space-x-4 md:items-center">
          <Link to="/" className="text-white hover:text-gray-200">
            Home
          </Link>
          <Link to="/about" className="text-white hover:text-gray-200">
            About
          </Link>
          <Link to="/features" className="text-white hover:text-gray-200">
            Features
          </Link>
          <Link to="/contact" className="text-white hover:text-gray-200">
            Contact
          </Link>
          <Link
            to="/daily-log"
            className="bg-white text-blue-600 px-4 font-semibold py-2 rounded hover:bg-gray-100"
          >
            Go to Dashboard
          </Link>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
      {isOpen && (
        <div className="md:hidden mt-4 space-y-2">
          <Link
            to="/"
            className="block text-white hover:text-gray-200"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/about"
            className="block text-white hover:text-gray-200"
            onClick={() => setIsOpen(false)}
          >
            About
          </Link>
          <Link
            to="/features"
            className="block text-white hover:text-gray-200"
            onClick={() => setIsOpen(false)}
          >
            Features
          </Link>
          <Link
            to="/contact"
            className="block text-white hover:text-gray-200"
            onClick={() => setIsOpen(false)}
          >
            Contact
          </Link>
          <Link
            to="/daily-log"
            className="block bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-100"
            onClick={() => setIsOpen(false)}
          >
            Go to Dashboard
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;

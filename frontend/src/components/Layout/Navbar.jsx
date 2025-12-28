import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const Navbar = () => {
  const today = new Date().toISOString().split("T")[0];
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHomePage = location.pathname === "/";

  const navClasses =
    isHomePage && !isScrolled
      ? "bg-transparent text-white"
      : "bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-lg";

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navClasses}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex justify-between items-center">
          <Link
            to="/"
            className="flex items-center space-x-2 group"
            onClick={closeMenu}
          >
            <span className="text-3xl">💪</span>
            <span className="text-2xl font-bold tracking-tight group-hover:text-yellow-300 transition-colors duration-300">
              HealthTrack
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-2">
            <Link
              to="/"
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                isActive("/") && location.pathname === "/"
                  ? "bg-white/20 text-white"
                  : "hover:bg-white/10"
              }`}
            >
              Home
            </Link>
            <Link
              to="/about"
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                isActive("/about")
                  ? "bg-white/20 text-white"
                  : "hover:bg-white/10"
              }`}
            >
              About
            </Link>
            <Link
              to="/features"
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                isActive("/features")
                  ? "bg-white/20 text-white"
                  : "hover:bg-white/10"
              }`}
            >
              Features
            </Link>
            <Link
              to="/contact"
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                isActive("/contact")
                  ? "bg-white/20 text-white"
                  : "hover:bg-white/10"
              }`}
            >
              Contact
            </Link>
            <Link
              to={`/day/${today}`}
              className="ml-2 bg-white text-indigo-600 px-5 py-2 rounded-full font-semibold hover:bg-yellow-300 hover:text-indigo-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              📅 Daily Log
            </Link>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors duration-300"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-2">
            <Link
              to="/"
              onClick={closeMenu}
              className={`block px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                isActive("/") && location.pathname === "/"
                  ? "bg-white/20 text-white"
                  : "hover:bg-white/10"
              }`}
            >
              Home
            </Link>
            <Link
              to="/about"
              onClick={closeMenu}
              className={`block px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                isActive("/about")
                  ? "bg-white/20 text-white"
                  : "hover:bg-white/10"
              }`}
            >
              About
            </Link>
            <Link
              to="/features"
              onClick={closeMenu}
              className={`block px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                isActive("/features")
                  ? "bg-white/20 text-white"
                  : "hover:bg-white/10"
              }`}
            >
              Features
            </Link>
            <Link
              to="/contact"
              onClick={closeMenu}
              className={`block px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                isActive("/contact")
                  ? "bg-white/20 text-white"
                  : "hover:bg-white/10"
              }`}
            >
              Contact
            </Link>
            <Link
              to={`/day/${today}`}
              onClick={closeMenu}
              className="block bg-white text-indigo-600 px-4 py-3 rounded-lg font-semibold hover:bg-yellow-300 hover:text-indigo-700 shadow-lg text-center transition-all duration-300"
            >
              📅 Daily Log
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

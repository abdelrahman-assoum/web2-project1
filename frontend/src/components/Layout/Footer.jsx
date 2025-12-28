const Footer = () => {
  return (
    <footer className="bg-linear-to-r from-gray-800 via-gray-900 to-gray-800 text-white py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <span className="text-3xl">💪</span>
              <h3 className="text-xl font-bold">HealthTrack</h3>
            </div>
            <p className="text-gray-400 text-sm">
              Your personal wellness tracking companion. Build healthier habits,
              one day at a time.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-lg">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a
                  href="/"
                  className="hover:text-white transition-colors duration-300"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="hover:text-white transition-colors duration-300"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="/features"
                  className="hover:text-white transition-colors duration-300"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="hover:text-white transition-colors duration-300"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-lg">Stay Healthy</h4>
            <p className="text-sm text-gray-400 mb-3">
              Track your activities, meals, and workouts to achieve your
              wellness goals.
            </p>
            <div className="flex space-x-3 text-2xl">
              <span>🏃</span>
              <span>🥗</span>
              <span>💪</span>
              <span>😊</span>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-6 text-center">
          <p className="text-gray-400 text-sm">
            &copy; 2025 HealthTrack - Fitness and Wellness System. Built with ❤️
            for better health.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

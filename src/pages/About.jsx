const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 pt-20">
      <div className="max-w-5xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            About HealthTrack
          </h1>
          <p className="text-xl text-gray-600">
            Your journey to better wellness starts here
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-12 mb-12">
          <div className="flex items-center mb-6">
            <div className="text-4xl mr-4">🎯</div>
            <h2 className="text-3xl font-bold text-gray-800">Our Mission</h2>
          </div>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            HealthTrack is a personal wellness tracking website designed to help
            you monitor your daily activities, meals, and exercise routines. By
            logging this information, you can gain insights into your lifestyle
            and make informed decisions to improve your health and wellness.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            We believe that small, consistent actions lead to significant health
            improvements. Our platform makes it easy to track your progress and
            stay motivated on your wellness journey.
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-12">
          <div className="flex items-center mb-8">
            <div className="text-4xl mr-4">⚙️</div>
            <h2 className="text-3xl font-bold text-gray-800">How It Works</h2>
          </div>
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-xl mr-6">
                1
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Choose Your Date
                </h3>
                <p className="text-gray-600">
                  Select any date to start logging your wellness data for that
                  day.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xl mr-6">
                2
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Log Your Data
                </h3>
                <p className="text-gray-600">
                  Record your activities, meals, and workouts with detailed
                  information.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center text-white font-bold text-xl mr-6">
                3
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Track Your Progress
                </h3>
                <p className="text-gray-600">
                  View summaries and your wellness score to monitor your health
                  journey.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

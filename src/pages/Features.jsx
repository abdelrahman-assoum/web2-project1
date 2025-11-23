const Features = () => {
  const features = [
    {
      title: "Daily Activity Logging",
      description:
        "Log various activities throughout your day, categorized by type and duration.",
      icon: "📝",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      title: "Meal Tracking",
      description:
        "Record your meals with types, descriptions, and calorie information.",
      icon: "🍎",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      title: "Exercise/Workout Logging",
      description:
        "Track your workouts with type, duration, and intensity levels.",
      icon: "🏋️",
      gradient: "from-orange-500 to-red-500",
    },
    {
      title: "Daily Summary & Wellness Score",
      description:
        "Get a summary of your day and a calculated wellness score based on your logs.",
      icon: "📊",
      gradient: "from-purple-500 to-pink-500",
    },
  ];

  const additionalFeatures = [
    {
      title: "Date Navigation",
      description:
        "Easily switch between different dates to view or log historical data.",
      icon: "📅",
    },
    {
      title: "Real-time Updates",
      description:
        "See your wellness score and statistics update instantly as you log data.",
      icon: "⚡",
    },
    {
      title: "Local Storage",
      description:
        "Your data is stored locally in your browser for privacy and quick access.",
      icon: "💾",
    },
    {
      title: "Responsive Design",
      description:
        "Access your wellness data seamlessly on any device - desktop, tablet, or mobile.",
      icon: "📱",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
            Powerful Features
          </h1>
          <p className="text-xl text-gray-600">
            Everything you need to track your wellness journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 text-center border border-gray-100"
            >
              <div
                className={`inline-block bg-gradient-to-r ${feature.gradient} p-4 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300`}
              >
                <div className="text-4xl">{feature.icon}</div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-12">
          <h2 className="text-3xl font-bold mb-10 text-center text-gray-800">
            More Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {additionalFeatures.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold mb-2 text-gray-800">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;

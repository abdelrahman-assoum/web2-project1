import { Link } from "react-router-dom";

const Home = () => {
  const today = new Date().toISOString().split("T")[0];
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50">
      <section className="relative min-h-[500px] h-[600px] md:h-[700px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/fitness-gear.jpg"
            alt="Fitness and wellness tracking gear"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-linear-to-br from-blue-900/60 via-indigo-900/50 to-purple-900/60"></div>
          <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent"></div>
        </div>

        <div className="relative z-10 h-full flex items-center pt-20 md:pt-0">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-16 text-center w-full">
            <div className="animate-fade-in">
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold mb-4 md:mb-6 text-white drop-shadow-2xl">
                HealthTrack
              </h1>
              <p className="text-xl sm:text-2xl md:text-3xl font-semibold text-blue-100 mb-3 md:mb-4 drop-shadow-lg px-4">
                Your Fitness & Wellness Companion
              </p>
              <p className="text-base sm:text-lg md:text-xl text-gray-200 mb-8 md:mb-10 max-w-3xl mx-auto drop-shadow-md px-4">
                Track your daily wellness by logging activities, meals, and
                workouts. Build healthier habits, one day at a time.
              </p>
              <Link
                to={`/day/${today}`}
                className="inline-block bg-white text-indigo-700 hover:bg-yellow-300 hover:text-indigo-800 px-8 py-4 md:px-10 md:py-5 rounded-full text-base md:text-lg font-bold shadow-2xl hover:shadow-yellow-300/50 transform hover:scale-110 transition-all duration-300"
              >
                🚀 Start Today's Log
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 md:mb-12 text-gray-800">
          What You Can Track
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <div className="group bg-white p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100">
            <div className="text-4xl md:text-5xl mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300">
              📝
            </div>
            <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-3 text-gray-800">
              Log Activities
            </h3>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              Keep track of your daily activities like work, study, leisure, and
              sleep with detailed time tracking.
            </p>
          </div>
          <div className="group bg-white p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100">
            <div className="text-4xl md:text-5xl mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300">
              🍎
            </div>
            <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-3 text-gray-800">
              Track Meals
            </h3>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              Log your meals with detailed descriptions and calorie counts to
              maintain a balanced diet.
            </p>
          </div>
          <div className="group bg-white p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100">
            <div className="text-4xl md:text-5xl mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300">
              🏋️
            </div>
            <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-3 text-gray-800">
              Monitor Workouts
            </h3>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              Record your exercise routines with duration and intensity to reach
              your fitness goals.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-12 md:pb-16">
        <div className="bg-linear-to-r from-blue-600 to-indigo-600 rounded-2xl md:rounded-3xl p-8 md:p-12 text-white shadow-2xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 md:mb-8">
            Why Choose HealthTrack?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">100%</div>
              <p className="text-sm md:text-base text-blue-100">
                Free & Private
              </p>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">Easy</div>
              <p className="text-sm md:text-base text-blue-100">
                Simple Interface
              </p>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">Smart</div>
              <p className="text-sm md:text-base text-blue-100">
                Wellness Scoring
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

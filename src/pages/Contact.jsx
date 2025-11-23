import { useState } from "react";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      alert("Please fill in all fields.");
      return;
    }
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 via-teal-50 to-blue-50 pt-20">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold mb-4 bg-linear-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Get In Touch
          </h1>
          <p className="text-xl text-gray-600">We'd love to hear from you!</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">
                Contact Information
              </h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="text-3xl mr-4">📧</div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="text-lg font-semibold text-gray-800">
                      contact@healthtrack.com
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="text-3xl mr-4">💬</div>
                  <div>
                    <p className="text-sm text-gray-500">Support</p>
                    <p className="text-lg font-semibold text-gray-800">
                      Available 24/7
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="text-3xl mr-4">🌍</div>
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="text-lg font-semibold text-gray-800">
                      Worldwide
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-linear-to-br from-green-500 to-blue-500 rounded-2xl shadow-xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Why Contact Us?</h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <span className="mr-2">✓</span>
                  <span>Get help with features</span>
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✓</span>
                  <span>Report issues or bugs</span>
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✓</span>
                  <span>Suggest improvements</span>
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✓</span>
                  <span>General inquiries</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            {submitted ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-6">✉️</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Message Sent!
                </h3>

                <button
                  onClick={() => setSubmitted(false)}
                  className="bg-linear-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">
                    Your Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">
                    Your Message
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows="5"
                    placeholder="Tell us what's on your mind..."
                    className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 resize-none"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-linear-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  Send Message 📨
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

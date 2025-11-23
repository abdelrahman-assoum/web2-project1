import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Layout/Navbar.jsx";
import Footer from "./components/Layout/Footer.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Features from "./pages/Features.jsx";
import Contact from "./pages/Contact.jsx";
import DailyLog from "./pages/DailyLog.jsx";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/features" element={<Features />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/day/:date" element={<DailyLog />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

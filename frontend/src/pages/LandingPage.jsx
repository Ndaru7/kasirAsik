import { Link } from "react-router";
import HeroSection from "./components/HeroSection";

const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <header className="w-full flex justify-between items-center px-8 py-6 shadow">
        <div className="text-2xl font-bold text-blue-700 flex items-center space-x-2">
          <div className="w-6 h-6 bg-blue-600 rounded rotate-45"></div>
          <span>KasirKita</span>
        </div>
        <Link
          to="/login"
          className="bg-gray-900 text-white px-5 py-2 rounded hover:bg-gray-700"
        >
          Get Started
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex flex-col-reverse md:flex-row justify-between items-center flex-1 px-8 py-16 max-w-7xl mx-auto gap-12">
      <HeroSection />

      </main>

      {/* Footer */}
      <footer className="bg-gray-100 py-6 text-center mt-auto">
        <p className="text-gray-600 font-medium">
          © {new Date().getFullYear()} KasirKita. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;

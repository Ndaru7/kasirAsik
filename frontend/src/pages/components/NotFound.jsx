import { useNavigate } from 'react-router';
import FuzzyText from './FuzzyText';

const NotFound = ({ hoverIntensity, enableHover }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen justify-center items-center bg-gray-50 px-4 text-center relative">
      {/* Konten Tengah */}
      <div>

        <FuzzyText
          baseIntensity={0.2}
          hoverIntensity={hoverIntensity}
          enableHover={enableHover}
        >
          404
        </FuzzyText>

        <p className="text-gray-600 mt-4 text-sm md:text-base">
          We can’t seem to find the page you are looking for!
        </p>

        <button
          onClick={() => navigate('/')}
          className="mt-6 px-5 py-2 border rounded-md text-sm text-gray-700 hover:bg-gray-100"
        >
          Back to Home Page
        </button>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-4 text-xs text-gray-400">
        © {new Date().getFullYear()} – TailAdmin
      </footer>
    </div>
  );
};

export default NotFound;

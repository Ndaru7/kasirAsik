import { useNavigate } from 'react-router';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen justify-center items-center bg-gray-50 px-4 text-center relative">
      {/* Konten Tengah */}
      <div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">ERROR</h1>

        <div className="text-6xl md:text-8xl font-bold text-blue-600 flex items-center justify-center gap-2">
          <span>4</span>
          <span className="text-[3rem] md:text-[5rem]">😞</span>
          <span>4</span>
        </div>

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

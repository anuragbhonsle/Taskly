import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="w-screen h-screen relative flex flex-col justify-center items-center">
      {/* Background GIF */}
      <div className="absolute w-full h-full overflow-hidden">
        <img
          src="https://i.pinimg.com/originals/fe/e9/55/fee955a4c443424dd55cf8239698291f.gif"
          alt="background"
          className="w-full h-full object-cover filter contrast-125 saturate-120 brightness-90"
        />
        {/* Overlay */}
        <div className="absolute w-full h-full bg-black/40"></div>
      </div>

      {/* GitHub link at top-right */}
      <a
        href="https://github.com/anuragbhonsle"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/50 hover:bg-black/70 transition"
        title="GitHub"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 text-white"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.2c-3.34.73-4.04-1.61-4.04-1.61-.55-1.38-1.34-1.75-1.34-1.75-1.1-.75.08-.74.08-.74 1.22.08 1.86 1.26 1.86 1.26 1.08 1.85 2.84 1.32 3.54 1.01.11-.79.42-1.32.76-1.63-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.51.12-3.15 0 0 1.01-.32 3.3 1.23a11.46 11.46 0 013-.4c1.02 0 2.04.14 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.64.24 2.85.12 3.15.77.84 1.24 1.91 1.24 3.22 0 4.61-2.8 5.62-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.21.7.82.58C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
        </svg>
      </a>

      {/* Content */}
      <div className="relative z-10 text-center px-6 space-y-6">
        <h1
          className="text-6xl font-extrabold text-white drop-shadow-lg"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          Taskly
        </h1>

        <p
          className="text-xl text-white/80 max-w-lg mx-auto drop-shadow-sm"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          Organize your projects, manage tasks, and stay productive
          effortlessly.
        </p>

        <div className="flex gap-6 justify-center mt-3">
          {/* Sign Up Button */}
          <button
            onClick={() => navigate("/signup")}
            className="px-8 py-3 bg-blue-800 text-white font-semibold rounded-full shadow-xl hover:bg-blue-600 hover:scale-105 transition-transform duration-200"
          >
            Sign Up
          </button>

          {/* Login Button */}
          <button
            onClick={() => navigate("/login")}
            className="px-8 py-3 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-blue-600 hover:scale-105 transition-all duration-200 shadow-lg"
          >
            Login
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-4 text-sm text-white/70 z-10 w-full text-center">
        &copy; {new Date().getFullYear()} Taskly. Built by{" "}
        <a
          href="https://x.com/Anuraaaag7"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:underline"
        >
          Anurag
        </a>
      </footer>
    </div>
  );
};

export default LandingPage;

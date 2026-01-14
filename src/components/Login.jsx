import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient.js";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) setErrorMsg(error.message);
    else navigate("/dashboard");

    setLoading(false);
  };

  return (
    <div className="w-screen h-screen relative flex items-center justify-center">
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

      {/* Login Card */}
      <div className="relative z-10 bg-black/70 p-8 rounded-2xl shadow-xl text-white w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>
        {errorMsg && <p className="text-red-400 mb-4">{errorMsg}</p>}
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-2 rounded-lg bg-white/10 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-700"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-4 py-2 rounded-lg bg-white/10 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-700"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="mt-4 px-6 py-3 bg-blue-800  rounded-full font-semibold shadow-lg hover:bg-blue-600 transition-all duration-200"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="mt-4 text-center text-white/70">
          Don't have an account?{" "}
          <span
            className="text-blue-600 cursor-pointer hover:underline"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;

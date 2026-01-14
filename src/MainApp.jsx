// src/MainApp.jsx
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LandingPage from "./components/LandingPage.jsx";
import Signup from "./components/Signup.jsx";
import Login from "./components/Login.jsx";
import Dashboard from "./App.jsx"; // <-- correct path
import { supabase } from "./supabaseClient.js";

export default function MainApp() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // check current session
    supabase.auth.getSession().then(({ data }) => setUser(data.session?.user));

    // listen to auth changes
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null);
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={user ? <Dashboard user={user} /> : <Navigate to="/" />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

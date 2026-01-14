import { useState, useEffect, useRef } from "react";
import { supabase } from "../supabaseClient";

export default function UserMenu() {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };
    fetchUser();

    // Listen to auth changes
    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user || null);
      }
    );
    return () => listener.subscription.unsubscribe();
  }, []);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = "/"; // redirect to landing/login
  };

  if (!user) return null;

  return (
    <div className="relative" ref={dropdownRef}>
      {/* User Icon Button */}
      <button
        onClick={() => setOpen(!open)}
        className="w-12 h-12 rounded-full bg-[#1e293b] flex items-center justify-center shadow-xl hover:scale-105 transform transition-all duration-200"
        title="User Menu"
      >
        <span className="text-white text-lg font-semibold">
          {user.email[0].toUpperCase()}
        </span>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl overflow-hidden z-50 animate-fadeIn">
          <div className="px-4 py-3 border-b border-gray-200 text-gray-800 font-medium truncate">
            {user.email}
          </div>
          <button
            onClick={handleSignOut}
            className="w-full text-left px-4 py-3 hover:bg-red-100 text-red-600 font-medium rounded-md transition-colors"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}

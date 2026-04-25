import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import API from "../api/labApi";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const from = location.state?.from || "/upload";
  const reportData = location.state?.reportData || null;

  const handleLogin = async (e) => {
    e.preventDefault();

    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail || !password.trim()) {
      alert("Please enter email and password.");
      return;
    }

    setLoading(true);

    try {
      const response = await API.post("/login", {
        email: cleanEmail,
        password,
      });

      console.log("LOGIN RESPONSE:", response.data);

      sessionStorage.setItem("lab2life_token", response.data.access_token);
      sessionStorage.setItem("lab2life_patient_name", response.data.full_name);

      console.log("TOKEN SAVED:", sessionStorage.getItem("lab2life_token"));
      console.log("NAME SAVED:", sessionStorage.getItem("lab2life_patient_name"));

      navigate(from, {
        state: reportData,
        replace: true,
      });
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      alert(error.response?.data?.detail || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center text-white"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1974&auto=format&fit=crop')",
      }}
    >
      <div className="min-h-screen bg-black/70 backdrop-blur-sm pt-32 px-4 md:px-10 pb-16 flex items-center justify-center">
        <div className="w-full max-w-md bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl backdrop-blur-xl">
          <h1 className="text-4xl font-bold text-center mb-4">Patient Login</h1>

          <p className="text-center text-gray-300 mb-8">
            Login to upload reports and ask doctors.
          </p>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block mb-2 text-sm font-medium">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                autoComplete="email"
                className="w-full bg-white/10 border border-white/30 rounded-xl p-3 text-white outline-none focus:border-orange-400"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                autoComplete="current-password"
                className="w-full bg-white/10 border border-white/30 rounded-xl p-3 text-white outline-none focus:border-orange-400"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 py-3 rounded-xl font-semibold text-lg hover:scale-[1.01] transition disabled:opacity-70"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            <div className="text-center text-gray-300">
              New user?{" "}
              <button
                type="button"
                onClick={() =>
                  navigate("/register", {
                    state: {
                      from,
                      reportData,
                    },
                  })
                }
                className="text-orange-400 hover:underline"
              >
                Register here
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
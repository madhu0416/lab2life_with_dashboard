import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/labApi";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    full_name: "",
    age: "",
    gender: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const nameRegex = /^[A-Za-z\s]{2,50}$/;
  const phoneRegex = /^[0-9]{10}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      const digitsOnly = value.replace(/\D/g, "").slice(0, 10);
      setFormData((prev) => ({
        ...prev,
        phone: digitsOnly,
      }));
      return;
    }

    if (name === "age") {
      const digitsOnly = value.replace(/\D/g, "");
      setFormData((prev) => ({
        ...prev,
        age: digitsOnly,
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!nameRegex.test(formData.full_name.trim())) {
      alert("Full name should contain only letters and spaces (2 to 50 characters).");
      return false;
    }

    const age = Number(formData.age);
    if (!age || age < 1 || age > 120) {
      alert("Please enter a valid age between 1 and 120.");
      return false;
    }

    if (!["Male", "Female", "Other"].includes(formData.gender)) {
      alert("Please select a valid gender.");
      return false;
    }

    if (!phoneRegex.test(formData.phone)) {
      alert("Phone number must be exactly 10 digits.");
      return false;
    }

    if (!emailRegex.test(formData.email.trim())) {
      alert("Please enter a valid email address.");
      return false;
    }

    if (formData.password.length < 8) {
      alert("Password must be at least 8 characters long.");
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Password and Confirm Password do not match.");
      return false;
    }

    return true;
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      await API.post("/register", {
        full_name: formData.full_name.trim(),
        age: Number(formData.age),
        gender: formData.gender,
        phone: formData.phone,
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
      });

      alert("Registration successful. Please login.");
      navigate("/login");
    } catch (error) {
      console.error("Register error:", error);
      alert(error.response?.data?.detail || "Registration failed.");
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
        <div className="w-full max-w-2xl bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl backdrop-blur-xl">
          <h1 className="text-4xl font-bold text-center mb-4">
            Patient Registration
          </h1>

          <p className="text-center text-gray-300 mb-8">
            Create your account to upload reports and ask doctors.
          </p>

          <form onSubmit={handleRegister} className="grid md:grid-cols-2 gap-5">
            <div className="md:col-span-2">
              <label className="block mb-2 text-sm font-medium">Full Name</label>
              <input
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                placeholder="Enter full name"
                required
                autoComplete="name"
                className="w-full bg-white/10 border border-white/30 rounded-xl p-3 text-white outline-none focus:border-orange-400"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">Age</label>
              <input
                type="text"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="Enter age"
                required
                inputMode="numeric"
                className="w-full bg-white/10 border border-white/30 rounded-xl p-3 text-white outline-none focus:border-orange-400"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
                className="w-full bg-[#1c1f27] border border-white/30 rounded-xl p-3 text-white outline-none focus:border-orange-400"
              >
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">Phone Number</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="10-digit mobile number"
                required
                inputMode="numeric"
                maxLength={10}
                autoComplete="tel"
                className="w-full bg-white/10 border border-white/30 rounded-xl p-3 text-white outline-none focus:border-orange-400"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email"
                required
                autoComplete="email"
                className="w-full bg-white/10 border border-white/30 rounded-xl p-3 text-white outline-none focus:border-orange-400"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="At least 8 characters"
                required
                autoComplete="new-password"
                className="w-full bg-white/10 border border-white/30 rounded-xl p-3 text-white outline-none focus:border-orange-400"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter password"
                required
                autoComplete="new-password"
                className="w-full bg-white/10 border border-white/30 rounded-xl p-3 text-white outline-none focus:border-orange-400"
              />
            </div>

            <div className="md:col-span-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 py-3 rounded-xl font-semibold text-lg hover:scale-[1.01] transition disabled:opacity-70"
              >
                {loading ? "Registering..." : "Register"}
              </button>
            </div>

            <div className="md:col-span-2 text-center text-gray-300">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="text-orange-400 hover:underline"
              >
                Login here
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
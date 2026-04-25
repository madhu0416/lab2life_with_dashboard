import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import API from "../api/labApi";

export default function UploadReport() {
  const [file, setFile] = useState(null);
  const [language, setLanguage] = useState("en");
  const [loading, setLoading] = useState(false);
  const [openLang, setOpenLang] = useState(false);

  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const languages = [
    { code: "en", label: "English" },
    { code: "hi", label: "Hindi" },
    { code: "mr", label: "Marathi" },
    { code: "ta", label: "Tamil" },
    { code: "bn", label: "Bengali" },
    { code: "gu", label: "Gujarati" },
    { code: "te", label: "Telugu" },
    { code: "fr", label: "French" },
    { code: "es", label: "Spanish" },
    { code: "ar", label: "Arabic" },
  ];

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenLang(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const selectedLanguage =
    languages.find((lang) => lang.code === language)?.label || "English";

  // ✅ Updated file handler (PDF + Image validation)
  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];

    if (selectedFile) {
      const validTypes = [
        "application/pdf",
        "image/png",
        "image/jpeg",
        "image/jpg",
      ];

      if (!validTypes.includes(selectedFile.type)) {
        alert("Only PDF or Image files are allowed.");
        return;
      }

      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please upload a report first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("language", language);

    setLoading(true);

    try {
      const token = sessionStorage.getItem("lab2life_token");

      const headers = {
        "Content-Type": "multipart/form-data",
      };

      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const response = await API.post("/upload-report", formData, {
        headers,
      });

      const reportData = {
        fileName: file.name,
        language,
        ...response.data,
      };

      navigate("/summary", {
        state: reportData,
      });
    } catch (error) {
      console.error("Upload failed:", error);
      alert(
        error.response?.data?.detail ||
          "Failed to generate summary. Please check backend connection."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center text-white"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1581595219315-a187dd40c322?q=80&w=1974&auto=format&fit=crop')",
      }}
    >
      <div className="min-h-screen bg-black/70 backdrop-blur-sm">
        <div className="pt-32 px-4 md:px-10 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-4xl mx-auto rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl p-8 md:p-10 shadow-2xl"
          >
            <h1 className="text-4xl font-bold text-center mb-4">
              Upload Your Medical Report
            </h1>

            <p className="text-center text-gray-300 mb-8 max-w-2xl mx-auto">
              Upload your lab report and get an AI-powered summary in simple
              language with helpful medical insights.
            </p>

            <div className="space-y-6">
              <div className="flex flex-col gap-4">
                <label className="text-lg font-medium text-white">
                  Select Report File
                </label>

                {/* ✅ Updated accept */}
                <input
                  type="file"
                  accept=".pdf,.png,.jpg,.jpeg"
                  onChange={handleFileChange}
                  className="w-full bg-white/10 border border-white/30 rounded-xl p-3 text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-orange-500 file:text-white hover:file:bg-orange-600"
                />

                {file && (
                  <p className="text-sm text-green-300">
                    Selected file:{" "}
                    <span className="font-semibold">{file.name}</span>
                  </p>
                )}
              </div>

              <div className="relative" ref={dropdownRef}>
                <label className="text-lg font-medium text-white block mb-2">
                  Select Language
                </label>

                <button
                  type="button"
                  onClick={() => setOpenLang((prev) => !prev)}
                  className="w-full bg-white/10 border border-white/30 rounded-xl p-3 text-left flex justify-between items-center"
                >
                  <span>{selectedLanguage}</span>
                  <span>{openLang ? "▲" : "▼"}</span>
                </button>

                {openLang && (
                  <div className="absolute z-20 w-full mt-2 bg-[#1c1f27] border border-white/20 rounded-xl shadow-lg max-h-60 overflow-y-auto">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        type="button"
                        onClick={() => {
                          setLanguage(lang.code);
                          setOpenLang(false);
                        }}
                        className="w-full text-left px-4 py-3 hover:bg-orange-500 transition"
                      >
                        {lang.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={handleUpload}
                disabled={loading}
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 py-3 rounded-xl font-semibold text-lg hover:scale-[1.01] transition disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? "Generating Summary..." : "Generate Summary"}
              </button>

              {loading && (
                <div className="flex justify-center pt-2">
                  <div className="h-10 w-10 animate-spin rounded-full border-4 border-white border-t-transparent"></div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
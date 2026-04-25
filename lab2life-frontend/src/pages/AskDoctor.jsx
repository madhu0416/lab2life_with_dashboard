import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../api/labApi";

export default function AskDoctor() {
  const location = useLocation();
  const navigate = useNavigate();
  const reportData = location.state;

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const reportSummary = reportData?.summary || "";
  const reportLanguage = reportData?.language || "en";
  const patientName =
    sessionStorage.getItem("lab2life_patient_name") || "Patient";

  useEffect(() => {
    const token = sessionStorage.getItem("lab2life_token");

    if (!token) {
      navigate("/login", {
        state: {
          from: "/ask-doctor",
          reportData,
        },
        replace: true,
      });
      return;
    }

    if (!reportData) {
      navigate("/upload");
    }
  }, [navigate, reportData]);

  const handleAskDoctor = async () => {
    const token = sessionStorage.getItem("lab2life_token");

    if (!token) {
      navigate("/login", {
        state: {
          from: "/ask-doctor",
          reportData,
        },
      });
      return;
    }

    if (!question.trim()) {
      alert("Please enter your question first.");
      return;
    }

    if (!reportSummary.trim()) {
      alert("Please generate a report summary first.");
      return;
    }

    setLoading(true);
    setAnswer("");

    try {
      const response = await API.post(
        "/ask-doctor",
        {
          question: question.trim(),
          summary: reportSummary,
          language: reportLanguage,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAnswer(response.data.answer || "No answer received.");
    } catch (error) {
      console.error("Ask Doctor error:", error);

      if (error.response?.status === 401) {
        sessionStorage.removeItem("lab2life_token");
        sessionStorage.removeItem("lab2life_patient_name");

        alert("Your session expired. Please login again.");
        navigate("/login", {
          state: {
            from: "/ask-doctor",
            reportData,
          },
        });
      } else {
        setAnswer(
          error.response?.data?.detail || "Failed to connect to backend."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("lab2life_token");
    sessionStorage.removeItem("lab2life_patient_name");

    navigate("/login", {
      state: {
        from: "/ask-doctor",
        reportData,
      },
    });
  };

  if (!reportData) {
    return (
      <div className="pt-32 px-4 md:px-10 pb-16">
        <div className="max-w-4xl mx-auto bg-[#1c1f27] border border-gray-800 rounded-3xl p-8 md:p-10 shadow-2xl text-center">
          <h1 className="text-3xl font-bold mb-4">No Report Data Found</h1>
          <p className="text-gray-400 mb-6">
            For privacy reasons, report data is cleared after refresh. Please
            upload the report again.
          </p>
          <button
            onClick={() => navigate("/upload")}
            className="bg-orange-500 px-6 py-3 rounded-xl hover:bg-orange-600 transition"
          >
            Upload Report
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 px-4 md:px-10 pb-16">
      <div className="max-w-4xl mx-auto bg-[#1c1f27] border border-gray-800 rounded-3xl p-8 md:p-10 shadow-2xl">
        <div className="flex items-center justify-between mb-4 gap-4 flex-wrap">
          <div>
            <h1 className="text-4xl font-bold">Ask Doctor</h1>
            <p className="text-sm text-gray-400 mt-1">
              Logged in as{" "}
              <span className="text-orange-400">{patientName}</span>
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="border border-gray-500 px-4 py-2 rounded-xl hover:bg-white/10 transition"
          >
            Logout
          </button>
        </div>

        <p className="text-center text-gray-400 mb-2 max-w-2xl mx-auto">
          Ask questions related to your uploaded medical report and get simple,
          patient-friendly guidance.
        </p>

        <p className="text-center text-sm text-gray-500 mb-8">
          Response language:{" "}
          <span className="text-orange-400">{reportLanguage}</span>
        </p>

        <div className="space-y-6">
          <div>
            <label className="block text-lg font-medium mb-2">
              Enter Your Question
            </label>
            <textarea
              rows="5"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Example: Is my hemoglobin level normal?"
              className="w-full bg-[#111318] border border-gray-700 rounded-2xl p-4 text-white outline-none focus:border-orange-400 resize-none"
            />
          </div>

          <button
            onClick={handleAskDoctor}
            disabled={loading}
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 py-3 rounded-xl font-semibold text-lg hover:scale-[1.01] transition disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? "Getting Answer..." : "Ask Doctor"}
          </button>

          {loading && (
            <div className="flex justify-center pt-2">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-white border-t-transparent"></div>
            </div>
          )}

          {answer && (
            <div className="bg-[#111318] border border-gray-700 rounded-2xl p-6">
              <h2 className="text-2xl font-semibold mb-4 text-orange-400">
                Doctor Guidance
              </h2>
              <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                {answer}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
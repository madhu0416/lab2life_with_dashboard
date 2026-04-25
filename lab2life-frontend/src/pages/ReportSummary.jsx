import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function ReportSummary() {
  const navigate = useNavigate();
  const location = useLocation();

  const reportData = location.state;

  // If no data (refresh case)
  if (!reportData) {
    return (
      <div className="pt-32 px-4 md:px-10 pb-16">
        <div className="max-w-4xl mx-auto bg-[#1c1f27] border border-gray-800 rounded-3xl p-8 text-center">
          <h1 className="text-3xl font-bold mb-4">No Report Found</h1>
          <p className="text-gray-400">
            For privacy reasons, report data is cleared after refresh. Please upload again.
          </p>
        </div>
      </div>
    );
  }

  const {
    fileName,
    summary,
    health_score,
    risk_level,
    normal_factors,
    abnormal_factors,
    recommendations,
    doctor_advice,
  } = reportData;

  return (
    <div className="pt-32 px-4 md:px-10 pb-16">
      <div className="max-w-4xl mx-auto bg-[#1c1f27] border border-gray-800 rounded-3xl p-8 md:p-10 shadow-2xl">

        {/* Header */}
        <h1 className="text-4xl font-bold text-center mb-4">
          Report Summary
        </h1>

        <p className="text-center text-gray-400 mb-8">
          AI analysis for: <span className="text-white">{fileName}</span>
        </p>

        {/* Health Score */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2 text-orange-400">
            Health Score
          </h2>
          <p className="text-3xl font-bold">
            {health_score}/100
          </p>
          <p className="text-gray-400">{risk_level}</p>
        </div>

        {/* Summary */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2 text-orange-400">
            Summary
          </h2>
          <p className="text-gray-300 whitespace-pre-wrap">{summary}</p>
        </div>

        {/* Normal Factors */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2 text-green-400">
            Normal Factors
          </h2>
          <ul className="list-disc pl-5 text-gray-300">
            {normal_factors?.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>

        {/* Abnormal Factors */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2 text-red-400">
            Abnormal Factors
          </h2>
          <ul className="list-disc pl-5 text-gray-300">
            {abnormal_factors?.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>

        {/* Recommendations */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2 text-orange-400">
            Recommendations
          </h2>
          <ul className="list-disc pl-5 text-gray-300">
            {recommendations?.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>

        {/* Doctor Advice */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2 text-orange-400">
            Doctor Advice
          </h2>
          <p className="text-gray-300 whitespace-pre-wrap">
            {doctor_advice}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row gap-4 mt-8">

          {/* Ask Doctor */}
          <button
            onClick={() =>
              navigate("/ask-doctor", {
                state: reportData,   // ✅ VERY IMPORTANT
              })
            }
            className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 py-3 rounded-xl font-semibold hover:scale-[1.02] transition"
          >
            Ask Doctor
          </button>

          {/* Upload Again */}
          <button
            onClick={() => navigate("/upload")}
            className="flex-1 border border-gray-600 py-3 rounded-xl hover:bg-white/10 transition"
          >
            Upload Another Report
          </button>

        </div>
      </div>
    </div>
  );
}
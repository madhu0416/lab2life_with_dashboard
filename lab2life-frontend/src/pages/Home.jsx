import React from "react";
import { Link } from "react-router-dom";

import { motion } from "framer-motion";

export default function Home() {
  const features = [
    {
      title: "AI Medical Summary",
      desc: "Understand complex medical reports in simple language instantly.",
    },
    {
      title: "Multilingual Support",
      desc: "Get results in English, Hindi, Marathi and more.",
    },
    {
      title: "Ask Doctor",
      desc: "Ask questions and get guidance based on your report.",
    },
    {
      title: "Health Recommendations",
      desc: "Receive simple lifestyle suggestions for better health.",
    },
    {
      title: "Doctor Guidance",
      desc: "Know which specialist to consult based on your report.",
    },
    {
      title: "Secure & Private",
      desc: "Your medical data is safe and encrypted.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0f1115] text-white">
     

      {/* HERO SECTION */}
      <section className="pt-32 pb-20 px-6 text-center max-w-6xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-bold leading-tight"
        >
          AI-Powered <span className="text-orange-400">Medical Report</span>{" "}
          Analysis
        </motion.h1>

        <p className="mt-6 text-gray-400 max-w-2xl mx-auto text-lg">
          Upload your lab report and get simple, patient-friendly insights,
          recommendations, and doctor guidance in your preferred language.
        </p>

        <div className="mt-8 flex justify-center gap-4 flex-wrap">
          <Link
            to="/upload"
            className="bg-orange-500 px-8 py-3 rounded-xl font-semibold hover:bg-orange-600 transition"
          >
            Analyze Report
          </Link>

          <Link
            to="/ask-doctor"
            className="border border-gray-600 px-8 py-3 rounded-xl hover:bg-gray-800 transition"
          >
            Ask Doctor
          </Link>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="px-6 pb-20 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          Powerful Features
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="bg-[#1c1f27] border border-gray-800 rounded-2xl p-6 shadow-lg"
            >
              <h3 className="text-xl font-semibold text-orange-400">
                {item.title}
              </h3>
              <p className="text-gray-400 mt-3">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      
    </div>
  );
}
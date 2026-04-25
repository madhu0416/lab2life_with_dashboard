import React from "react";
import { Upload } from "lucide-react"; // icon from lucide-react
// install once: npm install lucide-react

export default function UploadCard() {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-8 text-center max-w-md mx-auto mt-16">
      <Upload className="w-12 h-12 text-blue-500 mx-auto mb-4" />
      <h2 className="text-xl font-semibold mb-2">Upload Your Lab Report</h2>
      <p className="text-gray-500 mb-6">Get instant summary and recommendations.</p>
      <button className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition">
        Upload Report
      </button>
    </div>
  );
}

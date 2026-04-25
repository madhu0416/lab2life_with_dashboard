import React from "react";
import { Link } from "react-router-dom";


export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0f1115] text-white flex flex-col">
      

      <div className="flex-1 pt-32 px-4 md:px-10 pb-16 flex items-center justify-center">
        <div className="max-w-2xl w-full text-center bg-[#1c1f27] border border-gray-800 rounded-3xl p-8 md:p-10 shadow-2xl">
          <h1 className="text-6xl md:text-7xl font-bold text-orange-400 mb-4">
            404
          </h1>

          <h2 className="text-3xl font-bold mb-4">Page Not Found</h2>

          <p className="text-gray-400 mb-8">
            The page you are looking for does not exist or may have been moved.
          </p>

          <Link
            to="/"
            className="inline-block bg-orange-500 px-8 py-3 rounded-xl font-semibold hover:bg-orange-600 transition"
          >
            Go Back Home
          </Link>
        </div>
      </div>

      
    </div>
  );
}
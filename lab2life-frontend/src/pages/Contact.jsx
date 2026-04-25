import React from "react";


export default function Contact() {
  return (
    <div className="min-h-screen bg-[#0f1115] text-white">
      

      <div className="pt-32 px-4 md:px-10 pb-16">
        <div className="max-w-4xl mx-auto bg-[#1c1f27] border border-gray-800 rounded-3xl p-8 md:p-10 shadow-2xl">
          <h1 className="text-4xl font-bold text-center mb-6">
            Contact & Support
          </h1>

          <p className="text-center text-gray-400 mb-10 max-w-2xl mx-auto">
            If you have any questions, feedback, or need assistance regarding
            Lab2Life, feel free to reach out to us.
          </p>

          <div className="space-y-6">
            <div className="bg-[#111318] border border-gray-700 rounded-2xl p-6">
              <h2 className="text-xl font-semibold text-orange-400 mb-2">
                📧 Email Support
              </h2>
              <p className="text-gray-300">
                support@lab2life.com
              </p>
            </div>

            <div className="bg-[#111318] border border-gray-700 rounded-2xl p-6">
              <h2 className="text-xl font-semibold text-orange-400 mb-2">
                📞 Phone
              </h2>
              <p className="text-gray-300">
                +91 98765 43210
              </p>
            </div>

            <div className="bg-[#111318] border border-gray-700 rounded-2xl p-6">
              <h2 className="text-xl font-semibold text-orange-400 mb-2">
                📍 Address
              </h2>
              <p className="text-gray-300">
                Pune, Maharashtra, India
              </p>
            </div>
          </div>

          <div className="mt-10 text-center">
            <p className="text-gray-500 text-sm">
              We usually respond within 24 hours.
            </p>
          </div>
        </div>
      </div>

      
    </div>
  );
}
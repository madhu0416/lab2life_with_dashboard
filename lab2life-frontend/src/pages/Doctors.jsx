import React from "react";
import { useNavigate } from "react-router-dom";

export default function Doctors() {
  const navigate = useNavigate();

  const doctors = [
    {
      id: "general-physician",
      title: "General Physician",
      desc: "For fever, weakness, body pain, infections, and basic health concerns.",
    },
    {
      id: "cardiologist",
      title: "Cardiologist",
      desc: "For heart-related issues such as chest pain, blood pressure, and ECG concerns.",
    },
    {
      id: "diabetologist",
      title: "Diabetologist",
      desc: "For blood sugar, diabetes management, and insulin-related guidance.",
    },
    {
      id: "hematologist",
      title: "Hematologist",
      desc: "For blood disorders like anemia, low hemoglobin, and abnormal CBC reports.",
    },
    {
      id: "nephrologist",
      title: "Nephrologist",
      desc: "For kidney function issues, creatinine, urea, and urine abnormalities.",
    },
    {
      id: "endocrinologist",
      title: "Endocrinologist",
      desc: "For hormone-related problems like thyroid, diabetes, and metabolism issues.",
    },
  ];

  const handleDoctorTypeClick = (doctorType) => {
    const token = sessionStorage.getItem("lab2life_token");

    if (!token) {
      navigate("/login", {
        state: {
          from: `/doctors/${doctorType.id}`,
        },
      });
      return;
    }

    navigate(`/doctors/${doctorType.id}`);
  };

  return (
    <div className="pt-32 px-4 md:px-10 pb-16">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Doctors & Specialists</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Choose the right type of doctor based on your health condition and
            consult online through Lab2Life.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors.map((doctor, index) => (
            <div
              key={index}
              onClick={() => handleDoctorTypeClick(doctor)}
              className="bg-[#1c1f27] border border-gray-800 rounded-2xl p-6 shadow-lg hover:border-orange-400 transition cursor-pointer"
            >
              <h2 className="text-2xl font-semibold text-orange-400 mb-3">
                {doctor.title}
              </h2>
              <p className="text-gray-300 leading-relaxed">{doctor.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
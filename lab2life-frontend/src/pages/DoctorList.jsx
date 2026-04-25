import React from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function DoctorList() {
  const navigate = useNavigate();
  const { type } = useParams();

  const doctorData = {
    "general-physician": [
      {
        name: "Dr. Amit Sharma",
        degree: "MBBS, MD",
        specialization: "General Medicine",
        hospital: "Ruby Hall Clinic, Pune",
      },
      {
        name: "Dr. Neha Patil",
        degree: "MBBS, DNB",
        specialization: "Primary Care Physician",
        hospital: "Jehangir Hospital, Pune",
      },
    ],
    cardiologist: [
      {
        name: "Dr. Rohan Kulkarni",
        degree: "MBBS, DM Cardiology",
        specialization: "Heart Specialist",
        hospital: "Sahyadri Hospital, Pune",
      },
      {
        name: "Dr. Priya Deshmukh",
        degree: "MBBS, MD, DM",
        specialization: "Cardiology",
        hospital: "Aditya Birla Hospital, Pune",
      },
    ],
    diabetologist: [
      {
        name: "Dr. Kunal Mehta",
        degree: "MBBS, Fellowship in Diabetology",
        specialization: "Diabetes Specialist",
        hospital: "Apollo Clinic, Pune",
      },
      {
        name: "Dr. Sneha Joshi",
        degree: "MBBS, MD",
        specialization: "Diabetology",
        hospital: "Jupiter Hospital, Pune",
      },
    ],
    hematologist: [
      {
        name: "Dr. Suresh Reddy",
        degree: "MBBS, DM Hematology",
        specialization: "Blood Disorders",
        hospital: "KEM Hospital, Pune",
      },
      {
        name: "Dr. Anjali Verma",
        degree: "MBBS, MD",
        specialization: "Clinical Hematology",
        hospital: "Noble Hospital, Pune",
      },
    ],
    nephrologist: [
      {
        name: "Dr. Vikram Nair",
        degree: "MBBS, DM Nephrology",
        specialization: "Kidney Specialist",
        hospital: "Deenanath Mangeshkar Hospital, Pune",
      },
      {
        name: "Dr. Pooja Singh",
        degree: "MBBS, MD",
        specialization: "Nephrology",
        hospital: "Manipal Hospital, Pune",
      },
    ],
    endocrinologist: [
      {
        name: "Dr. Rahul Bhosale",
        degree: "MBBS, DM Endocrinology",
        specialization: "Hormone Specialist",
        hospital: "Sancheti Hospital, Pune",
      },
      {
        name: "Dr. Kavita More",
        degree: "MBBS, MD",
        specialization: "Endocrinology",
        hospital: "Aundh Hospital, Pune",
      },
    ],
  };

  const doctors = doctorData[type] || [];

  const handleConsult = (doctor) => {
    const token = sessionStorage.getItem("lab2life_token");
    const subscribed = sessionStorage.getItem("lab2life_subscription") === "true";

    if (!token) {
      navigate("/login", {
        state: {
          from: `/doctors/${type}`,
        },
      });
      return;
    }

    if (!subscribed) {
      navigate("/subscription", {
        state: {
          doctor,
          type,
        },
      });
      return;
    }

    alert(`Consultation booked with ${doctor.name}`);
  };

  return (
    <div className="pt-32 px-4 md:px-10 pb-16">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-10">
          Available Doctors
        </h1>

        {doctors.length === 0 ? (
          <p className="text-center text-gray-400">No doctors found.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {doctors.map((doctor, index) => (
              <div
                key={index}
                className="bg-[#1c1f27] border border-gray-800 rounded-2xl p-6 shadow-lg"
              >
                <h2 className="text-2xl font-semibold text-orange-400 mb-3">
                  {doctor.name}
                </h2>
                <p className="text-gray-300 mb-2">
                  <span className="font-semibold">Degree:</span> {doctor.degree}
                </p>
                <p className="text-gray-300 mb-2">
                  <span className="font-semibold">Specialization:</span>{" "}
                  {doctor.specialization}
                </p>
                <p className="text-gray-300 mb-4">
                  <span className="font-semibold">Hospital:</span>{" "}
                  {doctor.hospital}
                </p>

                <button
                  onClick={() => handleConsult(doctor)}
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 py-3 rounded-xl font-semibold hover:scale-[1.01] transition"
                >
                  Consult Now
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
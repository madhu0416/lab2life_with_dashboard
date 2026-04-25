import React from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/labApi";

export default function Subscription() {
  const navigate = useNavigate();

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const existingScript = document.getElementById("razorpay-checkout-js");
      if (existingScript) {
        resolve(true);
        return;
      }

      const script = document.createElement("script");
      script.id = "razorpay-checkout-js";
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleSubscribe = async () => {
    const token = sessionStorage.getItem("lab2life_token");

    if (!token) {
      navigate("/login", {
        state: {
          from: "/subscription",
        },
      });
      return;
    }

    const isLoaded = await loadRazorpayScript();

    if (!isLoaded) {
      alert("Razorpay SDK failed to load. Please check your internet connection.");
      return;
    }

    try {
      const response = await API.post(
        "/create-subscription-order",
        { plan: "monthly" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { order_id, amount, currency, key, name, email, phone } =
        response.data;

      const options = {
        key,
        amount,
        currency,
        name: "Lab2Life",
        description: "Monthly Subscription",
        order_id,
        handler: async function (paymentResponse) {
  console.log("Payment Success:", paymentResponse);

  const token = sessionStorage.getItem("lab2life_token");

  try {
    await API.post(
      "/verify-payment",
      {
        razorpay_order_id: paymentResponse.razorpay_order_id,
        razorpay_payment_id: paymentResponse.razorpay_payment_id,
        razorpay_signature: paymentResponse.razorpay_signature,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Save locally also (UI purpose)
    sessionStorage.setItem("lab2life_subscription", "true");

    alert("Subscription activated successfully 🎉");
    navigate("/doctors");
  } catch (error) {
    console.error("Verification failed:", error);
    alert("Payment done but verification failed.");
  }
},
        prefill: {
          name,
          email,
          contact: phone,
        },
        theme: {
          color: "#f97316",
        },
        modal: {
          ondismiss: function () {
            console.log("Payment popup closed");
          },
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error("Subscription Error:", error);
      alert(
        error.response?.data?.detail ||
          "Unable to start payment. Please try again."
      );
    }
  };

  return (
    <div className="pt-32 px-4 md:px-10 pb-16">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">
          Choose Your Subscription Plan
        </h1>

        <p className="text-gray-400 mb-12">
          Unlock unlimited doctor consultations and premium health insights.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-[#1c1f27] border border-gray-800 rounded-3xl p-8 shadow-xl hover:border-orange-400 transition">
            <h2 className="text-2xl font-semibold text-orange-400 mb-3">
              Monthly Plan
            </h2>

            <p className="text-gray-300 mb-4">Best for short-term use</p>

            <p className="text-4xl font-bold mb-6">
              ₹199<span className="text-lg text-gray-400"> / month</span>
            </p>

            <ul className="text-gray-300 space-y-2 mb-8">
              <li>✔ Unlimited doctor consultations</li>
              <li>✔ AI-powered health insights</li>
              <li>✔ Personalized recommendations</li>
              <li>✔ Priority support</li>
            </ul>

            <button
              onClick={handleSubscribe}
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 py-3 rounded-xl font-semibold hover:scale-[1.02] transition"
            >
              Subscribe Now
            </button>
          </div>

          <div className="bg-[#1c1f27] border border-gray-800 rounded-3xl p-8 shadow-xl opacity-80">
            <h2 className="text-2xl font-semibold text-orange-400 mb-3">
              More Plans Coming Soon
            </h2>

            <p className="text-gray-300 mb-4">
              We will add more premium plans soon.
            </p>

            <p className="text-4xl font-bold mb-6">
              Stay Tuned
            </p>

            <ul className="text-gray-300 space-y-2 mb-8">
              <li>✔ Family plans</li>
              <li>✔ Annual discount plans</li>
              <li>✔ Specialist consultation bundles</li>
            </ul>

            <button
              disabled
              className="w-full bg-white/10 py-3 rounded-xl font-semibold cursor-not-allowed"
            >
              Coming Soon
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
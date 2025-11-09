// src/pages/Home.jsx
import React from "react";
import Navbar from "../components/Navbar";
import CoreValues from "../components/CoreValues";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import myImage from "../assets/Purple.jpeg";
export default function Home() {
  const vibrantLavender = "#A36DBD"; // slightly brighter pop for emphasis
  const reviews = [
    { username: "Alice", comment: "Excellent service!"},
    { username: "Bob", comment: "Fast and reliable."},
    { username: "Charlie", comment: "Very satisfied with the product."},
    { username: "Daisy", comment: "Good experience."},
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* HERO SECTION */}
      <header className="pt-12 pb-16">
        <div className="max-w-7xl mx-auto px-6 md:px-8 grid md:grid-cols-2 gap-12 items-center">
          {/* LEFT SIDE */}
          <div className="space-y-6">
            <p
              className="inline-block px-3 py-1 rounded-full text-sm font-semibold"
              style={{
                backgroundColor: "#F3E8F9",
                color: vibrantLavender,
              }}
            >
              Patient Care & Medical Support
            </p>

            <h1
              className="text-4xl md:text-6xl font-extrabold leading-tight"
              style={{
                color: "#2E0249",
              }}
            >
              Leading the Way in{" "}
              <span style={{ color: vibrantLavender }}>Quality Healthcare</span>
            </h1>

            <p
              className="max-w-xl text-lg leading-relaxed"
              style={{
                color: "#6B4A78",
              }}
            >
              Where healing and technology unite. Book trusted services, order
              medical equipment, and get care delivered to your doorstep — all
              in one place.
            </p>
            {/* STATS */}
            <div className="mt-8 flex flex-wrap items-center gap-4 text-sm">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-bold"
                  style={{
                    backgroundColor: "#F3E8F9",
                    color: vibrantLavender,
                  }}
                >
                  20+
                </div>
                <div style={{ color: "#6B4A78" }}>Medical Specialists</div>
              </div>

              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-bold"
                  style={{
                    backgroundColor: "#F3E8F9",
                    color: vibrantLavender,
                  }}
                >
                  10k+
                </div>
                <div style={{ color: "#6B4A78" }}>Happy Patients</div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE HERO IMAGE */}
          <div className="flex justify-center">
            <div
              className="w-full max-w-md rounded-3xl shadow-lg overflow-hidden relative"
              style={{
                aspectRatio: "4 / 3", // keeps it proportional
                background: "linear-gradient(to bottom right, #CFADE0, #A36DBD)",
              }}
            >
              <img
                src={myImage}
                alt="Product"
                className="w-full h-full object-contain" // changed from object-cover to object-contain
              />
            </div>
          </div>


        </div>
      </header>

      {/* CORE VALUES SECTION */}
      <CoreValues />

      {/* REVIEWS PREVIEW */}
      {/*
      <section className="max-w-7xl mx-auto px-6 md:px-8 py-12">
        <h2 className="text-3xl font-bold text-[#A36DBD] mb-6 text-center">
          Customer Reviews
        </h2>

        <div className="grid md:grid-cols-3 gap-6 mb-6">
          {reviews.slice(0, 3).map((r, idx) => (
            <div
              key={idx}
              className="p-4 border border-purple-100 rounded-2xl shadow-sm hover:shadow-md transition bg-white"
            >
              <p className="font-semibold text-[#A36DBD]">{r.username}</p>
              <p className="text-gray-700 mt-1">{r.comment}</p>
              <p className="text-[#A36DBD] font-medium mt-2">⭐ {r.rating}/5</p>
            </div>
          ))}
        </div>
      
        <div className="text-center">
          <Link
            to="/ratingreview"
            className="inline-block bg-[#A36DBD] text-white px-6 py-3 rounded-xl hover:bg-[#9258ad] active:bg-[#7d4699] transition-all shadow-md"
          >
            See All Reviews
          </Link>
        </div>
      </section>
      */}
      {/* FOOTER SECTION */}
      <Footer />
    </div>
  );
}

import React from "react";
import Navbar from "../components/Navbar";
import CoreValues from "../components/CoreValues";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import myImage from "../assets/Purple.jpeg";
export default function Home() {
  const vibrantLavender = "#A36DBD";
  const reviews = [
    { username: "Alice", comment: "Excellent service!"},
    { username: "Bob", comment: "Fast and reliable."},
    { username: "Charlie", comment: "Very satisfied with the product."},
    { username: "Daisy", comment: "Good experience."},
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <header className="pt-12 pb-16">
        <div className="max-w-7xl mx-auto px-6 md:px-8 grid md:grid-cols-2 gap-12 items-center">
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

          <div className="flex justify-center">
            <div
              className="w-full max-w-md rounded-3xl shadow-lg overflow-hidden relative"
              style={{
                aspectRatio: "4 / 3",
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

      <CoreValues />
      <Footer />
    </div>
  );
}

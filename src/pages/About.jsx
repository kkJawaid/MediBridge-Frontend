import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import myImage from "../assets/Medicine.jpeg";
import myImage1 from "../assets/undefineda.jpeg";
import myImage2 from "../assets/undefinedb.jpeg";
import myImage3 from "../assets/HeartSyringe.jpeg";

const iconColor = "#B896C3"; // soft purple for icons
const headingColor = "#9C27B0"; // vibrant purple for headings
const bgGradient = "linear-gradient(180deg, #F3E8F9 0%, #E5D0F0 100%)"; // soft lavender background

const About = () => {
  return (
    <div className="text-gray-800 font-sans">
      <Navbar />

      {/* About Section */}
      <section
        className="py-16"
        style={{
          background: bgGradient,
        }}
      >
        <div className="container mx-auto px-4 md:px-8 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2
              className="text-sm uppercase tracking-wide font-semibold mb-3"
              style={{ color: iconColor }}
            >
              About
            </h2>
            <h1
              className="text-4xl md:text-5xl font-bold mb-5"
              style={{ color: headingColor }}
            >
              About <span style={{ color: iconColor }}>MediBridge</span>
            </h1>
            <p className="text-gray-700 leading-relaxed">
              MediBridge is a platform dedicated to connecting patients with
              essential medical services and equipment. From routine check-ups
              and blood tests to contractual nurses and rental medical equipment
              such as oxygen tanks and hospital beds, we aim to bridge the gap
              between patients and accessible healthcare.
            </p>
          </div>

          {/* RIGHT SIDE HERO IMAGE */}
          <div className="flex items-center justify-center">
            <div
              className="w-full max-w-md h-80 rounded-3xl shadow-lg overflow-hidden flex items-center justify-center"
              style={{
                background: "linear-gradient(to bottom right, #CFADE0, #A36DBD)",
              }}
            >
              <img
                src={myImage}
                alt="Product"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission / Vision / Core Values */}
      <section className="container mx-auto px-4 md:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="bg-white shadow-md rounded-xl p-8 hover:shadow-xl transition">
            {/* <div className="mb-4 text-3xl" style={{ color: iconColor }}>
              🚀
            </div> */}
            <h3 className="font-bold text-lg mb-3" style={{ color: headingColor }}>
              Mission
            </h3>
            <p className="text-gray-600">
              To make healthcare services and medical equipment easily
              accessible, reliable, and affordable for every patient in need.
            </p>
          </div>

          <div className="bg-white shadow-md rounded-xl p-8 hover:shadow-xl transition">
            {/* <div className="mb-4 text-3xl" style={{ color: iconColor }}>
              🌟
            </div> */}
            <h3 className="font-bold text-lg mb-3" style={{ color: headingColor }}>
              Vision
            </h3>
            <p className="text-gray-600">
              To build a connected healthcare ecosystem that brings care,
              comfort, and technology to every home.
            </p>
          </div>

          <div className="bg-white shadow-md rounded-xl p-8 hover:shadow-xl transition">
            {/* <div className="mb-4 text-3xl" style={{ color: iconColor }}>
              💎
            </div> */}
            <h3 className="font-bold text-lg mb-3" style={{ color: headingColor }}>
              Core Values
            </h3>
            <p className="text-gray-600">
              Guided by Compassion, Integrity, Teamwork, and Innovation — we
              strive to redefine patient care and support.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section
        className="py-16"
        style={{
          background: bgGradient,
        }}
      >
        <div className="container mx-auto px-4 md:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-10" style={{ color: headingColor }}>
            Our Story
          </h2>
          <p className="max-w-3xl mx-auto text-gray-700 leading-relaxed mb-12">
            MediBridge was founded to simplify healthcare access. We recognized
            that patients often struggle to find affordable services and
            equipment when they need them most. Our mission is to bring doctors,
            labs, and suppliers together — ensuring every patient receives the
            support and care they deserve.
          </p>

          <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-6">
            <div className="w-full h-64 md:h-72 rounded-xl overflow-hidden shadow-md bg-white">
              <img
                src={myImage1}
                alt="Medical team"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="w-full h-64 md:h-72 rounded-xl overflow-hidden shadow-md bg-white">
              <img
                src={myImage2}
                alt="Doctor consulting"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="w-full h-64 md:h-72 rounded-xl overflow-hidden shadow-md bg-white">
              <img
                src={myImage3}
                alt="Stethoscope"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;

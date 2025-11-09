// src/components/CoreValues.jsx
import React from "react";
import { Heart, Shield, Users, Stethoscope } from "lucide-react";

const iconColor = "#B896C3"; // soft purple for icons
const headingColor = "#9C27B0"; // vibrant purple for heading

const values = [
  {
    icon: <Heart className="w-12 h-12" style={{ color: iconColor }} />,
    title: "Compassion",
    description:
      "We care deeply about our patients and their families, delivering empathy through every interaction.",
  },
  {
    icon: <Shield className="w-12 h-12" style={{ color: iconColor }} />,
    title: "Integrity",
    description:
      "We uphold honesty, transparency, and ethical standards in every decision we make.",
  },
  {
    icon: <Users className="w-12 h-12" style={{ color: iconColor }} />,
    title: "Teamwork",
    description:
      "We believe the best care comes from collaboration among medical professionals and patients.",
  },
  {
    icon: <Stethoscope className="w-12 h-12" style={{ color: iconColor }} />,
    title: "Innovation",
    description:
      "We constantly seek new ways to improve healthcare through technology and research.",
  },
];

export default function CoreValues() {
  return (
    <section
      className="py-16"
      style={{
        background: "linear-gradient(180deg, #F3E8F9 0%, #E5D0F0 100%)", // soft lavender gradient
      }}
    >
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2
          className="text-3xl md:text-4xl font-bold mb-12"
          style={{ color: headingColor }}
        >
          Our Core Values
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {values.map((value, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md p-8 flex flex-col items-center text-center transition-transform duration-300 hover:-translate-y-2"
            >
              <div className="mb-4">{value.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {value.title}
              </h3>
              <p className="text-gray-600">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

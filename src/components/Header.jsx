// src/pages/Home.jsx
import React from "react";
import Navbar from "../components/Navbar";
import "./Home.css";
import dnaImage from "../assets/dna.png"; // add image in src/assets

const Home = () => {
  return (
    <>
      <Navbar />

      <section className="hero">
        <div className="hero-text">
          <p className="tagline">Medical Consulting</p>
          <h1>Leading the Way in Quality Healthcare</h1>
          <p className="description">
            Join thousands of satisfied patients who trust MediHealth for their
            medical needs. Your health is in good hands.
          </p>
          <button className="consult-btn">Consultation</button>
        </div>

        <div className="hero-image">
          <img src={dnaImage} alt="DNA Illustration" />
        </div>
      </section>

      <section className="quote-section">
        <p>
          "Welcome to MediHealth, where we are dedicated to providing the
          highest standard of healthcare services. Our team of professionals is
          committed to ensuring your well-being and delivering personalized
          care. Thank you for trusting us with your health."
        </p>
        <h4>— Dr. Emily Carter, Medical Director</h4>
      </section>
    </>
  );
};

export default Home;

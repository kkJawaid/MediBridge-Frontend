import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import RatingForm from "../components/RatingForm";

export default function RatingReview() {
  // const [reviews, setReviews] = useState([
  //   { username: "Alice", comment: "Excellent service!", rating: 5 },
  //   { username: "Bob", comment: "Good experience overall.", rating: 4 },
  // ]);

  const [showForm, setShowForm] = useState(false);

  // const addReview = (newReview) => {
  //   setReviews([newReview, ...reviews]);
  //   setShowForm(false);
  // };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-purple-50 to-white">
      <Navbar />

      <div className="relative max-w-6xl mx-auto w-full flex-1 py-12 px-6">
        {/* Write Review Button (top right) */}
        <button
          onClick={() => setShowForm(true)}
          className="absolute right-6 top-6 bg-[#A36DBD] text-white px-6 py-2.5 rounded-full font-medium shadow-md hover:bg-[#8e58a8] transition"
        >
          Write a Review
        </button>

        {/* Header Section */}
        <div className="text-center mb-12">
          <h3 className="text-gray-500 text-lg font-medium mb-1">
            Client Feedback
          </h3>
          <h1 className="text-3xl md:text-4xl font-bold text-[#A36DBD] mb-2">
            Trusted by global companies
          </h1>
          <p className="text-gray-500 max-w-xl mx-auto text-sm md:text-base">
            Where healing and technology unite. Book trusted services, order
            medical equipment, and get care delivered to your doorstep — all
            in one place.
          </p>
        </div>

        {/* Reviews Section */}
        <div className="grid md:grid-cols-3 gap-8 justify-center">
          {reviews.map((r, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-md p-8 text-center border border-purple-100 hover:shadow-lg transition"
            >
              {/* <div className="flex justify-center mb-4">
                {"⭐".repeat(r.rating)}
              </div> */}

              <h2 className="text-[#A36DBD] font-semibold text-lg mb-3">
                “{r.comment}”
              </h2>

              <p className="text-gray-500 text-sm mb-6">
                Lorem Ipsum is simply dummy text of the printing and
                typesetting industry. Lorem Ipsum has been the industry's
                standard dummy text ever since the 1500s.
              </p>

              <div className="flex flex-col items-center">
                <div className="w-14 h-14 rounded-full overflow-hidden mb-2 bg-gray-100">
                  <img
                    src={`https://ui-avatars.com/api/?name=${r.username}&background=random`}
                    alt={r.username}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="font-semibold text-[#A36DBD]">{r.username}</p>
                <p className="text-gray-400 text-xs">Verified Customer</p>
              </div>
            </div>
          ))}
        </div>

        {/* Popup Form */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md relative">
              <button
                onClick={() => setShowForm(false)}
                className="absolute top-3 right-4 text-gray-400 hover:text-gray-600 text-xl"
              >
                &times;
              </button>
              <h2 className="text-2xl font-semibold text-[#A36DBD] mb-4 text-center">
                Leave a Review
              </h2>
              <RatingForm onSubmit={addReview} />
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
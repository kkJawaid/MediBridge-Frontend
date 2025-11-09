// src/components/RatingForm.jsx
import React, { useState } from "react";

export default function RatingForm({ onSubmit, onClose }) {
  const [username, setUsername] = useState("");
  const [comment, setComment] = useState("");
  //const [rating, setRating] = useState(5);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!comment) return alert("Please fill all fields!");
    const newReview = {comment };
    onSubmit(comment);
    setUsername("");
    setComment("");
    //setRating(5);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-2xl shadow-md border border-purple-100 space-y-4 relative"
    >
      {/* <input
        type="text"
        placeholder="Your Name"
        className="w-full p-3 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A36DBD] text-[#A36DBD] placeholder-purple-300"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      /> */}
       <button
        type="button"
        onClick={onClose}
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl font-bold"
      >
        ✕
      </button>
      <textarea
        placeholder="Write your review..."
        className="w-full p-3 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A36DBD] text-[#A36DBD] placeholder-purple-300"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      {/* <select
        className="w-full p-3 border border-purple-200 rounded-lg text-[#A36DBD] focus:outline-none focus:ring-2 focus:ring-[#A36DBD]"
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
      >
        {[5, 4, 3, 2, 1].map((r) => (
          <option key={r} value={r}>
            {r} Stars
          </option>
        ))}
      </select> */}

      <button
        type="submit"
        className="w-full bg-[#A36DBD] text-white px-6 py-3 rounded-xl hover:bg-[#9258ad] active:bg-[#7d4699] transition-all shadow-md"
      >
        Submit Review
      </button>
    </form>
  );
}

"use client";

import React, { useState, useEffect } from "react";

const SpendingCard = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [clicked, setClicked] = useState(false);
  const [currentDateTime, setCurrentDateTime] = useState("");

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const formattedDateTime = now.toLocaleString("en-US", {
        weekday: "short",
        month: "short",
        day: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });
      setCurrentDateTime(formattedDateTime);
    };
    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const categories = [
    "Food",
    "Entertainment",
    "Cultural..",
    "Shopping",
    "Gifts",
    "Clothing",
    "Family",
    "Unknown",
    "Health",
    "Transport",
  ];

  const handleClick = () => {
    if (selectedCategory) {
      setClicked(true);
      setTimeout(() => setClicked(false), 200);
    }
  };

  return (
    <div className="w-80 bg-black rounded-2xl overflow-hidden shadow-lg">
      <div className="bg-cyan-500 text-white text-center py-4 relative">
        <h2 className="text-lg font-semibold">Spending</h2>
        <p className="text-sm absolute right-4 top-4">Income</p>
        <p className="text-2xl font-bold">-12,000 INR</p>
        <p className="text-sm mt-1">{currentDateTime}</p>
      </div>
      <div className="bg-black p-4 text-white grid grid-cols-4 gap-3">
        {categories.map((category, index) => (
          <label key={index} className="flex flex-col items-center cursor-pointer">
            <input
              type="radio"
              name="category"
              value={category}
              checked={selectedCategory === category}
              onChange={() => setSelectedCategory(category)}
              className="hidden"
            />
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                selectedCategory === category ? "bg-cyan-500" : "bg-white"
              }`}
            ></div>
            <p className="text-xs text-center mt-1">{category}</p>
          </label>
        ))}
      </div>
      <button
        className={`w-full py-2 transition transform ${selectedCategory ? "bg-gray-700 active:scale-95" : "bg-gray-500 opacity-50 cursor-not-allowed"} text-white ${clicked ? "scale-95" : "scale-100"}`}
        disabled={!selectedCategory}
        onClick={handleClick}
      >
        Done
      </button>
    </div>
  );
};

export default SpendingCard;

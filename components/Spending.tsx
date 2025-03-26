"use client";

import React, { useState } from "react";

const API_ADD_EXPENSE = "http://127.0.0.1:5000/add-expense";

const SpendingCard = ({ onExpenseAdded }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [amount, setAmount] = useState("");
  const [showAmountInput, setShowAmountInput] = useState(false);
  const [loading, setLoading] = useState(false);

  const categories = [
    "Food", "Entertainment", "Cultural", "Shopping", "Gifts",
    "Clothing", "Family", "Unknown", "Health", "Transport",
  ];

  const formatDate = () => {
    const now = new Date();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    return `${month}/${day}/${year} ${hours}:${minutes}`;
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setShowAmountInput(true);
    setAmount("");
  };

  const handleSubmit = async () => {
    if (!selectedCategory || !amount) return;

    const newExpense = {
      Date: formatDate(),
      Category: selectedCategory,
      Amount: parseFloat(amount),
      "Income/Expense": "Expense",
      Note: selectedCategory // Adding a note for better transaction tracking
    };

    setLoading(true);

    try {
      const response = await fetch(API_ADD_EXPENSE, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newExpense),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to add expense");

      if (onExpenseAdded) onExpenseAdded(newExpense);
    } catch (error) {
      console.error("Error adding expense:", error);
    } finally {
      setLoading(false);
      setSelectedCategory(null);
      setAmount("");
      setShowAmountInput(false);
    }
  };

  return (
    <div className="w-80 bg-black rounded-2xl overflow-hidden shadow-lg">
      <div className="bg-cyan-500 text-white text-center py-4 relative">
        <h2 className="text-lg font-semibold">Spending</h2>
        <p className="text-2xl font-bold">{amount ? `-$${amount}` : ""}</p>
      </div>
      <div className="bg-black p-4 text-white grid grid-cols-4 gap-3">
        {categories.map((category, index) => (
          <label key={index} className="flex flex-col items-center cursor-pointer">
            <input
              type="radio"
              name="category"
              value={category}
              checked={selectedCategory === category}
              onChange={() => handleCategorySelect(category)}
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
      {showAmountInput && (
        <div className="p-4">
          <input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg bg-white text-black"
          />
        </div>
      )}
      <button
        className={`w-full py-2 transition transform ${
          selectedCategory && amount ? "bg-gray-700 active:scale-95" : "bg-gray-500 opacity-50 cursor-not-allowed"
        } text-white`}
        disabled={!selectedCategory || !amount || loading}
        onClick={handleSubmit}
      >
        {loading ? "Adding..." : "Done"}
      </button>
    </div>
  );
};

export default SpendingCard;
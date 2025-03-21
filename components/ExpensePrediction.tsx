"use client";

import React from "react";

const ExpensePredictionCard = () => {
  const expenses = [
    { category: "Transportation", amount: 1100 },
    { category: "Transportation", amount: 1100 },
    { category: "Transportation", amount: 1100 },
    { category: "Transportation", amount: 1100 },
    { category: "Transportation", amount: 1100 },
    { category: "Transportation", amount: 1100 },
  ];

  return (
    <div className="w-[400px] bg-[#1E1E1E] rounded-2xl p-6 shadow-lg text-[#B9B9B9]">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Expense prediction</h2>
        <p className="text-lg font-semibold">April</p>
      </div>
      <p className="text-sm mt-2">
        Based on your past month, here are your projected expenses for next month
      </p>
      <h3 className="text-lg font-semibold mt-4">Total Expense</h3>
      <p className="text-3xl font-bold">$12,000</p>

      <div className="grid grid-cols-2 gap-2 mt-4">
        {expenses.map((expense, index) => (
          <div key={index} className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 bg-purple-400 rounded-full"></span>
            <p className="text-sm">
              {expense.category} - ${expense.amount}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpensePredictionCard;

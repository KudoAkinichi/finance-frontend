"use client";

import React from "react";

const BalanceCard = ({ totalBalance = 12000, monthlyBudget = 10000, spent = 5000 }) => {
  const remaining = monthlyBudget - spent;
  const spentPercentage = Math.min((spent / monthlyBudget) * 100, 100); // Ensuring it doesn't exceed 100%

  return (
    <div className="w-[400px] bg-[#1E1E1E] rounded-2xl p-6 shadow-lg text-[#B9B9B9]">
      <h2 className="text-lg font-semibold">Total Balance</h2>
      <p className="text-3xl font-bold">${totalBalance.toLocaleString()}</p>
      <div className="flex justify-between mt-4">
        <div>
          <h3 className="text-sm">Monthly Budget</h3>
          <p className="text-xl font-semibold">${monthlyBudget.toLocaleString()}</p>
        </div>
        <div>
          <h3 className="text-sm">Remaining</h3>
          <p className="text-xl font-semibold">${remaining.toLocaleString()}</p>
        </div>
      </div>
      <div className="mt-4">
        <div className="w-full bg-gray-700 rounded-full h-2.5">
          <div
            className="bg-red-500 h-2.5 rounded-full transition-all duration-300"
            style={{ width: `${spentPercentage}%` }}
          ></div>
        </div>
        <div className="flex justify-between mt-1 text-sm">
          <span>${spent.toLocaleString()} Spent</span>
          <span>{spentPercentage.toFixed(0)}%</span>
        </div>
      </div>
    </div>
  );
};

export default BalanceCard;

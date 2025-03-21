"use client";

import React, { useState } from "react";
import SpendingCard from "./Spending"; // Import the Spending component

const transactions = [
  { id: 1, name: "Coffee Shop", amount: -200, date: "12 March, 1:00 am" },
  { id: 2, name: "Bonus", amount: 200, date: "12 March, 1:00 am" },
  { id: 3, name: "Coffee Shop", amount: -200, date: "12 March, 1:00 am" },
];

const RecentTransactions = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="w-80 bg-[#1E1E1E] rounded-2xl p-4 shadow-lg text-[#B9B9B9] relative">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Recent Transactions > </h2>
      </div>

      {/* Transactions List */}
      <div className="mt-4 space-y-4">
        {transactions.map((txn) => (
          <div key={txn.id}>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-400 rounded-full"></div>
                <div>
                  <p className="text-sm font-semibold">{txn.name}</p>
                  <p className="text-xs text-gray-400">{txn.date}</p>
                </div>
              </div>
              <p className={`text-sm font-semibold ${txn.amount > 0 ? "text-green-500" : "text-white"}`}>
                {txn.amount > 0 ? `+$${txn.amount}` : `-$${Math.abs(txn.amount)}`}
              </p>
            </div>
            <hr className="border-gray-600 mt-2" />
          </div>
        ))}
      </div>

      {/* Plus Button */}
      <button
        className="w-full mt-4 py-3 bg-cyan-500 rounded-full flex items-center justify-center text-black text-2xl font-bold"
        onClick={() => setIsModalOpen(true)}
      >
        +
      </button>

      {/* Spending Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center">
          <div className="relative">
            <SpendingCard />
            <button
              className="absolute -top-10 right-2 bg-black text-white px-3 py-1 rounded-full"
              onClick={() => setIsModalOpen(false)}
            >
              X
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecentTransactions;

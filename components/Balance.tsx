"use client";

import React, { useState, useEffect } from "react";

const BalanceCard = () => {
  const [balanceData, setBalanceData] = useState({
    totalBalance: 0,
    monthlyBudget: 0,
    spent: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBalanceData() {
      try {
        setIsLoading(true);
        setError(null);

        // Use environment variable for API base URL if possible
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5000';
        const response = await fetch(`${apiUrl}/balance`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });
        
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
        }
        
        const data = await response.json();
        
        // More robust data validation
        setBalanceData({
          totalBalance: Number(data.totalBalance) || 0,
          monthlyBudget: Number(data.monthlyBudget) || 0,
          spent: Number(data.spent) || 0
        });
      } catch (error) {
        console.error("Detailed Error fetching balance data:", error);
        setError(error instanceof Error ? error.message : "An unknown error occurred");
      } finally {
        setIsLoading(false);
      }
    }

    fetchBalanceData();
  }, []);

  if (isLoading) {
    return (
      <div className="w-[400px] bg-[#1E1E1E] rounded-2xl p-6 text-[#B9B9B9]">
        Loading balance data...
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-[400px] bg-[#1E1E1E] rounded-2xl p-6 text-red-500">
        <p>Error loading balance:</p>
        <p>{error}</p>
      </div>
    );
  }

  const remaining = balanceData.monthlyBudget - balanceData.spent;
  const spentPercentage = Math.min((balanceData.spent / (balanceData.monthlyBudget || 1)) * 100, 100);

  return (
    <div className="w-[400px] bg-[#1E1E1E] rounded-2xl p-6 shadow-lg text-[#B9B9B9]">
      <h2 className="text-lg font-semibold">Total Balance</h2>
      <p className="text-3xl font-bold">${balanceData.totalBalance.toLocaleString()}</p>
      <div className="flex justify-between mt-4">
        <div>
          <h3 className="text-sm">Monthly Budget</h3>
          <p className="text-xl font-semibold">${balanceData.monthlyBudget.toLocaleString()}</p>
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
          <span>${balanceData.spent.toLocaleString()} Spent</span>
          <span>{spentPercentage.toFixed(0)}%</span>
        </div>
      </div>
    </div>
  );
};

export default BalanceCard;
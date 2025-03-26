"use client";

import React, { useEffect, useState } from "react";

const API_NEXT_MONTH = "http://127.0.0.1:5000/next_month";
const API_CATEGORY_EXPENSES = "http://127.0.0.1:5000/category_expenses";
const COLORS = [
  "#F86CE0",
  "#E789FF",
  "#E2A9ED",
  "#D64ADE",
  "#F86CE0",
  "#D16BF4",
];

const ExpensePredictionCard = () => {
  const [totalExpense, setTotalExpense] = useState(0);
  const [month, setMonth] = useState("Loading...");
  const [categoryExpenses, setCategoryExpenses] = useState<
    { category: string; amount: number; color: string }[]
  >([]);

  useEffect(() => {
    async function fetchExpenseData() {
      try {
        const [nextMonthRes, categoryRes] = await Promise.all([
          fetch(API_NEXT_MONTH),
          fetch(API_CATEGORY_EXPENSES),
        ]);

        const nextMonthData = await nextMonthRes.json();
        const categoryData = await categoryRes.json();

        if (nextMonthData) setTotalExpense(nextMonthData);
        if (categoryData.category_breakdown) {
          setCategoryExpenses(
            Object.entries(categoryData.category_breakdown)
              .filter(([_, amount]) => typeof amount === "number" && amount > 0)
              .map(([category, amount], index) => ({
                category,
                amount: parseFloat(amount.toFixed(2)),
                color: COLORS[index % COLORS.length],
              }))
          );
          setMonth(categoryData.month);
        }
      } catch (error) {
        console.error("Error fetching expense data:", error);
      }
    }
    fetchExpenseData();
  }, []);

  return (
    <div className="w-[400px] bg-[#1E1E1E] rounded-2xl p-6 shadow-lg text-[#B9B9B9]">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Expense Prediction</h2>
        <p className="text-lg font-semibold">{month}</p>
      </div>
      <p className="text-sm mt-2">
        Based on your past month, here are your projected expenses for next
        month
      </p>
      <h3 className="text-lg font-semibold mt-4">Total Expense</h3>
      <p className="text-3xl font-bold">${totalExpense.toFixed(2)}</p>

      <div className="grid grid-cols-2 gap-2 mt-4">
        {categoryExpenses.map((expense, index) => (
          <div key={index} className="flex items-center space-x-2">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: expense.color }}
            ></span>
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

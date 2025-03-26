  "use client";

  import React, { useState, useEffect } from "react";

  interface Expense {
    category: string;
    amount: number;
  }

  const ExpensePredictionCard = () => {
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [totalExpense, setTotalExpense] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
      async function fetchExpensePredictions() {
        try {
          setIsLoading(true);
          setError(null);

          // Use environment variable for API base URL if possible
          const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5000';
          
          // Fetch category expenses for the current month
          const response = await fetch(`${apiUrl}/category_expenses`, {
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
          
          // Transform category breakdown into expense array
          const fetchedExpenses = Object.entries(data.category_breakdown || {}).map(([category, amount]) => ({
            category,
            amount: Number(amount)
          }));

          setExpenses(fetchedExpenses);
          setTotalExpense(data.total_spending || 0);
        } catch (error) {
          console.error("Detailed Error fetching expense predictions:", error);
          setError(error instanceof Error ? error.message : "An unknown error occurred");
          
          // Fallback to default expenses if fetch fails
          setExpenses([
            { category: "Transportation", amount: 1100 },
            { category: "Food", amount: 800 },
            { category: "Utilities", amount: 600 },
            { category: "Entertainment", amount: 400 },
            { category: "Miscellaneous", amount: 300 },
          ]);
          setTotalExpense(3200);
        } finally {
          setIsLoading(false);
        }
      }

      fetchExpensePredictions();
    }, []);

    if (isLoading) {
      return (
        <div className="w-[400px] bg-[#1E1E1E] rounded-2xl p-6 shadow-lg text-[#B9B9B9]">
          <div className="animate-pulse">
            <div className="h-6 bg-gray-700 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-700 rounded w-1/2 mb-2"></div>
            <div className="h-12 bg-gray-700 rounded w-full my-4"></div>
            <div className="grid grid-cols-2 gap-2">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="w-2.5 h-2.5 bg-gray-700 rounded-full"></div>
                  <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="w-[400px] bg-[#1E1E1E] rounded-2xl p-6 text-red-500">
          <p>Error loading expense predictions:</p>
          <p>{error}</p>
        </div>
      );
    }

    return (
      <div className="w-[400px] bg-[#1E1E1E] rounded-2xl p-6 shadow-lg text-[#B9B9B9]">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Expense prediction</h2>
          <p className="text-lg font-semibold">
            {new Date().toLocaleString('default', { month: 'long' })}
          </p>
        </div>
        <p className="text-sm mt-2">
          Based on your past month, here are your projected expenses
        </p>
        <h3 className="text-lg font-semibold mt-4">Total Expense</h3>
        <p className="text-3xl font-bold">${totalExpense.toLocaleString()}</p>

        <div className="grid grid-cols-2 gap-2 mt-4">
          {expenses.map((expense, index) => (
            <div key={index} className="flex items-center space-x-2">
              <span 
                className="w-2.5 h-2.5 rounded-full"
                style={{
                  backgroundColor: [
                    "#6B46C1", "#9F7AEA", "#805AD5", "#B794F4", "#D6BCFF"
                  ][index % 5]
                }}
              ></span>
              <p className="text-sm">
                {expense.category} - ${expense.amount.toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  export default ExpensePredictionCard;
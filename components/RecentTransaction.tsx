"use client";

import React, { useState, useEffect } from "react";
import SpendingCard from "./Spending";
import Types from "./Types";

const API_RECENT_TRANSACTIONS = "http://127.0.0.1:5000/recent-transactions";

type Transaction = {
  id: number;
  Name: string;
  Amount: number;
  Date: string;
  Category: string;
};

const RecentTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function fetchTransactions() {
      try {
        const response = await fetch(API_RECENT_TRANSACTIONS);
        const data = await response.json();

        if (Array.isArray(data)) {
          setTransactions(
            data.map((txn, index) => ({
              ...txn,
              id: index + 1,
              Name: txn.Note || txn.Category,
              Amount: -Math.abs(txn.Amount),
              Date: new Date(txn.Date).toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              }),
            }))
          );
        } else {
          console.error("Invalid transaction data format", data);
        }
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    }

    fetchTransactions();
  }, []);

  const addExpense = (newExpense: { Category: string; Amount: number }) => {
    const newTransaction: Transaction = {
      id: transactions.length + 1,
      Name: newExpense.Category,
      Amount: -Math.abs(newExpense.Amount),
      Date: new Date().toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      Category: newExpense.Category
    };

    setTransactions((prev) => [newTransaction, ...prev]);
    setIsModalOpen(false);
  };

  return (
    <div className="flex space-x-4">
      <div className="w-80 bg-[#1E1E1E] rounded-2xl p-4 shadow-lg text-[#B9B9B9] relative">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Recent Transactions &gt; </h2>
        </div>

        <div className="mt-4 space-y-4">
          {transactions.length > 0 ? (
            transactions.map((txn) => (
              <div key={txn.id}>
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-400 rounded-full"></div>
                    <div>
                      <p className="text-sm font-semibold">{txn.Name}</p>
                      <p className="text-xs text-gray-400">{txn.Date}</p>
                    </div>
                  </div>
                  <p className="text-sm font-semibold text-red-500">
                    -${Math.abs(txn.Amount)}
                  </p>
                </div>
                <hr className="border-gray-600 mt-2" />
              </div>
            ))
          ) : (
            <p className="text-center text-gray-400">No transactions available</p>
          )}
        </div>

        <button
          className="w-full mt-4 py-3 bg-cyan-500 rounded-full flex items-center justify-center text-black text-2xl font-bold"
          onClick={() => setIsModalOpen(true)}
        >
          +
        </button>

        {isModalOpen && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center">
            <div className="relative bg-[#1E1E1E] p-4 rounded-2xl shadow-lg">
              <SpendingCard onExpenseAdded={addExpense} />
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

      <Types transactions={transactions} />
    </div>
  );
};

export default RecentTransactions;
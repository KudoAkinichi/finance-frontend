"use client";

import React, { useState, useEffect } from "react";
import { Pie, PieChart, Cell } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const COLORS = ["#F86CE0", "#E789FF", "#E2A9ED", "#D64ADE", "#B54ADE", "#8A4ADE"];

interface Transaction {
  id: number;
  Name: string;
  Amount: number;
  Date: string;
  Category: string;
}

interface ExpenseItem {
  category: string;
  amount: number;
}

interface TypesProps {
  transactions: Transaction[];
}

export function Types({ transactions = [] }: TypesProps) {
  const [chartData, setChartData] = useState<ExpenseItem[]>([]);

  useEffect(() => {
    // Check if transactions is undefined or null
    if (!transactions || transactions.length === 0) {
      setChartData([]);
      return;
    }

    // Group transactions by category and sum amounts
    const categoryTotals = transactions.reduce((acc, transaction) => {
      // Ensure we're only processing expenses (negative amounts)
      if (transaction && transaction.Amount < 0) {
        const category = transaction.Category || 'Uncategorized';
        const amount = Math.abs(transaction.Amount);
        
        if (acc[category]) {
          acc[category] += amount;
        } else {
          acc[category] = amount;
        }
      }
      return acc;
    }, {} as Record<string, number>);

    // Convert to array of ExpenseItem
    const processedData = Object.entries(categoryTotals).map(([category, amount]) => ({
      category,
      amount
    }));

    setChartData(processedData);
  }, [transactions]);

  // Create chart configuration
  const chartConfig = chartData.reduce((config, item) => {
    config[item.category] = {
      label: item.category,
      color: COLORS[Object.keys(config).length % COLORS.length],
    };
    return config;
  }, {} as ChartConfig);

  return (
    <div className="w-[400px] bg-[#1E1E1E] rounded-2xl p-6 shadow-lg text-[#B9B9B9]">
      <h2 className="text-lg font-semibold text-center mb-4">
        Expense Breakdown
      </h2>

      {chartData.length > 0 ? (
        <>
          {/* Pie Chart */}
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[250px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={chartData}
                dataKey="amount"
                nameKey="category"
                innerRadius={60}
                fill="#8884d8"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${entry.category}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ChartContainer>

          {/* Category Legend */}
          <div className="mt-4 flex flex-wrap justify-center gap-4">
            {chartData.map((item, index) => (
              <div key={item.category} className="flex items-center gap-2">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                ></div>
                <span className="text-sm font-medium">
                  {item.category} - ${item.amount.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="text-center text-gray-400">
          No expense data available
        </div>
      )}
    </div>
  );
}

export default Types;
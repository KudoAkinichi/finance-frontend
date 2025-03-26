"use client";

import { useEffect, useState } from "react";
import { ChartContainer, type ChartConfig } from "@/components/ui/chart";
import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  TooltipProps,
  XAxis,
} from "recharts";

const chartConfig = {
  expenses: {
    label: "Expenses",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export default function MyChart() {
  const [chartData, setChartData] = useState<
    { month: string; expenses: number }[]
  >([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://127.0.0.1:5000/monthly_expenses");
        const data = await response.json();

        if (!Array.isArray(data)) {
          console.error("Invalid API response:", data);
          return;
        }

        const formattedData = data.map(
          (entry: { Month: string; expenses: number }) => ({
            month: entry.Month, // Expected format: "July 2021"
            expenses: entry.expenses,
          })
        );

        setChartData(formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  // 🔹 Custom Tooltip Component
  const CustomTooltip: React.FC<TooltipProps<number, string>> = ({
    active,
    payload,
  }) => {
    if (active && payload && payload.length) {
      const { month, expenses } = payload[0].payload;
      return (
        <div className="bg-white p-2 border rounded-md shadow-md text-black">
          <p className="text-sm font-semibold">💰 Expense: {expenses}</p>
          <p className="text-sm">📅 Date: {month}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full max-w-3xl mx-auto mt-10">
      <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
        <LineChart
          data={chartData}
          margin={{ left: 12, right: 12 }}
          width={800} // Increased width
        >
          <CartesianGrid vertical={false} horizontal={false} />

          {/* Hide X-Axis labels */}
          <XAxis dataKey="month" tick={false} axisLine={false} />

          {/* 🔹 Custom Tooltip Fix */}
          <Tooltip content={<CustomTooltip />} />

          {/* Removed ChartLegend */}
          <Line
            dataKey="expenses"
            type="linear"
            stroke="blue"
            strokeWidth={2}
            dot={{ r: 5, fill: "blue" }} // Keeps dots at points
          />
        </LineChart>
      </ChartContainer>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { Pie, PieChart } from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const API_URL = "http://127.0.0.1:5000/category_expenses";
const COLORS = ["#F86CE0", "#E789FF", "#E2A9ED", "#D64ADE", "#F86CE0"];

export function Types() {
  const [chartData, setChartData] = useState<
    { category: string; amount: number; fill: string }[]
  >([]);
  const [month, setMonth] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();

        if (data.category_breakdown) {
          setChartData(
            Object.entries(data.category_breakdown)
              .filter(([_, value]) => typeof value === "number" && value > 0) // Ensure numerical values and exclude zero spending
              .map(([category, value], index) => ({
                category,
                amount: value as number,
                fill: COLORS[index % COLORS.length],
              }))
          );
          setMonth(data.month);
        }
      } catch (error) {
        console.error("Error fetching category expenses:", error);
      }
    }
    fetchData();
  }, []);

  const chartConfig = chartData.reduce((config, item) => {
    config[item.category] = {
      label: item.category,
      color: item.fill,
    };
    return config;
  }, {} as ChartConfig);

  return (
    <Card className="flex flex-col items-center">
      <CardContent className="flex-1 pb-0">
        <h2 className="text-lg font-semibold text-center mb-2">
          {month} Expenses
        </h2>
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
            />
          </PieChart>
        </ChartContainer>
        <div className="mt-4 flex flex-wrap justify-center gap-4">
          {chartData.map((item) => (
            <div key={item.category} className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: item.fill }}
              ></div>
              <span className="text-sm font-medium">{item.category}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

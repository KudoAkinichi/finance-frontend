"use client";

const chartData = [
  { month: "January", expenses: 186 },
  { month: "February", expenses: 305 },
  { month: "March", expenses: 237 },
  { month: "April", expenses: 73 },
  { month: "May", expenses: 209 },
  { month: "June", expenses: 214 },
];

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

const chartConfig = {
  expenses: {
    label: "expenses",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export default function MyChart() {
  return (
    <div className="max-w-md mx-auto mt-10">
      <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
        <LineChart
          accessibilityLayer
          data={chartData}
          margin={{
            left: 12,
            right: 12,
          }}
        >
          <CartesianGrid vertical={false} horizontal={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={8}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip
            content={<ChartTooltipContent indicator="dashed" hideLabel />}
          />
          <ChartLegend content={<ChartLegendContent />} />
          <Line
            dataKey="expenses"
            type="linear"
            stroke="blue"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ChartContainer>
    </div>
  );
}

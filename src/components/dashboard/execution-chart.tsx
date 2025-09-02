"use client"

import { Area, AreaChart, CartesianGrid, XAxis, Tooltip } from 'recharts';
import {
  ChartContainer,
  ChartTooltipContent,
} from "@/components/ui/chart"

interface ExecutionChartProps {
  data: any[];
}

export default function ExecutionChart({ data }: ExecutionChartProps) {
  const chartConfig = {
    Executions: {
      label: "Executions",
      color: "hsl(var(--chart-1))",
    },
    Failed: {
      label: "Failed",
      color: "hsl(var(--chart-3))",
    },
  };

  return (
    <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
      <AreaChart
        accessibilityLayer
        data={data}
        margin={{
          left: 12,
          right: 12,
          top: 5,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="date"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <Tooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
        <defs>
          <linearGradient id="fillExecutions" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--color-Executions)" stopOpacity={0.8} />
            <stop offset="95%" stopColor="var(--color-Executions)" stopOpacity={0.1} />
          </linearGradient>
          <linearGradient id="fillFailed" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--color-Failed)" stopOpacity={0.8} />
            <stop offset="95%" stopColor="var(--color-Failed)" stopOpacity={0.1} />
          </linearGradient>
        </defs>
        <Area
          dataKey="Executions"
          type="natural"
          fill="url(#fillExecutions)"
          fillOpacity={0.4}
          stroke="var(--color-Executions)"
          stackId="a"
        />
        <Area
          dataKey="Failed"
          type="natural"
          fill="url(#fillFailed)"
          fillOpacity={0.4}
          stroke="var(--color-Failed)"
          stackId="a"
        />
      </AreaChart>
    </ChartContainer>
  );
}

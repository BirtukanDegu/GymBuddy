"use client";

import { useMemo } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { DAILY_CALORIE_GOAL } from "@/lib/constants";

interface CaloriesChartProps {
  totalCalories?: number;
  activeCalories?: number;
  restCalories?: number;
}

const CHART_COLORS = {
  OUTER: "#d4ff00",
  MIDDLE: "#a78bfa",
  INNER: "#f0abfc",
  BACKGROUND: "#333",
} as const;

const RING_CONFIG = {
  OUTER: { innerRadius: "85%", outerRadius: "100%" },
  MIDDLE: { innerRadius: "65%", outerRadius: "80%" },
  INNER: { innerRadius: "45%", outerRadius: "60%" },
} as const;

export function CaloriesChart({
  totalCalories = 1288,
  activeCalories = 328,
  restCalories = 872,
}: CaloriesChartProps) {
  const chartData = useMemo(() => {
    const totalPercent = (totalCalories / DAILY_CALORIE_GOAL) * 100;
    const activePercent = (activeCalories / DAILY_CALORIE_GOAL) * 100;
    const restPercent = (restCalories / DAILY_CALORIE_GOAL) * 100;

    return {
      outer: [
        { name: "completed", value: totalPercent },
        { name: "remaining", value: 100 - totalPercent },
      ],
      middle: [
        { name: "completed", value: activePercent },
        { name: "remaining", value: 100 - activePercent },
      ],
      inner: [
        { name: "completed", value: restPercent },
        { name: "remaining", value: 100 - restPercent },
      ],
    };
  }, [totalCalories, activeCalories, restCalories]);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData.outer}
            cx="50%"
            cy="50%"
            startAngle={90}
            endAngle={-270}
            innerRadius={RING_CONFIG.OUTER.innerRadius}
            outerRadius={RING_CONFIG.OUTER.outerRadius}
            dataKey="value"
            stroke="none"
          >
            <Cell fill={CHART_COLORS.OUTER} />
            <Cell fill={CHART_COLORS.BACKGROUND} />
          </Pie>

          <Pie
            data={chartData.middle}
            cx="50%"
            cy="50%"
            startAngle={90}
            endAngle={-270}
            innerRadius={RING_CONFIG.MIDDLE.innerRadius}
            outerRadius={RING_CONFIG.MIDDLE.outerRadius}
            dataKey="value"
            stroke="none"
          >
            <Cell fill={CHART_COLORS.MIDDLE} />
            <Cell fill={CHART_COLORS.BACKGROUND} />
          </Pie>

          <Pie
            data={chartData.inner}
            cx="50%"
            cy="50%"
            startAngle={90}
            endAngle={-270}
            innerRadius={RING_CONFIG.INNER.innerRadius}
            outerRadius={RING_CONFIG.INNER.outerRadius}
            dataKey="value"
            stroke="none"
          >
            <Cell fill={CHART_COLORS.INNER} />
            <Cell fill={CHART_COLORS.BACKGROUND} />
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      <div className="absolute inset-0 flex items-center justify-center">
        <p className="text-sm text-gray-400">remaining</p>
      </div>
    </div>
  );
}

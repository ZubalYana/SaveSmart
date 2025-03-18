import React from "react";
import IncomeLineChart from "../IncomeLineChart/IncomeLineChart";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";

export default function IncomeLineChartContainer() {
  const { data: incomes = [], isLoading, isError } = useQuery({
    queryKey: ["incomes"],
    queryFn: async () => {
      const response = await fetch("http://localhost:3000/api/income", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error("Failed to fetch incomes");
      return response.json();
    },
  });

  console.log("Fetched incomes:", incomes);

  const currentYear = dayjs().year();
  const currentMonth = dayjs().month() + 1; 

  const incomeByDay = {};

  incomes.forEach((income) => {
    const isRegular = income.isRegular;
    if (!isRegular) {
      const date = income.dateReceived || income.createdAt;
      if (!date) return;
      const dayLabel = dayjs(date).format("MMM D");

      if (!incomeByDay[dayLabel]) incomeByDay[dayLabel] = 0;
      incomeByDay[dayLabel] += income.amount;
    }
  });

  incomes.forEach((income) => {
    if (income.isRegular && income.periodicity === "Monthly") {
      const salaryDate = dayjs(`${currentYear}-${currentMonth}-${income.dayOfMonth}`);

      if (salaryDate.isValid()) {
        const dayLabel = salaryDate.format("MMM D");
        if (!incomeByDay[dayLabel]) incomeByDay[dayLabel] = 0;
        incomeByDay[dayLabel] += income.amount;
      }
    }
  });

  console.log("Aggregated incomes by day:", incomeByDay);

  const chartData = Object.entries(incomeByDay)
    .map(([day, total]) => ({
      name: day,
      pv: total,
      dayNum: parseInt(day.split(" ")[1]),
    }))
    .sort((a, b) => a.dayNum - b.dayNum);

  console.log("Final chart data:", chartData);

  return (
    <div className="w-[50%] mb-5">
      <IncomeLineChart data={chartData} />
    </div>
  );
}

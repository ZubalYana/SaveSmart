import React, { useMemo } from "react";
import "./IncomeHistory.css";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";

export default function IncomeHistory() {
  const token = localStorage.getItem("token");
  const today = dayjs();
  const queryClient = useQueryClient();

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

  const generateRegularIncomeHistory = (income) => {
    const { startDate, endDate, periodicity, amount, name, dayOfMonth, yearlyDay, yearlyMonth } = income;
    const entries = [];
    let currentDate = dayjs(startDate);
    const finalEndDate = endDate ? dayjs(endDate) : today; 

    while (currentDate.isBefore(finalEndDate) || currentDate.isSame(finalEndDate)) {
      if (periodicity === "Daily") {
        entries.push({ date: currentDate.format("YYYY-MM-DD"), amount, name });
        currentDate = currentDate.add(1, "day");
      } else if (periodicity === "Monthly" && currentDate.date() === dayOfMonth) {
        entries.push({ date: currentDate.format("YYYY-MM-DD"), amount, name });
        currentDate = currentDate.add(1, "month");
      } else if (periodicity === "Yearly" && currentDate.date() === yearlyDay && currentDate.month() + 1 === yearlyMonth) {
        entries.push({ date: currentDate.format("YYYY-MM-DD"), amount, name });
        currentDate = currentDate.add(1, "year");
      } else {
        currentDate = currentDate.add(1, "day");
      }
    }

    return entries;
  };

  const { irregularIncomes, regularIncomeHistory, totalIncome } = useMemo(() => {
    let sum = 0;
    const irregular = [];
    let regularHistory = [];

    incomes.forEach((income) => {
      if (income.isRegular) {
        const entries = generateRegularIncomeHistory(income);
        regularHistory = [...regularHistory, ...entries];
      } else {
        irregular.push(income);
        sum += Number(income.amount);
      }
    });

    regularHistory.sort((a, b) => dayjs(a.date).diff(dayjs(b.date)));

    const totalRegularIncome = regularHistory.reduce((acc, curr) => acc + Number(curr.amount), 0);
    const total = sum + totalRegularIncome;

    return { irregularIncomes: irregular, regularIncomeHistory: regularHistory, totalIncome: total };
  }, [incomes]);

  return (
    <div className="w-full flex flex-col items-center mt-5">
      <h1 className="text-xl font-semibold uppercase text-mainBlue">Income History</h1>
      <div className="w-full flex justify-between px-[30px] mt-4 border-b pb-2">
        <p className="text-base font-medium text-defaultText uppercase">Source</p>
        <p className="text-base font-medium text-defaultText uppercase">Date</p>
        <p className="text-base font-medium text-defaultText uppercase">Amount</p>
      </div>

      <div className="historyCon w-full max-h-[450px] overflow-y-auto">
        {irregularIncomes.map((income, index) => (
          <div key={index} className="w-full flex justify-between px-[30px] py-2 border-b">
            <p className="text-base">{income.name}</p>
            <p className="text-base">{dayjs(income.createdAt).format("YYYY-MM-DD")}</p>
            <p className="text-base">${income.amount}</p>
          </div>
        ))}

        {regularIncomeHistory.map((income, index) => (
          <div key={index} className="w-full flex justify-between px-[30px] py-2 border-b">
            <p className="text-base">{income.name}</p>
            <p className="text-base">{income.date}</p>
            <p className="text-base">${income.amount}</p>
          </div>
        ))}
      </div>

      <div className="w-full flex justify-between px-[30px] mt-4">
        <h2 className="text-lg font-bold">Total Income:</h2>
        <h2 className="text-lg font-bold">${totalIncome.toFixed(2)}</h2>
      </div>
    </div>
  );
}

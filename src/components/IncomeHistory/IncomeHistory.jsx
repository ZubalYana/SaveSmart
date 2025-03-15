import React, { useMemo, useState } from "react";
import "./IncomeHistory.css";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";

export default function IncomeHistory() {
  const token = localStorage.getItem("token");
  const today = dayjs();
  const queryClient = useQueryClient();
  const [sortBy, setSortBy] = useState("date-newest");

  const { data: incomes = [], isLoading, isError, error } = useQuery({
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
        entries.push({ date: currentDate.format("YYYY-MM-DD"), amount, name, type: "Regular" });
        currentDate = currentDate.add(1, "day");
      } else if (periodicity === "Monthly" && currentDate.date() === dayOfMonth) {
        entries.push({ date: currentDate.format("YYYY-MM-DD"), amount, name, type: "Regular" });
        currentDate = currentDate.add(1, "month");
      } else if (periodicity === "Yearly" && currentDate.date() === yearlyDay && currentDate.month() + 1 === yearlyMonth) {
        entries.push({ date: currentDate.format("YYYY-MM-DD"), amount, name, type: "Regular" });
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
        irregular.push({ ...income, type: "Irregular" });
        sum += Number(income.amount);
      }
    });

    const totalRegularIncome = regularHistory.reduce((acc, curr) => acc + Number(curr.amount), 0);
    const total = sum + totalRegularIncome;

    return { irregularIncomes: irregular, regularIncomeHistory: regularHistory, totalIncome: total };
  }, [incomes]);

  const sortedIncomes = useMemo(() => {
    const allIncomes = [...irregularIncomes, ...regularIncomeHistory];

    return allIncomes.sort((a, b) => {
      if (sortBy === "date-oldest") {
        return dayjs(a.date).diff(dayjs(b.date)); 
      } else if (sortBy === "date-newest") {
        return dayjs(b.date).diff(dayjs(a.date)); 
      } else if (sortBy === "amount-high") {
        return b.amount - a.amount; 
      } else if (sortBy === "amount-low") {
        return a.amount - b.amount;
      } else if (sortBy === "type-regular") {
        return a.type.localeCompare(b.type); 
      } else if (sortBy === "type-irregular") {
        return b.type.localeCompare(a.type);
      }
      return 0;
    });
  }, [irregularIncomes, regularIncomeHistory, sortBy]);

  if (isLoading) {
    return (
      <div className="w-full flex flex-col items-center mt-5">
        <h1 className="text-xl font-semibold uppercase text-mainBlue">Income History</h1>
        <p>Loading...</p> 
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full flex flex-col items-center mt-5">
        <h1 className="text-xl font-semibold uppercase text-mainBlue">Income History</h1>
        <p>Error: {error.message}</p> 
      </div>
    );
  }

  if (incomes.length === 0) {
    return (
      <div className="w-full flex flex-col items-center mt-5">
        <h1 className="text-xl font-semibold uppercase text-mainBlue">Income History</h1>
        <p>No data available.</p> 
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center mt-5">
      <h1 className="text-xl font-semibold uppercase text-mainBlue">Income History</h1>

      <div className="w-full px-[30px] mt-4 flex justify-end">
        <select
          className="border px-2 py-1 rounded text-defaultText"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="date-newest">Sort by Date (Newest to Oldest)</option>
          <option value="date-oldest">Sort by Date (Oldest to Newest)</option>
          <option value="amount-high">Sort by Amount (High to Low)</option>
          <option value="amount-low">Sort by Amount (Low to High)</option>
          <option value="type-irregular">Sort by Type (Regular First)</option>
          <option value="type-regular">Sort by Type (Iregular First)</option>
        </select>
      </div>

      <div className="w-full flex justify-between px-[30px] mt-4 border-b pb-2">
        <p className="text-base font-medium text-defaultText uppercase">Source</p>
        <p className="text-base font-medium text-defaultText uppercase">Type</p>
        <p className="text-base font-medium text-defaultText uppercase">Date</p>
        <p className="text-base font-medium text-defaultText uppercase">Amount</p>
      </div>

      <div className="historyCon w-full max-h-[450px] overflow-y-auto">
        {sortedIncomes.map((income, index) => (
          <div key={index} className="w-full flex justify-between px-[30px] py-2 border-b">
            <p className="text-base">{income.name}</p>
            <p className="text-base">{income.type}</p>
            <p className="text-base">{income.date || dayjs(income.createdAt).format("YYYY-MM-DD")}</p>
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

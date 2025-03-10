import React from "react";
import "./IncomeHistory.css";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";

export default function IncomeHistory() {
  const token = localStorage.getItem("token");

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

  const generateRegularIncomeDates = (income) => {
    const today = dayjs();
    const startDate = today.subtract(6, "months"); 
    const endDate = today.add(6, "months"); 
    let occurrences = [];

    if (income.periodicity === "Daily") {
      for (let date = startDate; date.isBefore(endDate); date = date.add(1, "day")) {
        occurrences.push({ ...income, dateReceived: date.toISOString() });
      }
    } else if (income.periodicity === "Weekly" && income.dayOfWeek) {
      for (let date = startDate; date.isBefore(endDate); date = date.add(1, "week")) {
        occurrences.push({ ...income, dateReceived: date.toISOString() });
      }
    } else if (income.periodicity === "Monthly" && income.dayOfMonth) {
      for (let date = startDate; date.isBefore(endDate); date = date.add(1, "month")) {
        occurrences.push({ ...income, dateReceived: date.toISOString() });
      }
    } else if (income.periodicity === "Yearly" && income.yearlyMonth && income.yearlyDay) {
      for (let date = startDate; date.isBefore(endDate); date = date.add(1, "year")) {
        occurrences.push({ ...income, dateReceived: date.toISOString() });
      }
    }

    return occurrences;
  };

  const incomeHistory = incomes.flatMap((income) => {
    return income.isRegular ? generateRegularIncomeDates(income) : [income];
  });

  const sortedIncomes = incomeHistory.sort((a, b) => dayjs(b.dateReceived).diff(dayjs(a.dateReceived)));

  return (
    <div className="w-full flex flex-col items-center mt-5">
      <h1 className="text-xl font-semibold uppercase text-mainBlue">Income History</h1>
      <div className="w-full flex justify-between px-[30px] mt-4 border-b pb-2">
        <p className="text-base font-medium text-defaultText uppercase">Source</p>
        <p className="text-base font-medium text-defaultText uppercase">Type</p>
        <p className="text-base font-medium text-defaultText uppercase">Date</p>
        <p className="text-base font-medium text-defaultText uppercase">Amount</p>
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p>Error loading incomes.</p>
      ) : (
        sortedIncomes.map((income) => (
          <div key={income._id + income.dateReceived} className="w-full flex justify-between px-[30px] py-2 border-b">
            <p className="text-defaultText">{income.name}</p>
            <p className="text-defaultText">{income.isRegular ? "Regular" : "Irregular"}</p>
            <p className="text-defaultText">{dayjs(income.dateReceived).format("YYYY-MM-DD")}</p>
            <p className="text-defaultText">{income.amount} {income.currency}</p>
          </div>
        ))
      )}
    </div>
  );
}

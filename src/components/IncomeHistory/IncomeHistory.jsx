import React from "react";
import "./IncomeHistory.css";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";

export default function IncomeHistory() {
  const token = localStorage.getItem("token");
  let incomesSum = 0;
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

  function logIrregularIncome() {
    incomes.forEach((income) => {
      if (!income.isRegular) {
        console.log(income);
        incomesSum += Number(income.amount);
      }
    })
  }
  logIrregularIncome()

  console.log(incomesSum)


  return (
    <div className="w-full flex flex-col items-center mt-5">
      <h1 className="text-xl font-semibold uppercase text-mainBlue">Income History</h1>
      <div className="w-full flex justify-between px-[30px] mt-4 border-b pb-2">
        <p className="text-base font-medium text-defaultText uppercase">Source</p>
        <p className="text-base font-medium text-defaultText uppercase">Type</p>
        <p className="text-base font-medium text-defaultText uppercase">Date</p>
        <p className="text-base font-medium text-defaultText uppercase">Amount</p>
      </div>

      <div className="historyCon w-full max-h-[450px] overflow-y-auto">
      {/* {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p>Error loading incomes.</p>
      ) : (

      )} */}
      </div>

    </div>
  );
}

import React from 'react'
import IncomeLineChart from '../IncomeLineChart/IncomeLineChart'
import { useQuery,useQueryClient } from "@tanstack/react-query";

export default function IncomeLineChartContainer() {
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
      console.log(incomes);

      const data = [
        { name: "Page A", pv: 2400, amt: 2400 },
        { name: "Page B", pv: 1398, amt: 2210 },
        { name: "Page C", pv: 9800, amt: 2290 },
        { name: "Page D", pv: 3908, amt: 2000 },
        { name: "Page E", pv: 4800, amt: 2181 },
        { name: "Page F", pv: 3800, amt: 2500 },
        { name: "Page G", pv: 4300, amt: 2100 },
      ];


        // const generateRegularIncomeHistory = (income) => {
        //   const { startDate, endDate, periodicity, amount, name, dayOfMonth, yearlyDay, yearlyMonth } = income;
        //   const entries = [];
        //   let currentDate = dayjs(startDate);
        //   const finalEndDate = endDate ? dayjs(endDate) : today;
      
        //   while (currentDate.isBefore(finalEndDate) || currentDate.isSame(finalEndDate)) {
        //     if (periodicity === "Daily") {
        //       entries.push({ date: currentDate.format("MM/DD/YYYY"), amount, name, type: "Regular" });
        //       currentDate = currentDate.add(1, "day");
        //     } else if (periodicity === "Monthly" && currentDate.date() === dayOfMonth) {
        //       entries.push({ date: currentDate.format("MM/DD/YYYY"), amount, name, type: "Regular" });
        //       currentDate = currentDate.add(1, "month");
        //     } else if (periodicity === "Yearly" && currentDate.date() === yearlyDay && currentDate.month() + 1 === yearlyMonth) {
        //       entries.push({ date: currentDate.format("MM/DD/YYYY"), amount, name, type: "Regular" });
        //       currentDate = currentDate.add(1, "year");
        //     } else {
        //       currentDate = currentDate.add(1, "day");
        //     }
        //   }
        //   return entries;
        // };
  return (
    <div className='w-[50%] mb-5'>
    <IncomeLineChart data={data} />
    </div>
  )
}

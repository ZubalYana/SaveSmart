import React from 'react'
import './IncomeHistory.css'
import { useQuery, useQueryClient } from "@tanstack/react-query";

export default function IncomeHistory() {
    const token = localStorage.getItem("token");
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

    console.log(incomes)

  return (
    <div className='w-full flex flex-col items-center mt-5'>
        <h1 className='text-xl font-semibold uppercase text-mainBlue'>Income History</h1>
        <div className='w-full flex justify-between px-[30px] mt-4'>
            <p className='text-base font-medium text-defaultText uppercase'>Source</p>
            <p className='text-base font-medium text-defaultText uppercase'>Type</p>
            <p className='text-base font-medium text-defaultText uppercase'>Date</p>
            <p className='text-base font-medium text-defaultText uppercase'>Income</p>
        </div>
    </div>
  )
}

import React from "react";
import IncomePieChart from "../IncomePieChart/IncomePieChart";
import { useQuery } from "@tanstack/react-query";

export default function IncomePieChartContainer() {
    const { data: incomes = [], isLoading, isError } = useQuery({
        queryKey: ["incomes"],
        queryFn: async () => {
            const response = await fetch("http://localhost:3000/api/income", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            if (!response.ok) throw new Error("Failed to fetch incomes");
            return response.json();
        },
    });

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error</div>;

    const incomeData = Object.values(
        incomes.reduce((acc, income) => {
            if (income.name) {
                acc[income.name] = acc[income.name] || { name: income.name, value: 0 };
                acc[income.name].value += income.amount;
            }
            return acc;
        }, {})
    );

    return (
        <div className="w-[40%] mb-5">
            <IncomePieChart data={incomeData} />
        </div>
    );
}

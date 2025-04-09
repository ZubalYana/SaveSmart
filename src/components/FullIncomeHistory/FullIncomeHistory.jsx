import React, { useMemo, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { FormControl } from "@mui/material";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { Select, MenuItem } from "@mui/material";
import { PencilIcon, TrashIcon } from "lucide-react";

export default function IncomeHistory() {
  const token = localStorage.getItem("token");
  const today = dayjs();
  const queryClient = useQueryClient();
  const [sortBy, setSortBy] = useState("date-newest");
  const [editIncome, setEditIncome] = useState(null);
  const [incomeToDelete, setIncomeToDelete] = useState(null);


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
        entries.push({ date: currentDate.format("MM/DD/YYYY"), amount, name, type: "Regular" });
        currentDate = currentDate.add(1, "day");
      } else if (periodicity === "Monthly" && currentDate.date() === dayOfMonth) {
        entries.push({ date: currentDate.format("MM/DD/YYYY"), amount, name, type: "Regular" });
        currentDate = currentDate.add(1, "month");
      } else if (periodicity === "Yearly" && currentDate.date() === yearlyDay && currentDate.month() + 1 === yearlyMonth) {
        entries.push({ date: currentDate.format("MM/DD/YYYY"), amount, name, type: "Regular" });
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

  const handleOpenEdit = (income) => {
    setEditIncome(income);
  };

  const handleCloseEdit = () => {
    setEditIncome(null);
  };

  const handleOpenConfirm = (income) => {
    setIncomeToDelete(income);
  };

  const handleCloseConfirm = () => {
    setIncomeToDelete(null);
  };

  const handleDeleteIncome = async () => {
    if (!incomeToDelete) return;

    try {
      const response = await fetch(`http://localhost:3000/api/income/${incomeToDelete._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to delete income");

      queryClient.invalidateQueries(["incomes"]);
      setIncomeToDelete(null);
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const handleUpdateIncome = async (income) => {
    const updatedIncomeData = {
      name: income.name,
      amount: income.amount,
      currency: income.currency,
      method: income.method,
      isRegular: income.isRegular,
    };

    if (income.isRegular) {
      updatedIncomeData.periodicity = income.periodicity;
      updatedIncomeData.startDate = income.startDate;
      updatedIncomeData.endDate = income.endDate;

      if (income.periodicity === "Monthly") {
        updatedIncomeData.dayOfMonth = income.dayOfMonth;
      } else if (income.periodicity === "Weekly") {
        updatedIncomeData.dayOfWeek = income.dayOfWeek;
      } else if (income.periodicity === "Yearly") {
        updatedIncomeData.yearlyDate = income.yearlyDate;
      }
    } else {
      updatedIncomeData.dateReceived = income.dateReceived;
    }

    try {
      const response = await fetch(`http://localhost:3000/api/income/${income._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedIncomeData),
      });

      if (!response.ok) {
        throw new Error("Failed to update income");
      }

      const result = await response.json();
      console.log("Updated income:", result);
      queryClient.invalidateQueries(["incomes"]);
    } catch (error) {
      console.error("Update error:", error);
    }
  };




  return (
    <div className="w-full flex flex-col items-center relative">
      <h1 className="text-xl font-semibold uppercase text-mainBlue">Income History</h1>

      <div className="absolute top-0 right-0">
        <FormControl
          size="small"
          variant="standard"
          sx={{
            minWidth: 120,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 0.3
          }}
        >
          <FilterAltIcon fontSize="small" />
          <Select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            displayEmpty
            disableUnderline
            sx={{
              fontSize: "0.875rem",
              "&.MuiOutlinedInput-root": { border: "none" },
              "& .MuiSelect-select": { padding: "6px 8px" },
            }}
          >
            <MenuItem value="" disabled>Sort By</MenuItem>
            <MenuItem value="date-newest">Date (Newest to Oldest)</MenuItem>
            <MenuItem value="date-oldest">Date (Oldest to Newest)</MenuItem>
            <MenuItem value="amount-high">Amount (High to Low)</MenuItem>
            <MenuItem value="amount-low">Amount (Low to High)</MenuItem>
            <MenuItem value="type-irregular">Type (Regular First)</MenuItem>
            <MenuItem value="type-regular">Type (Irregular First)</MenuItem>
          </Select>
        </FormControl>
      </div>


      <div className="w-full flex justify-between px-[30px] mt-6 pb-2">
        <p className="text-base font-medium text-defaultText uppercase">Source</p>
        <p className="text-base font-medium text-defaultText uppercase">Type</p>
        <p className="text-base font-medium text-defaultText uppercase">Date</p>
        <p className="text-base font-medium text-defaultText uppercase">Amount</p>
        <p className="text-base font-medium text-defaultText uppercase">Actions</p>
      </div>

      <div className="historyCon w-full max-h-[370px] overflow-y-auto">
        {sortedIncomes.map((income, index) => (
          <div key={index} className="w-[99%] h-[45px] flex items-center justify-between px-[30px] rounded-xl bg-accentLightBlue bg-opacity-10 transition duration-200 hover:bg-accentLightBlue hover:bg-opacity-20 cursor-pointer mb-2">
            <p className="text-base font-medium text-defaultText">{income.name}</p>
            <p className="text-base">{income.type}</p>
            <p className="text-base">{income.date || dayjs(income.createdAt).format("MM/DD/YYYY")}</p>
            <p className="text-base font-normal text-[#1E8A35]">+{income.amount}$</p>
            <div className="w-[55px] flex justify-between">
              <PencilIcon
                className="cursor-pointer text-defaultText transition-transform duration-200 hover:scale-125 hover:text-blue-500"
                size={20}
                onClick={() => handleOpenEdit(income)}
              />
              <TrashIcon
                className="cursor-pointer text-defaultText transition-transform duration-200 hover:scale-125 hover:text-red-500"
                size={20}
                onClick={() => handleOpenConfirm(income)}
              />
            </div>
          </div>

        ))}
      </div>

      {incomeToDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-5 rounded-lg shadow-lg">
            <p>Are you sure you want to delete "{incomeToDelete.name}"?</p>
            <div className="mt-4 flex gap-3 justify-end">
              <button onClick={handleDeleteIncome} className="text-red-600">Yes, Delete</button>
              <button onClick={handleCloseConfirm}>Cancel</button>
            </div>
          </div>
        </div>
      )}
      {editIncome && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-5 rounded-lg shadow-lg w-[300px]">
            <p className="text-lg font-semibold mb-2">Edit Income</p>
            <input
              type="text"
              className="w-full border p-1 mb-2"
              value={editIncome.name}
              onChange={(e) => setEditIncome({ ...editIncome, name: e.target.value })}
            />
            <input
              type="number"
              className="w-full border p-1 mb-2"
              value={editIncome.amount}
              onChange={(e) => setEditIncome({ ...editIncome, amount: e.target.value })}
            />
            <div className="mt-2 flex gap-3 justify-end">
              <button
                className="text-green-600"
                onClick={() => handleUpdateIncome(editIncome)}

              >
                Save
              </button>
              <button onClick={handleCloseEdit}>Cancel</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

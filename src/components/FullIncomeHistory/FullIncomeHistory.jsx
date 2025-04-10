import React, { useMemo, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { PencilIcon, TrashIcon } from "lucide-react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  Autocomplete,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function IncomeHistory() {
  const token = localStorage.getItem("token");
  const today = dayjs();
  const queryClient = useQueryClient();
  const [sortBy, setSortBy] = useState("date-newest");
  const [incomeToDelete, setIncomeToDelete] = useState(null);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editingIncome, setEditingIncome] = useState(null);

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

  const currencySymbols = {
    "840": "$",   // US Dollar (USD)
    "978": "€",   // Euro (EUR)
    "980": "₴",   // Ukrainian Hryvnia (UAH)
    "826": "£",   // British Pound (GBP)
    "392": "¥",   // Japanese Yen (JPY)
    "756": "CHF", // Swiss Franc (CHF)
    "124": "C$",  // Canadian Dollar (CAD)
    "36": "A$",   // Australian Dollar (AUD)
    "208": "kr",  // Danish Krone (DKK)
    "752": "kr",  // Swedish Krona (SEK)
    "203": "Kč",  // Czech Koruna (CZK)
    "156": "¥",   // Chinese Yuan (CNY)
  };
  const CURRENCY_NAMES = {
    "8": "Albanian Lek (ALL)",
    "12": "Algerian Dinar (DZD)",
    "32": "Argentine Peso (ARS)",
    "36": "Australian Dollar (AUD)",
    "48": "Bahraini Dinar (BHD)",
    "50": "Bangladeshi Taka (BDT)",
    "51": "Armenian Dram (AMD)",
    "68": "Bolivian Boliviano (BOB)",
    "72": "Botswana Pula (BWP)",
    "96": "Brunei Dollar (BND)",
    "108": "Burundi Franc (BIF)",
    "116": "Cambodian Riel (KHR)",
    "124": "Canadian Dollar (CAD)",
    "144": "Sri Lankan Rupee (LKR)",
    "152": "Chilean Peso (CLP)",
    "156": "Chinese Yuan (CNY)",
    "170": "Colombian Peso (COP)",
    "188": "Costa Rican Colón (CRC)",
    "191": "Croatian Kuna (HRK)",
    "192": "Cuban Peso (CUP)",
    "203": "Czech Koruna (CZK)",
    "208": "Danish Krone (DKK)",
    "230": "Ethiopian Birr (ETB)",
    "262": "Djiboutian Franc (DJF)",
    "270": "Gambian Dalasi (GMD)",
    "324": "Guinean Franc (GNF)",
    "344": "Hong Kong Dollar (HKD)",
    "352": "Icelandic Króna (ISK)",
    "356": "Indian Rupee (INR)",
    "360": "Indonesian Rupiah (IDR)",
    "368": "Iraqi Dinar (IQD)",
    "376": "Israeli New Shekel (ILS)",
    "392": "Japanese Yen (JPY)",
    "398": "Kazakhstani Tenge (KZT)",
    "400": "Jordanian Dinar (JOD)",
    "404": "Kenyan Shilling (KES)",
    "410": "South Korean Won (KRW)",
    "414": "Kuwaiti Dinar (KWD)",
    "417": "Kyrgyzstani Som (KGS)",
    "418": "Lao Kip (LAK)",
    "422": "Lebanese Pound (LBP)",
    "434": "Libyan Dinar (LYD)",
    "454": "Malawian Kwacha (MWK)",
    "458": "Malaysian Ringgit (MYR)",
    "480": "Mauritian Rupee (MUR)",
    "484": "Mexican Peso (MXN)",
    "496": "Mongolian Tögrög (MNT)",
    "504": "Moroccan Dirham (MAD)",
    "512": "Omani Rial (OMR)",
    "524": "Nepalese Rupee (NPR)",
    "554": "New Zealand Dollar (NZD)",
    "566": "Nigerian Naira (NGN)",
    "578": "Norwegian Krone (NOK)",
    "586": "Pakistani Rupee (PKR)",
    "600": "Paraguayan Guaraní (PYG)",
    "604": "Peruvian Sol (PEN)",
    "608": "Philippine Peso (PHP)",
    "634": "Qatari Riyal (QAR)",
    "643": "Russian Ruble (RUB)",
    "682": "Saudi Riyal (SAR)",
    "690": "Seychellois Rupee (SCR)",
    "694": "Sierra Leonean Leone (SLL)",
    "702": "Singapore Dollar (SGD)",
    "704": "Vietnamese Đồng (VND)",
    "710": "South African Rand (ZAR)",
    "716": "Zimbabwean Dollar (ZWL)",
    "748": "Eswatini Lilangeni (SZL)",
    "752": "Swedish Krona (SEK)",
    "756": "Swiss Franc (CHF)",
    "764": "Thai Baht (THB)",
    "784": "UAE Dirham (AED)",
    "788": "Tunisian Dinar (TND)",
    "800": "Ugandan Shilling (UGX)",
    "818": "Egyptian Pound (EGP)",
    "826": "British Pound Sterling (GBP)",
    "834": "Tanzanian Shilling (TZS)",
    "840": "US Dollar (USD)",
    "858": "Uruguayan Peso (UYU)",
    "860": "Uzbekistani Som (UZS)",
    "886": "Yemeni Rial (YER)",
    "901": "Taiwan Dollar (TWD)",
    "928": "Venezuelan Bolívar (VES)",
    "931": "Aruban Florin (AWG)",
    "933": "Belarusian Ruble (BYN)",
    "936": "Ghanaian Cedi (GHS)",
    "941": "Serbian Dinar (RSD)",
    "943": "Mozambican Metical (MZN)",
    "946": "Romanian Leu (RON)",
    "949": "Turkish Lira (TRY)",
    "950": "CFA Franc BEAC (XAF)",
    "952": "CFA Franc BCEAO (XOF)",
    "968": "Surinamese Dollar (SRD)",
    "969": "Malagasy Ariary (MGA)",
    "971": "Afghan Afghani (AFN)",
    "972": "Tajikistani Somoni (TJS)",
    "973": "Congolese Franc (CDF)",
    "975": "Bulgarian Lev (BGN)",
    "976": "Macedonian Denar (MKD)",
    "978": "Euro (EUR)",
    "980": "Ukrainian Hryvnia (UAH)",
    "985": "Polish Złoty (PLN)",
    "986": "Brazilian Real (BRL)"
  }

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
    setEditingIncome(income);
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setEditingIncome(null);
    setOpenEditModal(false);
  };


  const handleOpenConfirm = (income) => {
    setIncomeToDelete(income);
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setIncomeToDelete(null);
    setOpenConfirm(false);
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
      setOpenConfirm(false);
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

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!editingIncome) return;

    await handleUpdateIncome(editingIncome);
    handleCloseEditModal();
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

      {/* Deletion Confirmation Modal */}
      <Dialog open={openConfirm} onClose={handleCloseConfirm}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>Are you sure you want to delete this income?</DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirm} color="primary">Cancel</Button>
          <Button onClick={handleDeleteIncome} color="error">Delete</Button>
        </DialogActions>
      </Dialog>

      {/* Edit Income Modal */}
      <Dialog open={openEditModal} onClose={handleCloseEditModal}>
        <DialogTitle>Edit Income</DialogTitle>
        <DialogContent className="w-[600px]">
          <form onSubmit={handleEditSubmit} className="flex flex-col pt-2">
            <div className="flex">
              {/* Left Column */}
              <div className="w-[50%] flex flex-col gap-5">
                {/* Income Name */}
                <TextField
                  label="Income name (e.g. salary, scholarship)"
                  variant="outlined"
                  value={editingIncome?.name || ""}
                  onChange={(e) =>
                    setEditingIncome((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className="w-[260px]"
                />

                {/* Receiving Periodicity */}
                <FormControl sx={{ width: 260 }}>
                  <InputLabel>Receiving periodicity</InputLabel>
                  <Select
                    value={editingIncome?.periodicity || ""}
                    onChange={(e) =>
                      setEditingIncome((prev) => ({
                        ...prev,
                        periodicity: e.target.value,
                        // Reset other fields on change
                        dayOfWeek: null,
                        dayOfMonth: "",
                        yearlyDate: null,
                        yearlyMonth: null,
                        yearlyDay: null,
                      }))
                    }
                    input={<OutlinedInput label="Receiving periodicity" />}
                  >
                    {["Daily", "Weekly", "Monthly", "Yearly"].map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                {/* Periodicity Specific Inputs */}
                {editingIncome?.periodicity === "Weekly" && (
                  <FormControl sx={{ width: 260 }}>
                    <InputLabel>Day of the week</InputLabel>
                    <Select
                      value={editingIncome?.dayOfWeek || ""}
                      onChange={(e) =>
                        setEditingIncome((prev) => ({
                          ...prev,
                          dayOfWeek: e.target.value,
                        }))
                      }
                      input={<OutlinedInput label="Day of the week" />}
                    >
                      {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(
                        (day) => (
                          <MenuItem key={day} value={day}>
                            {day}
                          </MenuItem>
                        )
                      )}
                    </Select>
                  </FormControl>
                )}

                {editingIncome?.periodicity === "Monthly" && (
                  <TextField
                    label="Day of the month (1-31)"
                    type="number"
                    inputProps={{ min: 1, max: 31 }}
                    value={editingIncome?.dayOfMonth || ""}
                    onChange={(e) =>
                      setEditingIncome((prev) => ({
                        ...prev,
                        dayOfMonth: e.target.value,
                      }))
                    }
                    variant="outlined"
                    sx={{ width: 260 }}
                  />
                )}

                {editingIncome?.periodicity === "Yearly" && (
                  <DatePicker
                    views={["month", "day"]}
                    label="Select specific date"
                    value={
                      editingIncome?.yearlyDate ||
                      (editingIncome?.yearlyMonth !== null &&
                        editingIncome?.yearlyDay !== null
                        ? dayjs().month(editingIncome.yearlyMonth - 1).date(editingIncome.yearlyDay)
                        : null)
                    }
                    onChange={(newValue) =>
                      setEditingIncome((prev) => ({
                        ...prev,
                        yearlyDate: newValue,
                        yearlyMonth: newValue?.month() + 1,
                        yearlyDay: newValue?.date(),
                      }))
                    }
                    renderInput={(params) => (
                      <TextField {...params} sx={{ maxWidth: 260 }} />
                    )}
                    className="w-[260px]"
                  />
                )}

                {/* Start Date */}
                <DatePicker
                  label="Start Date"
                  value={dayjs(editingIncome?.startDate) || null}
                  onChange={(newValue) =>
                    setEditingIncome((prev) => ({ ...prev, startDate: newValue }))
                  }
                  className="w-[260px]"
                />

                {/* End Date */}
                <DatePicker
                  label="End Date"
                  value={editingIncome?.endDate ? dayjs(editingIncome.endDate) : null}
                  onChange={(newValue) =>
                    setEditingIncome((prev) => ({
                      ...prev,
                      endDate: newValue || null,
                    }))
                  }
                  className="w-[260px]"
                  slotProps={{
                    textField: {
                      error: false,
                    },
                  }}
                />
              </div>

              {/* Right Column */}
              <div className="w-[50%] flex flex-col gap-5 items-end">
                {/* Receiving Sum */}
                <TextField
                  label="Receiving sum"
                  type="number"
                  inputProps={{ min: 1 }}
                  value={editingIncome?.amount || ""}
                  onChange={(e) =>
                    setEditingIncome((prev) => ({
                      ...prev,
                      amount: e.target.value,
                    }))
                  }
                  variant="outlined"
                  sx={{ width: 260 }}
                />

                {/* Currency Selection */}
                <Autocomplete
                  value={editingIncome?.currency || ""}
                  onChange={(event, newValue) =>
                    setEditingIncome((prev) => ({
                      ...prev,
                      currency: newValue,
                    }))
                  }
                  options={Object.keys(CURRENCY_NAMES)}
                  getOptionLabel={(option) =>
                    CURRENCY_NAMES[option] || `Unknown (${option})`
                  }
                  renderInput={(params) => (
                    <TextField {...params} label="Saving currency" variant="outlined" />
                  )}
                  className="w-[260px]"
                />

                {/* Saving Method */}
                <Autocomplete
                  value={editingIncome?.method || ""}
                  onChange={(event, newValue) =>
                    setEditingIncome((prev) => ({
                      ...prev,
                      method: newValue,
                    }))
                  }
                  options={["Cash", "Card", "Bank Transfer", "Mobile Payment", "Cryptocurrency"]}
                  renderInput={(params) => (
                    <TextField {...params} label="Saving Method" variant="outlined" />
                  )}
                  className="w-[260px]"
                />
              </div>
            </div>

            {/* Buttons */}
            <DialogActions className="flex justify-end gap-2 pt-4">
              <Button
                onClick={handleCloseEditModal}
                variant="outlined"
                color="error"
                className="px-4 py-2 rounded-lg hover:bg-red-100"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                className="px-4 py-2 rounded-lg hover:bg-mainBlue text-white"
                sx={{ backgroundColor: "#1a73e8" }}
              >
                Save
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>


    </div>
  );
}

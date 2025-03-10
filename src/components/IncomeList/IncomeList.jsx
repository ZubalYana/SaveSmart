import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { PencilIcon, TrashIcon } from "lucide-react";
import { Snackbar, Alert, Dialog, DialogActions, DialogContent, DialogTitle, Button } from "@mui/material";
import "./IncomeList.css";

import TextField from '@mui/material/TextField';
import { Autocomplete } from "@mui/material";
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const IncomeList = ({ setDeletedIncome, setSnackbarOpen }) => {
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

  const [openConfirm, setOpenConfirm] = useState(false);
  const [localDeletedIncome, setLocalDeletedIncome] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editingIncome, setEditingIncome] = useState(null);

  const handleOpenConfirm = (income) => {
    setLocalDeletedIncome(income);
    setOpenConfirm(true);
  };
  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };
  const handleDeleteIncome = async () => {
    setOpenConfirm(false);
  
    try {
      await fetch(`http://localhost:3000/api/income/${localDeletedIncome._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
  
      queryClient.setQueryData(["incomes"], (old) => old.filter((i) => i._id !== localDeletedIncome._id));

      setDeletedIncome(localDeletedIncome);
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error deleting income:", error);
    }
  };
  const handleOpenEdit = (income) => {
    setEditingIncome(income);
    setOpenEditModal(true);
  };
  const handleCloseEditModal = () => {
    setOpenEditModal(false);
    setEditingIncome(null);
  };
  const handleEditSubmit = async (event) => {
    event.preventDefault();
    console.log(editingIncome);
    try {
      await fetch(`http://localhost:3000/api/income/${editingIncome._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editingIncome),
      });
  
      queryClient.invalidateQueries(["incomes"]);
      handleCloseEditModal();
    } catch (error) {
      console.error("Error updating income:", error);
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading incomes</p>;

  const regularIncomes = incomes.filter((income) => income.isRegular);
  
  const formatIncomePeriodicity = (periodicity, dayOfMonth, dayOfWeek, yearlyDay, yearlyMonth) => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    
    if (periodicity === 'Monthly') {
      if (dayOfMonth == 1) return `1st of month`;
      if (dayOfMonth == 2) return `2nd of month`;
      if (dayOfMonth == 3) return `3rd of month`;
      return `${dayOfMonth}th of month`;
    }
    
    if (periodicity === 'Daily') return 'Daily';
    if (periodicity === 'Weekly') return `Every ${dayOfWeek}`;
    
    if (periodicity === 'Yearly') {
      let formattedYearlyDay = `${yearlyDay}th`;
      if (yearlyDay == 1) formattedYearlyDay = '1st';
      if (yearlyDay == 2) formattedYearlyDay = '2nd';
      if (yearlyDay == 3) formattedYearlyDay = '3rd';
      
      return `${formattedYearlyDay} of ${months[yearlyMonth - 1]}`;
    }
  };

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

  return (
    <div className="w-full h-full flex flex-col items-center overflow-hidden">
  <h3 className="mb-3 text-3xl text-mainBlue font-semibold" style={{ fontFamily: "Balsamiq Sans" }}>
    Incomes list
  </h3>
  <p className="mb-3 text-lg text-mainBlue font-light">Regular incomes:</p>

  {regularIncomes.length === 0 ? (
    <p className="text-center text-gray-500 text-sm">Oops, seems like you have no regular incomes registered yet!</p>
  ) : (
    <div className="w-full">
      <div className="w-full flex items-center px-6 mb-2">
        <p className="w-[23%] uppercase text-sm font-medium text-defaultText">Source</p>
        <p className="w-[18%] uppercase text-sm font-medium text-defaultText">Income</p>
        <p className="w-[27%] uppercase text-sm font-medium text-defaultText">Receiving every</p>
        <p className="w-[27%] uppercase text-sm font-medium text-defaultText">Saving way</p>
        <p className="uppercase text-sm font-medium text-defaultText">Actions</p>
      </div>
      <div className="regularIncomesContainer w-full h-[510px] overflow-y-scroll">
        {regularIncomes.map((income) => (
          <div
            key={income._id}
            className="w-full h-[45px] flex items-center px-3 rounded-xl bg-accentLightBlue bg-opacity-10 
                     transition duration-200 hover:bg-accentLightBlue hover:bg-opacity-20 cursor-pointer mb-2"
          >
            <p className="w-[200px] text-base font-medium text-defaultText">{income.name}</p>
            <p className="w-[140px] text-base font-normal text-[#1E8A35]">
              {income.amount}{currencySymbols[income.currency] || ''}
            </p>
            <p className="w-[220px] text-base font-normal text-defaultText">
              {formatIncomePeriodicity(income.periodicity, income.dayOfMonth, income.dayOfWeek, income.yearlyDay, income.yearlyMonth)}
            </p>
            <p className="w-[200px] text-base font-normal text-defaultText">{income.method}</p>
            <div className="w-[60px] flex justify-between">
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
    </div>
  )}

  <Dialog open={openConfirm} onClose={handleCloseConfirm}>
    <DialogTitle>Confirm Deletion</DialogTitle>
    <DialogContent>Are you sure you want to delete this income?</DialogContent>
    <DialogActions>
      <Button onClick={handleCloseConfirm} color="primary">
        Cancel
      </Button>
      <Button onClick={handleDeleteIncome} color="error">
        Delete
      </Button>
    </DialogActions>
  </Dialog>

  <Dialog open={openEditModal} onClose={handleCloseEditModal}>
  <DialogTitle>Edit Income</DialogTitle>
  <DialogContent>
    <form onSubmit={handleEditSubmit} className="flex flex-col gap-3 pt-2">
      {/* Income Name */}
      <TextField
        label="Income name (e.g. salary, scholarship)"
        variant="outlined"
        value={editingIncome?.name || ""}
        onChange={(e) => setEditingIncome((prev) => ({ ...prev, name: e.target.value }))}
        className="w-[300px]"
      />

      {/* Receiving Periodicity */}
      <FormControl sx={{ width: 300 }}>
        <InputLabel>Receiving periodicity</InputLabel>
        <Select
          value={editingIncome?.periodicity || ""}
          onChange={(e) => setEditingIncome((prev) => ({ ...prev, periodicity: e.target.value }))}
          input={<OutlinedInput label="Receiving periodicity" />}
        >
          {["Daily", "Weekly", "Monthly", "Yearly"].map((option) => (
            <MenuItem key={option} value={option}>{option}</MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Conditional Periodicity Inputs */}
      {editingIncome?.periodicity === "Weekly" && (
        <FormControl sx={{ width: 300 }}>
          <InputLabel>Day of the week</InputLabel>
          <Select
            value={editingIncome?.dayOfWeek || ""}
            onChange={(e) => setEditingIncome((prev) => ({ ...prev, dayOfWeek: e.target.value }))}
            input={<OutlinedInput label="Day of the week" />}
          >
            {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
              <MenuItem key={day} value={day}>{day}</MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
      {editingIncome?.periodicity === "Monthly" && (
        <TextField
          label="Day of the month (1-31)"
          type="number"
          inputProps={{ min: 1, max: 31 }}
          value={editingIncome?.dayOfMonth || ""}
          onChange={(e) => setEditingIncome((prev) => ({ ...prev, dayOfMonth: e.target.value }))}
          variant="outlined"
          sx={{ width: 300 }}
        />
      )}
      {editingIncome?.periodicity === "Yearly" && (
        <DatePicker
          views={['month', 'day']}
          label="Select specific date"
          value={editingIncome?.yearlyDate || null}
          onChange={(newValue) => setEditingIncome((prev) => ({ ...prev, yearlyDate: newValue }))}
          renderInput={(params) => <TextField {...params} sx={{ width: 300 }} />}
        />
      )}

      {/* Receiving Sum */}
      <TextField
        label="Receiving sum"
        type="number"
        inputProps={{ min: 1 }}
        value={editingIncome?.amount || ""}
        onChange={(e) => setEditingIncome((prev) => ({ ...prev, amount: e.target.value }))}
        variant="outlined"
        sx={{ width: 300 }}
      />
      
      {/* Currency Selection */}
      <Autocomplete
        value={editingIncome?.currency || ""}
        onChange={(event, newValue) => setEditingIncome((prev) => ({ ...prev, currency: newValue }))}
        options={Object.keys(CURRENCY_NAMES)}
        getOptionLabel={(option) => CURRENCY_NAMES[option] || `Unknown (${option})`}
        renderInput={(params) => <TextField {...params} label="Saving currency" variant="outlined" />}
        className="w-[300px]"
      />

      {/* Saving Method */}
      <Autocomplete
        value={editingIncome?.method || ""}
        onChange={(event, newValue) => setEditingIncome((prev) => ({ ...prev, method: newValue }))}
        options={["Cash", "Card", "Bank Transfer", "Mobile Payment", "Cryptocurrency"]}
        renderInput={(params) => <TextField {...params} label="Saving Method" variant="outlined" />}
        className="w-[300px]"
      />

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
};

export default IncomeList;

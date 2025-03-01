import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { PencilIcon, TrashIcon } from "lucide-react";
import { Snackbar, Alert, Dialog, DialogActions, DialogContent, DialogTitle, Button } from "@mui/material";
import "./IncomeList.css";

const IncomeList = () => {
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
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [deletedIncome, setDeletedIncome] = useState(null);

  const handleOpenConfirm = (income) => {
    setDeletedIncome(income);
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleDeleteIncome = async () => {
    setOpenConfirm(false);

    try {
      await fetch(`http://localhost:3000/api/income/${deletedIncome._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      queryClient.setQueryData(["incomes"], (old) => old.filter((i) => i._id !== deletedIncome._id));

      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error deleting income:", error);
    }
  };

  const handleUndo = async () => {
    if (!deletedIncome) return;

    try {
      await fetch("http://localhost:3000/api/income", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(deletedIncome),
      });

      queryClient.invalidateQueries(["incomes"]);
    } catch (error) {
      console.error("Error restoring income:", error);
    }

    setSnackbarOpen(false);
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading incomes</p>;

  const regularIncomes = incomes.filter((income) => income.isRegular);

  return (
    <div className="w-full h-full flex flex-col items-center overflow-hidden">
      <h3 className="mb-3 text-3xl text-mainBlue font-semibold" style={{ fontFamily: "Balsamiq Sans" }}>
        Incomes list
      </h3>
      <p className="mb-3 text-lg text-mainBlue font-light">Regular incomes:</p>
      <div className="w-full">
        <div className="w-full flex items-center px-6 mb-2">
          <p className="w-[23%] uppercase text-sm font-medium text-defaultText">Source</p>
          <p className="w-[18%] uppercase text-sm font-medium text-defaultText">Income</p>
          <p className="w-[27%] uppercase text-sm font-medium text-defaultText">Receiving every</p>
          <p className="w-[27%] uppercase text-sm font-medium text-defaultText">Saving way</p>
          <p className="uppercase text-sm font-medium text-defaultText">Actions</p>
        </div>
        <div className="regularIncomesContainer w-full h-[60%] overflow-y-scroll">
          {regularIncomes.map((income) => (
            <div
              key={income._id}
              className="w-full h-[45px] flex items-center px-3 rounded-xl bg-accentLightBlue bg-opacity-10 
                       transition duration-200 hover:bg-accentLightBlue hover:bg-opacity-20 cursor-pointer mb-2"
            >
              <p className="w-[200px] text-base font-medium text-defaultText">{income.name}</p>
              <p className="w-[140px] text-base font-normal text-[#1E8A35]">
                {income.amount}
              </p>
              <p className="w-[220px] text-base font-normal text-defaultText">
                {income.periodicity}
              </p>
              <p className="w-[200px] text-base font-normal text-defaultText">{income.method}</p>
              <div className="w-[60px] flex justify-between">
                <PencilIcon
                  className="cursor-pointer text-defaultText transition-transform duration-200 hover:scale-125 hover:text-blue-500"
                  size={20}
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

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }} 
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="success"
          sx={{ width: "100%" }}
          action={
            <Button color="inherit" size="small" onClick={handleUndo}>
              UNDO
            </Button>
          }
        >
          Income deleted!
        </Alert>
      </Snackbar>

    </div>
  );
};

export default IncomeList;

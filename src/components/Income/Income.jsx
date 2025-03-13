import React, { useState } from 'react';
import './Income.css';
import Burger from '../Burger/Burger';
import IncomeList from '../IncomeList/IncomeList';
import IncomeCreationModal from '../IncomeCreationModal/IncomeCreationModal';
import IncomeHistory from '../IncomeHistory/IncomeHistory';
import { Plus, ListChecks } from 'lucide-react';
import Modal from 'react-modal';
Modal.setAppElement('#root');
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { Snackbar, Alert, Dialog, DialogActions, DialogContent, DialogTitle, Button } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { useSelector, useDispatch } from 'react-redux';
import { setIncomeState } from '../../redux/slices/incomeSlice';
import { setOpenSnackbar } from '../../redux/slices/incomeSlice';
export default function Income() {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [deletedIncome, setDeletedIncome] = useState(null);
  const queryClient = useQueryClient();

  const dispatch = useDispatch();
  const {
    isIncomeLoggingModalOpen,
    openSnackbar,
  } = useSelector((state) => state.income);

  const openIncomeLoggingModal = () => {
    dispatch(setIncomeState({
      isIncomeLoggingModalOpen: true,
      selectedIncomeType: null,
      modalStep: 1,
      selectedPeriodicity: '',
      dayOfMonth: '',
      yearlyDate: dayjs().toISOString(), // Correct conversion
      dayOfWeek: '',
      selectedCurrency: "840",
      savingMethod: '',
      receivingSum: '',
      irregularSelectedCurrency: "840",
      irregularSavingMethod: '',
      irregularReceivingSum: '',
      incomeName: '',
      irregularIncomeName: '',
      receivedIncome: dayjs().toISOString() // Convert receivedIncome to string
    }));
  };
  

  const closeIncomeLoggingModal = () => {
    dispatch(setIncomeState({ isIncomeLoggingModalOpen: false }));
  };
  const handleUndo = async () => {
    console.log("Deleted income:", deletedIncome);
    if (!deletedIncome) return;
  
    try {
      const response = await fetch("http://localhost:3000/api/income", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(deletedIncome),
      });
  
      if (!response.ok) {
        throw new Error("Failed to restore income");
      }
  
      const restoredIncome = await response.json();
  
      queryClient.invalidateQueries(["incomes"]);
  
      setSnackbarOpen(false);
      setDeletedIncome(null);
    } catch (error) {
      console.error("Error restoring income:", error);
    }
  };
  
  
  
  const [isIncomesListModalOpen, setisIncomesListModalOpen] = useState(false);
  const openIncomesListModal = () => setisIncomesListModalOpen(true);
  const closeIncomesListModal = () => setisIncomesListModalOpen(false);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className='Income screen xs:p-4 md:p-6 lg:p-7'>
        <Burger />
        <div className='w-[360px] flex justify-between'>
          <button
            className='uppercase p-4 flex bg-accentLightBlue rounded-xl items-center justify-center text-sm font-medium text-customWhite transition-all duration-300 hover:bg-btnBgShade-500 hover:shadow-lg hover:scale-105 hover:bg-opacity-80'
            onClick={openIncomeLoggingModal}
          >
            <Plus className='mr-2' />
            Log new income
          </button>
          <button 
          className='uppercase p-4 flex bg-accentLightBlue text-defaultText bg-opacity-30 rounded-xl items-center justify-center text-sm font-medium transition-all duration-300 hover:bg-btnBgShade-500 hover:text-customWhite hover:shadow-lg hover:scale-105 hover:bg-opacity-80'
          onClick={openIncomesListModal}
          >
            <ListChecks className='mr-2' />
            Incomes list
          </button>
        </div>
        <div className='w-full h-[1px] bg-mainBlue mt-3'></div>
        <IncomeHistory />

        <IncomeCreationModal 
      isOpen={isIncomeLoggingModalOpen} 
      onClose={closeIncomeLoggingModal} 
      dispatch={dispatch}
    />

        <Modal
        isOpen={isIncomesListModalOpen}
        onRequestClose={closeIncomesListModal}
        contentLabel="Incomes list modal"
        style={{
          overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1000
          },
          content: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '60%',
            height: '62%',
            overflow: 'auto',
            borderRadius: '8px',
            outline: 'none',
            padding: '35px',
            paddingTop: '25px',
            backgroundColor: '#fff',
          },
        }}
        >
          <IncomeList setDeletedIncome={setDeletedIncome} setSnackbarOpen={setSnackbarOpen} />

        </Modal>

        <Snackbar
  open={openSnackbar}
  autoHideDuration={3000}
  onClose={() => dispatch(setOpenSnackbar(false))}
  anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
>
  <Alert 
    onClose={() => dispatch(setOpenSnackbar(false))} 
    severity="success" 
    sx={{ width: '100%' }}
  >
    Income saved successfully!
  </Alert>
        </Snackbar>

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
    </LocalizationProvider>

    
  );
};

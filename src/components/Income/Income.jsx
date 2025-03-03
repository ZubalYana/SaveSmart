import React, { useState } from 'react';
import './Income.css';
import Burger from '../Burger/Burger';
import IncomeList from '../IncomeList/IncomeList';
import { Plus, ListChecks } from 'lucide-react';
import Modal from 'react-modal';
Modal.setAppElement('#root');
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { Snackbar, Alert } from "@mui/material";
import IncomeCreationModal from '../IncomeCreationModal/IncomeCreationModal';
import { useDispatch } from "react-redux";

export default function Income() {
  const [isIncomeLoggingModalOpen, setisIncomeLoggingModalOpen] = useState(false);
  const [selectedIncomeType, setSelectedIncomeType] = useState(null);
  const [modalStep, setModalStep] = useState(1);
  const [incomeName, setIncomeName] = useState('');
  const [irregularIncomeName, setIrregularIncomeName] = useState('');
  const [selectedPeriodicity, setSelectedPeriodicity] = useState('');
  const [dayOfMonth, setDayOfMonth] = useState('');
  const [yearlyDate, setYearlyDate] = useState(dayjs());
  const [dayOfWeek, setDayOfWeek] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState("840");
  const [savingMethod, setSavingMethod] = useState("");
  const [receivingSum, setReceivingSum] = useState('');
  const [receivedIncome, setReceivedIncome] = useState(dayjs());
  const [irregularSelectedCurrency, setIrregularSelectedCurrency] = useState("840");
  const [irregularSavingMethod, setIrregularSavingMethod] = useState("");
  const [irregularReceivingSum, setirregularReceivingSum] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const dispatch = useDispatch();
  const openIncomeLoggingModal = () => {
    setisIncomeLoggingModalOpen(true);
    setSelectedIncomeType(null);
    setModalStep(1);
    setSelectedPeriodicity('');
    setDayOfMonth('');
    setYearlyDate(dayjs());
    setDayOfWeek('');
    setSelectedCurrency(null);
    setSavingMethod('');
    setReceivingSum('');
    setSelectedCurrency("840");;
    setIrregularSelectedCurrency("840");
    setIrregularSavingMethod("");
    setirregularReceivingSum('');
    setIncomeName('');
    setIrregularIncomeName('');
  };
  const closeIncomeLoggingModal = () => setisIncomeLoggingModalOpen(false);
  
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

        <IncomeCreationModal 
          isOpen={isIncomeLoggingModalOpen} 
          onClose={closeIncomeLoggingModal} 
          selectedIncomeType={selectedIncomeType}
          setSelectedIncomeType={setSelectedIncomeType}
          modalStep={modalStep}
          setModalStep={setModalStep}
          incomeName={incomeName}
          setIncomeName={setIncomeName}
          irregularIncomeName={irregularIncomeName}
          setIrregularIncomeName={setIrregularIncomeName}
          selectedPeriodicity={selectedPeriodicity}
          setSelectedPeriodicity={setSelectedPeriodicity}
          dayOfMonth={dayOfMonth}
          setDayOfMonth={setDayOfMonth}
          yearlyDate={yearlyDate}
          setYearlyDate={setYearlyDate}
          dayOfWeek={dayOfWeek}
          setDayOfWeek={setDayOfWeek}
          selectedCurrency={selectedCurrency}
          setSelectedCurrency={setSelectedCurrency}
          savingMethod={savingMethod}
          setSavingMethod={setSavingMethod}
          receivingSum={receivingSum}
          setReceivingSum={setReceivingSum}
          receivedIncome={receivedIncome}
          setReceivedIncome={setReceivedIncome}
          dispatch={dispatch}
          irregularSelectedCurrency={irregularSelectedCurrency}
          setIrregularSelectedCurrency={setIrregularSelectedCurrency}
          irregularSavingMethod={irregularSavingMethod}
          setIrregularSavingMethod={setIrregularSavingMethod}
          irregularReceivingSum={irregularReceivingSum}
          setirregularReceivingSum={setirregularReceivingSum}
          openSnackbar={openSnackbar}
          setOpenSnackbar={setOpenSnackbar}
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
          <IncomeList />
        </Modal>

        <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={() => setOpenSnackbar(false)}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: '100%' }}>
            Income saved successfully!
           </Alert>
        </Snackbar>

      </div>
    </LocalizationProvider>

    
  );
};

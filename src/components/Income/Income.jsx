import React, { useState } from 'react';
import './Income.css';
import Burger from '../Burger/Burger';
import { Plus, ListChecks, Pencil, Clock3, Zap, ArrowLeft } from 'lucide-react';
import Modal from 'react-modal';
Modal.setAppElement('#root');
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

export default function Income() {
  const [isIncomeLoggingModalOpen, setisIncomeLoggingModalOpen] = useState(false);
  const [selectedIncomeType, setSelectedIncomeType] = useState(null);
  const [modalStep, setModalStep] = useState(1);
  const [selectedPeriodicity, setSelectedPeriodicity] = useState('');
  const [dayOfMonth, setDayOfMonth] = useState('');
  const [yearlyDate, setYearlyDate] = useState(dayjs());
  const [dayOfWeek, setDayOfWeek] = useState('');

  const openIncomeLoggingModal = () => {
    setisIncomeLoggingModalOpen(true);
    setSelectedIncomeType(null);
    setModalStep(1);
    setSelectedPeriodicity('');
    setDayOfMonth('');
    setYearlyDate(dayjs());
    setDayOfWeek('');
  };

  const closeIncomeLoggingModal = () => setisIncomeLoggingModalOpen(false);

  const handleCardSelect = (type) => {
    setSelectedIncomeType(type);
    setModalStep(2);
  };

  const handleGoBack = () => {
    setModalStep(1);
    setSelectedIncomeType(null);
  };

  const handlePeriodicityChange = (event) => {
    setSelectedPeriodicity(event.target.value);
  };

  const handleDayOfWeekChange = (event) => {
    setDayOfWeek(event.target.value);
  };

  const periodicityOptions = ['Daily', 'Weekly', 'Monthly', 'Yearly'];
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className='Income screen xs:p-4 md:p-6 lg:p-7'>
        <Burger />
        <div className='w-[550px] flex justify-between'>
          <button
            className='uppercase p-4 flex bg-accentLightBlue rounded-xl items-center justify-center text-sm font-medium text-customWhite transition-all duration-300 hover:bg-btnBgShade-500 hover:shadow-lg hover:scale-105 hover:bg-opacity-80'
            onClick={openIncomeLoggingModal}
          >
            <Plus className='mr-2' />
            Log new income
          </button>
          <button className='uppercase p-4 flex bg-accentLightBlue text-defaultText bg-opacity-30 rounded-xl items-center justify-center text-sm font-medium transition-all duration-300 hover:bg-btnBgShade-500 hover:text-customWhite hover:shadow-lg hover:scale-105 hover:bg-opacity-80'>
            <ListChecks className='mr-2' />
            Incomes list
          </button>
          <button className='uppercase p-4 flex bg-accentLightBlue text-defaultText bg-opacity-30 rounded-xl items-center justify-center text-sm font-medium transition-all duration-300 hover:bg-btnBgShade-500 hover:text-customWhite hover:shadow-lg hover:scale-105 hover:bg-opacity-80'>
            <Pencil className='mr-2' size={20} />
            Edit incomes
          </button>
        </div>

        <Modal
          isOpen={isIncomeLoggingModalOpen}
          onRequestClose={closeIncomeLoggingModal}
          contentLabel="User Financial State Modal"
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
              backgroundColor: '#fff',
            },
          }}
        >
          {modalStep === 1 && (
            <div className="modalIncomeType_screen w-full h-auto flex flex-col items-center">
              <h3 className='mb-1 text-4xl text-mainBlue font-semibold' style={{ fontFamily: 'Balsamiq Sans' }}>Let’s create a new income!</h3>
              <p className='text-lg text-defaultText'>Choose the income type:</p>
              <div className='w-full flex justify-between mt-8 px-3'>
                {[{ type: 'Regular income', icon: <Clock3 /> }, { type: 'Irregular income', icon: <Zap /> }].map((item, index) => (
                  <div
                    key={index}
                    onClick={() => handleCardSelect(item.type)}
                    className={`w-[47%] h-[200px] p-4 border-2 rounded-xl flex flex-col items-center justify-center transition-all duration-300 cursor-pointer shadow-lg ${selectedIncomeType === item.type ? 'bg-btnBgShade-500 text-white shadow-lg scale-105' : 'bg-accentLightBlue bg-opacity-20 text-defaultText hover:bg-btnBgShade-500 hover:scale-105 hover:shadow-lg hover:text-customWhite'}`}
                  >
                    <h4 className='text-2xl font-semibold flex items-center'>
                      {item.icon} <span className='ml-2'>{item.type}</span>
                    </h4>
                    <p className='text-sm font-light text-center mt-4'>
                      {item.type === 'Regular income' ? 'This refers to income you receive regularly over a specific period, such as a salary, scholarship, pension, rental income, royalties, or dividends.' : 'This basically means that the income is occasional. For example, it can refer to selling something or receiving money as a gift, etc.'}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {modalStep === 2 && (
            <div className="modalIncomeDetails_screen w-full h-auto flex flex-col items-center">
              <div className='flex items-center justify-start cursor-pointer absolute top-[35px] left-[35px]' onClick={handleGoBack}>
                <ArrowLeft />
                <span className='ml-2 text-defaultText'>Go back</span>
              </div>
              <h3 className='mb-1 text-3xl text-mainBlue font-medium' style={{ fontFamily: 'Balsamiq Sans' }}>
                {selectedIncomeType === 'Regular income' ? 'Creating a Regular Income' : 'Logging an Irregular Income'}
              </h3>
              <p className='text-base text-defaultText'>Fill in the required information for your income.</p>

              <div className="regularIncomeInputs">
                <TextField id="outlined-basic" label="Income name (e.g. salary, scholarship)" variant="outlined" />
                <FormControl sx={{ m: 1, width: 300 }}>
                  <InputLabel id="periodicity-label">Receiving periodicity</InputLabel>
                  <Select
                    labelId="periodicity-label"
                    value={selectedPeriodicity}
                    onChange={handlePeriodicityChange}
                    input={<OutlinedInput label="Receiving periodicity" />}
                  >
                    {periodicityOptions.map((option) => (
                      <MenuItem key={option} value={option}>{option}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {selectedPeriodicity === 'Weekly' && (
                  <FormControl sx={{ m: 1, width: 300 }}>
                    <InputLabel id="day-of-week-label">Day of the week</InputLabel>
                    <Select
                      labelId="day-of-week-label"
                      value={dayOfWeek}
                      onChange={handleDayOfWeekChange}
                      input={<OutlinedInput label="Day of the week" />}
                    >
                      {daysOfWeek.map((day) => (
                        <MenuItem key={day} value={day}>{day}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
                {selectedPeriodicity === 'Monthly' && (
                  <TextField
                    id="day-of-month"
                    label="Day of the month (1-31)"
                    type="number"
                    inputProps={{ min: 1, max: 31 }}
                    value={dayOfMonth}
                    onChange={(e) => setDayOfMonth(e.target.value)}
                    variant="outlined"
                    sx={{ m: 1, width: 300 }}
                  />
                )}
                {selectedPeriodicity === 'Yearly' && (
                  <DatePicker
                    views={['month', 'day']}
                    label="Select specific date"
                    value={yearlyDate}
                    onChange={(newValue) => setYearlyDate(newValue)}
                    renderInput={(params) => <TextField {...params} sx={{ m: 1, width: 300 }} />}
                  />
                )}
              </div>
            </div>
          )}

          <div className="modalScreenIdentifier w-full flex justify-center absolute bottom-7 left-0">
            <div className={`w-2 h-2 border-mainBlue border-2 rounded-full mr-3 ${modalStep === 1 ? 'bg-mainBlue' : ''}`}></div>
            <div className={`w-2 h-2 border-mainBlue border-2 rounded-full ${modalStep === 2 ? 'bg-mainBlue' : ''}`}></div>
          </div>
        </Modal>
      </div>
    </LocalizationProvider>
  );
}

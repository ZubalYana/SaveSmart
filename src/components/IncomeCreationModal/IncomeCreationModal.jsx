import React from 'react';
import Modal from 'react-modal';
Modal.setAppElement('#root');
import { Plus, Clock3, Zap, ArrowLeft } from 'lucide-react';
import TextField from '@mui/material/TextField';
import { Autocomplete } from "@mui/material";
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useSelector, useDispatch } from 'react-redux';
import { setIncomeState } from '../../redux/slices/incomeSlice';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

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
  export default function IncomeCreationModal({ isOpen, onClose }) {

    const periodicityOptions = ['Daily', 'Weekly', 'Monthly', 'Yearly'];
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const savingMethods = ["Cash", "Card", "Bank Transfer", "Mobile Payment", "Cryptocurrency"];
    
    const dispatch = useDispatch();
  const {
    selectedIncomeType,
    modalStep,
    incomeName,
    selectedPeriodicity,
    dayOfMonth,
    yearlyDate,
    dayOfWeek,
    selectedCurrency,
    savingMethod,
    receivingSum,
    receivedIncome,
    irregularSelectedCurrency,
    irregularSavingMethod,
    irregularReceivingSum,
  } = useSelector((state) => state.income);

  
  const closeIncomeLoggingModal = () => {
    onClose();
  };

  const handleCardSelect = (type) => {
    dispatch(setIncomeState({ selectedIncomeType: type, modalStep: 2 }));
  };

  const handleGoBack = () => {
    dispatch(setIncomeState({ modalStep: 1, selectedIncomeType: null }));
  };

  const handlePeriodicityChange = (event) => {
    dispatch(setIncomeState({ selectedPeriodicity: event.target.value }));
  };

  const handleDayOfWeekChange = (event) => {
    dispatch(setIncomeState({ dayOfWeek: event.target.value }));
  };

  const handleIncomeNameChange = (e) => {
    dispatch(setIncomeState({ incomeName: e.target.value }));
  };
  const handleSavingMethodChange = (newValue) => {
    dispatch(setIncomeState({ savingMethod: newValue }));
  };
  const handleReceivingSumChange = (e) => {
    dispatch(setIncomeState({ receivingSum: e.target.value }));
  };
  const handleReceivedIncomeChange = (newValue) => {
    dispatch(setIncomeState({ receivedIncome: newValue })); 
  };
  
  const handleSaveIncome = async () => {
    const isRegular = selectedIncomeType === "Regular income";
  
    const incomeData = {
      name: incomeName,
      amount: isRegular ? receivingSum : irregularReceivingSum,
      currency: isRegular ? selectedCurrency : irregularSelectedCurrency,
      method: isRegular ? savingMethod : irregularSavingMethod,
      isRegular,
      periodicity: isRegular ? selectedPeriodicity : null,
      dayOfMonth: isRegular && selectedPeriodicity === "Monthly" ? dayOfMonth : null,
      dayOfWeek: isRegular && selectedPeriodicity === "Weekly" ? dayOfWeek : null,
      yearlyDate: isRegular && selectedPeriodicity === "Yearly" ? yearlyDate.toISOString() : null,
      dateReceived: isRegular ? null : (receivedIncome ? dayjs(receivedIncome).toISOString() : null),
    };
  
    console.log("Saving income data:", incomeData);
  
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/api/income', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(incomeData),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to save income');
      }
  
      const savedIncome = await response.json();
      dispatch(setIncomeState({ savedIncome: savedIncome.income }));
      console.log('Income saved successfully:', savedIncome);
  
      dispatch(setIncomeState({ openSnackbar: true }));
    } catch (error) {
      console.error('Error saving income:', error);
    }
  
    closeIncomeLoggingModal();
  };
  
  

  return (
    <Modal
    isOpen={isOpen}
    onRequestClose={closeIncomeLoggingModal}
    contentLabel="Creating incomes modal"
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
<h3 className='mb-1 text-3xl text-mainBlue font-semibold' style={{ fontFamily: 'Balsamiq Sans' }}>
{selectedIncomeType === 'Regular income' ? 'Creating a Regular Income' : 'Logging an Irregular Income'}
</h3>
<p className='text-base text-defaultText'>Fill in the required information for your income.</p>

{selectedIncomeType === 'Regular income' && (
<div className="regularIncomeInputs w-full mt-7">
  <div className='w-full flex'>
    <TextField id="outlined-basic" label="Income name (e.g. salary, scholarship)" variant="outlined" className='w-[350px]' value={incomeName} onChange={handleIncomeNameChange} />

    <FormControl sx={{ width: 210, mx: 2.5 }}>
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
      <FormControl sx={{ width: 250 }}>
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
        sx={{ width: 250 }}
      />
    )}
    {selectedPeriodicity === 'Yearly' && (

<LocalizationProvider dateAdapter={AdapterDayjs}>
<DatePicker
  views={['month', 'day']}
  label="Select specific date"
  value={yearlyDate}
  onChange={(newValue) => setYearlyDate(newValue?.toISOString())} // Convert to serializable string
  renderInput={(params) => <TextField {...params} sx={{ width: 250 }} />}
/>

</LocalizationProvider>
    )}
  </div>
  <div className='w-full flex justify-between mt-4'>
    <TextField
      id="receiving-sum"
      label="Receiving sum"
      type="number"
      inputProps={{ min: 1 }}
      value={receivingSum}
      onChange={handleReceivingSumChange}
      variant="outlined"
      sx={{ width: 260 }}
    />
    <Autocomplete
      value={selectedCurrency}
      onChange={(event, newValue) => setSelectedCurrency(newValue)}
      options={Object.keys(CURRENCY_NAMES)}
      getOptionLabel={(option) => CURRENCY_NAMES[option] || `Unknown (${option})`}
      renderInput={(params) => (
        <TextField {...params} label="Saving currency" variant="outlined" />
      )}
      className="w-[300px]"
    />
<Autocomplete
  value={savingMethod}
  onChange={(e, newValue) => handleSavingMethodChange(newValue)}
  options={savingMethods}
  getOptionLabel={(option) => option} 
  renderInput={(params) => (
    <TextField {...params} label="Saving Method" variant="outlined" />
  )}
  className="w-[250px]"
/>
  </div>
  
  <div className='w-full flex justify-center mt-7'>
    <button className='uppercase w-[230px] h-[60px] flex bg-accentLightBlue text-defaultText bg-opacity-30 rounded-xl items-center justify-center text-base font-medium transition-all duration-300 hover:bg-btnBgShade-500 hover:text-customWhite hover:shadow-lg hover:scale-105 hover:bg-opacity-80'
    onClick={handleSaveIncome}
    >
      <Plus className='mr-2' />
      Create income
    </button>
  </div>
</div>
)}
{selectedIncomeType === 'Irregular income' && (
<div className="irregularIncomeInputs w-full mt-7">
  <div className='w-full flex justify-between'>
    <TextField id="outlined-basic" label="Income source ( e.g. sold a car, birthday gift )" variant="outlined" className='w-[530px]' value={incomeName} onChange={handleIncomeNameChange}  />
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <DatePicker
  views={['month', 'day']}
  label="Received at:"
  value={receivedIncome ? dayjs(receivedIncome) : null} 
  onChange={(newValue) => setReceivedIncome(newValue)}
  renderInput={(params) => <TextField {...params} sx={{ width: 300 }} />}
  sx={{ width: 300 }}
/>
</LocalizationProvider>

  </div>
  <div className='w-full flex justify-between mt-4'>
  <TextField
      id="receiving-sum"
      label="Receiving sum"
      type="number"
      inputProps={{ min: 1 }}
      value={irregularReceivingSum}
      onChange={(e) => dispatch(setIncomeState({ irregularReceivingSum: Number(e.target.value) }))}
      variant="outlined"
      sx={{ width: 260 }}
    />


    <Autocomplete
      value={irregularSelectedCurrency}
      onChange={(event, newValue) => setSelectedCurrency(newValue)}
      options={Object.keys(CURRENCY_NAMES)}
      getOptionLabel={(option) => CURRENCY_NAMES[option] || `Unknown (${option})`}
      renderInput={(params) => (
        <TextField {...params} label="Saving currency" variant="outlined" />
      )}
      className="w-[300px]"
    />

<Autocomplete
  value={savingMethod}
  onChange={(e, newValue) => handleSavingMethodChange(newValue)}
  options={savingMethods}
  getOptionLabel={(option) => option} 
  renderInput={(params) => (
    <TextField {...params} label="Saving Method" variant="outlined" />
  )}
  className="w-[250px]"
/>
  </div>
  <div className='w-full flex justify-center mt-7'>
    <button className='uppercase w-[230px] h-[60px] flex bg-accentLightBlue text-defaultText bg-opacity-30 rounded-xl items-center justify-center text-base font-medium transition-all duration-300 hover:bg-btnBgShade-500 hover:text-customWhite hover:shadow-lg hover:scale-105 hover:bg-opacity-80'
    onClick={handleSaveIncome}
    >
      <Plus className='mr-2' />
      Log income
    </button>
  </div>
</div>
)}
</div>
    )}

    <div className="modalScreenIdentifier w-full flex justify-center absolute bottom-7 left-0">
      <div className={`w-2 h-2 border-mainBlue border-2 rounded-full mr-3 ${modalStep === 1 ? 'bg-mainBlue' : ''}`}></div>
      <div className={`w-2 h-2 border-mainBlue border-2 rounded-full ${modalStep === 2 ? 'bg-mainBlue' : ''}`}></div>
    </div>
    </Modal>
  )
}

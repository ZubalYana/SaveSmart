import { useQuery } from '@tanstack/react-query';
import { PencilIcon, TrashIcon } from 'lucide-react';
import './IncomeList.css';
const IncomeList = () => {
  const token = localStorage.getItem('token');
  
  const { data: incomes = [], isLoading, isError } = useQuery({
    queryKey: ['incomes'],
    queryFn: async () => {
      const response = await fetch('http://localhost:3000/api/income', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch incomes');
      }
      return response.json();
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading incomes</p>;

  const regularIncomes = incomes.filter(income => income.isRegular);
  console.log(regularIncomes)

  function formatIncomePeriodicity(periodicity, dayOfMonth, dayOfWeek, yearlyDay, yearlyMonth) {
    console.log(periodicity);
    if (periodicity === 'Monthly') {
      if (dayOfMonth == 1) {
          return `1st of month`
      }else if (dayOfMonth == 2){
          return `2nd of month`
      }else if(dayOfMonth == 3){
          return `3rd of month`
      }else{
          return `${dayOfMonth}th of month`
      }
    }else if (periodicity === 'Daily'){
      return 'Daily';
    }else if (periodicity === 'Weekly'){
      return `Every ${dayOfWeek}`;
    }else if (periodicity === 'Yearly'){
      let formattedYearlyDay = ''
      const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];
      if(yearlyDay == 1){
        formattedYearlyDay = `1st`
      }else if(yearlyDay == 2){
        formattedYearlyDay = `2nd`
      }else if(yearlyDay == 3){
        formattedYearlyDay = '3d'
      }else{
        formattedYearlyDay = `${dayOfMonth}th`
      }
      return `${formattedYearlyDay} of ${months[yearlyMonth - 1]}`;
    }
  }

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



  return (
    <div className='w-full h-full flex flex-col items-center overflow-hidden'>
                <h3 className='mb-3 text-3xl text-mainBlue font-semibold' style={{ fontFamily: 'Balsamiq Sans' }}>Incomes list</h3>
                <p className='mb-3 text-lg text-mainBlue font-light'>Regular incomes:</p>
    <div className='w-full'>
      <div className='w-full flex items-center px-6 mb-2'>
        <p className='w-[23%] uppercase text-sm font-medium text-defaultText'>Source</p>
        <p className='w-[18%] uppercase text-sm font-medium text-defaultText'>Income</p>
        <p className='w-[27%] uppercase text-sm font-medium text-defaultText'>Receiving every</p>
        <p className='w-[27%] uppercase text-sm font-medium text-defaultText'>Saving way</p>
        <p className='uppercase text-sm font-medium text-defaultText'>Actions</p>
      </div>
      <div className='regularIncomesContainer w-full h-[60%] overflow-y-scroll'>
      {regularIncomes.map((income, index) => (
        <div 
          key={index} 
          className="w-full h-[45px] flex items-center px-3 rounded-xl bg-accentLightBlue bg-opacity-10 
                     transition duration-200 hover:bg-accentLightBlue hover:bg-opacity-20 cursor-pointer mb-2"
        >
          <p className="w-[200px] text-base font-medium text-defaultText">{income.name}</p>
          <p className="w-[140px] text-base font-normal text-[#1E8A35]">
            {income.amount}{currencySymbols[income.currency] || income.currency}
          </p>
          <p className="w-[220px] text-base font-normal text-defaultText">
            {formatIncomePeriodicity(income.periodicity, income.dayOfMonth, income.dayOfWeek, income.yearlyDay, income.yearlyMonth)}
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
            />
          </div>
        </div>
      ))}
      </div>
    </div>
    </div>
  );
};

export default IncomeList;

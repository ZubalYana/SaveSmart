import { useQuery } from '@tanstack/react-query';

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


  return (
    <div className='w-full'>
      {regularIncomes.map((income, index) => (
        <div key={index} className='w-full h-[45px] flex items-center mb-2 bg-accentLightBlue bg-opacity-10 rounded-xl px-3'>
          <p className='w-[200px] text-base font-medium text-defaultText'>{income.name}</p>
          <p className='w-[100px] text-base font-normal text-[#1E8A35]'>{income.amount}</p>
          <p className='w-[200px] text-base font-normal text-defaultText'>{formatIncomePeriodicity(income.periodicity, income.dayOfMonth, income.dayOfWeek, income.yearlyDay, income.yearlyMonth)}</p>
        </div>
      ))}
    </div>
  );
};

export default IncomeList;

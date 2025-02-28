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

  return (
    <div className='w-full'>
      {regularIncomes.map((income, index) => (
        <div key={index} className='w-full h-[45px] flex items-center mb-2 bg-accentLightBlue bg-opacity-10 rounded-xl px-3'>
          <p className='w-[200px] text-base font-medium text-defaultText'>{income.name}</p>
          <p className='w-[100px] text-base font-normal text-[#1E8A35]'>{income.amount}</p>
        </div>
      ))}
    </div>
  );
};

export default IncomeList;

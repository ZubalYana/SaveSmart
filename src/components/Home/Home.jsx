import React, { useState, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import './Home.css';
import Tip from '../Tip/Tip';
import FinancialState from '../FinancialState/FinancialState';

const queryClient = new QueryClient();

export default function Home() {
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      setGreeting('Good Morning');
    } else if (currentHour < 18) {
      setGreeting('Good Afternoon');
    } else {
      setGreeting('Good Evening');
    }
  }, []); 

  return (
    <div className="Home screen p-7">
      <h1 className="dynamicGreeting text-2xl font-semibold">{greeting}!</h1>
      <QueryClientProvider client={queryClient}>
        <Tip />
      </QueryClientProvider>
      <FinancialState />
    </div>
  );
}

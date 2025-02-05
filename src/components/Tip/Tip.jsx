import React from 'react';
import { useQuery } from 'react-query';
import './Tip.css';
import axios from 'axios';

const fetchTips = async () => {
  const response = await axios.get('http://localhost:3000/api/tips');
  return response.data;
};

export default function Tip() {
  const { data: tips, error, isLoading } = useQuery('tips', fetchTips);
  console.log('Fetched Tips:', tips); 

  const dailyTip = tips?.length ? tips[new Date().getDate() % tips.length]?.tip || 'No tip available' : 'No tips available';
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching tips</div>;

  return (
    <div className='Tip'>
      <span>Today's tip: </span>
      <span className='Tip_text'>{dailyTip}</span>
    </div>
  );
}

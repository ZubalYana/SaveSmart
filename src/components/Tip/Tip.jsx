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

  const dailyTip = tips?.length ? tips[new Date().getDate() % tips.length]?.tip || 'No tip available' : 'No tips available';

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching tips</div>;

  return (
    <div className='Tip w-[100%] flex items-center mt-2'>
        <div className="tipMark w-[2px] h-[30px] bg-accentLightBlue mr-2"></div>
        <p>
          <span className='font-medium mr-1 text-black'>Today's tip: </span>
          <span className='Tip_text font-light text-defaultText'>{dailyTip}</span>
        </p>
    </div>
  );
}

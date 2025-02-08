import React from 'react'
import './Upcomings.css'
import UpcomingBills from './UpcomingBills'
import UpcomingIncomes from './UpcomingIncomes'
export default function UpcomingBillsAndIncomes() {
  return (
    <div className='UpcomingBillsAndIncomes w-[100%] h-[220px] bg-accentLightBlue bg-opacity-15'>
      <h3 className='mb-4'></h3>
        <div>
          <UpcomingBills />
          <UpcomingIncomes />
        </div>
    </div>
  )
}

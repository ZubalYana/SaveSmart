import React from 'react'
import './Upcomings.css'
import UpcomingBills from './UpcomingBills'
import UpcomingIncomes from './UpcomingIncomes'
export default function UpcomingBillsAndIncomes() {
  return (
    <div className='UpcomingBillsAndIncomes w-[48%] h-[400px] bg-accentLightBlue bg-opacity-15'>
      <h3 className='mb-4'>Upcoming Bills And Incomes here</h3>
        <div>
          <UpcomingBills />
          <UpcomingIncomes />
        </div>
    </div>
  )
}

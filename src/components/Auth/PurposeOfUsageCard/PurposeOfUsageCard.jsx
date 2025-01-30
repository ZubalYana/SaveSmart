import React from 'react'
import './PurposeOfUsageCard.css'

export default function PurposeOfUsageCard({ icon, title, subtitle, available }) {
  return (
    <div className='PurposeOfUsageCard text-defaultText w-[250px] h-[290px] rounded-2xl flex flex-col items-center justify-center p-5 bg-accentLightBlue bg-opacity-20 hover:bg-btnBgShade-500 hover:scale-105 hover:shadow-lg hover:text-customWhite transition-all duration-300 cursor-pointer text-center relative'>
      {!available && (
        <p className='coming-soon-tag text-sm font-light text-customWhite bg-mainBlue p-2 rounded-xl absolute top-[20px] right-[-30px]'>
          Coming soon
        </p>
      )}
      <div className="PurposeOfUsageCard_iconCon mb-3">{icon}</div>
      <h4 className='text-xl font-semibold'>{title}</h4>
      <p className='text-sm font-light mt-1'>{subtitle}</p>
    </div>
  )
}

import React from 'react'
import './WhereDidYouHearOption.css'
export default function WhereDidYouHearOption({title, icon}) {
  return (
    <div className='WhereDidYouHearOption w-[430px] h-[60px] rounded-xl flex items-center pl-2 bg-accentLightBlue bg-opacity-20'>
        <img src={icon} alt="option icon" className='w-[25px] h-[25px]' />
        <p className='text-defaultText text-sm font-medium ml-3'>{title}</p>
    </div>
  )
}

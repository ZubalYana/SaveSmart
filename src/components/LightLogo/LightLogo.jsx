import React from 'react'
import './LightLogo.css'
import lightLogo from '/lightLogo.svg'
export default function Logo() {
  return (
    <div className="logo w-[155px] flex justify-between items-center">
      <img src={lightLogo} alt="logo" className='w-[30px]' />
      <p className='uppercase text-base text-customWhite'>Save Smart</p>
    </div>
  )
}

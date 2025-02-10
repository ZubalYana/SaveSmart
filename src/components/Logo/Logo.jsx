import React from 'react'
import './Logo.css'
import logo from '/logo.svg'
export default function Logo() {
  return (
    <div className="logo w-[173px] flex justify-between items-center xs:w-[140px]">
      <img src={logo} alt="logo" className='xs:w-[30px]' />
      <p className='uppercase text-lg text-mainBlue xs:text-sm'>Save Smart</p>
    </div>
  )
}

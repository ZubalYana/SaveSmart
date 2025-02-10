import React from 'react'
import './Logo.css'
import logo from '/logo.svg'
export default function Logo() {
  return (
    <div className="logo w-[173px] flex justify-between items-center xl:w-[140px]">
      <img src={logo} alt="logo" className='xl:w-[30px]' />
      <p className='uppercase text-lg text-mainBlue xl:text-sm'>Save Smart</p>
    </div>
  )
}

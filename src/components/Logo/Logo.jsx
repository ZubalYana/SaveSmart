import React from 'react'
import './Logo.css'
import logo from '/logo.svg'
export default function Logo() {
  return (
    <div className="logo w-[173px] flex justify-between items-center">
      <img src={logo} alt="logo" />
      <p className='uppercase text-lg text-mainBlue'>Save Smart</p>
    </div>
  )
}

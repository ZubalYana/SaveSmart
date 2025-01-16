import React from 'react'
import './WhereDidYouHear.css'
import Logo from '../../Logo/Logo'
export default function WhereDidYouHear() {
  return (
    <div className='WhereDidYouHear w-full h-full'>
        <header className='WhereDidYouHear_header w-full h-8 mb-3'>
          <Logo />
        </header>
        <div className="WhereDidYouHear_content w-full h-full flex flex-col items-center text-defaultText text-2xl font-medium">
          <h1>Where did you hear about <span className='text-accentLightBlue'>SaveSmart</span>?</h1>
        </div>
    </div>
  )
}

import React from 'react'
import './NewsletterSubBanner.css'
export default function NewsletterSubBanner() {
  return (
    <div className='NewsletterSubBanner w-[840px] h-[140px] rounded-xl bg-accentLightBlue bg-opacity-20 p-4 mt-6'>
        <h2 className='uppercase text-xl font-bold text-defaultText'>Subscribe to our newsletter</h2>
        <p className='text-sm font-normal text-defaultText text-opacity-90'>Stay informed about the latest updates, exciting new features, and expert financial advice!</p>
        <button className="subscribeBtn w-[230px] h-[45px] rounded-xl flex justify-center items-center text-white bg-defaultText mt-3 text-lg font-medium uppercase hover:bg-white hover:text-defaultText transition-all duration-300 hover:shadow-xl hover:scale-105">Subscribe</button>

    </div>
  )
}

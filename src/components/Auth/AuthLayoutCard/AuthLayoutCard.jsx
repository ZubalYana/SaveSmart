import React from 'react';
import './AuthLayoutCard.css';

export default function AuthLayoutCard({ title, description, imgSrc, buttonText, buttonIcon, onClick }) {
  return (
    <div className="AuthLayout_card w-[380px] h-[420px] bg-accentLightBlue bg-opacity-10 rounded-xl p-7 flex flex-col items-center">
      <p className='text-3xl font-medium text-mainBlue'>{title}</p>
      <p className='text-sm font-normal text-defaultText text-center mt-2'>{description}</p>
      <img src={imgSrc} alt={`${title} illustration`} className='mt-11' />
      <button
        className='w-[210px] h-[50px] flex bg-accentLightBlue bg-opacity-50 rounded-xl items-center justify-center mt-10 hover:bg-opacity-80 hover:shadow-lg transition-all duration-400'
        onClick={onClick}
      >
        <img src={buttonIcon} alt={`${buttonText} icon`} />
        <p className='text-base font-medium text-black ml-3 uppercase'>{buttonText}</p>
      </button>
    </div>
  );
}

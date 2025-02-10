import React from 'react';
import './AuthLayoutCard.css';

export default function AuthLayoutCard({ title, description, imgSrc, buttonText, buttonIcon, onClick }) {
  return (
    <div className="AuthLayout_card w-[380px] h-[420px] bg-accentLightBlue bg-opacity-10 rounded-xl p-7 flex flex-col items-center xl:w-full xl:mb-5 xl:p-5 xl:h-[390px]">
      <p className='text-3xl font-medium text-mainBlue xl:text-2xl'>{title}</p>
      <p className='text-sm font-normal text-defaultText text-center mt-2 xl:text-sm'>{description}</p>
      <img src={imgSrc} alt={`${title} illustration`} className='mt-11 xl:w-[120px] xl:mt-6' />
      <button
        className='w-[210px] h-[50px] flex bg-accentLightBlue bg-opacity-50 rounded-xl items-center justify-center mt-10 
        hover:bg-btnBgShade-500 hover:scale-105 hover:shadow-lg  transition-all duration-400 hover:text-customWhite xl:w-[190px] xl:h-[45px]'
        onClick={onClick}
      >
        {buttonIcon}
        <p className='text-base font-medium ml-3 uppercase'>{buttonText}</p>
      </button>
    </div>
  );
}

import React from 'react';
import './AuthLayoutCard.css';

export default function AuthLayoutCard({ title, description, imgSrc, buttonText, buttonIcon, onClick }) {
  return (
    <div className="AuthLayout_card w-[380px] h-[420px] bg-accentLightBlue bg-opacity-10 rounded-xl p-7 flex flex-col items-center xs:w-full xs:mb-5 xs:p-5 xs:h-[390px] 2xs:h-[370px] md:w-[350px] md:h-[360px] md:mb-0 lg:w-[380px] lg:h-[420px] lg:p-7">
      <p className='text-3xl font-medium text-mainBlue xs:text-2xl lg:text-3xl'>{title}</p>
      <p className='text-sm font-normal text-defaultText text-center mt-2 xs:text-sm'>{description}</p>
      <img src={imgSrc} alt={`${title} illustration`} className='mt-11 xs:w-[120px] xs:mt-6 lg:w-[140px] lg:mt-11' />
      <button
        className='w-[210px] h-[50px] flex bg-accentLightBlue bg-opacity-50 rounded-xl items-center justify-center mt-10 
        hover:bg-btnBgShade-500 hover:scale-105 hover:shadow-lg  transition-all duration-400 hover:text-customWhite xs:w-[190px] xs:h-[45px] lg:w-[210px] lg:h-[50px]'
        onClick={onClick}
      >
        {buttonIcon}
        <p className='text-base font-medium ml-3 uppercase'>{buttonText}</p>
      </button>
    </div>
  );
}

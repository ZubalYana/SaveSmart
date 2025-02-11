import React from 'react';

export default function WhereDidYouHearOption({ title, icon, isSelected, onClick }) {
  return (
    <div
      className={`WhereDidYouHearOption w-[430px] h-[60px] rounded-xl flex items-center pl-4 mb-[15px] 
      transition-all duration-300 cursor-pointer text-defaultText 
      ${isSelected ? 'bg-btnBgShade-500 text-white shadow-lg scale-105' : 'bg-accentLightBlue bg-opacity-20 hover:bg-btnBgShade-500 hover:scale-105 hover:shadow-lg hover:text-customWhite'}`}
      onClick={onClick}
    >
      <div className="w-[25px] h-[25px]">{icon}</div>
      <p className="text-sm font-extralight ml-3 xs:text-xs sm:text-sm">{title}</p>
    </div>
  );
}

import React from 'react';
import './WhereDidYouHearOption.css';

export default function WhereDidYouHearOption({ title, icon }) {
  return (
    <div className="WhereDidYouHearOption w-[430px] h-[60px] rounded-xl flex items-center pl-4 bg-accentLightBlue bg-opacity-20 mb-[15px] hover:bg-btnBgShade-500 hover:scale-105 hover:shadow-lg hover:text-customWhite transition-all duration-300 cursor-pointer text-defaultText">
      <div className="w-[25px] h-[25px]">{icon}</div>
      <p className="text-sm font-extralight ml-3">{title}</p>
    </div>
  );
}

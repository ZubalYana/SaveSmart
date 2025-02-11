import React from 'react';

export default function PurposeOfUsageCard({ icon, title, subtitle, available, isSelected, onClick }) {
  return (
    <div
      className={`PurposeOfUsageCard text-defaultText w-[250px] h-[290px] rounded-2xl flex flex-col items-center justify-center p-5 text-center relative transition-all duration-300 cursor-pointer xs:mt-6 ${
        available
          ? isSelected
            ? 'bg-btnBgShade-500 text-white scale-105 shadow-lg'  
            : 'bg-accentLightBlue bg-opacity-20 hover:bg-btnBgShade-500 hover:text-white hover:scale-105 hover:shadow-lg'
          : 'bg-gray-400 opacity-50 cursor-not-allowed'
      }`}
      onClick={available ? onClick : null} 
    >
      {!available && (
        <p className='coming-soon-tag text-sm font-light text-white bg-mainBlue p-2 rounded-xl absolute top-[20px] right-[-30px]'>
          Coming soon
        </p>
      )}
      <div className="PurposeOfUsageCard_iconCon mb-3">{icon}</div>
      <h4 className={`text-xl font-semibold ${isSelected ? 'text-white' : ''}`}>{title}</h4>
      <p className={`text-sm font-light mt-1 ${isSelected ? 'text-white' : ''}`}>{subtitle}</p>
    </div>
  );
}

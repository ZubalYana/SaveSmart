import React from "react";
import "./WhatIsNextBtn.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

export default function WhatIsNextBtn({onClick }) {
  return (
    <div
      className="
        whatIsNextButton 
        w-[250px] 
        h-[60px] 
        flex 
        justify-center 
        items-center 
        rounded-xl 
        bg-btnBgShade-500/50 
        text-defaultText 
        text-lg 
        font-medium 
        transition-transform 
        duration-300 
        ease-in-out 
        hover:bg-btnBgShade-500 
        hover:scale-105 
        hover:shadow-lg
        mt-6
        cursor-pointer
        xs:mb-5
      "
      onClick={onClick}
    >
      What's next? 
      <FontAwesomeIcon 
        icon={faArrowRight} 
        className="ml-4 transition-transform duration-300 ease-in-out hover:translate-x-2 text-2xl"
      />
    </div>
  );
}

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setHeardFrom } from '../../../redux/slices/registrationSlice';
import { Share2, Search, Users, Megaphone, MoreHorizontal } from 'lucide-react';
import Logo from '../../Logo/Logo';
import WhereDidYouHearOption from '../WhereDidYouHearOption/WhereDidYouHearOption';
import WhatIsNextBtn from '../WhatIsNextBtn/WhatIsNextBtn';
import { nextStep } from '../../../redux/slices/registrationSlice';

export default function WhereDidYouHear() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const heardFrom = useSelector((state) => state.registration.heardFrom); 

  const options = [
    {
      title: 'Social media (e.g. Instagram, TikTok, X)',
      icon: <Share2 size={24} strokeWidth={2} />,
    },
    {
      title: 'Self search and browsing',
      icon: <Search size={24} strokeWidth={2} />,
    },
    {
      title: 'Friend or family recommendation',
      icon: <Users size={24} strokeWidth={2} />,
    },
    {
      title: 'Advertisements online',
      icon: <Megaphone size={24} strokeWidth={2} />,
    },
    {
      title: 'Other source',
      icon: <MoreHorizontal size={24} strokeWidth={2} />,
    },
  ];

    const handleNextStep = () => {
      if(!heardFrom) return alert('Please select an option');
      dispatch(nextStep());
      navigate('/auth/register/purpose-of-usage');
    }

  return (
    <div className='WhereDidYouHear w-full h-[89vh] p-8'>
      <header className='WhereDidYouHear_header w-full h-8 mb-3'>
        <Logo />
      </header>
      <div className="WhereDidYouHear_content w-full h-[90%] flex flex-col items-center justify-center text-defaultText text-2xl font-medium pt-7">
        <h1>Where did you hear about <span className='text-accentLightBlue'>SaveSmart</span>?</h1>
        <div className="optionsContainer w-[900px] flex justify-between flex-wrap mt-8">
          {options.map((option) => (
            <WhereDidYouHearOption
              key={option.title}
              title={option.title}
              icon={option.icon}
              isSelected={heardFrom === option.title}
              onClick={() => dispatch(setHeardFrom(option.title))}
            />
          ))}
        </div>
        <WhatIsNextBtn onClick={handleNextStep} />
      </div>
    </div>
  );
}

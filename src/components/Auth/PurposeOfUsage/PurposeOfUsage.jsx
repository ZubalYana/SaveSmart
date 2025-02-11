import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setPurposeOfUsage, nextStep } from '../../../redux/slices/registrationSlice';
import { User, BriefcaseBusiness, Users } from 'lucide-react';
import Logo from '../../Logo/Logo';
import PurposeOfUsageCard from '../PurposeOfUsageCard/PurposeOfUsageCard';
import WhatIsNextBtn from '../WhatIsNextBtn/WhatIsNextBtn';

export default function PurposeOfUsage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const purposeOfUsage = useSelector((state) => state.registration.purposeOfUsage);

  const purposes = [
    {
      icon: <User size={100} strokeWidth={2} />,
      title: 'Personal Usage',
      subtitle: 'I want to track my finances and take control of my money.',
      available: true
    },
    {
      icon: <BriefcaseBusiness size={100} strokeWidth={2} />,
      title: 'Business Usage',
      subtitle: 'I want to manage my business finances effectively.',
      available: false
    },
    {
      icon: <Users size={100} strokeWidth={2} />,
      title: 'Family Usage',
      subtitle: 'I want to organize family finances and track them together.',
      available: false
    }
  ];

  const handleNextStep = () => {
    if (!purposeOfUsage) return alert('Please select an option');
    dispatch(nextStep());
    navigate('/auth/register/registration-complete');
  };

  return (
    <div className='PurposeOfUsage w-full h-[89vh] p-8 xs:p-4 md:p-6 lg:p-8'>
      <header className='PurposeOfUsage_header w-full h-8 mb-3'>
        <Logo />
      </header>
      <div className="PurposeOfUsage_content w-full h-[90%] flex flex-col items-center justify-center text-defaultText text-2xl font-medium pt-7 xs:h-auto xs:pt-3 lg:pt-7">
        <h1 className='xs:text-xl lg:text-2xl xs:text-center'>How are you going to use <span className='text-accentLightBlue'>SaveSmart</span>?</h1>
        <div className="purposesContainer w-[60%] flex justify-between mt-8 mb-3 xs:w-full xs:flex-col xs:items-center xs:mt-3 lg:flex-row lg:w-[60%]">
          {purposes.map((purpose) => (
            <PurposeOfUsageCard
              key={purpose.title}
              icon={purpose.icon}
              title={purpose.title}
              subtitle={purpose.subtitle}
              available={purpose.available}
              isSelected={purpose.title === purposeOfUsage}
              onClick={() => purpose.available && dispatch(setPurposeOfUsage(purpose.title))}
            />
          ))}
        </div>
        <WhatIsNextBtn onClick={handleNextStep} />
      </div>
    </div>
  );
}

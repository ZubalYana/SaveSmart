import React from 'react'
import './PurposeOfUsage.css'
import Logo from '../../Logo/Logo'
import PurposeOfUsageCard from '../PurposeOfUsageCard/PurposeOfUsageCard'
import { User, BriefcaseBusiness, Users } from 'lucide-react' 
import WhatIsNextBtn from '../WhatIsNextBtn/WhatIsNextBtn'
export default function PurposeOfUsage() {
    let purposes = [
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
    ]
  return (
    <div className='PurposeOfUsage w-full h-[89vh]'>
        <header className='PurposeOfUsage_header w-full h-8 mb-3'>
            <Logo />
        </header>
        <div className="PurposeOfUsage_content w-full h-[90%] flex flex-col items-center justify-center text-defaultText text-2xl font-medium pt-7">
            <h1>How are you going to use <span className='text-accentLightBlue'>SaveSmart</span>?</h1>
            <div className="purposesContainer w-[60%] flex justify-between mt-8 mb-3">
                {purposes.map((purpose, index) => <PurposeOfUsageCard key={index} icon={purpose.icon} title={purpose.title} subtitle={purpose.subtitle} available={purpose.available} />)}
            </div>
        <WhatIsNextBtn />
        </div>
    </div>
  )
}

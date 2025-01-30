import React from 'react'
import { Share2, Search, Users, Megaphone, MoreHorizontal } from 'lucide-react' 
import './WhereDidYouHear.css'
import Logo from '../../Logo/Logo'
import WhereDidYouHearOption from '../WhereDidYouHearOption/WhereDidYouHearOption'

export default function WhereDidYouHear() {
  let options = [
    {
      title: 'Social media (e.g. Instagram, TikTok, X)',
      icon: <Share2 size={24} strokeWidth={2} />
    },
    {
      title: 'Self search and browsing',
      icon: <Search size={24} strokeWidth={2} />
    },
    {
      title: 'Friend or family recommendation',
      icon: <Users size={24} strokeWidth={2} />
    },
    {
      title: 'Advertisements online',
      icon: <Megaphone size={24} strokeWidth={2} />
    },
    {
      title: 'Other source',
      icon: <MoreHorizontal size={24} strokeWidth={2} />
    }
  ]

  return (
    <div className='WhereDidYouHear w-full h-full'>
      <header className='WhereDidYouHear_header w-full h-8 mb-3'>
        <Logo />
      </header>
      <div className="WhereDidYouHear_content w-full h-full flex flex-col items-center text-defaultText text-2xl font-medium pt-7">
        <h1>Where did you hear about <span className='text-accentLightBlue'>SaveSmart</span>?</h1>
        <div className="optionsContainer w-[900px] flex justify-between flex-wrap mt-8">
          {options.map((option) => (
            <WhereDidYouHearOption
              key={option.title}
              title={option.title}
              icon={option.icon}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

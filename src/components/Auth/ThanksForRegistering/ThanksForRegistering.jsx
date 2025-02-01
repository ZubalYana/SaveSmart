import React from 'react'
import './ThanksForRegistering.css'
import Logo from '../../Logo/Logo'
import { useNavigate } from 'react-router-dom';
import { User } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../../redux/slices/registrationSlice';

export default function ThanksForRegistering() {
  const dispatch = useDispatch();
  const registrationData = useSelector((state) => state.registration);
  const navigate = useNavigate();
  const handleHomepageRedirect = async () => {
    try {
      const resultAction = await dispatch(registerUser(registrationData));
  
      if (registerUser.fulfilled.match(resultAction)) {
        navigate('/auth/login');
      } else {
        console.error('Registration failed:', resultAction.payload);
      }
    } catch (error) {
      console.error('Unexpected error:', error);
    }
  };
  
  return (
    <div className='ThanksForRegistering w-full h-[75vh]'>
      <header className='ThanksForRegistering_header w-full h-8 mb-3'>
        <Logo />
      </header>
      <div className="ThanksForRegistering_content w-full h-full flex flex-col items-center justify-center">
      <h1 className='text-5xl font-semibold text-defaultText mb-2'>
        Thanks for your <span className='text-accentLightBlue'>registration</span>!
      </h1>
      <p className='text-base font-normal text-defaultText w-[850px] text-center mt-3'>
      We’ll now redirect you to the main page. Take your time to explore the application and learn how to manage your finances effectively. A quick tutorial will be provided to help you understand everything and get started
      </p>
      <div
        className="
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
          hover:text-customWhite
          hover:rotate-3
          mt-8
          cursor-pointer
        "
        onClick={handleHomepageRedirect}
      >
        <User className='mr-2' />
        Get started
        </div>
      </div>
    </div>
  )
}

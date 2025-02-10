import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AuthLayout.css';
import Logo from '../../Logo/Logo';
import login from '/login.svg';
import registration from '/registration.svg';
import { UserPlus, LogIn } from 'lucide-react';
import AuthLayoutCard from '../AuthLayoutCard/AuthLayoutCard';

function AuthLayout() {
  const navigate = useNavigate();

  return (
    <div className='AuthLayout w-full h-full p-8 xs:p-4'>
      <header className='AuthLayout_header w-full h-8 mb-3'>
        <Logo />
      </header>
      <div className="AuthLayout_content w-full h-full flex flex-col items-center">
        <h1 className='text-5xl font-bold text-defaultText mb-2 xs:text-3xl xs:mt-3'>Hello there!</h1>
        <p className='text-base font-normal text-defaultText w-[850px] text-center xs:w-full xs:text-xs'>
          <span className='text-accentLightBlue'>SaveSmart</span> is a financial tracker with all the functionality 
          you’ll ever need to manage your finances! Don’t hesitate to give it a try: take control of your <span className='text-accentLightBlue'>expenses</span>, track your <span className='text-accentLightBlue'>income</span>, 
          and become financially <span className='text-accentLightBlue'>confident</span>!
        </p>

        <div className="AuthLayout_cards w-[870px] flex justify-between mt-10 xs:w-full xs:flex-col">
          <AuthLayoutCard
            title="I’m back here!"
            description="Glad to see you here again! Let's regain control over your finances. Log back into your account."
            imgSrc={login}
            buttonText="Log in"
            buttonIcon={<LogIn className='w-5 h-5' />} 
            onClick={() => navigate('/auth/login')}
          />
          <AuthLayoutCard
            title="I’m new here"
            description="We're thrilled to see you here! Give us a try and let us help you manage your finances!"
            imgSrc={registration}
            buttonText="Sign Up"
            buttonIcon={<UserPlus className='w-5 h-5' />} 
            onClick={() => navigate('/auth/register')}
          />
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;

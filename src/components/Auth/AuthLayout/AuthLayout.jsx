import React from 'react';
import './AuthLayout.css';
import Logo from '../../Logo/Logo';
import login from '/login.svg';
import registration from '/registration.svg';
import loginButtonIcon from '/loginButton.svg';
import registrationButtonIcon from '/registrationButton.svg';
function AuthLayout() {
  return (
    <div className='AuthLayout w-full h-full'>
      <header className='AuthLayout_header w-full h-8 mb-3'>
      <Logo />
      </header>
      <div className="AuthLayout_content w-full h-full flex flex-col items-center">
        <h1 className='text-5xl font-bold text-defaultText mb-2'>Hello there!</h1>
        <p className='text-base font-normal text-defaultText w-[850px] text-center'><span className='text-accentLightBlue'>SaveSmart</span> is a financial tracker with all the functionality you’ll ever need to manage your finances! Don’t hesitate to give it a try: take control of your <span className='text-accentLightBlue'>expenses</span>, track your <span className='text-accentLightBlue'>income</span>, and become financially <span className='text-accentLightBlue'>confident</span>!</p>

        <div className="AuthLayout_cards w-[870px] flex justify-between mt-10">
          <div className="AuthLayout_card w-[380px] h-[420px] bg-accentLightBlue bg-opacity-10 rounded-xl p-7 flex flex-col items-center" >
            <p className='text-3xl font-medium text-mainBlue'>I’m back here!</p>
            <p className='text-sm font-normal text-defaultText text-center mt-2'>Glad to see you here again! Let's regain control over your finances. Log back into your account.</p>
            <img src={login} alt="login" className='mt-11' />
            <button className='w-[210px] h-[50px] flex bg-accentLightBlue bg-opacity-50 rounded-xl items-center justify-center mt-10'>
              <img src={loginButtonIcon} alt="loginButtonIcon" />
              <p className='text-base font-medium text-black ml-4 uppercase'>Log in</p>
            </button>
          </div>

          <div className="AuthLayout_card w-[380px] h-[420px] bg-accentLightBlue bg-opacity-10 rounded-xl p-7 flex flex-col items-center" >
            <p className='text-3xl font-medium text-mainBlue'>I’m new here</p>
            <p className='text-sm font-normal text-defaultText text-center mt-2'>We're thrilled to see you here! Give us a try and let us help you manage your finances. Let's get started!</p>
            <img src={registration} alt="login" className='mt-11' />
            <button className='w-[210px] h-[50px] flex bg-accentLightBlue bg-opacity-50 rounded-xl items-center justify-center mt-10'>
              <img src={registrationButtonIcon} alt="loginButtonIcon" />
              <p className='text-base font-medium text-black ml-4 uppercase'>SIGN UP</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;

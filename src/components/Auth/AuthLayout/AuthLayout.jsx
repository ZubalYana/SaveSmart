import React from 'react';
import './AuthLayout.css';
import Logo from '../../Logo/Logo';
function AuthLayout() {
  return (
    <div className='AuthLayout w-full h-full'>
      <header className='AuthLayout_header w-full h-8'>
      <Logo />
      </header>
    </div>
  );
}

export default AuthLayout;

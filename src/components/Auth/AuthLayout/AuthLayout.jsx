import React from 'react';
import './AuthLayout.css';
import { Outlet } from 'react-router-dom';

function AuthLayout() {
  return (
    <div>
      <h1>Welcome to Auth</h1>
      <Outlet /> {/* Nested routes will render here */}
    </div>
  );
}

export default AuthLayout;

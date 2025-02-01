import React, { useState } from 'react';
import './Login.css';
import Logo from '../../Logo/Logo';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { LogIn } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    setError(''); 
    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Login failed');

      localStorage.setItem('token', data.token);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className='Login w-full h-full'>
      <header className='Login_header w-full h-8 mb-3'>
        <Logo />
      </header>
      <div className="Login_content w-full h-full flex flex-col items-center">
        <h1 className='text-4xl font-semibold text-defaultText mb-2'>Welcome back, old friend!</h1>

        <div className="Login_inputCon w-[500px] flex flex-col mt-5 items-center">
          <TextField
            label="Your email"
            variant="outlined"
            className='w-[100%]'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="passwordInputCon w-[100%] mt-4 flex flex-col items-end">
            <TextField
              className='w-[100%]'
              label="Password"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <p className='text-sm font-light text-mainBlue mt-2 cursor-pointer hover:text-btnBgShade-500'>
              Forgot your password?
            </p>
          </div>
          {error && <p className="text-red-500 mt-2">{error}</p>}
          <div
            className="
              whatIsNextButton 
              w-[270px] 
              h-[50px] 
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
            "
            onClick={handleLogin}
          >
            <LogIn className="mr-3" />
            Log in
          </div>
        </div>
      </div>
    </div>
  );
}

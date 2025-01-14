import React, { useState } from 'react';
import './Register.css';
import Logo from '../../Logo/Logo';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Visibility, VisibilityOff } from '@mui/icons-material';
export default function Register() {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className='Register w-full h-full'>
        <header className='Register_header w-full h-8 mb-3'>
          <Logo />
        </header>
        <div className="Register_content w-full h-full flex flex-col items-center">
          <h1 className='text-5xl font-semibold text-defaultText mb-2'>
            Let’s get you into <span className='text-accentLightBlue'>SaveSmart</span>!
          </h1>
          <p className='text-base font-normal text-defaultText w-[850px] text-center'>
            Tell us a little about yourself! The information you provide will help us tailor a
            <span className='text-accentLightBlue'> personalized</span> experience. Your data is
            <span className='text-accentLightBlue'> safe</span> with us and will not be shared with anyone – it stays just between us.
          </p>

          <div className="Register_infoField">
            <div className="Register_inputCon w-[840px] flex justify-between mt-9">
              <TextField id="outlined-basic" label="Name and last name" variant="outlined" className='w-[55%]' />
              <DatePicker label="Date of birth" className='w-[42%]' />
            </div>
            <div className="Register_inputCon w-[840px] flex justify-between mt-6">
              <TextField id="outlined-basic" label="Your email" variant="outlined" className='w-[55%]' />
              <div className="passwordInputCon w-[42%]">
              <TextField
              className='w-[100%]'
              id="password-input"
              label="Password"
              type={showPassword ? "text" : "password"}
              variant="outlined"
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
            <p className='text-xs text-defaultText font-extralight mt-1'>
              <span className='mr-1'>8 symbols min.,</span>
              <span className='mr-1'>numbers,</span>
              <span className='mr-1'>special symbols,</span>
              <span className='mr-1'>capital letter</span>
            </p>
            </div>
            </div>
          </div>
        </div>
      </div>
    </LocalizationProvider>
  );
}

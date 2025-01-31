import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateField } from '../../../redux/slices/registrationSlice';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Logo from '../../Logo/Logo';
import NewsletterSubBanner from '../NewsletterSubBanner/NewsletterSubBanner';
import WhatIsNextBtn from '../WhatIsNextBtn/WhatIsNextBtn';
import dayjs from "dayjs";
import { nextStep } from '../../../redux/slices/registrationSlice';

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { name, email, dateOfBirth, password } = useSelector((state) => state.registration);
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleNextStep = () => {
    if( !name || !email || !dateOfBirth || !password ){
      alert('Please fill in all fields before proceeding.');
      return;
    }
    dispatch(nextStep());
    navigate('/auth/register/where-did-you-hear');
  }

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
              <TextField
                label="Name and last name"
                variant="outlined"
                className='w-[55%] text-sm'
                value={name}
                onChange={(e) => dispatch(updateField({ field: 'name', value: e.target.value }))}
              />
              <DatePicker
                label="Date of birth"
                className='w-[42%]'
                value={dateOfBirth ? dayjs(dateOfBirth) : null}
                onChange={(date) => {
                  const formattedDate = date && date.isValid() ? date.toISOString() : null;
                  dispatch(updateField({ field: 'dateOfBirth', value: formattedDate }));
                }}
                
              />

            </div>
            <div className="Register_inputCon w-[840px] flex justify-between mt-4">
              <TextField
                label="Your email"
                variant="outlined"
                className='w-[55%]'
                value={email}
                onChange={(e) => dispatch(updateField({ field: 'email', value: e.target.value }))}
              />
              <div className="passwordInputCon w-[42%]">
                <TextField
                  className='w-[100%]'
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  variant="outlined"
                  value={password}
                  onChange={(e) => dispatch(updateField({ field: 'password', value: e.target.value }))}
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
          <NewsletterSubBanner />
          <WhatIsNextBtn onClick={handleNextStep} />
        </div>
      </div>
    </LocalizationProvider>
  );
}

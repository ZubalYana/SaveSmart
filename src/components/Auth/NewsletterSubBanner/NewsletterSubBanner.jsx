import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSubscription } from '../../../redux/slices/registrationSlice'; 

export default function NewsletterSubBanner() {
  const dispatch = useDispatch();
  const subscribed = useSelector((state) => state.registration.subscribed);

  return (
    <div className='NewsletterSubBanner w-[840px] h-[140px] rounded-xl bg-accentLightBlue bg-opacity-20 p-4 mt-6 xs:w-[100%] xs:h-auto'>
      <h2 className='uppercase text-xl font-bold text-defaultText'>
        {subscribed ? "You're subscribed! 🎉" : "Subscribe to our newsletter"}
      </h2>
      <p className='text-sm font-normal text-defaultText text-opacity-90'>
        {subscribed
          ? "Thank you for subscribing! You'll receive updates and financial tips."
          : "Stay informed about the latest updates, exciting new features, and expert financial advice!"}
      </p>
      <button
        className={`subscribeBtn w-[230px] h-[45px] rounded-xl flex justify-center items-center text-white ${
          subscribed ? "bg-green-500" : "bg-defaultText"
        } mt-3 text-lg font-medium uppercase hover:bg-white hover:text-defaultText transition-all duration-300 hover:shadow-xl hover:scale-105`}
        onClick={() => dispatch(toggleSubscription())}
      >
        {subscribed ? "Unsubscribe" : "Subscribe"}
      </button>
    </div>
  );
}

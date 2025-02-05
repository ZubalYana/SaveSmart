import React from 'react';
import { motion } from 'framer-motion';
import LightLogo from '../LightLogo/LightLogo';

export default function SideMenu() {
  return (
    <div className='SideMenu w-[270px] h-[90vh] bg-mainBlue p-8 rounded-br-3xl'>
      <LightLogo />
      <motion.div
        className="animatedLine bg-customWhite h-[1px] mt-2"
        initial={{ width: 0 }}
        animate={{ width: "116%" }}
        transition={{ duration: 1, ease: "easeOut" }}
      />
      <ul className="SideMenu_navigationList text-customWhite mt-7">
        <li className="SideMenu_navigationItem mt-3">
          <a href="/" className="SideMenu_navigationLink">
            Home
          </a>
        </li>
        <li className="SideMenu_navigationItem mt-3">
          <a href="/budget" className="SideMenu_navigationLink">
            Budget
          </a>
        </li>
        <li className="SideMenu_navigationItem mt-3">
          <a href="/income" className="SideMenu_navigationLink">
            Income
          </a>
        </li>
        <li className="SideMenu_navigationItem mt-3">
          <a href="/expenses" className="SideMenu_navigationLink">
            Expenses
          </a>
        </li>
        <li className="SideMenu_navigationItem mt-3">
          <a href="/goals" className="SideMenu_navigationLink">
            Goals
          </a>
        </li>
        <li className="SideMenu_navigationItem mt-3">
          <a href="/emergency-funds" className="SideMenu_navigationLink">
            Emergency founds
          </a>
        </li>
        <li className="SideMenu_navigationItem mt-3">
          <a href="/financial-news" className="SideMenu_navigationLink">
            Financial news
          </a>
        </li>
        <li className="SideMenu_navigationItem mt-3">
          <a href="/my-profile" className="SideMenu_navigationLink">
            My profile
          </a>
        </li>
      </ul>
    </div>
  );
}

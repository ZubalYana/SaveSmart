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
    </div>
  );
}

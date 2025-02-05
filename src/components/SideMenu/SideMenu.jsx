import React from 'react';
import { motion } from 'framer-motion';
import { useLocation, Link } from 'react-router-dom';
import LightLogo from '../LightLogo/LightLogo';

export default function SideMenu() {
  const location = useLocation();

  const menuItems = [
    { name: 'Home', path: '/' },
    { name: 'Budget', path: '/budget' },
    { name: 'Income', path: '/income' },
    { name: 'Expenses', path: '/expenses' },
    { name: 'Goals', path: '/goals' },
    { name: 'Emergency Funds', path: '/emergency-funds' },
    { name: 'Financial News', path: '/financial-news' },
    { name: 'My Profile', path: '/my-profile' },
  ];

  return (
    <div className="SideMenu w-[270px] h-[90vh] bg-mainBlue p-8 rounded-br-3xl">
      <LightLogo />
      <motion.div
        className="animatedLine bg-customWhite h-[1px] mt-2"
        initial={{ width: 0 }}
        animate={{ width: "116%" }}
        transition={{ duration: 1, ease: "easeOut" }}
      />
      <ul className="SideMenu_navigationList text-customWhite mt-7">
        {menuItems.map(({ name, path }) => {
          const isActive = location.pathname === path;
          return (
            <li key={path} className="SideMenu_navigationItem mt-3">
              <Link to={path} className="SideMenu_navigationLink relative flex items-center px-4 py-2 rounded-lg">
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute left-0 top-0 h-full w-full bg-customWhite/10 rounded-lg"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{name}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

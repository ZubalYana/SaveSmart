import React from 'react';
import { motion } from 'framer-motion';
import { useLocation, Link } from 'react-router-dom';
import LightLogo from '../LightLogo/LightLogo';
import { Home, DollarSign, CreditCard, BarChart, Target, Bookmark, User } from 'lucide-react';

export default function SideMenu() {
  const location = useLocation();

  const menuItems = [
    { name: 'Home', path: '/', icon: <Home size={20} /> },
    { name: 'Budget', path: '/budget', icon: <DollarSign size={20} /> },
    { name: 'Income', path: '/income', icon: <CreditCard size={20} /> },
    { name: 'Expenses', path: '/expenses', icon: <BarChart size={20} /> },
    { name: 'Goals', path: '/goals', icon: <Target size={20} /> },
    { name: 'Emergency Funds', path: '/emergency-funds', icon: <Bookmark size={20} /> },
    { name: 'Financial News', path: '/financial-news', icon: <BarChart size={20} /> },
    { name: 'My Profile', path: '/my-profile', icon: <User size={20} /> },
  ];

  return (
    <div className="SideMenu w-[19%] h-[100vh] bg-mainBlue p-8 z-50 xs:hidden lg:block">
      <LightLogo />
      <motion.div
        className="animatedLine bg-customWhite h-[1px] mt-2"
        initial={{ width: 0 }}
        animate={{ width: "116%" }}
        transition={{ duration: 1, ease: "easeOut" }}
      />
      <ul className="SideMenu_navigationList text-customWhite mt-7">
        {menuItems.map(({ name, path, icon }) => {
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
                <span className="relative z-10 flex items-center gap-2">
                  {icon}{name}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

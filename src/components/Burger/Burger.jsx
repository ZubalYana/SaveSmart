import React, { useState } from 'react'
import './Burger.css'
import Modal from 'react-modal';
import { motion } from 'framer-motion';
Modal.setAppElement('#root');
import { XIcon } from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';
import { Home, DollarSign, CreditCard, BarChart, Target, Bookmark, User } from 'lucide-react';

export default function Burger() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const location = useLocation();
    
    const openModal = () => {
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false);
    };

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
    <div className="BurgerContainer">
    <div 
    className='Burger w-6 h-5 flex flex-col justify-between absolute xs:top-4 xs:right-4 md:top-6 md:right-6 lg:hidden'
    onClick={openModal}
    >
        <div className="w-full h-[2px] bg-mainBlue rounded-lg"></div>
        <div className="w-full h-[2px] bg-mainBlue rounded-lg"></div>
        <div className="w-full h-[2px] bg-mainBlue rounded-lg"></div>
    </div>
        <Modal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            contentLabel="Burger Navigation Modal"
            style={{
                overlay: {
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    zIndex: 1000
                },
                content: {
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '60%',
                    height: '62%',
                    overflow: 'auto',
                    WebkitOverflowScrolling: 'touch',
                    borderRadius: '8px',
                    outline: 'none',
                    padding: '25px',
                    backgroundColor: '#fff',
                },
            }}
        >  
            <XIcon className='absolute top-4 right-4 text-mainBlue cursor-pointer' onClick={closeModal} />
            <h2 className='text-mainBlue font-bold text-xl w-[80%]'>Navigation:</h2>
                  <ul className="SideMenu_navigationList text-mainBlue mt-4">
                    {menuItems.map(({ name, path, icon }) => {
                      const isActive = location.pathname === path;
                      return (
                        <li key={path} className="SideMenu_navigationItem mt-3">
                          <Link to={path} className="SideMenu_navigationLink relative flex items-center px-4 py-2 rounded-lg">
                            {isActive && (
                              <motion.div
                                layoutId="activeIndicator"
                                className="absolute left-0 top-0 h-full w-full bg-mainBlue/10 rounded-lg"
                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                              />
                            )}
                            <span className="relative z-10 flex items-center gap-2 text-sm">
                              {icon}{name}
                            </span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
        </Modal>
    </div>
  )
}

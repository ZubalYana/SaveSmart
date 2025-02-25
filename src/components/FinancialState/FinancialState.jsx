import React, { useState } from 'react'
import './FinancialState.css'
import Modal from 'react-modal';
Modal.setAppElement('#root');
import { XIcon } from 'lucide-react';
export default function FinancialState() {
    const [financialState, setFinancialState] = useState('Normal');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false);
    };

    const financialStatesDescriptions = [
        {
            name: "Excellent",
            nameColor: "#1E8A35",
            desctiption: "Your finances are in great shape! Your income significantly exceeds your expenses, you have a strong emergency fund. Keep thriving!"
        },
        {
            name: "Normal",
            nameColor: "#1E3A8A",
            desctiption: "Your finances are generally stable. Your income slightly exceeds your expenses, and you’ve managed to save some emergency funds. Keep it up and let’s make it even better!"
        },
        {
            name: "Caution",
            nameColor: "#8A641E",
            desctiption: "Your finances need attention. Your expenses are close to or equal to your income, leaving little room unexpected costs. Let’s work on creating a financial cushion!"
        },
        {
            name: "Critical",
            nameColor: "#8A1E20",
            desctiption: "Your expenses exceed your income, and savings might be limited or nonexistent. It’s essential to reevaluate your spending and create a plan to regain control."
        },
    ]

  return (
    <div className='FinancialState text-defaultText mt-2'>
        <div className='text-2xl font-semibold flex xs:text-base lg:text-2xl'>
            <span style={{fontFamily: 'Afacad'}}>Your financial state:</span>
            <span 
                className='flex ml-2 xs:ml-1 lg:ml-2' 
                style={{ 
                    fontFamily: 'Afacad', 
                    color: financialState === "Normal" ? '#1E3A8A' : 'red' 
                }}
            >
                {financialState}
                <div 
                  className="FinancialState_hint w-4 h-4 rounded-full border-2 border-mainBlue text-mainBlue flex items-center justify-center cursor-pointer text-[12px] ml-1 font-bold xs:w-3 xs:h-3 xs:text-[10px] lg:w-4 lg:h-4 lg:text-[12px]"
                  onClick={openModal}>?</div>
            </span>
        </div>
        <Modal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            contentLabel="User Financial State Modal"
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
            <h2 className='text-3xl text-mainBlue font-bold xs:text-xl xs:w-[80%] lg:text-3xl lg:w-auto'>What is user financial state?</h2>
            <p className='mt-2 text-sm font-light text-defaultText xs:text-xs lg:text-sm'>Your <span className='text-accentLightBlue'>Financial State</span> represents an overview of your current financial health based on your income, expenses, savings, and spending habits. It gives you insights into how well you’re managing your <span className='text-accentLightBlue'>money</span> and whether you’re on track to achieve your financial goals.</p>
            <p className='mt-3 text-base font-medium text-defaultText'>Possible financial states:</p>
            <div className='w-[100%] flex flex-wrap gap-[3%]'>
            {financialStatesDescriptions.map((state, index) => (
                <div key={index} className='w-[48%] h-[110px] rounded-xl p-3 bg-accentLightBlue bg-opacity-30 mt-4 xs:w-full xs:min-h-min lg:w-[48%] lg:h-[110px]'>
                    <p className='font-medium text-base xs:text-sm lg:text-base' style={{color: state.nameColor}}>{state.name}</p>
                    <p className='font-light text-sm xs:text-xs xs:mt-1 lg:text-sm lg:mt-0'>{state.desctiption}</p>
                </div>
            ))}
            </div>
        </Modal>
    </div>
  )
}


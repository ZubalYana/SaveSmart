import React, { useState } from 'react'
import './Income.css'
import Burger from '../Burger/Burger'
import { Plus, ListChecks, Pencil } from 'lucide-react'
import Modal from 'react-modal';
Modal.setAppElement('#root');
export default function Income() {
    const [isIncomeLoggingModalOpen, setisIncomeLoggingModalOpen] = useState(false);
    const openIncomeLoggingModal = () => {
      setisIncomeLoggingModalOpen(true);
    };
    const closeopenIncomeLoggingModal = () => {
      setisIncomeLoggingModalOpen(false);
    };
  return (
    <div className='Income screen xs:p-4 md:p-6 lg:p-7'>
      <Burger />
      <div className='w-[550px] flex justify-between'>
      <button 
        className='uppercase p-4 flex bg-accentLightBlue rounded-xl items-center justify-center text-sm font-medium text-customWhite transition-all duration-300 hover:bg-btnBgShade-500 hover:shadow-lg hover:scale-105 hover:bg-opacity-80'
        onClick={openIncomeLoggingModal}
      >
        <Plus className='mr-2' />
        Log new income
      </button>
      <button className='uppercase p-4 flex bg-accentLightBlue text-defaultText bg-opacity-30 rounded-xl items-center justify-center text-sm font-medium transition-all duration-300 hover:bg-btnBgShade-500 hover:text-customWhite hover:shadow-lg hover:scale-105 hover:bg-opacity-80'>
        <ListChecks className='mr-2' />
        Incomes list
      </button>
      <button className='uppercase p-4 flex bg-accentLightBlue text-defaultText bg-opacity-30 rounded-xl items-center justify-center text-sm font-medium transition-all duration-300 hover:bg-btnBgShade-500 hover:text-customWhite hover:shadow-lg hover:scale-105 hover:bg-opacity-80'>
        <Pencil className='mr-2' size={20} />
        Edit incomes
      </button>

      <Modal
      isOpen={isIncomeLoggingModalOpen}
      onRequestClose={closeopenIncomeLoggingModal}
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

      </Modal>

      </div>
    </div>
  )
}

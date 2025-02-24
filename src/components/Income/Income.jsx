import React, { useState } from 'react'
import './Income.css'
import Burger from '../Burger/Burger'
import { Plus, ListChecks, Pencil, Clock3, Zap } from 'lucide-react'
import Modal from 'react-modal';
Modal.setAppElement('#root');

export default function Income() {
  const [isIncomeLoggingModalOpen, setisIncomeLoggingModalOpen] = useState(false);
  const [selectedIncomeType, setSelectedIncomeType] = useState(null);

  const openIncomeLoggingModal = () => {
    setisIncomeLoggingModalOpen(true);
  };

  const closeopenIncomeLoggingModal = () => {
    setisIncomeLoggingModalOpen(false);
  };

  const handleCardSelect = (type) => {
    setSelectedIncomeType(type);
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
      </div>

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
            padding: '35px',
            backgroundColor: '#fff',
          },
        }}
      >
        <div className="modalIncomeType_screen w-full h-full flex flex-col items-center">
          <h3 className='mb-1 text-4xl text-mainBlue font-semibold' style={{ fontFamily: 'Balsamiq Sans'}}>Let’s create a new income!</h3>
          <p className='text-lg text-defaultText'>Choose the income type:</p>
          <div className='w-[100%] flex justify-between mt-8 px-3'>
            {['Regular income', 'Irregular income'].map((type, index) => (
              <div
                key={index}
                onClick={() => handleCardSelect(type)}
                className={`w-[47%] h-[200px] p-4 border-2 rounded-xl flex flex-col items-center justify-center transition-all duration-300 cursor-pointer shadow-lg 
                  ${selectedIncomeType === type 
                    ? 'bg-btnBgShade-500 text-white shadow-lg scale-105' 
                    : 'bg-accentLightBlue bg-opacity-20 text-defaultText hover:bg-btnBgShade-500 hover:scale-105 hover:shadow-lg hover:text-customWhite'}`}
              >
                <h4 className='text-2xl font-semibold flex items-center'>
                  {type === 'Regular income' ? <Clock3 className='mr-2' /> : <Zap className='mr-2' />}
                  {type}
                </h4>
                <p className='text-sm font-light text-center mt-4'>{type === 'Regular income' 
                  ? 'This refers to income you receive regularly over a specific period, such as a salary, scholarship, pension, rental income, royalties, or dividends.' 
                  : 'This basically means that the income is occasional. For example, it can refer to selling something or receiving money as a gift, etc.'}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Modal>
    </div>
  );
}

import React, { useState } from 'react'
import './Income.css'
import Burger from '../Burger/Burger'
import { Plus, ListChecks, Pencil, Clock3, Zap, ArrowLeft } from 'lucide-react'
import Modal from 'react-modal';
Modal.setAppElement('#root');

export default function Income() {
  const [isIncomeLoggingModalOpen, setisIncomeLoggingModalOpen] = useState(false);
  const [selectedIncomeType, setSelectedIncomeType] = useState(null);
  const [modalStep, setModalStep] = useState(1);

  const openIncomeLoggingModal = () => {
    setisIncomeLoggingModalOpen(true);
    setSelectedIncomeType(null);
    setModalStep(1);
  };

  const closeIncomeLoggingModal = () => {
    setisIncomeLoggingModalOpen(false);
  };

  const handleCardSelect = (type) => {
    setSelectedIncomeType(type);
    setModalStep(2);
  };

  const handleGoBack = () => {
    setModalStep(1);
    setSelectedIncomeType(null);
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
        onRequestClose={closeIncomeLoggingModal}
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
            borderRadius: '8px',
            outline: 'none',
            padding: '35px',
            backgroundColor: '#fff',
          },
        }}
      >
        {modalStep === 1 && (
          <div className="modalIncomeType_screen w-full h-auto flex flex-col items-center">
            <h3 className='mb-1 text-4xl text-mainBlue font-semibold' style={{ fontFamily: 'Balsamiq Sans'}}>Let’s create a new income!</h3>
            <p className='text-lg text-defaultText'>Choose the income type:</p>
            <div className='w-[100%] flex justify-between mt-8 px-3'>
              {[{ type: 'Regular income', icon: <Clock3 /> }, { type: 'Irregular income', icon: <Zap /> }].map((item, index) => (
                <div
                  key={index}
                  onClick={() => handleCardSelect(item.type)}
                  className={`w-[47%] h-[200px] p-4 border-2 rounded-xl flex flex-col items-center justify-center transition-all duration-300 cursor-pointer shadow-lg 
                    ${selectedIncomeType === item.type
                      ? 'bg-btnBgShade-500 text-white shadow-lg scale-105'
                      : 'bg-accentLightBlue bg-opacity-20 text-defaultText hover:bg-btnBgShade-500 hover:scale-105 hover:shadow-lg hover:text-customWhite'}`}
                >
                  <h4 className='text-2xl font-semibold flex items-center'>
                    {item.icon} <span className='ml-2'>{item.type}</span>
                  </h4>
                  <p className='text-sm font-light text-center mt-4'>
                    {item.type === 'Regular income'
                      ? 'This refers to income you receive regularly over a specific period, such as a salary, scholarship, pension, rental income, royalties, or dividends.'
                      : 'This basically means that the income is occasional. For example, it can refer to selling something or receiving money as a gift, etc.'}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {modalStep === 2 && (
          <div className="modalIncomeDetails_screen w-full h-auto flex flex-col items-center">
            <div className='w-full flex items-center justify-start mb-4 cursor-pointer' onClick={handleGoBack}>
              <ArrowLeft />
              <span className='ml-2 text-mainBlue'>Go back</span>
            </div>
            <h3 className='mb-1 text-3xl text-mainBlue font-semibold'>
              {selectedIncomeType === 'Regular income' ? 'Creating a Regular Income' : 'Logging an Irregular Income'}
            </h3>
            <p className='text-lg text-defaultText'>Fill in the required information for your income.</p>
          </div>
        )}

        <div className="modalScreenIdentifier w-full flex justify-center absolute bottom-7 left-0">
          <div className={`w-2 h-2 border-mainBlue border-2 rounded-full mr-3 ${modalStep === 1 ? 'bg-mainBlue' : ''}`}></div>
          <div className={`w-2 h-2 border-mainBlue border-2 rounded-full ${modalStep === 2 ? 'bg-mainBlue' : ''}`}></div>
        </div>
      </Modal>
    </div>
  );
}

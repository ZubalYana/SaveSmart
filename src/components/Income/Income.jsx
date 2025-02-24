import React from 'react'
import './Income.css'
import Burger from '../Burger/Burger'
import { Plus, ListChecks, Pencil } from 'lucide-react'
export default function Income() {
  return (
    <div className='Income screen xs:p-4 md:p-6 lg:p-7'>
      <Burger />
      <div className='w-[550px] flex justify-between'>
      <button className='uppercase p-4 flex bg-accentLightBlue rounded-xl items-center justify-center text-sm font-medium text-customWhite transition-all duration-300 hover:bg-btnBgShade-500 hover:shadow-lg hover:scale-105 hover:bg-opacity-80'>
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
    </div>
  )
}

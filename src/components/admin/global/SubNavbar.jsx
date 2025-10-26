import React, { useState } from 'react'

import { IoIosArrowDown } from "react-icons/io";
import { Navbar } from './Navbar';

export const SubNavbar = () => {
  const [open, setOpen] = useState(false);
  return (
    <div>

   
    <div className='flex justify-between items-center pt-10 p-6'>
        <div>
        <h1 className='font-bold text-3xl leading-[48px]'>
            Manage Jobs and Responses
        </h1>
        <p className='text-[#42526e] '>
        Responses to your jobs and NVites will appear here
        </p>
        </div>

        <div className="relative">
      {/* Button */}
      <div
        onClick={() => setOpen(!open)}
        className="cursor-pointer flex bg-[#0078db] items-center py-3 px-4 gap-3 rounded-sm"
      >
        <span className="text-white">Post Job</span>
        <IoIosArrowDown className={`text-white transition-transform ${open ? "rotate-180" : ""}`} />
      </div>

      {/* Dropdown */}
      {open && (
     <div className="absolute left-[-35px] mt-2 w-40 bg-white shadow-lg rounded-md border border-gray-200 z-50">
     <ul className="text-sm text-gray-700">
       <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
         <a href="/jobposting/hotvacancy" className="block w-full">Hot Vacancy</a>
       </li>
       {/* <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
         <a href="/jobposting/classified" className="block w-full">Classified</a>
       </li> */}
       <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
         <a href="/jobposting/internship" className="block w-full">Internship</a>
       </li>
     </ul>
   </div>
   
        
      )}
    </div>
       
    </div>
    </div>
  )
}

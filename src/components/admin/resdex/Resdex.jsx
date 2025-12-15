import React from 'react'
import { SearchResume } from './SearchResume'
import ExperienceFilter from './ResumeFilter'
import EmploymentDetails from './EmploymentDetailsResdex'
import EducationDetailsResdex from './EducationDetailsResdex'
import DiversityAndAdditionalDetails from './DiversityAndAdditionalDetails'
import WorkAndDisplayDetails from './WorkAndDisplayDetails'

const Resdex = () => {
  return (
    <div className='p-6'>
        <SearchResume />
        <ExperienceFilter />
        <EmploymentDetails />
        <div className='pt-6'>
        <EducationDetailsResdex />
        </div>
        <div className='pt-6'>
        <DiversityAndAdditionalDetails />
        </div>
        <div className='pt-6'>
        <WorkAndDisplayDetails />
        </div>
      
         {/* Footer */}
         <div className="flex items-center justify-between pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-700 cursor-pointer">
              Active in – <span className="font-medium">3 months</span> ▼
            </p>

            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium">
              Search candidates
            </button>
          </div>
    </div>
  )
}

export default Resdex
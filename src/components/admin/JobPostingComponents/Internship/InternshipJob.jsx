import React from 'react'
import InternshipJobPostForm from './InternshipJobPostForm'
import { InternshipDetails } from './InternshipDetails'
import PereferedCandidate from './PreferedCandidate'
import { InternshipDescription } from './InternshipDescription'
import JobResponseSettings from './InternshipResponseSettings'

export const InternshipJob = () => {
  return (
    <div>
        <InternshipDetails />
        <PereferedCandidate />
        <div className='pt-10'>
        <InternshipDescription />
        <div className='pt-10'>
        <JobResponseSettings />
        </div>
        </div>
        {/* <InternshipJobPostForm /> */}
    </div>
  )
}

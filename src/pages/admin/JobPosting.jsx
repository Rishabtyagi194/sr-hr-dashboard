import React from 'react'
import { AllJobs } from '../../components/admin/JobPostingComponents/AllJobs'
import { SubNavbar } from '../../components/admin/global/SubNavbar'

export const JobPosting = () => {
  return (
    <div>
        <SubNavbar />
        <AllJobs />
    </div>
  )
}

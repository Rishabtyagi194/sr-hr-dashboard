import React from 'react'
import { AllJobs } from '../../components/admin/JobPostingComponents/JobBoard/AllJobs'
import { SubNavbar } from '../../components/admin/global/SubNavbar'

export const JobPosting = () => {
  return (
    <div>
        <SubNavbar />
        <AllJobs />
    </div>
  )
}

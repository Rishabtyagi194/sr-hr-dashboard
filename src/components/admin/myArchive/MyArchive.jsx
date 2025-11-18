import React from 'react'
import ExcelUpload from './ExcelUpload'
import { ResumeUpload } from './ResumeUpload'

export const MyArchive = () => {
  return (
    <div className='flex justify-center items-center gap-10 text-center' >
      <ExcelUpload />
      <ResumeUpload />
    </div>
  )
}

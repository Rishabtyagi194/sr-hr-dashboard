import React from 'react'
import ExcelUpload from './ExcelUpload'
import { ResumeUpload } from './ResumeUpload'

const AllUploads = () => {
  return (
    <div>
          <div className='flex justify-center items-center gap-10 text-center' >
      <ExcelUpload />
      <ResumeUpload />
    </div>
    </div>
  )
}

export default AllUploads
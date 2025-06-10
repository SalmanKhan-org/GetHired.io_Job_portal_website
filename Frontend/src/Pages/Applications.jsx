import React, { useState } from 'react'
import { assets, jobsApplied } from '../assets/assets';
import moment from 'moment';

const Applications = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [resume, setResume] = useState(null);
  return ( 
    <div className='container px-4 min-h-[65vh] 2xl:px-20 mx-auto my-5 md:my-10'>
      <h2 className='text-lg md:text-xl font-semibold'>Your Resume</h2>
      <div className='flex gap-2 mb-6 mt-3'>
        {isEdit ?
          <>
            <label className='flex items-center ' htmlFor="resume-upload">
              <p className='bg-blue-100 text-blue-600 px-2 md:px-4 py-1 md:py-2 rounded-md mr-2'>Select Resume</p>
              <input id='resume-upload' onChange={e => setResume(e.target.files[0])} type="files" hidden accept='application/pdf' />
              <img src={assets.profile_upload_icon} alt="" />
            </label>
            <button onClick={() => setIsEdit(false)} className='border border-green-400 bg-green-100 px-2 md:px-4 py-1 md:py-2 rounded'>Save</button>
          </> :
          <div className='flex gap-2'>
            <a href="" className='bg-blue-100 text-blue-600 px-2 md:px-4 py-1 md:py-2 rounded-md'>Resume</a>
            <button onClick={()=>setIsEdit(true)} className='text-gray-500 cursor-pointer border border-gray-300 rounded px-2 md:px-4 py-1 md:py-2'>Edit</button>
          </div>}
      </div>
      <h2 className='text-lg md:text-xl font-semibold mb-4'>Jobs Applied</h2>
      <table className='min-w-full bg-white border rounded-lg'>
        <thead>
          <tr>
            <th className='py-2 md:py-3 px-2 md:px-4 border-b text-left'>Company </th>
            <th className='py-2 md:py-3 px-2 md:px-4 border-b text-left'>Job Title</th>
            <th className='py-2 md:py-3 px-2 md:px-4 border-b text-left max-sm:hidden'>Location</th>
            <th className='py-2 md:py-3 px-2 md:px-4 border-b text-left max-sm:hidden'>Date </th>
            <th className='py-2 md:py-3 px-2 md:px-4 border-b text-left'>Status</th>
          </tr>
        </thead>
        <tbody>
          {jobsApplied.length >0 && jobsApplied.map((job, index) => (
            <tr key={index+job?._id}>
              <td className='py-3 px-2 md:px-4 flex items-center gap-2 text-sm md:text-base border-b'><img className='w-4 md:w-8 h-4 md:h-8' src={job?.logo} alt="" />{ job?.company}</td>
              <td className='py-2 px-2 md:px-4 text-sm md:text-base border-b'>{ job?.title}</td>
              <td className='py-2 px-2 md:px-4 text-sm md:text-base border-b  max-sm:hidden'>{ job?.location}</td>
              <td className='py-2 px-2 md:px-4 text-sm md:text-base border-b max-sm:hidden'>{moment(job?.date).format('ll')}</td>
              <td className=' border-b'>
                <span className={`py-1 md:py-2 px-2 md:px-4 rounded ${job.status === 'Accepted' ? 'bg-green-100' : job.status === 'Rejected' ? 'bg-red-100' : 'bg-blue-100'} `}>{job?.status}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Applications

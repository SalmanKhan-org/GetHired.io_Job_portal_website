import React from 'react'
import { assets, viewApplicationsPageData } from '../assets/assets'

const ViewApplication = () => {
  return (
    <div className='container mx-auto p-4'>
      <div>
        <table className='w-full max-w-4xl bg-white border border-gray-200 max-sm:text-sm'>
          <thead>
            <tr className='border-b'>
              <th className='py-2 px-4 text-left'>#</th>
              <th className='py-2 px-4 text-left'>User Name</th>
              <th className='py-2 px-4 text-left max-sm:hidden'>Job Title</th>
              <th className='py-2 px-4 text-left max-sm:hidden'>Location</th>
              <th className='py-2 px-4 text-left'>Resume</th>
              <th className='py-2 px-4 text-left'>Action</th>
            </tr>
          </thead>
          <tbody>
            {viewApplicationsPageData.map((application, index) =>
              <tr key={index + application._id} className='text-gray-700 border-b'>
                <td className='py-2 px-4 border-b text-center'>{index + 1}</td>
                <td className='py-2 px-4  text-center flex items-center'>
                  <img className='w-10 h-10 rounded-full mr-3 max-sm:hidden' s src={application.imgSrc} alt="" />
                  <span>{application.name}</span>
                </td>
                <td className='py-2 px-4 border-b max-sm:hidden'>{application.jobTitle}</td>
                <td className='py-2 px-4 border-b text-center max-sm:hidden'>{application.location}</td>
                <td className=' px-3 rounded  items-center '>
                  <a href="" target='_blank' className='inline-flex text-sm gap-2 bg-blue-50 text-blue-400 px-2 py-1 rounded'>
                    Resume <img className='' src={assets.resume_download_icon} alt="" />
                  </a>
                </td>
                <td className='py-2 px-4 border-b relative'>
                  <div className='relative inline-block text-left group'>
                    <button className='text-gray-500 action-button'>...</button>
                    <div className='z-10 hidden absolute right-0 md:left-0 top-0 mt-2 w-32 bg-white border border-gray-200 rounded shadow group-hover:block'>
                      <button className='block w-full text-left px-4 py-2 text-blue-500 hover:bg-gray-100'>Accept</button>
                      <button className='block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100'>Reject</button>
                    </div>
                  </div>
                </td>
              </tr>)}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ViewApplication

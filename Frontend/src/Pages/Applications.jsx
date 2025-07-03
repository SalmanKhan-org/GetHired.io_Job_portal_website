import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets';
import moment from 'moment';
import { AppContext } from '../context/appContext';
import { useAuth, useUser } from '@clerk/clerk-react';
import axios from 'axios';
import { toast } from 'sonner';

const Applications = () => {
  const { user } = useUser();
  const { getToken } = useAuth();
  const [isEdit, setIsEdit] = useState(false);
  const [resume, setResume] = useState(null);
  const { backendUrl, userData, userApplications, fetchUserData } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);

  //update resume
  const uploadUserResume = async()=>{
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append('resume', resume);
      const token = await getToken();

      const { data } = await axios.put(`${backendUrl}/api/v1/user/update`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });
      if (data.success) {
        setIsLoading(false);
        toast.success(data.message);
        await fetchUserData();
        setIsEdit(false);
        setResume(null);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
    
  }
  return ( 
    <div className='container px-4 min-h-[65vh] 2xl:px-20 mx-auto my-5 md:my-10'>
      <h2 className='text-lg md:text-xl font-semibold'>Your Resume</h2>
      <div className='flex gap-2 mb-6 mt-3'>
        {isEdit  ?
          <>
            <label className='flex items-center ' htmlFor="resume-upload">
              <p className='bg-blue-100 text-blue-600 px-2 md:px-4 py-1 md:py-2 rounded-md mr-2'>{resume ? resume.name : "Select Resume"}</p>
              <input id='resume-upload' onChange={e => setResume(e.target.files[0])} type="file" hidden accept='application/pdf' />
              <img src={assets.profile_upload_icon} alt="" />
            </label>
            <button
              onClick={uploadUserResume}
              className="w-28 py-1 md:py-2 mt-2 rounded bg-black text-white cursor-pointer flex items-center justify-center gap-2"
            >
              {isLoading && (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              )}
              Save
            </button>
          </> :
          <div className='flex gap-2'>
            <a
              href={userData?.resume || "#"}
              target='_blank'
              rel='noopener noreferrer'
              className='bg-blue-100 text-blue-600 px-2 md:px-4 py-1 md:py-2 rounded-md'
            >
              {userData?.resume ? 'Your Resume':'Upload Resume'}
            </a>
            <button onClick={() => {
              setIsEdit(true)
             }} className='text-gray-500 cursor-pointer border border-gray-300 rounded px-2 md:px-4 py-1 md:py-2'>Edit</button>
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
          {userApplications && userApplications?.length >0 && userApplications.map((application, index) => (
            <tr key={index+application?._id}>
              <td className='py-3 px-2 md:px-4 flex items-center gap-2 text-sm md:text-base border-b'><img className='w-4 md:w-8 h-4 md:h-8' src={application?.company?.image} alt="" />{ application?.company?.name}</td>
              <td className='py-2 px-2 md:px-4 text-sm md:text-base border-b'>{ application?.job.title}</td>
              <td className='py-2 px-2 md:px-4 text-sm md:text-base border-b  max-sm:hidden'>{ application?.job?.location}</td>
              <td className='py-2 px-2 md:px-4 text-sm md:text-base border-b max-sm:hidden'>{moment(application?.date).format('ll')}</td>
              <td className=' border-b'>
                <span className={`py-1 md:py-2 px-2 md:px-4 rounded ${application.status === 'Accepted' ? 'bg-green-100' : application.status === 'Rejected' ? 'bg-red-100' : 'bg-blue-100'} `}>{application?.status}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Applications

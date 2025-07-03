import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/appContext'
import { toast } from 'sonner';
import axios from 'axios';
import Loader from '../Components/Loading';

const ViewApplication = () => {
  const { backendUrl, companyToken } = useContext(AppContext);

  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCompanyApplicants = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${backendUrl}/api/v1/company/job/applicants`, {
        headers: {token:companyToken}
      });
      if (data.success) {
        setApplicants(data?.applications.reverse());
        setLoading(false);
      }
    } catch (error) {
      toast.error(error?.response.data.message);
    } finally {
      setLoading(false);
    }
  }

  //function to update status of job
  const changeStatus = async (id,status) => {
    try {
      setLoading(true);
      const { data } = await axios.put(`${backendUrl}/api/v1/user/application/status/update`, {
        id, status
      });
      if (data.success) {
        toast.success(data.message);
        fetchCompanyApplicants();
        setLoading(false);
      }
    } catch (error) {
      toast.error(error?.response.data.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCompanyApplicants();
  }, [companyToken]);

  if(loading) return <Loader/>
  return applicants && applicants.length === 0 ? (
    <div className='flex items-center justify-center h-[70h]'>
      <p className='text-xl sm:text-2xl '>No Applications Available</p>
    </div>
  ) : (
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
            {applicants && applicants.length > 0 && applicants.map((application, index) =>
              <tr key={index + application._id} className='text-gray-700 border-b'>
                <td className='py-2 px-4 border-b text-center'>{index + 1}</td>
                <td className='py-2 px-4  text-center flex items-center'>
                  <img className='w-10 h-10 rounded-full mr-3 max-sm:hidden' s src={application?.user.image} alt="" />
                  <span>{application?.user.name}</span>
                </td>
                <td className='py-2 px-4 border-b max-sm:hidden'>{application?.job.title}</td>
                <td className='py-2 px-4 border-b text-center max-sm:hidden'>{application?.job?.location}</td>
                <td className=' px-3 rounded  items-center '>
                  <a href={application.user.resume} target='_blank' className='inline-flex text-sm gap-2 bg-blue-50 text-blue-400 px-2 py-1 rounded'>
                    Resume <img className='' src={assets.resume_download_icon} alt="" />
                  </a>
                </td>
                <td className='py-2 px-4 border-b relative'>
                  {application.status == 'Pending' ? <div className='relative inline-block text-left group'>
                    <button className='text-gray-500 action-button'>...</button>
                    <div className='z-10 hidden absolute right-0 md:left-0 top-0 mt-2 w-32 bg-white border border-gray-200 rounded shadow group-hover:block'>
                      <button onClick={() => changeStatus(application._id, "Accepted")} className='block w-full text-left px-4 py-2 text-blue-500 hover:bg-gray-100'>Accept</button>
                      <button onClick={() => changeStatus(application._id, "Rejected")} className='block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100'>Reject</button>
                    </div>
                  </div> : <><p>{ application.status}</p></>}
                </td>
              </tr>)}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ViewApplication

import React, { useContext, useEffect, useState } from 'react'
import { manageJobsData } from '../assets/assets'
import moment from 'moment';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/appContext';
import axios from 'axios';
import { toast } from 'sonner';
import Loader from '../Components/Loading';

const ManageJobs = () => {
  const { backendUrl, companyToken } = useContext(AppContext);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);


  const fetchCompanyJobs = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(backendUrl + '/api/v1/company/jobs', {
        headers: { token: companyToken }
      });
      if (data?.success) {
        setJobs(data?.jobs);
        setLoading(false);
      }
    } catch (error) {
      toast.error(error?.response.data.message);
    } finally {
      setLoading(false);
    }
  }
  //function to change job visibility
  const changeJobVisibility = async (id) => {
    try {
      const { data } = await axios.post(backendUrl + '/api/v1/company/job/visible', { id }, {
        headers: { token: companyToken }
      });
      if (data?.success) {
        toast.success(data?.message);
        fetchCompanyJobs();
      }
    } catch (error) {
      toast.error(error?.response.data.message);
    }
  }
  useEffect(() => {
    if (companyToken) {
      fetchCompanyJobs();
    }
  }, [companyToken]);

  if (loading) return <Loader />
  return  jobs && jobs.length === 0 ? (
    <div className='flex items-center justify-center h-[70h]'>
      <p className='text-xl sm:text-2xl '>No Jobs Available here</p>
    </div>
  ) : (
    <div className='conatiner p-4 max-w-5xl'>
      <div className='overflow-x-auto'>
        <table className='min-w-full bg-white border border-gray-200 max-sm:text-sm'>
          <thead >
            <tr>
              <th className='py-2 px-4 border-b text-left max-sm:hidden'>#</th>
              <th className='py-2 px-4 border-b text-left'>Job Title</th>
              <th className='py-2 px-4 border-b text-left max-sm:hidden'>Date</th>
              <th className='py-2 px-4 border-b text-left max-sm:hidden'>Location</th>
              <th className='py-2 px-4 border-b text-left'>Applicants</th>
              <th className='py-2 px-4 border-b text-left'>Visible</th>
            </tr>
          </thead>
          <tbody>
            {jobs && jobs?.length > 0 ? jobs.map((job, index) => <tr key={job._id + index} className='text-gray-700'>
              <td className='py-2 px-4 border-b max-sm:hidden'>{index + 1}</td>
              <td className='py-2 px-4 border-b'>{job.title}</td>
              <td className='py-2 px-4 border-b max-sm:hidden'>{moment(job.date).format('ll')}</td>
              <td className='py-2 px-4 border-b max-sm:hidden'>{job.location}</td>
              <td className='py-2 px-4 border-b'>{job.applicants}</td>
              <td className='py-2 px-4 border-b'>
                <input onChange={() => changeJobVisibility(job._id)} type="checkbox" className='scale-125 ml-4' />
              </td>
            </tr>) : <>No jobs Available</>}
          </tbody>
        </table>
      </div>
      <div className='mt-4 flex justify-end'>
        <Link to={'/dashboard/add/job'} className='bg-black text-white py-2 px-4 rounded '>Add new Job</Link>
      </div>
    </div>
  )
}
export default ManageJobs

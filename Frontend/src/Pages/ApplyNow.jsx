import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { assets, jobsData } from '../assets/assets';
import Loading from '../Components/Loading';
import kconvert from 'k-convert';
import moment from 'moment'
import JobCard from '../Components/JobCard';
import axios from 'axios';
import { AppContext } from '../context/appContext';
import { toast } from 'sonner';
import { useAuth } from '@clerk/clerk-react';

const ApplyNow = () => {
    const { id } = useParams();
    const { backendUrl, userData, userApplications, fetchUserApplications,jobs } = useContext(AppContext);
    const { getToken } = useAuth();
    const navigate = useNavigate();

    const [jobData, setJobData] = useState({});
    const [isAlreadyApplied, setIsAlreadyApplied] = useState(false);

    const fetchJob = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/v1/jobs/${id}`);
            if (data?.success) {
                setJobData(data?.job);
            }
        } catch (error) {
            toast.error(error?.response.data.message);
        }
    }

    //Apply for job
    const applyForJob = async () => {
        try {
            if (!userData) {
                return toast.error('Login to Appy for Jobs');
            }
            if (!userData.resume) {
                navigate('/applications')
                return toast.error('Upload resume  to Apply for Job');
            }
            const token = await getToken();
            const { data } = await axios.post(`${backendUrl}/api/v1/user/apply/job`, { jobId: jobData._id }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (data.success) {
                fetchUserApplications();
                toast.success(data.message);
            }
        } catch (error) {
            toast.error(error?.response.data.message);
        }
    }

    //check if already applied or not
    const checkIsAlreadyApplied = () => {

        const hasApplied = userApplications.some(item => item?.job?._id === jobData?._id);
        setIsAlreadyApplied(hasApplied);
    }
    useEffect(() => {
        if (userApplications?.length > 0 && jobData) {
            checkIsAlreadyApplied();
        }
    }, [jobData, userApplications, id]);

    useEffect(() => {
        fetchJob();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])
    return jobsData ? (
        <div className='min-h-screen flex flex-col py-10 container px-4 2xl:px-20 mx-auto'>
            <div className='bg-white text-black rounded-lg w-full'>
                <div className='flex justify-center md:justify-between flex-wrap gap-8 px-14 py-20 mb-6 bg-sky-50 border border-sky-400 rounded-xl'>
                    <div className='flex flex-col md:flex-row items-center'>
                        <img className='h-24 bg-white rounded-lg p-4 mr-4 max-md:mb-4 border' src={assets.company_icon} alt="company_icon" />
                        <div className='text-center md:text-left text-neutral-700'>
                            <h1 className='font-medium text-2xl sm:text-4xl'>{jobData?.title}</h1>
                            <div className='flex flex-row flex-wrap max-md:justify-center gap-y-2 gap-6 items-center text-gray-600 mt-2'>
                                <span className='flex items-center gap-1'>
                                    <img src={assets.suitcase_icon} alt="" />
                                    {jobData?.companyId?.name}
                                </span >
                                <span className='flex items-center gap-1'>
                                    <img src={assets.location_icon} alt="" />
                                    {jobData?.location}
                                </span>
                                <span className='flex items-center gap-1'>
                                    <img src={assets?.person_icon} alt="" />
                                    {jobData?.level}
                                </span>
                                <span className='flex items-center gap-1'>
                                    <img src={assets.money_icon} alt="" />
                                    CTC:{kconvert.convertTo(jobData?.salary)}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col justify-center text-end text-sm max-md:mx-auto max-md:text-center'>
                        <button
                            onClick={applyForJob}
                            disabled={isAlreadyApplied}
                            className={`p-2.5 px-10 rounded text-white 
    ${isAlreadyApplied ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 cursor-pointer'}`}>
                            {isAlreadyApplied ? 'Already Applied' : 'Apply now'}
                        </button>

                        <p className='mt-1 text-gray-600'>Posted {moment(jobData?.date).fromNow()}</p>
                    </div>
                </div>
                <div className='flex flex-col lg:flex-row justify-between items-start'>
                    <div className='w-full lg:w-2/3'>
                        <h2 className='font-bold text-2xl mb-4'>Job Description </h2>
                        <div className='rich-text' dangerouslySetInnerHTML={{ __html: jobData?.description }}>

                        </div>
                        <button
                            onClick={applyForJob}
                            disabled={isAlreadyApplied}
                            className={`p-2.5 px-10 rounded text-white 
    ${isAlreadyApplied ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 cursor-pointer'}`}>
                            {isAlreadyApplied ? 'Already Applied' : 'Apply now'}
                        </button>

                    </div>
                    {/* right section for similar jobs */}
                    <div className='w-full lg:w-1/3 mt-8 lg:mt-0 lg:ml-8 space-y-5'>
                        <h2>More jobs from <span className='font-semibold'>{jobData?.company?.name}</span></h2>
                        {jobs?.filter(job => job?._id !== id && job?.company?._id === jobData?.company?._id).
                            filter(job => {
                                const appliedJobs = new Set(userApplications.map(app => app?.job && app?.job._id));
                                return !appliedJobs.has(job._id);
                            }).slice(0, 4).map((job, index) => <JobCard key={index + job?._id} job={job} />)}
                    </div>
                </div>
            </div>
        </div>)
        : (
            <Loading />
        )
}

export default ApplyNow

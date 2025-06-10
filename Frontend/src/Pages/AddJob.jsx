import React, { useEffect, useRef, useState } from 'react'
import Quill from 'quill';
import { JobCategories, JobLocations } from '../assets/assets';

const AddJob = () => {
    let [jobData, setJobData] = useState({
        title: '',
        location: '',
        category: 'Programming',
        level: 'Beginner level',
        salary:0
    })

    const handleChangeJobData = (e) => {
        const { name, value } = e.target;
        setJobData((prev) => {
            return {
                ...prev,[name] : value
            }
        })
    }

    console.log(jobData);

    const editorRef = useRef(null);
    const quillRef = useRef(null);

    useEffect(() => {
        if (!quillRef.current && editorRef.current) {
            quillRef.current = new Quill(editorRef.current, {
                theme:'snow',
            })
        }
    },[])
  return (
      <form className='container p-4 flex flex-col gap-3 items-start w-full'>
          <div className='w-full mb-2'>
              <label htmlFor='title' className=''>Job Title</label>
              <input
                  onChange={handleChangeJobData}
                  type="text" id='title'
                  name='title'
                  placeholder='Type here..'
                  className='w-full max-w-lg px-3 py-2 border-2 border-gray-300 rounded'
                  value={jobData.title} required />
          </div>
          <div className='w-full  mb-2'>
              <label htmlFor='description'>Job description</label>
              <div  id='description' value={jobData.description} onChange={handleChangeJobData} ref={editorRef}></div>
          </div>
          <div className='w-full max-w-lg mb-2'>
              <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
                  <div>
                      <label htmlFor='category'>Job Category</label>
                      <select className='w-full px-3 py-2  border-2 border-gray-300 rounded' name='category' onChange={handleChangeJobData} id='category'>
                          {JobCategories.map((category, index) => <option key={index} value={category}>{category}</option>)}
                      </select>
                  </div>
              <div >
                  <label htmlFor='location'>Job Location</label>
                  <select className='w-full px-3 py-2  border-2 border-gray-300 rounded' name='location' onChange={handleChangeJobData} id='location'>
                      {JobLocations.map((location, index) => <option key={index} value={location}>{location}</option>)}
                  </select>
              </div>
              <div>
                  <label htmlFor='level'>Job Level</label>
                  <select className='w-full px-3 py-2  border-2 border-gray-300 rounded' name='level' onChange={handleChangeJobData} id='level'>
                      <option value="Beginner level">Beginner level</option>
                      <option value="Intermediate level">Intermediate level</option>
                      <option value="Senior level">Senior level</option>
                  </select>
                  </div>
              </div>  
          </div>
          <div >
              <label htmlFor="salary">Salary</label>
              <input
                  className='w-full px-3 py-2 border-2 border-slate-300 rounded'
                  name='salary'
                  min={0}
                  type="number" onChange={handleChangeJobData} value={jobData.salary} placeholder='2500' required />
          </div>
          <button className='w-28 py-2 mt-2 rounded bg-black text-white cursor-pointer'>Add Job</button>
    </form>
  )
}

export default AddJob

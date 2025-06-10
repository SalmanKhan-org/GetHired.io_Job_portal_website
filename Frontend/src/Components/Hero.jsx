import React, { useContext, useRef } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/appContext';

const Hero = () => {
    const { setSearchFilter, setIsSearch } = useContext(AppContext);

    const titleRef = useRef(null);
    const locationRef = useRef(null);

    const onSearch = () => {
        setSearchFilter({
            title: titleRef.current.value,
            location: locationRef.current.value
        });
        setIsSearch(true);
    }

  return (
      <div className='container 2xl:px-20 mx-auto my-10'>
          <div className='bg-gradient-to-r from-purple-900 to bg-purple-950 rounded-xl text-center text-white py-16 mx-2'>
              <h2 className='text-2xl md:text-3xl lg:text-4xl font-medium mb-4'>Over 10,000+ jobs to apply</h2>
              <p className='mb-8 max-w-xl mx-auto text-sm font-light
               px-5'>Your Next Big Career Move Start Right Here  - Explore the Best Job Opportunities and the First Step Toward Your Future</p>
              <div className='flex justify-between bg-white text-gray-600 max-w-xl pl-4 mx-4 rounded sm:mx-auto'>
                  <div className='flex items-center'>
                      <img className='h-4 sm:h-5' src={assets?.search_icon} alt="search_icon" />
                      <input type="text" placeholder='Search for jobs'
                          ref={titleRef}
                          className='max-sm:text-xs p-2 rounded outline-none w-full'
                      />
                  </div>
                  <div className='flex items-center'>
                      <img src={assets?.location_icon} alt="search_icon" />
                      <input type="text" placeholder='Location'
                          ref={locationRef}
                          className='max-sm:text-xs p-2 rounded outline-none w-full'
                      />
                  </div>
                  <button onClick={onSearch} className='bg-blue-600 cursor-pointer px-6 py-2  rounded text-white m-1'>Search</button>
              </div>
          </div>
          <div className='border border-gray-300 shadow-md mx-2 p-6 mt-5 rounded-md flex'>
              <div className='flex justify-center lg:gap-16 gap-10 flex-wrap'>
                  <p className='font-medium'>Trusted by</p>
                  <img className='h-6'  src={assets.microsoft_logo} alt="microsoft_logo" />
                  <img className='h-6' src={assets.walmart_logo} alt="walmart_logo" />
                  <img className='h-6' src={assets.accenture_logo} alt="accenture_logo" />
                  <img className='h-6' src={assets.samsung_logo} alt="samsung_logo" />
                  <img className='h-6' src={assets.amazon_logo} alt="amazon_logo" />
                  <img className='h-6' src={assets.adobe_logo} alt="adobe_logo" />
              </div>
          </div>
    </div>
  )
}

export default Hero

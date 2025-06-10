import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='container px-4 2xl:px-20 mx-auto flex items-center justify-between gap-4 py-3 mt-20'>
          <div className='flex gap-2 items-center'>
              <img src={assets?.logo} className='md:h-12 md:w-48 h-10 w-30' alt="" />
              <p className='flex-1  pl-4 text-sm text-gray-500 max-sm:hidden'> | Copyright @GetHired.io | All rights reserved</p>
          </div>
          <div className='flex gap-2.5 '>
              <img src={assets.facebook_icon}  className='text-lg md:text-xl' alt="" />
              <img src={assets.twitter_icon} className='text-lg md:text-xl' alt="" />
              <img src={assets.instagram_icon}  className='text-lg md:text-xl' alt="" />
          </div>
    </div>
  )
}

export default Footer

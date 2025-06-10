import React from 'react'
import { assets } from '../assets/assets'
import { Link, NavLink, Outlet } from 'react-router-dom'

const Dashboard = () => {
  return (
      <div className='min-h-screen '>
          {/* Navbar for Recruiter  */}
          <div className='shadow py-2'>
              <div className='px-5 flex items-center justify-between'>
                  <Link to={'/'}>
                      <img className=' h-8 cursor-pointer md:h-12 w-30 md:w-48 mix-blend-multiply' src={assets.logo} alt="logo" />
                  </Link>
                  <div className='flex items-center gap-3'>
                      <p className='max-sm:hidden'>Welcome, Salman khan</p>
                      <div className='relative group'>
                          <img className='w-8 border p-1 border-slate-300 rounded-full' src={assets.company_icon} alt="company_icon" />
                          <div className='absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12 '>
                              <ul className='list-none m-0 p-2 bg-white rounded-md border flex flex-col w-30 border-slate-300 text-sm'>
                                  <li className='py-1 px-2  cursor-pointer'>My Profile</li>
                                  <li className='py-1 px-2  cursor-pointer'>Logout</li>
                              </ul>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          <div>
              <div className='flex items-start'>
                  {/* Left sidebar */}
                  <div className='border-r border-r-slate-300 min-h-screen inline-block'>
                      <ul className='flex flex-col items-start pt-2 text-gray-500'>
                          <NavLink className={({isActive})=>`flex items-center p-2 sm:p-4 gap-2 w-full hover:bg-gray-100 ${isActive && 'bg-blue-100 border-r-4 border-blue-500'}`} to={'/dashboard/add/job'}>
                              <img className='min-w-2' src={assets.add_icon} alt="add_icon" />
                              <p className='max-sm:hidden'>Add Job</p>
                          </NavLink>
                          <NavLink className={({ isActive }) => `flex items-center p-2 sm:p-4 gap-2 w-full hover:bg-gray-100 ${isActive && 'bg-blue-100 border-r-4 border-blue-500'}`} to={'/dashboard/manage-jobs'}>
                              <img className='min-w-2' src={assets.home_icon} alt="home_icon" />
                              <p className='max-sm:hidden'>Manage Job</p>
                          </NavLink>
                          <NavLink className={({ isActive }) => `flex items-center p-2 sm:p-4 gap-2 w-full hover:bg-gray-100 ${isActive && 'bg-blue-100 border-r-4 border-blue-500'}`} to={'/dashboard/view-applications'}>
                              <img className='min-w-2' src={assets.person_tick_icon} alt="add_icon" />
                              <p className='max-sm:hidden'>View Applications</p>
                          </NavLink>
                      </ul>
                  </div>
                  <div>
                      <Outlet />
                  </div>
              </div>
              
          </div>
    </div>
  )
}

export default Dashboard

import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { useClerk, UserButton, useUser } from '@clerk/clerk-react'
import { Link } from 'react-router-dom';
import { AppContext } from '../context/appContext';

const Navbar = () => {
  const { openSignIn } = useClerk();
  
  const { setShowRecruiterLogin } = useContext(AppContext);

  const { user } = useUser();
  
  return (
    <div className='shadow md:py-2 py-1'>
          <div className='container px-4 2xl:px-20 mx-auto flex justify-between'>
        <Link to={'/'}>
          <img className=' h-10 md:h-12 w-30 md:w-48 mix-blend-multiply' src={assets.logo} alt="company Logo" />
        </Link>
              {user ?
                  <div className='flex items-center gap-3'>
                      <Link to={'/applications'}>Applied Jobs</Link>
                      <p> | </p>
                      <p className='max-sm:hidden'>Hi, {user?.firstName + " " + user?.lastName}</p>
                    <UserButton/>
              </div>
                  : <div className='flex gap-4 items-center max-sm:text-xs'>
                  <button onClick={()=>setShowRecruiterLogin(true)} className='text-gray-600  cursor-pointer'>Recruiter Login</button>
                  <button onClick={() => openSignIn()} className='bg-blue-600 cursor-pointer text-white px-3 md:px-9 py-1  rounded-full'>Login</button>
              </div>}

          </div>
          
    </div>
  )
}

export default Navbar

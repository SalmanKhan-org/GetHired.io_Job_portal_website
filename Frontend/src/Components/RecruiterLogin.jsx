import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets';
import { AppContext } from '../context/appContext';
import { useEffect } from 'react';

const RecruiterLogin = () => {
    const { setShowRecruiterLogin } = useContext(AppContext);
    const [state, setState] = useState('Login');
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('');
    const [image, setImage] = useState(false);

    const [isTextDataSubmitted, setIsTextDataSubmitted] = useState(false);

    const onSubmit = async (e) => {
        e.preventDefault();

        if (state === 'Sign Up' && !isTextDataSubmitted) {
            setIsTextDataSubmitted(true);
        }
    }

    useEffect(() => {
        document.body.style.overflow = 'hidden'

        return () => {
            document.body.style.overflow = 'unset'
        }
    },[])
  return (
    <div className='absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center z-10 backdrop-blur-sm bg-black/30'>
          <form onSubmit={onSubmit} className="relative bg-white p-10 rounded-xl text-slate-500">
              <h1 className='text-center text-xl text-neutral-700 font-medium'>Recruiter {state}</h1>
              <p className='text-sm'>Welcome back! Please sign in to continue</p>
              {state === 'Sign Up' && isTextDataSubmitted ?
                  <>
                      <div className='flex items-center gap-4 my-10'>
                          <label htmlFor="image">
                              <img className='w-32 rounded-full object-scale-down bg-blend-multiply' src={image ? URL.createObjectURL(image) :assets.upload_area} alt="upload_are_icon" />
                              <input onChange={e=>setImage(e.target.files[0])} type="file" id='image' hidden/>
                          </label>
                          <p>Upload Company Logo</p>
                      </div>
                  </> :
                  <>
                      {state !== 'Login' && <div className='border  px-4 py-2 flex items-center gap-2 rounded-full mt-5'>
                          <img src={assets.person_icon} alt="person_icon" />
                          <input className='outline-none text-sm' onChange={(e) => setName(e.target.value)} type="text" value={name} placeholder='Company Name' required />
                      </div>}
                      <div className='border px-4 py-2 flex items-center gap-2 rounded-full mt-5'>
                          <img src={assets.email_icon} alt="email_icon" />
                          <input className='outline-none text-sm' onChange={(e) => setEmail(e.target.value)} type="email" value={email} placeholder='Email' required />
                      </div>
                      <div className='border px-4 py-2 flex items-center gap-2 rounded-full mt-5'>
                          <img src={assets.lock_icon} alt="lock_icon" />
                          <input className='outline-none text-sm' onChange={(e) => setPassword(e.target.value)} type="password" value={password} placeholder='Password' required />
                      </div>
                      {state === 'Login' && <p className='text-xs text-blue-600 mb-4 cursor-pointer hover:underline'>Forgot Password</p>}
                  </>
                  
              }
              <button className='bg-blue-600 w-full text-white py-2 mt-4 rounded-full'>
                  {state === 'Login' ? 'Login' : isTextDataSubmitted ? 'Next': 'Create Account'}
              </button>
              <img onClick={()=>setShowRecruiterLogin(false)} className='absolute top-5 right-5 cursor-pointer' src={assets.cross_icon} alt="" />
              {state === 'Login' ?
                  <p >Dont't have an Account ? <span onClick={() => setState('Sign Up')} className='text-blue-600 hover:underline cursor-pointer'>Signup</span></p> :
                  <p>Already have an Account ? <span onClick={() => setState('Login')} className='text-blue-600 hover:underline cursor-pointer'>Login</span></p>}
      </form>
    </div>
  )
}

export default RecruiterLogin

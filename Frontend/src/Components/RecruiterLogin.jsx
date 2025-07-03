import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets';
import { AppContext } from '../context/appContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const RecruiterLogin = () => {
    const { backendUrl, setShowRecruiterLogin, setCompanyToken, setCompanyData } = useContext(AppContext);
    const [state, setState] = useState('Login');
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('');
    const [image, setImage] = useState(false);
    const [loading, setLoading] = useState(false);

    const [isTextDataSubmitted, setIsTextDataSubmitted] = useState(false);
    const navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault();

        if (state === 'Sign Up' && !isTextDataSubmitted) {
           return  setIsTextDataSubmitted(true);
        }

        if (state == 'Login') {
            try {
                setLoading(true);
                const { data } = await axios.post(backendUrl + '/api/v1/company/login', { email, password }, {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    withCredentials: true
                });

                if (data.success) {
                    setLoading(false);
                    toast.success(data.message);
                    setCompanyData(data.company);
                    setCompanyToken(data.token);
                    localStorage.setItem("companyToken", data.token);
                    setShowRecruiterLogin(false);
                    navigate('/dashboard');
                }
            } catch (error) {
                toast.error(error?.response?.data.message);
            } finally {
                setLoading(false);
            }
        } else {
            try {
                setLoading(true);
               const formData = new FormData();
               formData.append('name', name);
               formData.append('email', email);
               formData.append('password', password);
               formData.append('image', image);
               const { data } = await axios.post(backendUrl + '/api/v1/company/register', formData, {
                   headers: {
                       "Content-Type": "multipart/form-data"
                   },
                   withCredentials: true
               });
                if (data.success) {
                    setLoading(false);
                   toast.success(data.message);
                   setCompanyData(data.company);
                   setCompanyToken(data.token);
                   localStorage.setItem("companyToken", data.token);
                   setShowRecruiterLogin(false);
                   navigate('/dashboard');
               } 
           } catch (error) {
               toast.error(error?.response.data.message);
            } finally {
                setLoading(false);
           }
        }
    }
    useEffect(() => {
        document.body.style.overflow = 'hidden'
        return () => {
            document.body.style.overflow = 'unset'
        }
    })
  return (
      <div className=' absolute  p-4 top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex items-center justify-center '>
          <form  className=" relative bg-white p-10 rounded-xl  text-slate-500">
              <h1 className='text-center text-xl text-neutral-700 font-medium'>Recruiter {state}</h1>
              <p className='text-sm text-center'>Welcome back! Please sign in to continue</p>
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
              <button
                  type="submit"
                  className="w-28 py-2 mt-2 rounded bg-blue-600 text-white cursor-pointer flex items-center justify-center gap-2"
                  onClick={onSubmit}
              >
                  {loading && (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  )}
                  {state === 'Login' ? 'Login' : isTextDataSubmitted ? 'Next' : 'Create Account'}
              </button>
              {state === 'Login' ?
                  <p >Dont't have an Account ? <span onClick={() => setState('Sign Up')} className='text-blue-600 hover:underline cursor-pointer'>Signup</span></p> :
                  <p>Already have an Account ? <span onClick={() => setState('Login')} className='text-blue-600 hover:underline cursor-pointer'>Login</span></p>}
              
              <img src={assets.cross_icon} alt="cross_icon" onClick={()=>setShowRecruiterLogin(false)} className='absolute top-5 right-5 cursor-pointer' />
      </form>
    </div>
  )
}

export default RecruiterLogin

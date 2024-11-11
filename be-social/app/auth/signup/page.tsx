'use client'

import MoreDetails from '@/components/MoreDetails';
import VerifyAccount from '@/components/VerifyAccount';
import { auth } from '@/services/Firebase';
import Spinner from '@/utils/Spinner';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { RxCross2 } from 'react-icons/rx';

const Signup = () => {
  const router = useRouter()
  const[steps,setSteps] = useState<'zero'|'details'|'verify'>('zero')
  const[isLoading,setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const[loginError,setLoginError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' }); // Clear the error when user starts typing
  };

  const validateForm = () => {
    let formIsValid = true;
    const newErrors = { name: '', email: '', password: '', confirmPassword: '' };

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required and cannot be empty or contain only spaces.';
      formIsValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
      formIsValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email address.';
      formIsValid = false;
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required.';
      formIsValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long.';
      formIsValid = false;
    }

    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = 'Please confirm your password.';
      formIsValid = false;
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = 'Passwords do not match.';
      formIsValid = false;
    }

    setErrors(newErrors);
    return formIsValid;
  };

  const handleSubmit =async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      setSteps('details')

    }
  };

  const sendVerification=async()=>{

    setIsLoading(true)
    try{
      const credentials = await createUserWithEmailAndPassword(auth,formData.email,formData.confirmPassword)
      sendEmailVerification(credentials.user)
      if(credentials){
        setSteps('verify')
      }

    }catch(e:any){
      setLoginError(e.code.toString())
      setSteps('zero')
      setIsLoading(false)

    }
    
    
  }

  return (
  <>
  {steps==='verify'?(
    <VerifyAccount/>
    
  ):(


    <div className="min-h-screen flex items-center justify-center ">

       
      <div className="p-6 rounded-lg md:shadow-md w-full max-w-lg">
       {steps ==='zero' && <h2 className=" text-4xl md:text-5xl font-bold text-center font-sans mb-6">Join BeSocial</h2>}
        {loginError &&<h3 className='p-2 bg-red-300 flex items-center'><span className='p-2 cursor-pointer' onClick={()=>setLoginError('')}><RxCross2 /></span>{loginError}</h3>}
        <div className={`max-w-lg relative overflow-hidden `}>

        <form onSubmit={handleSubmit} className={`w-11/12 left-0 transition-all ${steps ==='details'?'-translate-x-[100vw]':'-translate-x-0'}`}>
          <div className="mb-4">
            <label htmlFor="name" className="block  mb-2">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-3 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring focus:ring-blue-500`}
              required
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block  mb-2">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring focus:ring-blue-500`}
              required
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block  mb-2">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-3 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring focus:ring-blue-500`}
              required
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block  mb-2">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`w-full px-3 py-2 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring focus:ring-blue-500`}
              required
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
           {isLoading?<Spinner/>:"Next"}
          </button>
        </form>
        <section className={`absolute left-1/2 top-1/2 transition-all z-10 scale-125 -translate-y-1/2 ${steps ==='details'?'-translate-x-1/2':'-translate-x-[100vw]'}`}> 
            <div className="flex gap-4 items-center">
            <IoIosArrowRoundBack className='text-2xl' onClick={()=>setSteps('zero')} />
              <h1 className='text-2xl font-bold'>Your Info</h1>
            </div>
            <MoreDetails isLoading={isLoading} sendVerification={()=>sendVerification()}/>
        </section>
         </div>
        <p className="text-center  mt-4">
          Already have an account? <span onClick={()=>router.replace('/auth/login')} className="text-blue-600 hover:underline cursor-pointer">Log In</span>
        </p>
      </div>
      

    </div>
      )
}
    </>
  );
};

export default Signup;

import Spinner from '@/utils/Spinner'
import React, { useState } from 'react'

interface Props{
    sendVerification:()=>void
}


const MoreDetails = ({sendVerification}:Props) => {
    const[isLoading,setIsLoading] =useState(false) 
    const[dob,setDOB]= useState('')
    const[userName,setUserName]= useState('')

    const handleSubmit=async()=>{
        if(dob ){
            sendVerification()
        }
        
    }
    
  return (
    <div className="p-6 rounded-lg shadow-md w-full max-w-lg">
        <h1 className='text-2xl'>Update your Info</h1>
        <div className="">
            <label htmlFor="">userName</label>
            <input type="text" placeholder='jhondoe123' value={userName} onChange={(e)=>e.target.value}
              className={`w-full px-3 py-2 border 'border-red-500' : 'border-gray-300' rounded-md focus:outline-none focus:ring focus:ring-blue-500`}
            />
        </div>
        <div className="">
            <label htmlFor="">DOB</label>
            <input type="date" placeholder='Date of birth' value={dob} onChange={(e)=>setDOB(e.target.value)}
              className={`w-full px-3 py-2 border 'border-red-500' : 'border-gray-300' rounded-md focus:outline-none focus:ring focus:ring-blue-500`}

            />
        </div>
        <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
            onSubmit={handleSubmit}
          >
           {isLoading?<Spinner/>:"Next"}
          </button>
    </div>
  )
}

export default MoreDetails

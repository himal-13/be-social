import Spinner from '@/utils/Spinner'
import React, { useState } from 'react'

interface Props{
    sendVerification:()=>void,
    isLoading:boolean,
    addUser:(dob:string,userName:string)=>void
}


const MoreDetails = ({sendVerification,isLoading,addUser}:Props) => {
    const[dob,setDOB]= useState('')
    const[userName,setUserName]= useState('')
    const[errorMsg,setErrorMsg] = useState({
      unameError:'',
      dobError:''
    })


    const handleSubmit=async()=>{
      console.log(dob)
      const newError = {unameError:'',dobError:''}
        if(dob  && userName.trim()){
            sendVerification()
            addUser(dob,userName)

        }
        else {
          if(!dob && !userName.trim()){
            newError.dobError='please add valid DOB'
            newError.unameError='please add valid user name'
          }
          if(!dob){
            newError.dobError='please add valid DOB'

          }
          if(!userName.trim()){
            newError.unameError='please add valid user name'

          }


        }
        setErrorMsg(newError)
        
    }
    
  return (
    <>
       
        <div className="mb-4">
            <label htmlFor="uName" className="block ">Name</label>
            <input
              type="text"
              id="uName"
              name="userName"
              value={userName}
              onChange={(e)=>setUserName(e.target.value)}
              className={`w-full px-3 py-2 border ${errorMsg.unameError? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring focus:ring-blue-500`}
              required
            />
            {errorMsg.unameError && <p className="text-red-500 text-sm mt-1">{errorMsg.unameError}</p>}
          </div>
        <div className="mb-4">
            <label htmlFor="date" className="block  text-sm">DOB</label>
            <input
              type="date"
              id='date'
              name="date"
              value={dob}
              onChange={(e)=>setDOB(e.target.value)}
              className={`w-full px-3 py-2 border ${errorMsg.dobError? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring focus:ring-blue-500`}
              required
            />
            {errorMsg.dobError && <p className="text-red-500 text-sm mt-1">{errorMsg.dobError}</p>}
        </div>
        <button
            type="button"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
            onClick={handleSubmit}
          >
           {isLoading?<Spinner/>:"Signup"}
          </button>
      </>
  )
}

export default MoreDetails

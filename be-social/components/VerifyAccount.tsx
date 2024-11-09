import { useRouter } from 'next/navigation'
import React from 'react'

const VerifyAccount = () => {
    const router = useRouter()
  return (
    <div className="">
        <h1 className='text-2xl'>Verification link is send in your email. </h1>
        <h4 className='underline text-blue-600 cursor-pointer text-xl' onClick={()=>router.replace('/auth/login')}>Login</h4>
    </div>
  )
}

export default VerifyAccount
